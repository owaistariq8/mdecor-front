import PropTypes from 'prop-types';
import { createContext, useEffect, useCallback, useMemo } from 'react';
import jwtDecode from 'jwt-decode';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import localStorageAvailable from '../../../utils/localStorageAvailable';
import { CONFIG } from '../../../config-global';
import { isValidToken, setSession } from '../auth/utils';

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  resetTokenTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setInitial(state, action) {
      const { isAuthenticated, user } = action.payload;

      state.isInitialized = true;
      state.isAuthenticated = isAuthenticated;
      state.user = user;
    },
    login(state, action) {
      const { user, userId } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.userId = userId;
    },
    register(state, action) {
      const { user } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.resetTokenTime = null;
    },
  },
});

export const { setInitial, login, register, logout } = authSlice.actions;

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const storageAvailable = useMemo(() => localStorageAvailable(), []);

  const initialize = useCallback(async (dispatch) => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const user = {
          email: localStorage.getItem('email'),
          name: localStorage.getItem('name'),
        };
        const userId = localStorage.getItem('userId');

        const tokenExpTime = jwtDecode(accessToken).exp * 1000;
        const tokenRefreshTime = tokenExpTime - 20 * 60 * 1000;

        dispatch(setInitial({ isAuthenticated: true, user, userId }));
      } else {
        dispatch(setInitial({ isAuthenticated: false, user: null, userId: null }));
      }
    } catch (error) {
      console.error(error);
      dispatch(setInitial({ isAuthenticated: false, user: null, userId: null }));
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(
    createAsyncThunk('auth/login', async (credentials, { dispatch }) => {
      localStorage.removeItem('userId');
      // localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('accessToken');

      const response = await axios.post(`${CONFIG.SERVER_URL}users/login`, credentials);
      console.log("response",response);
      const { accessToken, user, userId } = response.data;

      // const rolesArrayString = JSON.stringify(user.roles);
      localStorage.setItem('email', user.email);
      localStorage.setItem('name', user.name);
      localStorage.setItem('userId', userId);
      // localStorage.setItem('userRoles', rolesArrayString);
      setSession(accessToken);

      dispatch(login({ user, userId }));
    })
  );

  const register = useCallback(
    createAsyncThunk('auth/register', async (userInfo) => {
      const response = await axios.post(`${CONFIG.SERVER_URL}users/signup`, userInfo);
      const { accessToken, user } = response.data;

      localStorage.setItem('accessToken', accessToken);

      return { user };
    })
  );

  const logout = useCallback(
    createAsyncThunk('auth/logout', async () => {
      const userId = localStorage.getItem('userId');
      await axios.post(`${CONFIG.SERVER_URL}users/logout/${userId}`);

      setSession(null);
      localStorage.removeItem('userId');
      // localStorage.removeItem('email');
      localStorage.removeItem('name');
      localStorage.removeItem('userRoles');
      localStorage.removeItem('accessToken');

      return null;
    })
  );

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state => state.auth.isInitialized,
      isAuthenticated: state => state.auth.isAuthenticated,
      user: state => state.auth.user,
      userId: state => state.auth.userId,

      isAllAccessAllowed: state => state.auth.isAllAccessAllowed,
      isDisableDelete: state => state.auth.isDisableDelete,
      isDashboardAccessLimited: state => state.auth.isDashboardAccessLimited,
      isSettingReadOnly: state => state.auth.isSettingReadOnly,
      isSecurityReadOnly: state => state.auth.isSecurityReadOnly,
      isSettingAccessAllowed: state => state.auth.isSettingAccessAllowed,
      isSecurityUserAccessAllowed: state => state.auth.isSecurityUserAccessAllowed,
      isEmailAccessAllowed: state => state.auth.isEmailAccessAllowed,

      method: 'jwt',
      login,
      register,
      logout,
    }),
    []
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

import PropTypes from 'prop-types';
import storage from 'redux-persist/lib/storage';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { CONFIG } from '../config-global';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession, getUserAccess } from './utils';
import { PATH_AUTH } from '../routes/paths';


// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  userId: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIAL': {
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        userId: action.payload.userId,
      };
    }
    case 'LOGIN': {
      const { user, userId } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
        userId,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        userId: null,
      };
    }
    default: {
      return state;
    }
  }
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const storageAvailable = useMemo(() => localStorageAvailable(), []);
  
  const initialize = useCallback(async () => {

    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const user = {}
        user.customer = localStorage.getItem('customer')
        user.email = localStorage.getItem('email')
        user.firstName = localStorage.getItem('firstName')
        user.lastName = localStorage.getItem('lastName')
        const userId = localStorage.getItem('userId');

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
            userId,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable, dispatch]);

  useEffect(() => {
    initialize();
  }, [initialize]);  

    // Clear All persisted data and remove Items from localStorage
    const clearAllPersistedStates = useCallback( async () => {
      try {
          setSession(null);
          localStorage.removeItem('firstName');
          localStorage.removeItem('lastName');
          localStorage.removeItem('email');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRoles');
          localStorage.removeItem('accessToken');
      } catch (error) {
        console.error('Error clearing persisted states:', error);
      }
    },[]);

    const clearStorageAndNaviagteToLogin = useCallback( async () => {
        await clearAllPersistedStates();
        window.location.href = PATH_AUTH.login
    },[ clearAllPersistedStates ]);

  // LOGIN
  const login = useCallback(async (uEmail, uPassword) => {
    await dispatch(clearAllPersistedStates());
    const response = await axios.post(`${CONFIG.SERVER_URL}users/login`, { email: uEmail, password : uPassword, })
    const { accessToken, user, userId} = response.data;
    localStorage.setItem("customer", user?.customer);
    // const rolesArrayString = JSON.stringify(user.roles);
    localStorage.setItem('email', user.email);
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('userId', userId);
    // localStorage.setItem('userRoles', rolesArrayString);
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: { user, userId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // REGISTER
  const register = useCallback(async (firstName, lastName, email, password, phone) => {
    const response = await axios.post(`${CONFIG.SERVER_URL}users/signup`, {
      firstName,
      lastName,
      email,
      password,
      phone
    });
    const user = response.data;
    localStorage.setItem('accessToken', user?.accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback( async () => {
    const userId  = localStorage.getItem("userId")
    const id = initialState.userId
    try{
      await dispatch(clearStorageAndNaviagteToLogin());
      await axios.post(`${CONFIG.SERVER_URL}users/logout/${userId}`)
    }catch (error) {
      console.error(error)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

// Memoization
  const memoizedValue = useMemo(
      () => ({
        isInitialized: state.isInitialized,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        userId: state.userId,
        method: 'jwt',
        login,
        register,
        logout,
        clearStorageAndNaviagteToLogin,
      }),
    [state.isAuthenticated, state.isInitialized, state.user, state.userId, login, logout, register, clearStorageAndNaviagteToLogin]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}



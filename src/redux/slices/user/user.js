import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../../utils/axios';
import { CONFIG } from '../../../config-global';

// ----------------------------------------------------------------------
const regEx = /^[^2]*/
const initialState = {
  userFormVisibility: false,
  userEditFormVisibility: false,
  changePasswordByAdminDialog: false,
  changePasswordDialog: false,
  intial: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  isLoadingResetPasswordEmail: false,
  error: null,
  users: [],
  user: null,
  userId: null,
  userEmail: null,
  userDisplayName: null,
  userRoles: [],
  assignedUsers: [],
  signInLogs: [],
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
  verifiedInvite:null,
  activeFilterList: 'active',
  employeeFilterList: 'all',
  filterRegion: null,
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // START LOADING
    startLoadingResetPasswordEmail(state) {
      state.isLoadingResetPasswordEmail = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.initial = true;
    },

    // SET VISIBILITY
    setUserFormVisibility(state, action){
      state.formVisibility = action.payload;
    },

    // SET VISIBILITY
    setSecurityUserEditFormVisibility(state, action){
      state.editFormVisibility = action.payload;
    },

    // SET VISIBILITY
    setChangePasswordByAdminDialog(state, action){
      state.changePasswordByAdminDialog = action.payload;
    },

    
    // SET VISIBILITY
    setChangePasswordDialog(state, action){
      state.changePasswordDialog = action.payload;
    },

    

    // SET ACTIVE RESTRICTED LIST
    setActiveFilterList(state, action){
      state.activeFilterList = action.payload;
    },
    
    // SET EMPLOYEE RESTRICTED LIST
    setFilterRegion(state, action){
      state.filterRegion = action.payload;
    },

    // SET USER PROPERTIES
    setSecurityUserProperties(state, userData){
      const { UserId, User } = userData;
      state.userId = UserId;
      state.userEmail = User.email;
      state.userLogin = User.login;
      state.userDisplayName = User.displayName;
      state.userRoles = User.roles;
    },

    // GET users
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.users = action.payload;
      state.initial = true;
    },

    // GET Active users
    getActiveSecurityUsersSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeSecurityUsers = action.payload;
      state.initial = true;
    },
    
    getLoggedInSecurityUserSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.loggedInUser = action.payload;
      state.initial = true;
    },


    // GET user
    getUserSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.user = action.payload;
      state.initial = true;
    },

    // GET user
    getAssignedUsersuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.assignedUsers = action.payload;
      state.initial = true;
    },

    // GET Active Sign in Logs
    getSignInLogsSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.signInLogs = action.payload;
      state.initial = true;
    },

    // SET RES MESSAGE
    resetLoadingResetPasswordEmail(state, action) {
      state.isLoadingResetPasswordEmail = false;
    },

    // SET RES MESSAGE
    setResponseMessage(state, action) {
      state.responseMessage = action.payload;
      state.isLoading = false;
      state.success = true;
      state.initial = true;
    },

    // RESET SECURITY USER
    resetSecurityUser(state){
      state.user = {};
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // RESET SECURITY USERS
    resetUsers(state){
      state.users = [];
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // RESET SIGNINLOGS
    resetSignInLogs(state){
      state.signInLogs = [];
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // Get Verify Invite
    getVerifyInvite(state, action) {
      state.isLoading = false;
      state.success = true;
      state.verifiedInvite = action.payload;
    },
    // Set FilterBy
    setFilterBy(state, action) {
      state.filterBy = action.payload;
    },
    // Set PageRowCount
    ChangeRowsPerPage(state, action) {
      state.rowsPerPage = action.payload;
    },
    // Set PageNo
    ChangePage(state, action) {
      state.page = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setUserFormVisibility,
  setSecurityUserEditFormVisibility,
  setChangePasswordByAdminDialog,
  setChangePasswordDialog,
  setSecurityUserProperties,
  resetUsers,
  resetSecurityUser,
  resetLoadingResetPasswordEmail,
  setFilterBy,
  setActiveFilterList,
  setEmployeeFilterList,
  setFilterRegion,
  ChangeRowsPerPage,
  ChangePage,
} = slice.actions;
// ----------------------------------------------------------------------

export function addUser(param) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    dispatch(resetSecurityUser());
    try{
      const response = await axios.post(`${CONFIG.SERVER_URL}user/add/`, param);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function  updateUser(param, id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.patch(`${CONFIG.SERVER_URL}users/update/${id}`, param);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getUsers(query) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{ 
      const response = await axios.get(`${CONFIG.SERVER_URL}users`,
      {
        params: {
          ...query
        }
      }
      );
      if(regEx.test(response.status)){
        dispatch(slice.actions.getUsersSuccess(response.data));
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}


// ----------------------------------------------------------------------

export function getUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.get(`${CONFIG.SERVER_URL}users/${id}`);
      if(regEx.test(response.status)){
        dispatch(slice.actions.getUserSuccess(response.data));
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteUser(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.get(`${CONFIG.SERVER_URL}user/delete/${id}`);
      if(regEx.test(response.status)){
        dispatch(slice.actions.setResponseMessage(response.data));
        dispatch(resetSecurityUser())
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
//------------------------------------------------------------------------------

export function UserPasswordUpdate(data, Id, isAdmin) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      

      const response = await axios.patch(`${CONFIG.SERVER_URL}users/updatePassword/${Id}`);
      if(regEx.test(response.status)){
        dispatch(slice.actions.setResponseMessage(response.data));
      }
      return response; // eslint-disable-line
    } catch (error) {
      console.error(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}

// ----------------------------------------------------------------------

export function sendResetPasswordEmail(email) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoadingResetPasswordEmail());
    try{
      const data = {
        email
      }
      const response = await axios.post(`${CONFIG.SERVER_URL}forgetPassword`,data);
      dispatch(slice.actions.resetLoadingResetPasswordEmail());
      return response; 
    } catch (error) {
      dispatch(slice.actions.resetLoadingResetPasswordEmail());
      console.error(error);
      throw error;
    }
  };
}


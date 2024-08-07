import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../../utils/axios';
import { CONFIG } from '../../../config-global';

// ----------------------------------------------------------------------
const regEx = /^[^2]*/
const initialState = {
  formVisibility: false,
  editFormVisibility: false,
  intial: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  roles: [],
  activeRoles: [],
  role: null,
  userRoleTypes: [
              { name: 'Adminstrator', value: 'SuperAdmin'},
              { name: 'Sales Manager', value: 'SalesManager'},
              { name: 'Operator', value: 'Operator'},
              { name: 'Customer', value: 'Customer'},
            ],
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
};

const slice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.initial = true;
    },

    // SET VISIBILITY
    setRoleFormVisibility(state, action){
      state.formVisibility = action.payload;
    },

    // SET VISIBILITY
    setRoleEditFormVisibility(state, action){
      state.editFormVisibility = action.payload;
    },

    // GET  Roles
    getRolesSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.roles = action.payload;
      state.initial = true;
    },

    // GET  Active Roles
    getActiveRolesSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeRoles = action.payload;
      state.initial = true;
    },

    // GET Role
    getRoleSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.role = action.payload;
      state.initial = true;
    },

    // SET RES MESSAGE
    setResponseMessage(state, action) {
      state.responseMessage = action.payload;
      state.isLoading = false;
      state.success = true;
      state.initial = true;
    },

    // RESET ROLE
    resetRole(state){
      state.role = {};
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // reset  Active Roles
    resetActiveRoles(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeRoles = [];
      state.initial = true;
    },

    // RESET ROLES
    resetRoles(state){
      state.roles = [];
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
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
  setFormVisibility,
  setEditFormVisibility,
  resetRoles,
  resetActiveRoles,
  resetRole,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage,
} = slice.actions;
// ----------------------------------------------------------------------

export function addRole(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name: params.name,
        desc: params.desc,
        roleType: params?.roleType?.value,
        isActive: params.isActive,
        disableDelete: params.disableDelete,
      }
      const response = await axios.post(`${CONFIG.SERVER_URL}roles/`, data);
      dispatch(slice.actions.setResponseMessage('Role Saved successfully'));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function updateRole(id, params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name: params.name,
        desc: params.desc,
        roleType: params?.roleType?.value,
        isActive: params.isActive,
        disableDelete: params.disableDelete,
      }
      
      await axios.patch(`${CONFIG.SERVER_URL}roles/update/${id}`, data);
      dispatch(slice.actions.setResponseMessage('Role updated successfully'));
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function getRoles() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}roles`);
      dispatch(slice.actions.getRolesSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Roles loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

export function getActiveRoles() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}roles`,
      {
        params: {
          isActive: true,
        }
      }
      );
      dispatch(slice.actions.getActiveRolesSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Roles loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getRole(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}roles/${id}`);
      dispatch(slice.actions.getRoleSuccess(response.data));
      // dispatch(slice.actions.setResponseMessage('User Loaded Successfuly'));
    } catch (error) {
      console.error(error?.message);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteRole(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.patch(`${CONFIG.SERVER_URL}roles/${id}`,
      {
        isArchived: true, 
      }
      );
      // state.responseMessage = response.data;
      if(regEx.test(response.status)){
        dispatch(slice.actions.setResponseMessage(response.data));
        dispatch(resetRole());
      }
      return response;
    } catch (error) {
      console.error(error?.message);
      throw error;
    }
  };
}
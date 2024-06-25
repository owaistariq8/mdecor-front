import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../../utils/axios';
import { CONFIG } from '../../../config-global';

const initialState = {
  intial: false,
  customerTab: 'info',
  customerEditFormFlag: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  customers: [],
  customer: {},
  customerDialog: false,
  filterBy: '',
  verified: 'all',
  excludeReporting: 'included',
  page: 0,
  rowsPerPage: 100,
};

const slice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    // STOP LOADING
    stopLoading(state) {
      state.isLoading = false;
    },

    // SET CUSTOMER TAB
    setCustomerTab(state, action){
      state.customerTab = action.payload;
    },

    // SET TOGGLE
    setCustomerEditFormVisibility(state, action){
      state.customerEditFormFlag = action.payload;
    },

    // SET TOGGLE
    setCustomerDialog(state, action){
      state.customerDialog = action.payload;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      state.initial = true;
    },

    // GET Customers
    getCustomersSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.customers = action.payload;
      state.initial = true;
    },

    // GET Customer
    getCustomerSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.customer = action.payload;
      state.initial = true;
    },

    setResponseMessage(state, action) {
      state.responseMessage = action.payload;
      state.isLoading = false;
      state.success = true;
      state.initial = true;
    },

    // RESET CUSTOMER
    resetCustomer(state){
      state.customer = {};
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // RESET CUSTOMERS
    resetCustomers(state){
      state.customers = [];
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // Set FilterBy
    setFilterBy(state, action) {
      state.filterBy = action.payload;
    },

    // Set Excluded
    setExcludeReporting(state, action) {
      state.excludeReporting = action.payload;
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
  setCustomerTab,
  setCustomerEditFormVisibility,
  setResponseMessage,
  setFilterBy,
  setExcludeReporting,
  resetCustomer,
  resetCustomers,
  ChangeRowsPerPage,
  ChangePage,
  setCustomerDialog,
} = slice.actions;

// ----------------------------------------------------------------------

export function getCustomers( query ) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const params = { ...query };

      const response = await axios.get(`${CONFIG.SERVER_URL}customers`, { params });

      dispatch(slice.actions.getCustomersSuccess(response.data));
      // dispatch(slice.actions.setResponseMessage('Customers loaded successfully'));
    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}


// ----------------------------------------------------------------------

export function getCustomer(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}customers/${id}`);
      dispatch(slice.actions.getCustomerSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteCustomer(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.patch(`${CONFIG.SERVER_URL}customers/${id}`,
      {
        isArchived: true,
      });
      dispatch(slice.actions.setResponseMessage(response.data));
      // state.responseMessage = response.data;
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// --------------------------------------------------------------------------

export function addCustomer(params) {
    return async (dispatch) => {
      dispatch(slice.actions.resetCustomer());
      dispatch(slice.actions.startLoading());
      try {
        const data = {
          name: params?.name,
          website: params?.website,
          type: params.type,
          site: {
            name: params?.name,
            phone: params?.phone || '',
            email: params?.email,
            address: {
              street: params?.street,
              suburb: params?.suburb,
              city: params?.city,
              postcode: params?.postcode,
              country: params?.country?.label,
              region: params?.region,
            },
          },
          status: params.status,
        };

        const contact = {}

        if(params?.contactLastName){
          contact.lastName = params?.contactLastName
        }
        if(params?.contactTitle){
          contact.title = params?.contactTitle
        }
        if(params?.contactPhone?.contactNumber && params?.contactFirstName){
          contact.phone = params?.contactPhone 
        }
        if(params?.contactEmail){
          contact.email = params?.contactEmail
        }
        if(params?.contactFirstName){
          contact.firstName = params?.contactFirstName
          data.contact = contact
        }

        const response = await axios.post(`${CONFIG.SERVER_URL}customers`, data);
        return response
        // dispatch(slice.actions.getCustomerSuccess(response.data.Customer));
      } catch (error) {
        console.error(error);
        dispatch(slice.actions.hasError(error.Message));
        throw error;
      }
    };

}


// --------------------------------------------------------------------------

export function updateCustomer(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        id: params.id,
        name: params?.name,
        website: params?.website,
        type: params.type,
        site: params.site?._id || null,
        contact: params.contact?._id || null,
        status: params.isActive,
      };
      await axios.patch(`${CONFIG.SERVER_URL}customers/${params.id}`, data );
      dispatch(getCustomer(params.id));
      dispatch(slice.actions.setCustomerEditFormVisibility(false));
    } catch (error) {
      dispatch(slice.actions.stopLoading());
      console.error(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };

}
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../../utils/axios';
import { CONFIG } from '../../../config-global';

// ----------------------------------------------------------------------
const regEx = /^[^2]*/
const initialState = {
  intial: false,
  responseMessage: null,
  success: false,
  isLoading: false,
  error: null,
  item: {},
  items: [],
  activeItems: [],
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
};

const slice = createSlice({
  name: 'item',
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

    // GET  ITEM CATEGORIES
    getItemsSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.items = action.payload;
      state.initial = true;
    },

    // GET ACTIVE ITEMS
    getActiveItemsSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeItems = action.payload;
      state.initial = true;
    },

    // GET ITEM
    getItemSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.item = action.payload;
      state.initial = true;
    },

    // SET RES MESSAGE
    setResponseMessage(state, action) {
      state.responseMessage = action.payload;
      state.isLoading = false;
      state.success = true;
      state.initial = true;
    },

    // RESET ITEM
    resetItem(state){
      state.item = {};
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // reset ACTIVE ITEMS
    resetActiveItems(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeItems = [];
      state.initial = true;
    },

    // RESET ITEM CATEGORIES
    resetItems(state){
      state.items = [];
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
  resetItems,
  resetActiveItems,
  resetItem,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage,
} = slice.actions;
// ----------------------------------------------------------------------

export function addItem(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name: params.name,
        category: params.itemCategory,
        description: params.description,
        price: params.price,
        stockQuantity: params.stockQuantity,
        status: params.status,
        image: params.image,
        isActive: params.isActive,
      }

      const response = await axios.post(`${CONFIG.SERVER_URL}items/`, data);
      dispatch(slice.actions.setResponseMessage('Item Saved successfully'));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function updateItem(id, params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name: params.name,
        itemCategory: params.itemCategory,
        description: params.description,
        price: params.price,
        stockQuantity: params.stockQuantity,
        status: params.status,
        image: params.image,
        isActive: params.isActive
      }
      await axios.patch(`${CONFIG.SERVER_URL}items/${id}`, data);
      dispatch(slice.actions.setResponseMessage('Item updated successfully'));
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function getItems(categoryId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      
      const params = {
        isActive:true,
      }

      if(categoryId){
        params.category=categoryId;
      }

      const response = await axios.get(`${CONFIG.SERVER_URL}items`,{params});
      dispatch(slice.actions.getItemsSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Item loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

export function getActiveItems() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}items`,
      {
        params: {
          isArchived: false,
          isActive: true,
        }
      }
      );
      dispatch(slice.actions.getActiveItemsSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Active Items loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getItem(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}items/${id}`);
      dispatch(slice.actions.getItemSuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteItem(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.patch(`${CONFIG.SERVER_URL}items/${id}`,
      {
        isArchived: true, 
      }
      );
      if(regEx.test(response.status)){
        dispatch(slice.actions.setResponseMessage(response.data));
        dispatch(resetItem());
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
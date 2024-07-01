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
  itemCategory: {},
  itemCategories: [],
  activeItemCategories: [],
  filterBy: '',
  page: 0,
  rowsPerPage: 100,
};

const slice = createSlice({
  name: 'itemCategory',
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
    getItemCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.itemCategories = action.payload;
      state.initial = true;
    },

    // GET  ACTIVE ITEM CATEGORIES
    getActiveItemCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeItemCategories = action.payload;
      state.initial = true;
    },

    // GET ItemCategory
    getItemCategorySuccess(state, action) {
      state.isLoading = false;
      state.success = true;
      state.itemCategory = action.payload;
      state.initial = true;
    },

    // SET RES MESSAGE
    setResponseMessage(state, action) {
      state.responseMessage = action.payload;
      state.isLoading = false;
      state.success = true;
      state.initial = true;
    },

    // RESET ITEM CATEGORY
    resetItemCategory(state){
      state.itemCategory = {};
      state.responseMessage = null;
      state.success = false;
      state.isLoading = false;
    },

    // reset  ACTIVE ITEM CATEGORIES
    resetActiveItemCategories(state, action) {
      state.isLoading = false;
      state.success = true;
      state.activeItemCategories = [];
      state.initial = true;
    },

    // RESET ITEM CATEGORIES
    resetItemCategories(state){
      state.itemCategories = [];
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
  resetItemCategories,
  resetActiveItemCategories,
  resetItemCategory,
  setFilterBy,
  ChangeRowsPerPage,
  ChangePage,
} = slice.actions;
// ----------------------------------------------------------------------

export function addItemCategory(params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const data = {
        name: params.name,
        desc: params.desc,
        image: params.image,
        active: params.active,
        default: params.default,
      }

      const response = await axios.post(`${CONFIG.SERVER_URL}categories/`, data);
      dispatch(slice.actions.setResponseMessage('Item Category Saved successfully'));
      return response;
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function updateItemCategory(id, params) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {

      const data = {
        name: params.name,
        desc: params.desc,
        image: params.image,
        active: params.active,
        default: params.default,
      }
      await axios.patch(`${CONFIG.SERVER_URL}categories/update/${id}`, data);
      dispatch(slice.actions.setResponseMessage('Item Category updated successfully'));
    } catch (error) {
      console.log(error);
      throw error;
      // dispatch(slice.actions.hasError(error.Message));
    }
  };
}
// ----------------------------------------------------------------------

export function getItemCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}categories`);
      dispatch(slice.actions.getItemCategoriesSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Item Categories loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

export function getActiveItemCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}categories`,
      {
        params: {
          active: true,
        }
      }
      );
      dispatch(slice.actions.getActiveItemCategoriesSuccess(response.data));
      dispatch(slice.actions.setResponseMessage('Active Item Categories loaded successfully'));

    } catch (error) {
      console.log(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function getItemCategory(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`${CONFIG.SERVER_URL}categories/${id}`);
      dispatch(slice.actions.getItemCategorySuccess(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error.Message));
      throw error;
    }
  };
}

// ----------------------------------------------------------------------

export function deleteItemCategory(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try{
      const response = await axios.patch(`${CONFIG.SERVER_URL}categories/${id}`);
      if(regEx.test(response.status)){
        dispatch(slice.actions.setResponseMessage(response.data));
        dispatch(resetItemCategory());
      }
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
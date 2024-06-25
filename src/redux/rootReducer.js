import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user/user';
import customerReducer from './slices/customer/customer';
import siteReducer from './slices/customer/site';
import contactReducer from './slices/customer/contact';
import roleReducer from './slices/user/role';
import countReducer from './slices/dashboard/count';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const assetPersistConfig = {
  key: 'asset',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
};

export const userPersistConfig = {
  key: 'user',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
};

export const customerPersistConfig = {
  key: 'customer',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'customers']
};

export const contactPersistConfig = {
  key: 'contact',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'contacts']
};

export const sitePersistConfig = {
  key: 'site',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'sites']
};

export const customerNotePersistConfig = {
  key: 'customerNote',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'notes']
};

export const userRolesPersistConfig = {
  key: 'role',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage', 'userRoleTypes']
};
export const regionPersistConfig={
  key: 'region',
  storage,
  keyPrefix: 'redux-',
  blacklist: ['error', 'initial', 'responseMessage']
}


const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  customer: persistReducer(customerPersistConfig, customerReducer),
  site: persistReducer(sitePersistConfig, siteReducer),
  contact: persistReducer(contactPersistConfig, contactReducer),
  role: persistReducer(userRolesPersistConfig, roleReducer),
});

export default rootReducer;

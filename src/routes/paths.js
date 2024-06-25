// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_CRM = '/crm';
const ROOTS_USER = '/user';
const ROOTS_SETTING = '/settings';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  newpassword: (token, userId) => path(ROOTS_AUTH, `/new-password/${token}/${userId}`),
  authenticate: path(ROOTS_AUTH, '/authenticate'),
  // newPassword: path(ROOTS_AUTH, '/new-password/${id}/asset/${userId}/edit'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  page403: '/403',
  page404: '/404',
  page500: '/500',
  components: '/components',
  invalidErrorPage:'/InvalidErrorPage',
  expiredErrorPage:'/ExpiredErrorPage',
};

// --------------------- Dashboard ----------------------
export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
  blank: path(ROOTS_AUTH, '/login'),
};



// --------------------- Customer -----------------------
export const PATH_CRM = {
  permissionDenied: path(ROOTS_CRM, '/permission-denied'),
  // --------------------- Customers Sites Report -----------------------
  sites: path(ROOTS_CRM, '/sites'),
  // --------------------- Customers Contacts Report -----------------------
  contacts: path(ROOTS_CRM, '/contacts'),
  // --------------------- Customers -----------------------
  customers: {
    list: path(ROOTS_CRM, '/customers'),
    new: path(ROOTS_CRM, '/customers/new'),
    view: (customerId) => path(ROOTS_CRM, `/customers/${customerId}/view`),
    edit: (customerId) => path(ROOTS_CRM, `/customers/${customerId}/edit`),
    // --------------------- Customer Sites -----------------------
    sites: {
      root: ( customerId ) => path(ROOTS_CRM, `/customers/${customerId}/sites`),
      new: ( customerId ) => path(ROOTS_CRM, `/customers/${customerId}/sites/new`),
      view: ( customerId, id ) => path(ROOTS_CRM, `/customers/${customerId}/sites/${id}/view`),
      edit: ( customerId, id ) => path(ROOTS_CRM, `/customers/${customerId}/sites/${id}/edit`),
    },
    // --------------------- Customer Contacts -----------------------
    contacts: {
      root: ( customerId ) => path(ROOTS_CRM, `/customers/${customerId}/contacts`),
      new: ( customerId ) => path(ROOTS_CRM, `/customers/${customerId}/contacts/new`),
      view: ( customerId, id ) => path(ROOTS_CRM, `/customers/${customerId}/contacts/${id}/view`),
      edit: ( customerId, id ) => path(ROOTS_CRM, `/customers/${customerId}/contacts/${id}/edit`),
      move: ( customerId, id ) => path(ROOTS_CRM, `/customers/${customerId}/contacts/${id}/move`),
    },
    
  },
  
};

export const PATH_SETTING = {
  permissionDenied: path(ROOTS_SETTING, '/permission-denied'),
  root: ROOTS_SETTING,
  role: {
    new: path(ROOTS_SETTING, '/role/new'),
    list: path(ROOTS_SETTING, '/role/list'),
    view: (id) => path(ROOTS_SETTING, `/role/${id}/view`),
    edit: (id) => path(ROOTS_SETTING, `/role/${id}/edit`),
  },
};

export const PATH_USER = {
  root: ROOTS_USER,
  permissionDenied: path(ROOTS_USER, '/permission-denied'),
  // ------------------------ SECURITY USERS ----------------------------------------
  users: {
    new: path(ROOTS_USER, `/users/new/`),
    profile: path(ROOTS_USER, '/users/profile'),
    editProfile: path(ROOTS_USER, '/users/editProfile'),
    password: path(ROOTS_USER, '/users/password'),
    userPassword: path(ROOTS_USER, '/users/changePassword'),
    account: path(ROOTS_USER, '/users/account'),
    view: (id) => path(ROOTS_USER, `/users/${id}/view`),
    edit: (id) => path(ROOTS_USER, `/users/${id}/edit`),
  },
};

import { Suspense, lazy } from 'react';
// components
import LoadingScreen from '../components/loading-screen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

// ----------------------------------------------------------------------

// AUTH
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));
export const VerifyCodePage = Loadable(lazy(() => import('../pages/auth/VerifyCodePage')));
export const NewPasswordPage = Loadable(lazy(() => import('../pages/auth/NewPasswordPage')));
export const ResetPasswordPage = Loadable(lazy(() => import('../pages/auth/ResetPasswordPage')));
// export const Authenticate = Loadable(lazy(() => import('../sections/auth/Authenticate')));

// ----------------------------------------------------------------

// MAIN
export const PermissionDeniedPage = Loadable( lazy(() => import('../pages/dashboard/PermissionDeniedPage')));
export const BlankPage = Loadable(lazy(() => import('../pages/dashboard/BlankPage')));
export const Page500 = Loadable(lazy(() => import('../pages/Page500')));
export const Page403 = Loadable(lazy(() => import('../pages/Page403')));
export const Page404 = Loadable(lazy(() => import('../pages/Page404')));
export const HomePage = Loadable(lazy(() => import('../pages/HomePage')));
export const ComingSoonPage = Loadable(lazy(() => import('../pages/ComingSoonPage')));
export const MaintenancePage = Loadable(lazy(() => import('../pages/MaintenancePage')));
export const ErrorPage = Loadable(lazy(() => import('../pages/ErrorPage')));
export const ComponentsOverviewPage = Loadable(lazy(() => import('../components/Defaults/ComponentsOverviewPage')));

// ----------------------------------------------------------------

// AUTH SECURITY USER 
export const UserProfile = Loadable(lazy(() => import('../pages/user/profile/userProfile')))  
export const UserProfileEdit = Loadable(lazy(() => import('../pages/user/profile/userProfileEditForm')));
export const UserChangePassword = Loadable(lazy(() => import('../pages/user/passwordChange/userChangePassword')));

// ----------------------------------------------------------------

// DASHBOARD
export const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

// ----------------------------------------------------------------

// CUSTOMER
export const CustomerList = Loadable(lazy(() => import('../pages/crm/reports/customers/CustomerList')));
export const CustomerAdd = Loadable(lazy(() => import('../pages/crm/customers/CustomerAdd')));
export const CustomerEdit = Loadable(lazy(() => import('../pages/crm/customers/CustomerEdit')));
export const CustomerView = Loadable(lazy(() => import('../pages/crm/customers/CustomerView')));

// CUSTOMERS SITE REPORTS
export const CustomerSiteList = Loadable(lazy(() => import('../pages/crm/reports/sites/CustomerSiteList')));

// CUSTOMERS CONTACT REPORTS
export const CustomerContactList = Loadable(lazy(() => import('../pages/crm/reports/contacts/CustomerContactList')));

// CUSTOMER SITES
export const CustomerSiteDynamicList = Loadable(lazy(() => import('../pages/crm/sites/CustomerSiteDynamicList')));

// CUSTOMER CONTACTS
export const CustomerContactDynamicList = Loadable(lazy(() => import('../pages/crm/contacts/CustomerContactDynamicList')));

// ----------------------------------------------------------------

// REPORTS / SETTINGS
export const Setting = Loadable(lazy(() => import('../pages/settings/Setting')));


// SECURITY USERS
export const UserList = Loadable(lazy(() => import('../pages/user/users/userList')));
export const UserAdd = Loadable(lazy(() => import('../pages/user/users/userAdd')));
export const UserView = Loadable(lazy(() => import('../pages/user/users/userView')));
export const UserEdit = Loadable(lazy(() => import('../pages/user/users/userEdit')));
export const UserChangePasswordByAdmin = Loadable(lazy(() => import('../pages/user/passwordChange/userChangePasswordByAdmin')));

// SECURITY SETTIGS ROLES
export const RoleList = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleList')));
export const RoleAdd = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleAddForm')));
export const RoleEdit = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleEditForm')));
export const RoleView = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleView')));

// ----------------------------------------------------------------

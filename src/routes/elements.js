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
export const UserProfile = Loadable(lazy(() => import('../pages/security/profile/userProfile')))  
export const UserProfileEdit = Loadable(lazy(() => import('../pages/security/profile/userProfileEditForm')));
export const UserChangePassword = Loadable(lazy(() => import('../pages/security/passwordChange/userChangePassword')));

// DASHBOARD
export const Dashboard = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));

// ----------------------------------------------------------------

// CUSTOMER
export const CustomerList = Loadable(lazy(() => import('../pages/customers/CustomerList')));
export const CustomerAdd = Loadable(lazy(() => import('../pages/customers/CustomerAddForm')));
export const CustomerEdit = Loadable(lazy(() => import('../pages/customers/CustomerEditForm')));
export const CustomerView = Loadable(lazy(() => import('../pages/customers/CustomerViewForm')));

// CUSTOMERS SITE REPORTS
export const CustomerSiteList = Loadable(lazy(() => import('../pages/customers/sites/CustomerSiteDynamicList')));

// CUSTOMERS CONTACT REPORTS
// export const CustomerContactList = Loadable(lazy(() => import('../pages/customers/contacts/CustomerContactList')));

// ----------------------------------------------------------------

// REPORTS / SETTINGS
export const Setting = Loadable(lazy(() => import('../pages/settings/Setting')));


// SECURITY USERS
export const UserList = Loadable(lazy(() => import('../pages/security/users/UserList')));
export const UserAdd = Loadable(lazy(() => import('../pages/security/users/UserAddForm')));
export const UserView = Loadable(lazy(() => import('../pages/security/users/UserViewForm')));
export const UserEdit = Loadable(lazy(() => import('../pages/security/users/UserEditForm')));
export const UserChangePasswordByAdmin = Loadable(lazy(() => import('../pages/security/passwordChange/userChangePasswordByAdmin')));

// SECURITY SETTIGS ROLES
export const RoleList = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleList')));
export const RoleAdd = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleAddForm')));
export const RoleEdit = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleEditForm')));
export const RoleView = Loadable(lazy(() => import('../pages/settings/securitySettings/role/RoleView')));

// ITEM CATEGORIES
export const ItemCategoryList = Loadable(lazy(() => import('../pages/settings/item-category/ItemCategoryList')));
export const ItemCategoryAdd = Loadable(lazy(() => import('../pages/settings/item-category/ItemCategoryAddForm')));
export const ItemCategoryEdit = Loadable(lazy(() => import('../pages/settings/item-category/ItemCategoryEditForm')));
export const ItemCategoryView = Loadable(lazy(() => import('../pages/settings/item-category/ItemCategoryViewForm')));

// ITEMS
export const ItemList = Loadable(lazy(() => import('../pages/settings/item/ItemList')));
export const ItemAdd = Loadable(lazy(() => import('../pages/settings/item/ItemAddForm')));
export const ItemEdit = Loadable(lazy(() => import('../pages/settings/item/ItemEditForm')));
export const ItemView = Loadable(lazy(() => import('../pages/settings/item/ItemViewForm')));

// ----------------------------------------------------------------

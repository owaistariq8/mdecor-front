import { Navigate, useRoutes } from 'react-router-dom';
// auth
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import SimpleLayout from '../layouts/simple';
import CompactLayout from '../layouts/compact';
import DashboardLayout from '../layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from '../config-global';
//
import {
  // Auth
  LoginPage,
  RegisterPage,
  VerifyCodePage,
  NewPasswordPage,
  ResetPasswordPage,

  // ----------------------------------------------------------------

  // AUTH SECURITY USER 
  UserProfile,
  UserProfileEdit,
  UserChangePassword,

  // ----------------------------------------------------------------

  // Dashboard
  Dashboard,

  // Customer
  CustomerList,
  CustomerAdd,
  CustomerEdit,
  CustomerView,

  // SITE REPORTS
  CustomerSiteList,

  //  SETTINGS
  Setting,

  // ----------------------------------------------------------------

  // SECURITY USER
  UserList,
  UserAdd,
  UserEdit,
  UserView,
  UserChangePasswordByAdmin,

  // SECURITY SETTIGS ROLES
  RoleList,
  RoleAdd,
  RoleView,
  RoleEdit,

  // ----------------------------------------------------------------

  // MAIN
  Page500,
  Page403,
  Page404,
  ComingSoonPage,
  MaintenancePage,
  ErrorPage,
  BlankPage,
  PermissionDeniedPage,
  
  ItemCategoryList,
  ItemCategoryAdd,
  ItemCategoryEdit,
  ItemCategoryView,

  ItemList,
  ItemAdd,
  ItemEdit,
  ItemView,

} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      // Auth
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <LoginPage /> },
        { path: 'register-unprotected', element: <RegisterPage /> },
        {
          element: <CompactLayout />,
          children: [
            { path: 'reset-password', element: <ResetPasswordPage /> },
            { path: 'new-password/:token/:userId', element: <NewPasswordPage /> }, 
            { path: 'verify', element: <VerifyCodePage /> },
          ],
        },
      ],
    },

    // ----------------------------- Main Routes ----------------------------------

    {
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
      ],
    },
    { element: <SimpleLayout />},
    { path: '500', element: <Page500 /> },
    { path: '403', element: <Page403 /> },
    { path: '404', element: <Page404 /> },
    {
      element: <CompactLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoonPage /> },
        { path: 'maintenance', element: <MaintenancePage /> },
        { path: 'invalidErrorPage', element: <ErrorPage title='Invalid Code' /> },
        { path: 'expiredErrorPage', element: <ErrorPage title='Invitation Expired' /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },

    // --------------------- Dashboard ----------------------
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [ { element: <Dashboard />, index: true }]
    },

    
    // --------------------- Customer -----------------------

    {
      path: 'customers',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'list', element: <CustomerList />, index: true },
        { path: 'new', element: <CustomerAdd /> },
        { path: ':id/edit', element: <CustomerEdit />},
        { path: ':id/view', element: <CustomerView />},
        { path: ':id/sites',
          children: [
            { element: <CustomerSiteList />, index: true  },
          ]
        },
      ],
    },
    
    // SECURITY
    {
      path: 'security',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <UserList />, index: true },
        {
          path: 'user',
          children: [
            { path: 'profile', element: <UserProfile/> },
            { path: 'editProfile', element: <UserProfileEdit/> },
            { path: 'password', element: <UserChangePassword/> },
            { path: 'changePassword', element: <UserChangePasswordByAdmin/> },
            { path: 'new', element: <UserAdd /> },
            { path: 'invite', element: <UserAdd isInvite /> },
            { path: ':id/edit', element: <UserEdit /> },
            { path: ':id/view', element: <UserView /> },
          ],
        },
        { path: 'permission-denied', element: <PermissionDeniedPage /> },
        { path: 'blank', element: <BlankPage /> },
      ],
    },

    // ----------------------------- SETTING -----------------------------------
    {
      path: 'settings',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {element: <Setting  />, index: true },
        // ------------------------------ role ----------------------------------
        {
          path: 'role',
          children: [
            { path: 'list', element: <RoleList /> },
            { path: 'new', element: <RoleAdd /> },
            { path: ':id/edit', element: <RoleEdit />},
            { path: ':id/view', element: <RoleView />}
          ],
        },
        {
          path: 'item-category',
          children: [
            { path: 'list', element: <ItemCategoryList /> },
            { path: 'new', element: <ItemCategoryAdd /> },
            { path: ':id/edit', element: <ItemCategoryEdit />},
            { path: ':id/view', element: <ItemCategoryView />}
          ],
        },
        {
          path: 'item',
          children: [
            { path: 'list', element: <ItemList /> },
            { path: 'new', element: <ItemAdd /> },
            { path: ':id/edit', element: <ItemEdit />},
            { path: ':id/view', element: <ItemView />}
          ],
        },
      ],
    },
  ]);
}

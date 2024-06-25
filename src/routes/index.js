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
  SecurityUserProfile,
  SecurityUserProfileEdit,
  SecurityUserChangePassword,

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

  // CONTACT REPORTS
  CustomerContactList,

  // CUSTOMERS SITES
  CustomerSiteDynamicList,

  // CUSTOMERS CONTACTS
  CustomerContactDynamicList,
  

  //  SETTINGS
  Setting,

  // ----------------------------------------------------------------

  // SECURITY USER
  SecurityUserList,
  SecurityUserAdd,
  SecurityUserEdit,
  SecurityUserView,
  SecurityUserChangePasswordByAdmin,

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
    },

    
    // --------------------- Customer -----------------------

    {
      path: 'crm',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'contacts', element: <CustomerContactList />},
        { path: 'sites', element: <CustomerSiteList />},
        { path: 'customers',
          children: [
            { element: <CustomerList />, index: true  },
            { path: 'new', element: <CustomerAdd /> },
            { path: ':customerId/edit', element: <CustomerEdit />},
            { path: ':customerId/view', element: <CustomerView />},
            { path: ':customerId/sites',
            children: [
                { element: <CustomerSiteDynamicList />, index: true  },
                { path: 'new', element: <CustomerSiteDynamicList siteAddForm /> },
                { path: ':id/edit', element: <CustomerSiteDynamicList siteEditForm />},
                { path: ':id/view', element: <CustomerSiteDynamicList siteViewForm />}
              ],
            },
            { path: ':customerId/contacts',
              children: [
                { element: <CustomerContactDynamicList />, index: true  },
                { path: 'new', element: <CustomerContactDynamicList contactAddForm /> },
                { path: ':id/edit', element: <CustomerContactDynamicList contactEditForm />},
                { path: ':id/view', element: <CustomerContactDynamicList contactViewForm />},
                { path: ':id/move', element: <CustomerContactDynamicList contactMoveForm />},
              ],
            },
            { path: 'permission-denied', element: <PermissionDeniedPage /> },
            { path: 'blank', element: <BlankPage /> },
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
        { element: <SecurityUserList />, index: true },
        {
          path: 'users',
          children: [
            { path: 'profile', element: <SecurityUserProfile/> },
            { path: 'editProfile', element: <SecurityUserProfileEdit/> },
            { path: 'password', element: <SecurityUserChangePassword/> },
            { path: 'changePassword', element: <SecurityUserChangePasswordByAdmin/> },
            { path: 'new', element: <SecurityUserAdd /> },
            { path: 'invite', element: <SecurityUserAdd isInvite /> },
            { path: ':id/edit', element: <SecurityUserEdit /> },
            { path: ':id/view', element: <SecurityUserView /> },
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
      ],
    },
  ]);
}

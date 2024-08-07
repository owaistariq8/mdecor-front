export const ICONS = {
  //  defaults
  size: '30px',
  variant: 'overline',
  badge: 'body2',
  // default icons
  warning: 'mdi:alert-circle-outline',

  // ------------------------------------------------------------

  // NEW PROJECT STARTED
  ITEM_CATEGORY: {
    icon: 'mingcute:cube-fill',
    heading: 'Item Categories',
  },
  ITEM_LIST: {
    icon: 'ph:cube-fill',
    heading: 'Item List',
  },




  UPLOAD_FILE: {
    icon: 'mingcute:file-upload-fill',
    heading: 'Uplaod File',
  },
  ACTIVE: {
    icon: 'mdi:check-circle-outline',
    color: '#008000',
    heading: 'Active',
  },
  INACTIVE: {
    icon: 'mdi:ban',
    color: '#FF0000',
    heading: 'Inactive',
  },

  //  Releases
  RELEASE: {
    icon: 'mdi:source-branch',
    color: '#008000',
    heading: 'Release',
  },

  RELEASES: {
    // icon: 'mdi:source-branch',
    icon: 'tabler:speedboat',
    heading: 'Releases',
  },
  
  RELEASED: {
    icon: 'mdi:source-branch-check',
    color: '#008000',
    heading: 'Released',
  },

  NOTRELEASE: {
    icon: 'mdi:source-branch-minus',
    color: '#FF0000',
    heading: 'Not Release',
  },

  NOTE: {
    icon: 'gg:notes',
    color: '#103996',
    heading: 'Note',
  },

  // isIniRead
  READINI: {
    icon: 'circum:read',
    color: '#008000',
    heading: 'Read INI allowed',
  },
  NOTREADINI: {
    icon: 'circum:unread',
    color: '#FF0000',
    heading: 'Read INI not allowed',
  },

  // IS MANUFACTURE
  MANUFACTURE: {
    icon: 'ci:settings-future',
    color: '#008000',
    heading: 'Manufacture',
  },
  NOTMANUFACTURE: {
    icon: 'ci:settings-future',
    color: '#FF0000',
    heading: 'Not Manufacture',
  },
  //
  DEFAULT: {
    icon: 'carbon:settings-check',
    color: '#008000',
    heading: 'Default',
  },
  NOT_DEFAULT: {
    icon: 'carbon:settings-check',
    color: '#878787',
    heading: 'Not-Default',
  },
  // isOnline
  ONLINE: {
    icon: 'mdi:circle',
    color: '#008000',
    heading: 'Online',
  },
  OFFLINE: {
    icon: 'mdi:circle',
    color: '#bdbdbd',
    heading: 'Offline',
  },  
  EMAIL: {
    icon: 'mdi:email',
    color: '#103996',
  },

  // isAPPROVED
  APPROVED: {
    icon: 'mdi:check-decagram',
    color: '#008000',
    heading: 'Approved',
  },
  NOTAPPROVED: {
    icon: 'mdi:alert-decagram',
    color: '#FF0000',
    heading: 'Not Approved',
  },

  REQUIRED: {
    icon: 'mdi:required-circle',
    color: '#008000',
    heading: 'Required',
  },
  NOTREQUIRED: {
    icon: 'mdi:required-circle',
    color: '#FF0000',
    heading: 'Not Required',
  },

  // ------------------------------------------------------------
  // deleteDisabled

  DELETE_ENABLED: {
    icon: 'mdi:trash-can-outline',
    color: '#008000',
    heading: 'Archive Enabled',
  },

  DELETE_DISABLED: {
    icon: 'mdi:delete-off',
    color: '#FF0000',
    heading: 'Archive Disabled',
  },

  // ------------------------------------------------------------
  // isVerified
  VERIFIED: {
    icon: 'material-symbols:verified-user-outline-rounded',
    color: 'green',
    heading: 'Verified',
  },
  NOT_VERIFIED: {
    icon: 'material-symbols:verified-user-outline-rounded',
    color: 'red',
    heading: 'Not Verified',
  },
  SEARCHBTN: {
      color: 'green',
      heading: (btnName) => btnName
    },
  // ------------------------------------------------------------
  // isActive -Documents
  DOCUMENT_ACTIVE: {
    icon: 'basil:document-solid',
    color: 'green',
    heading: 'Active',
  },
  DOCUMENT_INACTIVE: {
    icon: 'basil:document-solid',
    color: 'red',
    heading: 'Inactive',
  },
  // ------------------------------------------------------------
  // MultiAuth
  MULTIAUTH_ACTIVE: {
    icon: 'tabler:2fa',
    color: '#008000',
    heading: 'MFA Enabled',
  },
  MULTIAUTH_INACTIVE: {
    icon: 'tabler:2fa',
    color: '#FF0000',
    heading: 'MFA Disabled',
  },

  // ------------------------------------------------------------
  // CURRENT EMPLOYEE
  CURR_EMP_ACTIVE: {
    icon: 'ph:identification-badge',
    color: '#008000',
    heading: 'Employee',
  },
  CURR_EMP_INACTIVE: {
    icon: 'ph:identification-badge',
    color: '#FF0000',
    heading: 'Not Employee',
  },

  // ------------------------------------------------------------
  // customerAccess
  ALLOWED: {
    icon: 'mingcute:user-follow-2-fill',
    color: '#008000',
    heading: 'Customer Allowed',
  },
  DISALLOWED: {
    icon: 'mingcute:user-x-line',
    color: '#878787',
    heading: 'Customer Not Allowed',
  }, 
  // ------------------------------------------------------------
  
  // FOR CUSTOMERS
  FORCUSTOMER: {
    icon: 'fa-solid:users',
    color: '#008000',
    heading: 'For Customers',
  },

  NOTFORCUSTOMER: {
    icon: 'fa-solid:users-slash',
    color: '#878787',
    heading: 'For SP Customers only',
  },

  FORMEREMPLOYEE: {
    icon: 'ri:user-location-fill',
    color: '#878787',
    heading: 'Former Employee',
  },

  NOTFORMEREMPLOYEE: {
    icon: 'ri:user-location-fill',
    color: '#008000',
    heading: 'Current Employee',
  },
  // ------------------------------------------------------------

  TRANSFERHISTORY: {
    icon: 'ic:outline-manage-history',
    color: '#008000',
    heading: 'Transfer History',
  },

  MACHINESETTINGHISTORY: {
    icon: 'ic:outline-manage-history',
    color: '#008000',
    heading: 'Machine Setting History',
  },

  // Machine Support 
  SUPPORT_VALLID: {
    icon: 'bx:support',
    color: '#008000',
    heading: 'Support Vallid!',
  },
  SUPPORT_WARNING: {
    icon: 'bx:support',
    color: '#ff9800',
    heading: 'Support Exiries Soon!',
  },
  SUPPORT_EXPIRED: {
    icon: 'bx:support',
    color: '#FF0000',
    heading: 'Support Expired!',
  },

  EXCLUDE_REPORTING: {
    icon: 'pepicons-pop:list-off',
    color: '#FF0000',
    heading: 'Exclude Reporting',
  },
  // ----------------------------------------------------------------
  ADD_NEW_VERSION: {
    icon: 'mdi:plus-circle',
    color: 'primary.main',
    heading: 'Add New Version',
    width: '16px',
  },
  UPDATE_VERSION: {
    icon: 'mdi:pencil',
    color: 'primary.main',
    heading: 'Update Version No',
    width: '16px',
  },
  // ------------------------------------------------------------
  VIEW_VERSIONS: {
    icon: 'mdi:archive-eye',
    color: 'primary.main',
    heading: 'View all Versions',
    width: '16px',
  },
  // ------------------------------------------------------------
  VIEW_PROFILE_SETS: {
    icon: 'mdi:application-cog-outline',
    color: 'primary.main',
    heading: 'View Profile Sets',
    width: '16px',
  },
  // ------------------------------------------------------------
  // Back Link
  BACK_LINK: {
    icon: 'vaadin:arrow-backward',
    color: 'blue',
    heading: 'Back',
  },

  // ------------------------------------------------------------
  // map icon
  MAP: {
    icon: 'mdi:google-maps',
    color: 'red',
    heading: 'Open Map',
  },
  // ------------------------------------------------------------

  // @root - Machine - settings
  // common settings
  MACHINE_GROUPS: {
    icon: 'uil:layer-group',
    heading: 'Machine Groups',
  },
  MACHINE_CATEGORIES: {
    icon: 'mdi:shape-plus',
    heading: 'Machine Categories',
  },
  MACHINE_MODELS: {
    icon: 'mdi:cube-outline',
    heading: 'Machine Models',
  },
  MACHINE_SUPPLIERS: {
    icon: 'mdi:circle-opacity',
    heading: 'Machine Suppliers',
  },
  MACHINE_STATUS: {
    icon: 'mdi:list-status',
    heading: 'Machine Status',
  },
  // technical settings
  TECHPARAM_CATEGORIES: {
    icon: 'mdi:table-cog',
    heading: 'Parameter Categories',
  },
  PARAMETERS: {
    icon: 'mdi:abacus',
    heading: 'Parameters',
  },
  // tools information
  TOOLS: {
    icon: 'mdi:tools',
    heading: 'Tools',
  },
  // configuration information
  Configuration: {
    icon: 'mdi:settings-outline',
    heading: 'Service Settings',
  },
  // service information
  MACHINE_SERVICE_CATEGORIES: {
    icon: 'mdi:cog',
    heading: 'Service Categories',
  },

  AUDIT_LOGS:{
    heading: 'Audit Logs',
    icon: "entypo:bar-graph",
  },
  
  // service information
  MACHINE_SERVICE_CATEGORY: {
    icon: 'mdi:cog',
    heading: 'Check Item Categories',
  },

  MACHINE_CHECK_ITEMS: {
    icon: 'carbon:parameter',
    heading: 'Check Items',
  },
  MACHINE_SERVICE_RECORD_CONFIG: {
    icon: 'mdi:tools',
    heading: 'Service Doc Configurations',
  },

  // @root - Settings - settings
  // document settings
  DOCUMENT_TYPE: {
    icon: 'lucide:list-todo',
    heading: 'Document Type',
  },
  DOCUMENT_CATEGORY: {
    icon: 'ic:round-category',
    heading: 'Document Category',
  },
  // security settings
  SECURITY_ROLES: {
    icon: 'eos-icons:role-binding',
    heading: 'User Roles',
  },
  SIGNIN_LOGS: {
    icon: 'icon-park-outline:log',
    heading: 'User Sign In Logs',
  },
  USER_CONFIG: {
    icon: 'mdi:account-settings-variant',
    heading: 'User Configurations',
  },
  USER_INVITE: {
    icon: 'ph:user-plus-bold',
    heading: 'User Invites',
  },
  BLOCKED_CUSTOMER: {
    icon: 'tabler:home-off',
    heading: 'Blocked Customers',
  },
  BLOCKED_USER: {
    icon: 'fluent:people-lock-20-regular',
    heading: 'Blocked Users',
  },
  BLACKLIST_IP: {
    icon: 'solar:list-cross-bold',
    heading: 'Blacklist IPs',
  },
  WHITELIST_IP: {
    icon: 'solar:list-check-bold',
    heading: 'Whitelist IPs',
  },
  REGION: {
    icon: 'grommet-icons:map',
    heading: 'Regions',
  },
  MODULE: {
    icon: 'ic:round-view-module',
    heading: 'Module',
  },
  SYSTEM_CONFIG: {
    icon: 'icon-park-outline:setting-config',
    heading: 'System Config',
  },  
  SYSTEM_EMAIL: {
    icon: 'eva:email-fill',
    heading: 'Emails',
  },
  DEPARTMENNTS: {
    icon: 'mingcute:department-line',
    heading: 'Departments',
  },  
  ARCHIVEDCUSTOMERS: {
    icon: 'fa6-solid:users-slash',
    heading: 'Archived Customers',
  }, 
  ARCHIVEDMACHINES: {
    icon: 'fluent:table-delete-column-16-filled',
    heading: 'Archived Machines',
  }, 
  PM2LOGS: {
    icon: 'simple-icons:pm2',
    heading: 'PM2 Logs',
  },  
  DBBACKUPLOGS: {
    icon: 'iconoir:database-backup',
    heading: 'DB Backup Logs',
  },

  MOVE_MACHINE: {
    icon: 'ri:swap-box-line',
    heading: 'Move',
  },

  USER_LOCK: {
    icon: 'mingcute:lock-fill',
    color: '#FF0000',
    heading: 'Lock User',
  },
  USER_UNLOCK: {
    icon: 'mingcute:unlock-fill',
    color: '#008000',
    heading: 'Unlock User',
  },
  // @root - GoogleMaps - map marker
  MAP_MARKER: {
    url: '/logo/howick_map-marker.svg',
  },
};

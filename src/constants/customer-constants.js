export const Snacks = {
  SAVE_FAILED: 'Update FAILED',
  SAVE_SUCCESS: 'Update SUCCESS',

  UPDATE_FAILED: 'Update FAILED',
  UPDATE_SUCCESS: 'Update SUCCESS',

  CREATED_FAILED: 'Created FAILED',
  CREATED_SUCCESS: 'Created SUCCESS',

  // @root - CustomerViewForm
  FAILED_DELETE: 'Customer Archive failed!',
  // failed verfify
  FAILED_VERIFY: 'Customer verify failed!',

  // @root - CustomerSiteDynamicList - toggkeChecked
  SITE_CLOSE_CONFIRM: 'Close the form before adding a new site',

  // @root - CustomerContactDynamicList - toggkeChecked
  CONTACT_CLOSE_CONFIRM: 'Close the form before adding a new contact',

  // @root - ContactAddForm - Schema
  EMAIL_WARN: 'The email name cannot include leading or trailing spaces',
  EMAIL_INVALID: 'Email must be a valid email address',
};

export const FORMLABELS = {
  CUSTOMER: {
    CODE: {
      label: 'Customer Code',
      name: 'code',
    },
    FIRST_NAME: {
      label: 'First Name*',
      name: 'name',
    },
    LAST_NAME: {
      label: 'Last Name',
      name: 'lastName',
    },
    TYPE: 'Type',
    PHONE: 'Phone',
    EMAIL: 'Email',
    WEBSITE: 'Website',
    AGNET: 'Agent',
  },

  // @root - ContactAddForm
  REPORTINGTO: {
    label: 'Report to',
    name: 'reportingTo',
  },
  DEPARTMENT:{
    label: 'Department',
    name: 'department',
  },
  FIRSTNAME: {
    label: 'First Name*',
    name: 'firstName',
  },
  LASTNAME: {
    label: 'Last Name',
    name: 'lastName',
  },
  TITLE: {
    label: 'Title',
    name: 'title',
  },
  FAX: {
    label: 'Fax',
    name: 'fax',
    flagSize: 'medium',
    defaultCountry: 'NZ',
  },
  PHONE: {
    label: 'Phone',
    name: 'phone',
    flagSize: 'medium',
    defaultCountry: 'NZ',
  },
  CONTACT_TYPES: {
    label: 'Contact Types',
    name: 'contactTypes',
    options: [
      { value: 'Financial', label: 'Financial' },
      { value: 'Sales', label: 'Sales' },
      { value: 'Technical Support', label: 'Technical Support' },
      { value: 'Machine Operator', label: 'Machine Operator' },
      { value: 'Design Team', label: 'Design Team' },
      { value: 'Executive (MD, CEO, GM)', label: 'Executive (MD, CEO, GM)' },
    ],
  },
  EMAIL: {
    label: 'Email',
    name: 'email',
  },
  WEBSITE: {
    label: 'Website',
    name: 'website',
  },

  // @root - ContactAddForm - Address
  STREET: {
    label: 'Street',
    name: 'street',
  },
  SUBURB: {
    label: 'Suburb',
    name: 'suburb',
  },
  CITY: {
    label: 'City',
    name: 'city',
  },
  REGION: {
    label: 'Region',
    name: 'region',
  },
  POSTCODE: {
    label: 'Post Code',
    name: 'postcode',
  },
  COUNTRY: {
    label: 'Country',
    name: 'country',
    id: 'country-select-demo',
    select: 'Select Country',
  },

  BILLING_CONTACT: {
    FIRSTNAME: {
      label: 'First Name',
      name: 'billingFirstName',
    },
    LASTNAME: {
      label: 'Last Name',
      name: 'billingLastName',
    },
    TITLE: {
      label: 'Title',
      name: 'billingTitle',
    },
    PHONE: {
      label: 'Contact Phone',
      name: 'billingContactPhone',
      flagSize: 'medium',
      defaultCountry: 'NZ',
    },
    EMAIL: {
      label: 'Contact Email',
      name: 'billingContactEmail',
    },
  },

  TECHNICAL_CONTACT: {
    FIRSTNAME: {
      label: 'First Name',
      name: 'technicalFirstName',
    },
    LASTNAME: {
      label: 'Last Name',
      name: 'technicalFirstName',
    },
    TITLE: {
      label: 'Title',
      name: 'technicalTitle',
    },
    PHONE: {
      label: 'Contact Phone',
      name: 'technicalContactPhone',
      flagSize: 'medium',
      defaultCountry: 'NZ',
    },
    EMAIL: {
      label: 'Contact Email',
      name: 'technicalContactEmail',
    },
  },
  isACTIVE: {
    label: 'Active',
    name: 'isActive',
  },
};

import * as Yup from 'yup';
import { isNumberLatitude , isNumberLongitude } from '../customers/sites/util/index'

export const AddCustomerSchema = Yup.object().shape({
  // Customer detail
  code: Yup.string().nullable().required('Code is required!').max(10, 'Maximum 10 characters!'),
  firstName: Yup.string().nullable().required('First Name is required!').min(2, 'Minimum 2 characters!').max(50, 'Mximum 50 characters!'),
  lastName: Yup.string().nullable().max(20, 'Mximum 20 characters!'),
  type: Yup.string().nullable().max(200),
  email: Yup.string().nullable().email(),
  phone: Yup.string().nullable().max(16),
  website: Yup.string().nullable().max(200),
  agent: Yup.object().label('Agent'),
  isActive: Yup.boolean(),
});

// @root - EditCustomerSchema
export const CustomerSchema = Yup.object().shape({
  code: Yup.string().nullable().required('Code is required!').max(10, 'Maximum 10 characters!'),
  firstName: Yup.string().nullable().required('First Name is required!').min(2, 'Minimum 2 characters!').max(50, 'Mximum 50 characters!'),
  lastName: Yup.string().nullable().max(20, 'Mximum 20 characters!'),
  type: Yup.string().label('Type').max(200),
  email: Yup.string().nullable().email(),
  phone: Yup.string().nullable().max(16),
  website: Yup.string().nullable().max(200),
  agent: Yup.object().label('Agent'),
  isActive: Yup.boolean(),
});


export const SiteSchema = Yup.object().shape({
  name: Yup.string().min(2).max(40).required().label('Name'),
  customer: Yup.string(),
  billingSite: Yup.string(),
  email: Yup.string().trim('The contact name cannot include leading and trailing spaces'),
  // phone: Yup.object().shape({
  //   countryCode: Yup.number().max(999999).label("Phone Country Code"),
  //   number: Yup.number().max(999999999999).label("Phone Number"),
  // }),
  // fax: Yup.object().shape({
  //   countryCode: Yup.number().max(999999).label("Fax Country Code"),
  //   number: Yup.number().max(999999999999).label("Fax Number"),
  // }),
  website: Yup.string(),
  lat: Yup.string().nullable()
  .max(25, 'Latitude must be less than or equal to 90.9999999999999999999999')
  .test('lat-validation', 'Invalid Latitude!, Latitude must be between -90 to 90 Degree only!', (value) =>{
    if(typeof value === 'string' && value.length > 0 && !(isNumberLatitude(value))){
      return false;
    }
    return true;
  }),
  long: Yup.string().nullable()
  .max(25, 'Longitude must be less than or equal to 180.999999999999999999999')
  .test('long-validation', 'Invalid Longitude!, Longitude must be between -180 to 180 Degree only!', (value) =>{
    if(typeof value === 'string' && value.length > 0 && !(isNumberLongitude(value))){
      return false;
    }
    return true;
  }),
  street: Yup.string(),
  suburb: Yup.string(),
  city: Yup.string(),
  region: Yup.string(),
  postcode: Yup.string(),
  country: Yup.object().nullable(),
  primaryBillingContact: Yup.object().nullable().label('Primary Billing Contact'),
  primaryTechnicalContact: Yup.object().nullable().label('Primary Technical Contact'),
  isActive: Yup.boolean(),
});

export const NoteSchema = Yup.object().shape({
  site: Yup.object().nullable(),
  contact: Yup.object().nullable(),
  note: Yup.string().max(5000).required('Note Field is required!'),
  isActive: Yup.boolean(),
});
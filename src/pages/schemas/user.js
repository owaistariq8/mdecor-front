import { status } from 'nprogress';
import * as Yup from 'yup';

export const addUserSchema = Yup.object().shape({
    firstName: Yup.string().required().max(200).label('First Name'),
    lastName: Yup.string().label('Last Name'),
    phone: Yup.string().label('Phone Number'),
    email: Yup.string().transform(value => value?.toLowerCase()).email().label('Email Address').trim().required().max(200),
    password: Yup.string().min(8, 'Password must be at least 8 characters').label('Password').trim(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .label('Confirm Password')
      .trim()
      .required('Password confirmation is required'),
    regions: Yup.object().label('Religion').nullable(),
    gender: Yup.object().label('Gender').nullable(),
    roles: Yup.array().label('Roles').nullable(),
    status: Yup.object(),
    isActive: Yup.boolean()
  });

  export const editUserSchema = Yup.object().shape({
    firstName: Yup.string().required().max(200).label('First Name'),
    lastName: Yup.string().label('Last Name'),
    phone: Yup.string().label('Phone Number'),
    email: Yup.string().transform(value => value?.toLowerCase()).email().label('Email Address').trim().required().max(200),
    religion: Yup.object().label('Religion').nullable(),
    gender: Yup.object().label('Gender').nullable(),
    roles: Yup.array().label('Roles').nullable(),
    status: Yup.object(),
    isActive: Yup.boolean()
  });
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
    regions: Yup.string().label('Religion').nullable(),
    gender: Yup.string().label('Gender').nullable(),
    roles: Yup.array().label('Roles').nullable(),
    isActive: Yup.boolean(),
  });

  export const editUserSchema = Yup.object().shape({
    firstName: Yup.string().required().max(200).label('First Name'),
    lastName: Yup.string().label('Last Name'),
    phone: Yup.string().label('Phone Number'),
    email: Yup.string().transform(value => value?.toLowerCase()).email().label('Email Address').trim().required().max(200),
    religion: Yup.string().label('Religion').nullable(),
    gender: Yup.string().label('Gender').nullable(),
    roles: Yup.array().label('Roles').nullable(),
    isActive: Yup.boolean(),
  });
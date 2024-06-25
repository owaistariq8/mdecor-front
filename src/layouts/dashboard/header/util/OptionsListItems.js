import { PATH_USER, PATH_CRM } from '../../../../routes/paths';

export const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_USER.users.profile,
  },
  // {
  //   label: 'Change Password',
  //   linkTo: PATH_USER.users.password,
  // },
  {
    label: 'Organization',
    linkTo: (id) => PATH_CRM.customers.view(id),
  },
];

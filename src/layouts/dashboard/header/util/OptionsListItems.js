import { PATH_SECURITY, PATH_CUSTOMERS } from '../../../../routes/paths';

export const OPTIONS = [
  {
    label: 'Home',
    linkTo: '/',
  },
  {
    label: 'Profile',
    linkTo: PATH_SECURITY.user.profile,
  },
  // {
  //   label: 'Change Password',
  //   linkTo: PATH_USER.users.password,
  // },
  {
    label: 'Organization',
    linkTo: (id) => PATH_CUSTOMERS.customers.view(id),
  },
];

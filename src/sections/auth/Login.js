// layouts
import LoginLayout from '../../layouts/login';
//
import AuthLoginForm from './AuthLoginForm';
// ----------------------------------------------------------------------

export default function Login(){
return (
  <LoginLayout title="Sub Title Here">
    <AuthLoginForm />
  </LoginLayout>
);
}

import { Helmet } from 'react-helmet';
import SignIn from 'components/system/auth/signIn';

const SignInPage = () => (
  <>
    <Helmet title="Sign In" />
    <SignIn />
  </>
);

export default SignInPage;

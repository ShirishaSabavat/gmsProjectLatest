import { Helmet } from 'react-helmet';
import Unauthorized from 'components/system/auth/unauthorized';

const UnauthorizedPage = () => (
  <>
    <Helmet title="Unauthorized" />
    <Unauthorized />
  </>
);

export default UnauthorizedPage;

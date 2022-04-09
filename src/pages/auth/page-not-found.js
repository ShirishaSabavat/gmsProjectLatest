import { Helmet } from 'react-helmet';
import PageNotFound from 'components/system/auth/pageNotFound';

const PageNotFoundPage = () => (
  <>
    <Helmet title="Page Not Found" />
    <PageNotFound />
  </>
);

export default PageNotFoundPage;

/* eslint-disable react/no-unstable-nested-components */
import { connect } from 'react-redux';
import { useLocation, Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// layout imports
import PublicLayout from './public';
import AuthLayout from './auth';
import MainLayout from './main';

const Layouts = {
  public: PublicLayout,
  auth: AuthLayout,
  main: MainLayout,
};

const Layout = ({
  isLoading,
  isUserAuthorized,
  children,
}) => {
  const { pathname } = useLocation();
  const getLayout = () => {
    if (pathname === '/') return 'public';
    if (/^\/auth(?=\/|$)/i.test(pathname)) return 'auth';
    return 'main';
  };

  const Container = Layouts[getLayout()];
  const isAuthLayout = getLayout() === 'auth';

  const SelectedLayout = () => {
    // show loader when user in check authorization process
    if (isLoading && !isUserAuthorized && !isAuthLayout) {
      return null;
    }
    const apiToken = localStorage.getItem('token');
    // redirect to login page if current is not login page and user not authorized
    if (!isAuthLayout && !isUserAuthorized && !apiToken) {
      return <Redirect to="/auth/sign-in" />;
    }
    // in other case render previously set layout
    return <Container path={pathname}>{children}</Container>;
  };

  return (
    <>
      <Helmet titleTemplate="Template | %s" />
      {SelectedLayout()}
    </>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  isLoading: userReducer.loading,
  isUserAuthorized: userReducer.authorized,
});

export default connect(mapStateToProps, null)(Layout);

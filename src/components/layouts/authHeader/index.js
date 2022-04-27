import { useHistory, useLocation } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex">
        <img
          src="/assets/images/logo/Web-Logo.png"
          alt="app-logo"
          className="h-8"
        />
      </div>
      {/* {pathname === '/auth/sign-in' && (
        <span>
          <span>Don&apos;t have a account, </span>
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => history.push('/auth/sign-up')}
          >
            Create one.
          </span>
        </span>
      )} */}
      {pathname === '/auth/sign-up' && (
        <span>
          <span>Already have a account, </span>
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => history.push('/auth/sign-in')}
          >
            Sign in.
          </span>
        </span>
      )}
    </>
  );
};

export default Header;

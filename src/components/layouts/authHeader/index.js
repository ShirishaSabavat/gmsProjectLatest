import { useHistory, useLocation } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  return (
    <>
      <div className="flex">
        <img
          src="/assets/images/logo/app-logo.svg"
          alt="app-logo"
          width="30"
        />
        <span className="mx-3 font-mulish-semi-bold">
          App Name
        </span>
      </div>
      {pathname === "/auth/sign-in" && (
        <span>
          <span>Don&apos;t have a account, </span>
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => history.push("/auth/sign-up")}
          >
            Create one.
          </span>
        </span>
      )}
      {pathname === "/auth/sign-up" && (
        <span>
          <span>Already have a account, </span>
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={() => history.push("/auth/sign-in")}
          >
            Sign in.
          </span>
        </span>
      )}
    </>
  );
};

export default Header;

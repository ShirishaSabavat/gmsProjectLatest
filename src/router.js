import { lazy, Suspense } from "react";
import { ConnectedRouter } from "connected-react-router";
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import AuthLayout from "./layout";

const routes = [
  // AUTH RELATED ROUTES
  {
    path: "/auth/sign-in",
    key: "SIGN-IN",
    exact: true,
    Component: lazy(() => import("pages/auth/sign-in")),
  },
  {
    path: "/auth/sign-up",
    key: "SIGN-UP",
    exact: true,
    Component: lazy(() => import("pages/auth/sign-up")),
  },
  {
    path: "/auth/page-not-found",
    key: "PAGE-NOT-FOUND",
    exact: true,
    Component: lazy(() => import("pages/auth/page-not-found")),
  },
  {
    path: "/auth/unauthorized",
    key: "UNAUTHORIZED",
    exact: true,
    Component: lazy(() => import("pages/auth/unauthorized")),
  },

  // APP RELATED ROUTES
  {
    path: "/home/dashboard",
    key: "HOME",
    exact: true,
    Component: lazy(() => import("pages/home/dashboard")),
  },
  {
    path: "/cities/citieslist",
    key: "PARTNER",
    exact: true,
    Component: lazy(() => import("pages/cities/citieslist")),
  },
  {
    path: "/cities/addcity",
    key: "Add City",
    exact: true,
    Component: lazy(() => import("pages/cities/addcity")),
  },
  {
    path: "/garage/garagelist",
    key: "GARAGE",
    exact: true,
    Component: lazy(() => import("pages/garage/garagelist")),
  },
  {
    path: "/garage/addgarage",
    key: "GARAGE",
    exact: true,
    Component: lazy(() => import("pages/garage/addgarage")),
  },
  {
    path: "/userroles/userroleslist",
    key: "USER ROLE",
    exact: true,
    Component: lazy(() => import("pages/userroles/userroleslist")),
  },
  {
    path: "/userroles/addrole",
    key: "GARAGE",
    exact: true,
    Component: lazy(() => import("pages/userroles/addrole")),
  },
  {
    path: "/userProfiles/userProfiles",
    key: "USER PROFILES",
    exact: true,
    Component: lazy(() => import("pages/userProfiles/userProfiles")),
  },
  {
    path: "/modules/modules",
    key: "MODULES",
    exact: true,
    Component: lazy(() => import("pages/modules/modules")),
  },
  {
    path: "/processes/processes",
    key: "PROCESSES",
    exact: true,
    Component: lazy(() => import("pages/processes/processes")),
  },
];

const Router = ({ history }) => (
  <ConnectedRouter history={history}>
    <AuthLayout>
      <Route render={({ location }) => (
        <SwitchTransition>
          <CSSTransition
            key={location.pathname}
            appear
            timeout={300}
            classNames="fade-in"
          >
            <Switch location={location}>
              <Route exact path="/" render={() => <Redirect to="/home/dashboard" />} />
              {routes.map(({
                path,
                Component,
                exact,
                key,
              }) => (
                <Route
                  path={path}
                  key={key}
                  exact={exact}
                  render={() => (
                    <Suspense fallback={null}>
                      <Component />
                    </Suspense>
                  )}
                />
              ))}
              <Redirect to="/auth/page-not-found" />
            </Switch>
          </CSSTransition>
        </SwitchTransition>
      )}
      />
    </AuthLayout>
  </ConnectedRouter>
);

export default Router;
Router.displayName = "Router Page";

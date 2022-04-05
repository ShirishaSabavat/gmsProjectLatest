import { lazy, Suspense } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import {
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import AuthLayout from './layout';

const routes = [
  // AUTH RELATED ROUTES
  {
    path: '/auth/sign-in',
    key: 'SIGN-IN',
    exact: true,
    Component: lazy(() => import('pages/auth/sign-in')),
  },
  {
    path: '/auth/sign-up',
    key: 'SIGN-UP',
    exact: true,
    Component: lazy(() => import('pages/auth/sign-up')),
  },
  {
    path: '/auth/page-not-found',
    key: 'PAGE-NOT-FOUND',
    exact: true,
    Component: lazy(() => import('pages/auth/page-not-found')),
  },
  {
    path: '/auth/unauthorized',
    key: 'UNAUTHORIZED',
    exact: true,
    Component: lazy(() => import('pages/auth/unauthorized')),
  },

  // APP RELATED ROUTES
  {
    path: '/home/dashboard',
    key: 'HOME',
    exact: true,
    Component: lazy(() => import('pages/home/dashboard')),
  },
  {
    path: '/partner/partner',
    key: 'PARTNER',
    exact: true,
    Component: lazy(() => import('pages/partner/partner')),
  },
  {
    path: '/userProfiles/userProfiles',
    key: 'USER PROFILES',
    exact: true,
    Component: lazy(() => import('pages/userProfiles/userProfiles')),
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
Router.displayName = 'Router Page';

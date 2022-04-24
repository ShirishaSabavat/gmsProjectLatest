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
    path: '/gatekeeper/homepage',
    key: 'GATEKEEPER HOME',
    exact: true,
    Component: lazy(() => import('pages/gatekeeper/homepage')),
  },
  {
    path: '/gatekeeper/carslist',
    key: 'GATEKEEPER CARLIST',
    exact: true,
    Component: lazy(() => import('pages/gatekeeper/carslist')),
  },
  {
    path: '/gatekeeper/carformpage',
    key: 'GATEKEEPER CARFORM',
    exact: true,
    Component: lazy(() => import('pages/gatekeeper/carformpage')),
  },
  {
    path: '/rta/carlistrta',
    key: 'RTA CARLIST',
    exact: true,
    Component: lazy(() => import('pages/rta/carlistrta')),
  },
  {
    path: '/rta/leasingjama',
    key: 'RTA LEASINGJAMA',
    exact: true,
    Component: lazy(() => import('pages/rta/leasingjama')),
  },
  {
    path: '/rta/transferjama',
    key: 'RTA TRANSFERJAMA',
    exact: true,
    Component: lazy(() => import('pages/rta/transferjama')),
  },
  {
    path: '/cities/citieslist',
    key: 'PARTNER',
    exact: true,
    Component: lazy(() => import('pages/cities/citieslist')),
  },
  {
    path: '/cities/addcity',
    key: 'Add City',
    exact: true,
    Component: lazy(() => import('pages/cities/addcity')),
  },
  {
    path: '/garage/garagelist',
    key: 'GARAGE',
    exact: true,
    Component: lazy(() => import('pages/garage/garagelist')),
  },
  {
    path: '/garage/addgarage',
    key: 'GARAGE',
    exact: true,
    Component: lazy(() => import('pages/garage/addgarage')),
  },
  {
    path: '/garage/addteam',
    key: 'TEAMS',
    exact: true,
    Component: lazy(() => import('pages/garage/addteam')),
  },
  {
    path: '/garage/teamslist',
    key: 'TEAMS',
    exact: true,
    Component: lazy(() => import('pages/garage/teamslist')),
  },
  {
    path: '/garage/locationlist',
    key: 'LOCATIONS',
    exact: true,
    Component: lazy(() => import('pages/garage/locationlist')),
  },
  {
    path: '/userroles/userroleslist',
    key: 'USER ROLE',
    exact: true,
    Component: lazy(() => import('pages/userroles/userroleslist')),
  },
  {
    path: '/userroles/addrole',
    key: 'Add User Role',
    exact: true,
    Component: lazy(() => import('pages/userroles/addrole')),
  },
  {
    path: '/userProfiles/userProfiles',
    key: 'USER PROFILES',
    exact: true,
    Component: lazy(() => import('pages/userProfiles/userProfiles')),
  },
  {
    path: '/userProfiles/addUserProfile',
    key: 'USER PROFILES',
    exact: true,
    Component: lazy(() => import('pages/userProfiles/addUserProfile')),
  },
  {
    path: '/modules/modules',
    key: 'MODULES',
    exact: true,
    Component: lazy(() => import('pages/modules/modules')),
  },
  {
    path: '/modules/addModule',
    key: 'Add Module',
    exact: true,
    Component: lazy(() => import('pages/modules/addModule')),
  },
  {
    path: '/processes/processes',
    key: 'PROCESSES',
    exact: true,
    Component: lazy(() => import('pages/processes/processes')),
  },
  {
    path: '/processes/addProcess',
    key: 'Add Process',
    exact: true,
    Component: lazy(() => import('pages/processes/addProcess')),
  },
  {
    path: '/pickuplocations/pickupLocations',
    key: 'Pickup Locations',
    exact: true,
    Component: lazy(() => import('pages/pickupLocations/pickupLocations')),
  },
  {
    path: '/garage/addPickupLocation',
    key: 'Add Pickup Locations',
    exact: true,
    Component: lazy(() => import('pages/garage/addPickupLocation')),
  },
  {
    path: '/roadTrial/roadTrial',
    key: 'Road Trial',
    exact: true,
    Component: lazy(() => import('pages/roadTrial/roadTrial')),
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

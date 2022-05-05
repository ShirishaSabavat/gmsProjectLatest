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
    path: '/gatekeeper/carformpage/:id?',
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
    path: '/sixtyfortyjama/jamacarlist',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/jamacarlist')),
  },
  {
    path: '/sixtyfortyjama/sixtyfortyjamadetails',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/sixtyfortyjamadetails')),
  },
  {
    path: '/sixtyfortyjama/BatteryAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/BatteryAudit')),
  },
  {
    path: '/sixtyfortyjama/TyreAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/TyreAudit')),
  },
  {
    path: '/sixtyfortyjama/CarInfoAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/CarInfoAudit')),
  },
  {
    path: '/sixtyfortyjama/AcceptForSixtyFortyJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/AcceptForSixtyFortyJama')),
  },
  {
    path: '/sixtyfortyjama/RejectSixtyFortyJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/sixtyfortyjama/RejectSixtyFortyJama')),
  },
  {
    path: '/LeasingJama/leasingJamaCarlist',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/leasingJamaCarlist')),
  },
  {
    path: '/LeasingJama/LeasingJamaDetails',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/LeasingJamaDetails')),
  },
  {
    path: '/LeasingJama/LeasingBatteryAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/LeasingBatteryAudit')),
  },
  {
    path: '/LeasingJama/LeasingTyreAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/LeasingTyreAudit')),
  },
  {
    path: '/LeasingJama/LeasingCarInfo',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/LeasingCarInfo')),
  },
  {
    path: '/LeasingJama/AcceptLeasingJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/AcceptLeasingJama')),
  },
  {
    path: '/LeasingJama/RejectLeasingJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingJama/RejectLeasingJama')),
  },
  {
    path: '/cities/citieslist',
    key: 'PARTNER',
    exact: true,
    Component: lazy(() => import('pages/cities/citieslist')),
  },
  {
    path: '/cities/addcity/:id?',
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
    path: '/garage/addgarage/:id?',
    key: 'GARAGE',
    exact: true,
    Component: lazy(() => import('pages/garage/addgarage')),
  },
  {
    path: '/garage/addteam/:teamId?/:garageId?/:locationId?/:garageName?/:team_name?/:team_description?/:isActive?',
    key: 'TEAMS',
    exact: true,
    Component: lazy(() => import('pages/garage/addteam')),
  },
  {
    path: '/garage/teamslist/:garageId?/:name?',
    key: 'TEAMS',
    exact: true,
    Component: lazy(() => import('pages/garage/teamslist')),
  },
  {
    path: '/garage/locationlist/:garageId?',
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
    path: '/userroles/addrole/:id?',
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
    path: '/userProfiles/addUserProfile/:id?',
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
    path: '/modules/addModule/:id?',
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
    path: '/processes/addProcess/:id?',
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
    path: '/garage/addPickupLocation/:locationId?/:garageId?',
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
  {
    path: '/breakdown/breakdownHome',
    key: 'Breakdown Home',
    exact: true,
    Component: lazy(() => import('pages/breakdown/breakdownHome')),
  },
  {
    path: '/breakdown/breakdownForm/:id?',
    key: 'Breakdown Add',
    exact: true,
    Component: lazy(() => import('pages/breakdown/breakdownForm')),
  },
  {
    path: '/insurance/insuranceHome',
    key: 'Insurance Home',
    exact: true,
    Component: lazy(() => import('pages/insurance/insuranceHome')),
  },
  {
    path: '/insurance/insuranceForm/:id?',
    key: 'Insurance Add',
    exact: true,
    Component: lazy(() => import('pages/insurance/insuranceForm')),
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

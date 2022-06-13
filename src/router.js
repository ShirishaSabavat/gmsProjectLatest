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
    path: '/rta/leasingjama/:id?',
    key: 'RTA LEASINGJAMA',
    exact: true,
    Component: lazy(() => import('pages/rta/leasingjama')),
  },
  {
    path: '/rta/transferjama/:id?',
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
    path: '/LeasingAudit/leasingJamaCarlist',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/leasingJamaCarlist')),
  },
  {
    path: '/LeasingAudit/LeasingJamaDetails',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/LeasingJamaDetails')),
  },
  {
    path: '/LeasingAudit/LeasingBatteryAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/LeasingBatteryAudit')),
  },
  {
    path: '/LeasingAudit/LeasingTyreAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/LeasingTyreAudit')),
  },
  {
    path: '/LeasingAudit/LeasingCarInfo',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/LeasingCarInfo')),
  },
  {
    path: '/LeasingAudit/AcceptLeasingJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/AcceptLeasingJama')),
  },
  {
    path: '/LeasingAudit/RejectLeasingJama',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/RejectLeasingJama')),
  },
  {
    path: '/RegularAudit/RegularAuditCarList',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RegularAudit/RegularAuditCarList')),
  },
  {
    path: '/RegularAudit/RegularAuditCarInfo',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RegularAudit/RegularAuditCarInfo')),
  },
  {
    path: '/RepairAudit/RepairAuditCarList',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairAuditCarList')),
  },
  {
    path: '/RepairAudit/RepairAuditCarDetails',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairAuditCarDetails')),
  },
  {
    path: '/RepairAudit/RepairBatteryAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairBatteryAudit')),
  },
  {
    path: '/RepairAudit/RepairTyreAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairTyreAudit')),
  },
  {
    path: '/RepairAudit/RepairCarInfo',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairCarInfo')),
  },
  {
    path: '/RepairAudit/RepairSubmit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/RepairAudit/RepairSubmit')),
  },
  {
    path: '/ServiceAudit/ServiceAuditCarList',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceAuditCarList')),
  },
  {
    path: '/ServiceAudit/ServiceAuditCarDetails',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceAuditCarDetails')),
  },
  {
    path: '/ServiceAudit/ServiceBatteryAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceBatteryAudit')),
  },
  {
    path: '/ServiceAudit/ServiceTyreAudit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceTyreAudit')),
  },
  {
    path: '/ServiceAudit/ServiceCarInfo',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceCarInfo')),
  },
  {
    path: '/ServiceAudit/ServiceSubmit',
    key: 'SIXTY FORTY JAMA',
    exact: true,
    Component: lazy(() => import('pages/ServiceAudit/ServiceSubmit')),
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
    path: '/breakdown/breakdownList',
    key: 'Breakdown List',
    exact: true,
    Component: lazy(() => import('pages/breakdown/breakdownList')),
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
  {
    path: '/LeasingAudit/LeasingJamaCarReturn',
    key: 'Car Return Reason',
    exact: true,
    Component: lazy(() => import('pages/LeasingAudit/LeasingCarReturn')),
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
    path: '/completion/CarsQueue/:id?',
    key: 'Cars Queue',
    exact: true,
    Component: lazy(() => import('pages/completion/carsQueue')),
  },
  {
    path: '/completion/CarsQueueDetails',
    key: 'Cars Queue Details',
    exact: true,
    Component: lazy(() => import('pages/completion/carsCompletion')),
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

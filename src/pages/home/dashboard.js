import { Helmet } from 'react-helmet';
import Dashboard from 'components/app/home/dashboard';

const DashboardPage = () => (
  <>
    <Helmet title="Dashboard" />
    <div className="flex flex-col space-y-12">
      <div className="space-y-2">
        <span className="font-montserrat-medium text-4xl">
          Dashboard
        </span>
      </div>
      <Dashboard />
    </div>
  </>
);

export default DashboardPage;

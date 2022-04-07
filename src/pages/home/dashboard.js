import { Helmet } from "react-helmet";
import Breadcrumb from "components/layouts/breadcrumb";
import Dashboard from "components/app/home/dashboard";

const nestedPath = [
  "Home",
  "Dashboard",
];

const DashboardPage = () => (
  <>
    <Helmet title="Dashboard" />
    <div className="flex flex-col space-y-12">
      <div className="space-y-2">
        <span className="font-montserrat-medium text-4xl">
          Dashboard
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <Dashboard />
    </div>
  </>
);

export default DashboardPage;

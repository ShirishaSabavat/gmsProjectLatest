import { Helmet } from 'react-helmet';
// import Breadcrumb from 'components/layouts/breadcrumb';
import RoadTrial from 'components/app/roadTrial';

// const nestedPath = [
//   'Home',
//   'RoadTrial',
// ];

const RoadTrialPage = () => (
  <>
    <Helmet title="RoadTrial" />
    <div className="flex flex-col space-y-12">
      <RoadTrial />
    </div>
  </>
);

export default RoadTrialPage;

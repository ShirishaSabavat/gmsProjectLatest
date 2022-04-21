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
      {/* <div className="space-y-2">
        <span className="font-quicksand-semi-bold text-4xl">
          RoadTrial
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div> */}
      <RoadTrial />
    </div>
  </>
);

export default RoadTrialPage;

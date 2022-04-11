import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
// import { useState } from "react";
// import Processes from "components/app/processes/index";
// import CreateProcess from "components/app/processes/createProcess";
// import { Button } from "antd";
import { Link } from 'react-router-dom';
import Pickuplocations from 'components/app/pickupLocations';

const nestedPath = [
  'Home',
  'Pickup Locations',
];

const ProcessesPage = () => (
  // const [onClickValue, setOnClickValue] = useState(false);

  // const createModule = () => {
  //   // setOnClickValue(true);
  // };

  <>
    <Helmet title="Pickup Locations" />
    <div style={{ fontFamily: 'Quicksand' }} className="row space-y-4">
      <div className="col-12">
        <div className="row pl-8">
          <div className="col-6">
            <span className="font-quicksand-semi-bold text-2xl font-semi-bold text-[#3D3D3D]">
              Pickup Locations
            </span>
            <Breadcrumb nestedPath={nestedPath} />
          </div>
          <div className="col-6 flex flex-row justify-end">
            <Link
              to={{ pathname: 'addPickupLocation', state: { id: -1 } }}
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none',
              }}
            >
              Pickup Locations +
            </Link>
          </div>
        </div>
      </div>
      <div className="col-12">
        <Pickuplocations />
      </div>
    </div>
  </>
);
export default ProcessesPage;

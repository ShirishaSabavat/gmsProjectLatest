import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Link } from 'react-router-dom';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Pickuplocations from 'components/app/pickupLocations';

const nestedPath = [
  'Home',
  'Locations',
];

function ProcessesPage() {
  const [moduleslist, setModulesList] = useState([]);

  retrun(
    <>
      <Helmet title="Locations" />
      <div style={{ fontFamily: 'Quicksand' }} className="absolute right-20 mt-3.5">
        <Link
          to={{ pathname: 'addPickupLocation', state: { locationId: -1 } }}
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none',
          }}
        >
          Add Location +
        </Link>
      </div>
      <div>
        <div className="flex flex-col space-y-12">
          <div className="space-y-2 basic-1/2 mx-5">
            <span className="font-quicksand-medium text-4xl mr-3.5">
              Locations
            </span>
            <Breadcrumb nestedPath={nestedPath} />
            <HorizontalSearchHeader Title="" />
          </div>
        </div>

        <div className="box-border h-100">
          <div className="flex flex-row flex-nowrap mx-5">
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white p-4 mr-1">Pickup</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white p-4 mr-1">Created on</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/4 bg-white p-4 mr-1">Status</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/5 bg-white p-4 mr-1">Action</h1>
          </div>
        </div>

        <div>
          {moduleslist.map((item) => (
            <Listitemmodule
              module_id={item.id}
              module_name={item.module}
              created_on={item.createdAt.substring(0, 10)}
              status={String(item.isActive)}
            />
          ))}
        </div>
      </div>
    </>,
  );
}
export default ProcessesPage;

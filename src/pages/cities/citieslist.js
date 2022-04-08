/* eslint-disable max-len */
import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemcomman from 'components/layouts/Listitemcomman';
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Cities',
];

const CityDetails = [
  {
    city_id: '1',
    city_name: 'Mumbai',
    city_manager: 'John Doe',
    garage_quantity: '2054',
    status: 'Active',
  },
  {
    city_id: '2',
    city_name: 'Kanpur',
    city_manager: 'Willaim',
    garage_quantity: '1054',
    status: 'Active',
  },
  {
    city_id: '2',
    city_name: 'Hyderabad',
    city_manager: 'Mushtaq Ahmed',
    garage_quantity: '260',
    status: 'Active',
  },
];

function CityList() {
  const citylist = CityDetails.map((item) => <Listitemcomman city_name={item.city_name} city_manager={item.city_manager} garage_quantity={item.garage_quantity} status={item.status} />);
  return <div>{citylist}</div>;
}

const citieslist = () => (
  <>
    <Helmet title="Cities" />
    <div style={{ fontFamily: 'Quicksand' }} className="absolute right-20 mt-3.5">
      <Link
        to={{ pathname: 'addcity', state: { id: -1 } }}
        style={{
          borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none',
        }}
      >
        Add new City +
      </Link>
    </div>
    <div>
      <div className="flex flex-col space-y-12">
        <div className="space-y-2">
          <span className="font-montserrat-medium text-4xl">
            Cities
          </span>
          <Breadcrumb nestedPath={nestedPath} />
          <HorizontalSearchHeader Title="All Cities" />

        </div>

      </div>
      <div className="box-border h-100">
        <div className="flex flex-row flex-nowrap">
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">City</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">City Manager</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Quantity</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Status</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Action</h1>
        </div>

      </div>
      <CityList />
    </div>

  </>
);

export default citieslist;

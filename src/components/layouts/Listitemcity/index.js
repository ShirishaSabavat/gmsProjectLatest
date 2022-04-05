/* eslint-disable camelcase */
import React from 'react';

const Listitemcity = ({
  city_name, city_manager, garage_quantity, status,
}) => (
  <div className="box-border h-100">
    <div className="flex flex-row flex-nowrap">
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">{city_name}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">{city_manager}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">{garage_quantity}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">{status}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">{'  '}</h1>
    </div>

  </div>
);

export default Listitemcity;

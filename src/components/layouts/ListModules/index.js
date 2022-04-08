/* eslint-disable max-len */
/* eslint-disable camelcase */
import React from 'react';
import { Checkbox } from 'antd';

const ListitemModules = ({
  Module_Name, Module_ID,
}) => (
  <div className="box-border h-100">
    <div className="flex flex-row flex-nowrap">
      <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/7 bg-white p-4 mr-0.5"><Checkbox value={Module_ID}>{Module_Name}</Checkbox></h1>
      {/* <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{Process1}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{Process2}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{Process3}</h1> */}
    </div>

  </div>
);

export default ListitemModules;

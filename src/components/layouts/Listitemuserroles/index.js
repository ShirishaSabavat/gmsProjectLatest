/* eslint-disable camelcase */
import React from 'react';

const Listitemuserrole = ({
  role_title, assigned_to, total_modules, created_on, status,
}) => (
  <div className="box-border h-100">
    <div className="flex flex-row flex-nowrap">
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{role_title}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{assigned_to}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{total_modules}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">{created_on}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/7 bg-white p-4 mr-0.5">{status}</h1>
      <h1 className="text-base font-mulish-semi-bold font-medium basis-1/7 bg-white p-4 mr-0.5">{'  '}</h1>
    </div>

  </div>
);

export default Listitemuserrole;

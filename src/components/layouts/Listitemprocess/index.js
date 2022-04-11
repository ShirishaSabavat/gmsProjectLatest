/* eslint-disable camelcase */
import React from 'react';
import { Link } from 'react-router-dom';

const editIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>
);

const editIconFilled = (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path fill="#74d1d8" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fill="#74d1d8" fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>
);

const Listitemprocess = ({
  process_id, process_name, module_name, created_on, status,
}) => (
  <div className="box-border mt-px">
    <div className="flex flex-row flex-nowrap mx-5">
      <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white h-16 p-4 mr-1">{process_name}</h1>
      <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white h-16 p-4 mr-1">{module_name}</h1>
      <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white h-16 p-4 mr-1">{created_on}</h1>
      <h1 className={status === 'true' ? 'text-[#74D1D8] text-base font-quicksand-semi-bold font-medium basis-1/4 bg-white h-16 p-4 mr-0.5 mr-1' : 'text-base font-quicksand-semi-bold font-medium basis-1/4 h-16 bg-white p-4 mr-0.5 mr-1'}>{status === 'true' ? 'Active' : 'Inactive'}</h1>
      <Link to={{ pathname: 'addcity', state: { id: process_id } }} className="basis-1/5 bg-white p-4 mr-1 pt-4 h-16">
        {status === 'true' ? editIconFilled : editIcon}
      </Link>
    </div>

  </div>
);

export default Listitemprocess;

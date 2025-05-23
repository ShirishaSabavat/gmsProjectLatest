/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable camelcase */
import React from 'react';
import { Tooltip } from 'antd';
import { useHistory } from 'react-router-dom';

const editIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>
);

const editIconFilled = (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
    <path fill="#74d1d8" d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
    <path fill="#74d1d8" fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
  </svg>
);

// const gototeams = (
//   <svg width="22" height="22" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
//     <path fill="#74d1d8" d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
//   </svg>
// );

const locationIcon = (
  <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
    <path fill="#74d1d8" d="M10 20S3 10.87 3 7a7 7 0 1 1 14 0c0 3.87-7 13-7 13zm0-11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
  </svg>
);

const Listitemgarage = ({
  garage_id, garage_name, garage_members, status,
}) => {
  const history = useHistory();
  return (
    <div className="box-border mt-px">
      <div className="flex flex-row flex-nowrap mx-5">
        <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/3 bg-white h-16 p-4 mr-1">
          {garage_name.length > 15 ? garage_name.substring(0, 15) : garage_name}
          {garage_name.length > 15 ? '...' : ''}
        </h1>
        {/* <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/3 bg-white h-16 p-4 mr-1">
          {garage_members?.length > 15 ? garage_members?.substring(0, 13) : garage_members}
          {garage_members?.length > 13 ? '...' : ''}
        </h1> */}
        <h1 className={status === 'true' ? 'text-[#74D1D8] text-base font-quicksand-semi-bold font-medium basis-1/3 bg-white h-16 p-4 mr-0.5 mr-1' : 'text-base font-quicksand-semi-bold font-medium basis-1/4 h-16 bg-white p-4 mr-0.5 mr-1'}>{status === 'true' ? 'Active' : 'Inactive'}</h1>
        <div className="flex flex-row basis-1/3 bg-white p-4 mr-1 pt-4 h-16">
          <div onClick={() => history.push(`/garage/addgarage/${garage_id}`)}>
            <Tooltip placement="top" title="Edit">
              {status === 'true' ? editIconFilled : editIcon}
            </Tooltip>
          </div>
          {/* <div onClick={() => history.push(`/garage/teamslist/${garage_id}/${garage_name}`)} className="ml-8">
            <Tooltip placement="top" title="Teams">
              {gototeams}
            </Tooltip>
          </div> */}
          <div onClick={() => history.push(`/garage/locationlist/${garage_id}`)} className="ml-8">
            <Tooltip placement="top" title="Locations">
              {locationIcon}
            </Tooltip>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Listitemgarage;

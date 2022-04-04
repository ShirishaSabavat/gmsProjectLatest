import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input } from 'antd';
import Listitemuserroles from 'components/layouts/Listitemuserroles';
import { Pagination } from 'react-headless-pagination';
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'User Roles',
];

const RoleDetails = [
  {
    role_id: '1',
    role_title: 'Mumbai',
    assigned_to: 'John Doe',
    total_modules: '2054',
    created_on: '2022-03-12',
    status: 'Active',
  },
  {
    role_id: '1',
    role_title: 'Mumbai',
    assigned_to: 'John Doe',
    total_modules: '2054',
    created_on: '2022-03-12',
    status: 'Active',
  },
  {
    role_id: '1',
    role_title: 'Mumbai',
    assigned_to: 'John Doe',
    total_modules: '2054',
    created_on: '2022-03-12',
    status: 'Active',
  },
];

function UserRoleList() {
  const userolelist = RoleDetails.map((item) => (
    <Listitemuserroles
      role_title={item.role_title}
      assigned_to={item.assigned_to}
      total_modules={item.total_modules}
      created_on={item.created_on}
      status={item.status}
    />
  ));
  return <div>{userolelist}</div>;
}

const userroleslist = () => (

  <>
    <Helmet title="User Roles" />
    <div className="absolute right-20 mt-3.5">
      <Link to="addrole" className="font-montserrat-medium text-xl text-white bg-cyan-900 p-3">
        Add New Role +
      </Link>
    </div>
    <div>
      <div className="flex flex-col space-y-12">
        <div className="space-y-2 basic-1/2">
          <span className="font-montserrat-medium text-4xl mr-3.5">
            User Roles
          </span>
          <Breadcrumb nestedPath={nestedPath} />
          <div className="basis-1/2">{'  '}</div>
          <div className="basis-1/3 flex flex-row flex-nonwrap bg-white mt-5">
            <Input
              size="medium"
              placeholder="Search for anything..."
              prefix={(
                <img
                  className="mr-3"
                  src="/assets/images/general/loupe.svg"
                  alt="search"
                  width="10"
                />
              )}
              style={{
                padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '30%',
              }}

            />

          </div>

        </div>

      </div>
      <div className="box-border h-100">
        <div className="flex flex-row flex-nowrap">
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">Role Title</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">Assigned To</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">Total Modules</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/5 bg-white p-4 mr-0.5">Created On</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/7 bg-white p-4 mr-0.5">Status</h1>
          <h1 className="text-base font-mulish-semi-bold font-medium basis-1/7 bg-white p-4 mr-0.5">Action</h1>
        </div>

      </div>
      <UserRoleList />
      <Pagination
        currentPage={0}
        totalPages={10}
        edgePageCount={2}
        middlePagesSiblingCount={2}
        className=""
        truncableText="..."
        truncableClassName="mt-5 mx-5"
      >
        <div className="flex items-center justify-center flex-grow mt-5">
          <Pagination.PrevButton className="mt-5 bg-white mx-5 rounded">{'<'}</Pagination.PrevButton>
          <Pagination.PageButton
            activeClassName="bg-teal-400 text-white"
            inactiveClassName="bg-white"
            className="p-3 mx-4 mt-5 rounded"
          />
          <Pagination.NextButton className="mt-5 bg-white mx-5 rounded">{'>'}</Pagination.NextButton>
        </div>
      </Pagination>
      {/* <Items currentItems={currentItems} /> */}
    </div>
  </>
);

export default userroleslist;

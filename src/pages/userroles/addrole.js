import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import ListitemModules from 'components/layouts/ListModules';

const nestedPath = [
  'Home',
  'User Roles',
  'Create New Role',
];

const ModuleDetails = [
  {
    Module_ID: '1',
    Module_Name: 'Module 1',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 2',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 3',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 4',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
];

function ModuleList() {
  const modulelist = ModuleDetails.map((item) => (
    <ListitemModules
      Module_Name={item.Module_Name}
      Process1={item.Process1}
      Process2={item.Process2}
      Process3={item.Process3}
    />
  ));
  return <div>{modulelist}</div>;
}

const addrole = () => (
  <>
    <Helmet title="Cities" />
    <div className="flex flex-col space-y-12">
      <div className="space-y-2 basic-1/2">
        <span className="font-montserrat-medium text-4xl mr-3.5">
          Create New Role
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <div className="bg-white p-5">
        <p>Role Title</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="medium"
            placeholder="Enter Name Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
            }}

          />

        </div>

      </div>

      <div className="bg-white p-5">
        <p>Role Status</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <span className="mx-6">Active</span>
          <span className="mx-6">Inactive</span>
        </div>
      </div>
      <div className="bg-white p-5">
        <p>Add Modules</p>
      </div>
      <ModuleList />
      <div className="flex-row mt-3.5 mb-48 scroll-pb-60">

        <Link to="userroleslist" className="font-montserrat-medium text-xl text-white bg-cyan-900 p-3 right-10 absolute">
          Add Role
        </Link>
      </div>
    </div>
  </>
);

export default addrole;

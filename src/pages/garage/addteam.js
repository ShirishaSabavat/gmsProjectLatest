import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input } from 'antd';
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Add New Garage',
];

const addgarage = () => (
  <>
    <Helmet title="Cities" />
    <div className="flex flex-col space-y-12">
      <div className="space-y-2 basic-1/2">
        <span className="font-montserrat-medium text-4xl mr-3.5">
          Add New Garage
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <div className="bg-white p-5">
        <p>Garage Title</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="medium"
            placeholder="Enter Name Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
            }}

          />

        </div>
        <p>Description</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="medium"
            placeholder="Enter Description Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%', height: '200px',
            }}

          />

        </div>
      </div>
      <div className="bg-white p-5">
        <p>Select City</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="large"
            placeholder="Select City Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
            }}

          />

        </div>
      </div>
      <div className="bg-white p-5">
        <p>Garage Series</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="large"
            placeholder="Enter Garage Series Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
            }}

          />

        </div>
        <p>User Series</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            size="medium"
            placeholder="Enter User Series Here..."
            style={{
              padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
            }}

          />

        </div>
      </div>
      <div className="bg-white p-5">
        <p>Garage Status</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <span className="mx-6">Active</span>
          <span className="mx-6">Inactive</span>
        </div>
      </div>
      <div className="flex-row mt-3.5 mb-48 scroll-pb-60">

        <Link to="garagelist" className="font-montserrat-medium text-xl text-white bg-cyan-900 p-3 right-10 absolute">
          Add Garage
        </Link>
      </div>
    </div>
  </>
);

export default addgarage;

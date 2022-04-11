import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input, Radio, Button } from 'antd';

const nestedPath = [
  'Home',
  'Add New Garage',
];

const addteam = () => {
  const [radioValue, setRadioValue] = useState(true);
  return (
    <>
      <Helmet title="Cities" />
      <div className="flex flex-col space-y-12">
        <div className="space-y-2 basic-1/2">
          <span className="font-montserrat-medium text-4xl mr-3.5">
            Add New Team
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-5">
          <p>Team Title</p>
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
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team Status</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Active</Radio>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="bg-white p-5">
          <p>Select Pickup Location</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              size="large"
              placeholder="Select Location Here..."
              style={{
                padding: '14px', marginLeft: '15px', marginBottom: '8px', backgroundColor: 'rgba(245,248,252,1)', width: '150%',
              }}

            />

          </div>
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Add Team
          </Button>
        </div>
      </div>
    </>
  );
};

export default addteam;

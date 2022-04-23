/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Dropdown,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { getCarsListEverest } from 'services/axios';

const { TextArea } = Input;
const nestedPath = [
  'Home',
  'New Car Visit',
];

const carformpage = () => {
  const [radioValue, setRadioValue] = useState(true);
  const [CarsList, setCarsList] = useState([]);
  useEffect(() => {
    getCarsListEverest().then((resp) => {
      console.log(resp);
      setCarsList(resp);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            New Car Visit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Number</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
          <div className="bg-white py-5">
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Is Car with Driver?</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Active</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
              </Radio.Group>
            </div>
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Name</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Contact Number</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Manager Name</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Reason for Visit</p>
          <div className="flex flex-row flex-nonwrap">
            <Button
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Servicing
            </Button>
            <Button
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Repair
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Regular Audit
            </Button>
            <Button
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              60:40 Jama
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Leasing Car Jama
            </Button>
          </div>
        </div>
        <div className="col-12 flex flex-row justify-center">
          <Button
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Submit and add to Queue
          </Button>
        </div>
      </div>
    </>
  );
};

export default carformpage;

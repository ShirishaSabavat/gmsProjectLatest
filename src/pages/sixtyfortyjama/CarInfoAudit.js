/* eslint-disable global-require */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const nestedPath = [
  'Home',
  '60:40 Jama',
];

const CarInfoAudit = () => {
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const goToTyreAudit = () => {
    history.push('/sixtyfortyjama/AcceptForSixtyFortyJama');
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            60:40 Jama
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-2">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">MH04 BJ 1904</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">sgsdfg654654</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Time Stamp: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">2022/02/21 13:54</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-12 mt-2">
          <h1 className="font-quicksand-semi-bold text-sm mt-1">Driver: </h1>
          <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300 ml-12">John Doe</h1>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Current Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fuel Indicator Petrol (1 bar)*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fastag Balance*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>CNG*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Full">Full</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Empty">Empty</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Half full and Above">Half full and Above</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Below Half">Below Half</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Number Plate Sticker Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Front Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">Back Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Back Right side</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">Back left side</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Jack Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Pana Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Tommy Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Engine Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brake Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Coolant*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Charge*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Horn*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick={goToTyreAudit}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default CarInfoAudit;

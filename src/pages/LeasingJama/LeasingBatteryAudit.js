/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';

const nestedPath = [
  'Home',
  'Leasing Jama',
];

const LeasingBatteryAudit = () => {
  const history = useHistory();
  const [batteryNameError, setBatteryNameError] = useState({});
  const [batteryBrandError, setBatteryBrandError] = useState({});

  const {
    selectedCar,
    visitId,
    batteryName,
    setBatteryName,
    batteryBrand,
    setBatteryBrand,
  } = useJamaContext();

  const validateFormData = () => {
    let isValid = true;
    const batteryBrandErr = {};
    const batteryNameErr = {};

    if (!batteryName.batteryNameValue) {
      batteryNameErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!batteryBrand.batteryBrandValue) {
      batteryBrandErr.err = 'Please select a battery brand';
      isValid = false;
    }
    setBatteryNameError(batteryNameErr);
    setBatteryBrandError(batteryBrandErr);
    return isValid;
  };

  const goToTyreAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/LeasingJama/LeasingTyreAudit');
    }
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Leasing Jama
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-2">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">{selectedCar.selectedCarValue}</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">{visitId.visitIdValue}</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 m-2">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Battery Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={batteryName.batteryNameValue}
            onChange={(e) => setBatteryName({ batteryNameValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(batteryNameError).map((key) => (
            <div style={{ color: 'red' }}>
              {batteryNameError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Audit</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setBatteryBrand({ batteryBrandValue: e.target.value })}
            value={batteryBrand.batteryBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Powerzone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Panasonic</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>Exide</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>Liveguard</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>Tata</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Amaron</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Other</Radio>
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
export default LeasingBatteryAudit;

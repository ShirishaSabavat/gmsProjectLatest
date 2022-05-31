/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';

const nestedPath = [
  'Home',
  'Servicing Audit',
];

const ServiceTyreAudit = () => {
  const [fRPressureError, setfRPressureError] = useState({});
  const [fRTyreNumberError, setfRTyreNumberError] = useState({});
  const [rRPressureError, setrRPressureError] = useState({});
  const [rRTyreNumberError, setrRTyreNumberError] = useState({});
  const [rLPressureError, setrLPressureError] = useState({});
  const [rLTyreNumberError, setrLTyreNumberError] = useState({});
  const [fLPressureError, setfLPressureError] = useState({});
  const [fLTyreNumberError, setfLTyreNumberError] = useState({});
  const [stepnyTyreNumberError, setStepnyTyreNumberError] = useState({});
  const [stepnyPressureError, setStepnyPressureError] = useState({});
  const history = useHistory();

  const {
    selectedCar,
    visitId,
    fRTyreBrand,
    fRWornOut,
    fRPressure,
    fRTyreNumber,
    rRTyreBrand,
    rRWornOut,
    rRPressure,
    rRTyreNumber,
    fLTyreBrand,
    fLWornOut,
    fLPressure,
    fLTyreNumber,
    rLTyreBrand,
    rLWornOut,
    rLPressure,
    rLTyreNumber,
    stepnyPresent,
    stepnyBrand,
    stepnyTyreNumber,
    setfRPressure,
    setfRTyreBrand,
    setfRTyreNumber,
    setfRWornOut,
    setfLPressure,
    setfLTyreBrand,
    setfLTyreNumber,
    setfLWornOut,
    setrRPressure,
    setrRTyreBrand,
    setrRTyreNumber,
    setrRWornOut,
    setrLPressure,
    setrLTyreBrand,
    setrLTyreNumber,
    setrLWornOut,
    setStepnyBrand,
    setStepnyPresent,
    setStepnyTyreNumber,
    stepnyWornOut,
    setStepnyWornOut,
    stepnyPressure,
    setStepnyPressure,
  } = useJamaContext();

  const validateFormData = () => {
    let isValid = true;
    const fRPressureErr = {};
    const setfRTyreNumberErr = {};
    const rRPressureErr = {};
    const setrRTyreNumberErr = {};
    const rLPressureErr = {};
    const setrLTyreNumberErr = {};
    const fLPressureErr = {};
    const setfLTyreNumberErr = {};
    const stepnyTyreNumberErr = {};
    const stepnyPressureErr = {};

    if (!fRPressure.fRPressureValue) {
      fRPressureErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!fRTyreNumber.fRTyreNumberValue) {
      setfRTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!rRPressure.rRPressureValue) {
      rRPressureErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!rRTyreNumber.rRTyreNumberValue) {
      setrRTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!rLPressure.rLPressureValue) {
      rLPressureErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!rLTyreNumber.rLTyreNumberValue) {
      setrLTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!fLPressure.fLPressureValue) {
      fLPressureErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (!fLTyreNumber.fLTyreNumberValue) {
      setfLTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (stepnyPresent.stepnyPresentValue === 1 && !stepnyTyreNumber.stepnyTyreNumberValue) {
      stepnyTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (stepnyPresent.stepnyPresentValue === 1 && !stepnyPressure.stepnyPressureValue) {
      stepnyPressureErr.err = 'This field cannot be empty';
      isValid = false;
    }

    setfRPressureError(fRPressureErr);
    setfRTyreNumberError(setfRTyreNumberErr);
    setrRPressureError(rRPressureErr);
    setrRTyreNumberError(setrRTyreNumberErr);
    setrLPressureError(rLPressureErr);
    setrLTyreNumberError(setrLTyreNumberErr);
    setfLPressureError(fLPressureErr);
    setfLTyreNumberError(setfLTyreNumberErr);
    setStepnyTyreNumberError(stepnyTyreNumberErr);
    setStepnyPressureError(stepnyPressureErr);
    return isValid;
  };
  const goToCarInfoAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/ServiceAudit/ServiceCarInfo');
    }
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Servicing Audit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-3">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">{selectedCar.selectedCarValue}</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">{visitId.visitIdValue}</h1>
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
      <div className="bg-white p-5 m-3">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Front Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfRTyreBrand({ fRTyreBrandValue: e.target.value })}
            value={fRTyreBrand.fRTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfRWornOut({ fRWornOutValue: e.target.value })}
            value={fRWornOut.fRWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fRPressure.fRPressureValue}
            onChange={(e) => setfRPressure({ fRPressureValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fRPressureError).map((key) => (
            <div style={{ color: 'red' }}>
              {fRPressureError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fRTyreNumber.fRTyreNumberValue}
            onChange={(e) => setfRTyreNumber({ fRTyreNumberValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fRTyreNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {fRTyreNumberError[key]}
            </div>
          ))}
        </div>

      </div>
      <div className="bg-white p-5 m-3">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Rear Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrRTyreBrand({ rRTyreBrandValue: e.target.value })}
            value={rRTyreBrand.rRTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrRWornOut({ rRWornOutValue: e.target.value })}
            value={rRWornOut.rRWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rRPressure.rRPressureValue}
            onChange={(e) => setrRPressure({ rRPressureValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(rRPressureError).map((key) => (
            <div style={{ color: 'red' }}>
              {rRPressureError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rRTyreNumber.rRTyreNumberValue}
            onChange={(e) => setrRTyreNumber({ rRTyreNumberValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(rRTyreNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {rRTyreNumberError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 m-3">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Rear Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrLTyreBrand({ rLTyreBrandValue: e.target.value })}
            value={rLTyreBrand.rLTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setrLWornOut({ rLWornOutValue: e.target.value })}
            value={rLWornOut.rLWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rLPressure.rLPressureValue}
            onChange={(e) => setrLPressure({ rLPressureValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(rLPressureError).map((key) => (
            <div style={{ color: 'red' }}>
              {rLPressureError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rLTyreNumber.rLTyreNumberValue}
            onChange={(e) => setrLTyreNumber({ rLTyreNumberValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(rLTyreNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {rLTyreNumberError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 m-3">
        <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Front Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfLTyreBrand({ fLTyreBrandValue: e.target.value })}
            value={fLTyreBrand.fLTyreBrandValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfLWornOut({ fLWornOutValue: e.target.value })}
            value={fLWornOut.fLWornOutValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{'<3'}</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fLPressure.fLPressureValue}
            onChange={(e) => setfLPressure({ fLPressureValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fLPressureError).map((key) => (
            <div style={{ color: 'red' }}>
              {fLPressureError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fLTyreNumber.fLTyreNumberValue}
            onChange={(e) => setfLTyreNumber({ fLTyreNumberValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fLTyreNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {fLTyreNumberError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Stephany Present?*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setStepnyPresent({ stepnyPresentValue: e.target.value })}
            value={stepnyPresent.stepnyPresentValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>No</Radio>
          </Radio.Group>
        </div>
      </div>
      {stepnyPresent.stepnyPresentValue === 1
        && (
          <div className="bg-white p-5 m-3">
            <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Stephany Tyre</p>
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brand*</p>
            <div className="bg-white">
              <Radio.Group
                onChange={(e) => setStepnyBrand({ stepnyBrandValue: e.target.value })}
                value={stepnyBrand.stepnyBrandValue}
              >
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Apollo</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>Ceat</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>JK</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>BridgeStone</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={5}>MRF</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={6}>Firestone</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={7}>Kelly</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={8}>Other</Radio>
              </Radio.Group>
            </div>
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Worn Out*</p>
            <div className="bg-white">
              <Radio.Group
                onChange={(e) => setStepnyWornOut({ stepnyWornOutValue: e.target.value })}
                value={stepnyWornOut.stepnyWornOutValue}
              >
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="<3">{'<3'}</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="4">4</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="5">5</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="6">6</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="7">7</Radio>
              </Radio.Group>
            </div>
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Pressure</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Input
                value={stepnyPressure.stepnyPressureValue}
                onChange={(e) => setStepnyPressure({ stepnyPressureValue: e.target.value })}
                placeholder="Enter Name Here..."
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                }}
              />
            </div>
            <div className="flex flex-row flex-nonwrap bg-white">
              {Object.keys(stepnyPressureError).map((key) => (
                <div style={{ color: 'red' }}>
                  {stepnyPressureError[key]}
                </div>
              ))}
            </div>
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Tyre Number</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Input
                value={stepnyTyreNumber.stepnyTyreNumberValue}
                onChange={
                  (e) => setStepnyTyreNumber({ stepnyTyreNumberValue: e.target.value || null })
                }
                placeholder="Enter Name Here..."
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                }}
              />
            </div>
            <div className="flex flex-row flex-nonwrap bg-white">
              {Object.keys(stepnyTyreNumberError).map((key) => (
                <div style={{ color: 'red' }}>
                  {stepnyTyreNumberError[key]}
                </div>
              ))}
            </div>
          </div>
        )}
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick={goToCarInfoAudit}
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
export default ServiceTyreAudit;

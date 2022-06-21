/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import moment from 'moment';

const LeasingTyreAudit = () => {
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
    cardObject,
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
    if (!fRTyreNumber.fRTyreNumberValue || fRTyreNumber.fRTyreNumberValue.length < 4) {
      setfRTyreNumberErr.err = 'Tyre Number must be of 4 digits';
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
    if (!rRTyreNumber.rRTyreNumberValue || rRTyreNumber.rRTyreNumberValue.length < 4) {
      setrRTyreNumberErr.err = 'Tyre Number must be of 4 digits';
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
    if (!rLTyreNumber.rLTyreNumberValue || rLTyreNumber.rLTyreNumberValue.length < 4) {
      setrLTyreNumberErr.err = 'Tyre Number must be of 4 digits';
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
    if (!fLTyreNumber.fLTyreNumberValue || fLTyreNumber.fLTyreNumberValue.length < 4) {
      setfLTyreNumberErr.err = 'Tyre Number must be of 4 digits';
      isValid = false;
    }
    if (!fLTyreNumber.fLTyreNumberValue) {
      setfLTyreNumberErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (
      stepnyPresent.stepnyPresentValue === 1
      && (!stepnyPresent.stepnyPresentValue || stepnyPresent.stepnyPresentValue.length < 4)) {
      stepnyTyreNumberErr.err = 'Tyre Number must be of 4 digits';
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
      history.push('/LeasingAudit/LeasingCarInfo');
    }
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="px-2 py-0 mb-3 mx-1 max-w-sm bg-white rounded-lg border shadow-md sm:p-6">
        <div
          className=" my-2 flex items-center p-2 text-base font-bold text-gray-900 rounded-lg"
          style={{ backgroundColor: '#f4fcfc' }}
        >
          <span className="flex-1 ml-3 font-quicksand-bold text-xl whitespace-nowrap">{cardObject.car_number}</span>
          <span className=" font-quicksand-semi-bold px-2 py-0.5 ml-3 text-xs text-gray-500 truncate">{cardObject.carId?.model?.name}</span>
        </div>
        <div
          className=" my-2 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg"
          style={{ backgroundColor: '#f4fcfc' }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-quicksand-medium text-gray-900 truncate mb-1">
              Team:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mb-1">
                {cardObject.driver_manager_name}
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Driver:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {cardObject.driver_name}
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Mobile:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {cardObject.drive_contact_number || 'mobile'}
              </p>
            </p>
            <p className="text-sm font-bold font-quicksand-medium text-gray-900 truncate mt-1 mb-0">
              In-Time:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mt-1 mb-0">
                {moment(
                  cardObject.createdAt,
                ).format('DD-MM-YYYY, h:mm:ss a')}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-bold text-sm mt-4">Front Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Brand
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Worn Out
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Pressure
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fRPressure.fRPressureValue}
            onChange={(e) => setfRPressure({ fRPressureValue: e.target.value })}
            placeholder="Enter Tyre Pressue Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Number (Only 4 digits)
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fRTyreNumber.fRTyreNumberValue}
            onChange={(e) => setfRTyreNumber({
              fRTyreNumberValue: e.target.value.replace(
                /\D/g,
                '',
              ),
            })}
            placeholder="Enter Tyre Number Here..."
            maxLength={4}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-bold text-sm mt-4">Rear Right Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Brand
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Worn Out
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Pressure
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rRPressure.rRPressureValue}
            onChange={(e) => setrRPressure({ rRPressureValue: e.target.value })}
            placeholder="Enter Tyre Pressure Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Number (Only 4 digits)
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rRTyreNumber.rRTyreNumberValue}
            onChange={(e) => setrRTyreNumber({
              rRTyreNumberValue: e.target.value.replace(
                /\D/g,
                '',
              ),
            })}
            placeholder="Enter Tyre Number Here..."
            maxLength={4}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-bold text-sm mt-4">Rear Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Brand
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Worn Out
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Pressure
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rLPressure.rLPressureValue}
            onChange={(e) => setrLPressure({ rLPressureValue: e.target.value })}
            placeholder="Enter Tyre Pressure Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Number (Only 4 digits)
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={rLTyreNumber.rLTyreNumberValue}
            onChange={(e) => setrLTyreNumber({
              rLTyreNumberValue: e.target.value.replace(
                /\D/g,
                '',
              ),
            })}
            placeholder="Enter Tyre Number Here..."
            maxLength={4}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-bold text-sm mt-4">Front Left Tyre Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Brand
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Worn Out
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Pressure
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fLPressure.fLPressureValue}
            onChange={(e) => setfLPressure({ fLPressureValue: e.target.value })}
            placeholder="Enter Tyre Pressure Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Tyre Number (Only 4 digits)
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fLTyreNumber.fLTyreNumberValue}
            onChange={(e) => setfLTyreNumber({
              fLTyreNumberValue: e.target.value.replace(
                /\D/g,
                '',
              ),
            })}
            placeholder="Enter Tyre Number Here..."
            maxLength={4}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold text-sm">Stephany Present?</p>
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
          <div className="bg-white p-3 m-3">
            <p className="font-quicksand-bold text-5xl mt-4" style={{ fontSize: '12px' }}>Stephany Tyre</p>
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
              Brand
              <span style={{ color: 'red' }}>*</span>
            </p>
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
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
              Worn Out
              {' '}
              <span style={{ color: 'red' }}>*</span>
            </p>
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
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
              Tyre Pressure
              {' '}
              <span style={{ color: 'red' }}>*</span>
            </p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Input
                value={stepnyPressure.stepnyPressureValue}
                onChange={(e) => setStepnyPressure({ stepnyPressureValue: e.target.value })}
                placeholder="Enter Tyre Pressure Here..."
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
            <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
              Tyre Number (Only 4 digits)
              {' '}
              <span style={{ color: 'red' }}>*</span>
            </p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Input
                value={stepnyTyreNumber.stepnyTyreNumberValue}
                onChange={
                  (e) => setStepnyTyreNumber({
                    stepnyTyreNumberValue: e.target.value.replace(
                      /\D/g,
                      '',
                    ) || null,
                  })
                }
                maxLength={4}
                placeholder="Enter Tyre Number Here..."
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
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
      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => history.push('/LeasingAudit/LeasingBatteryAudit')}
          className="font-quicksand-medium"
          style={{
            marginLeft: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
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
export default LeasingTyreAudit;

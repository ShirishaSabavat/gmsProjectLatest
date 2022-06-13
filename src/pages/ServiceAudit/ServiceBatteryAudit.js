/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import moment from 'moment';

const ServiceBatteryAudit = () => {
  const history = useHistory();
  const [batteryNameError, setBatteryNameError] = useState({});
  const {
    selectedCar,
    visitId,
    batteryName,
    setBatteryName,
    batteryBrand,
    setBatteryBrand,
    driverName,
    cardObject,
  } = useJamaContext();

  const validateFormData = () => {
    let isValid = true;
    const batteryNameErr = {};

    if (!batteryName.batteryNameValue || batteryName.batteryNameValue.length < 5) {
      batteryNameErr.err = 'Battery number must be of 5 characters';
      isValid = false;
    }
    if (!batteryName.batteryNameValue) {
      batteryNameErr.err = 'This field cannot be empty';
      isValid = false;
    }
    setBatteryNameError(batteryNameErr);
    return isValid;
  };

  const goToTyreAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/ServiceAudit/ServiceTyreAudit');
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
          className=" my-2 flex items-center p-2 text-base font-bold text-gray-900 rounded-lg"
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
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Battery Audit</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Number</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={batteryName.batteryNameValue}
            onChange={(e) => setBatteryName({ batteryNameValue: e.target.value })}
            placeholder="Enter Battery Number Here..."
            maxLength={5}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white mb-2">
          {Object.keys(batteryNameError).map((key) => (
            <div style={{ color: 'red' }}>
              {batteryNameError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Brand</p>
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
      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => history.push('/ServiceAudit/ServiceAuditCarDetails')}
          className="font-quicksand-medium"
          style={{
            marginLeft: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
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
export default ServiceBatteryAudit;

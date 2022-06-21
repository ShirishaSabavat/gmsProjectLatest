/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import moment from 'moment';

const ServiceAuditCarDetails = () => {
  const {
    selectedCar,
    visitId,
    driverReportedIssue,
    setdriverReportedIssue,
    driverName,
    cardObject,
    ResetContextValues,
  } = useJamaContext();
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const [carReturnError, setCarReturnError] = useState({});
  const validateFormData = () => {
    let isValid = true;
    const errors = {};
    if (!driverReportedIssue.driverReportedIssueValue) {
      errors.carReturnReason = 'Please enter driver issues.';
      isValid = false;
    }
    setCarReturnError(errors);
    return isValid;
  };

  const goToBatteryAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/ServiceAudit/ServiceBatteryAudit');
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
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Driver Reported Vehicle Issue</p>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>
          Enter Issue Here
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={driverReportedIssue.driverReportedIssueValue}
            onChange={(e) => setdriverReportedIssue({ driverReportedIssueValue: e.target.value })}
            placeholder="Enter Issue Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
            }}
          />
        </div>
        {Object.keys(carReturnError).map((key) => (
          <div style={{ color: 'red' }}>
            {carReturnError[key]}
          </div>
        ))}
      </div>

      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => {
            ResetContextValues();
            history.push('/ServiceAudit/ServiceAuditCarlist');
          }}
          className="font-quicksand-medium"
          style={{
            marginLeft: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
        <Button
          onClick={goToBatteryAudit}
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
export default ServiceAuditCarDetails;

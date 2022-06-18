/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import { Helmet } from 'react-helmet';
import { Radio, Button } from 'antd';
import { useState } from 'react';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

const sixtyfortyjamadetails = () => {
  const {
    selectedCar,
    visitId,
    carReturnReason,
    setCarReturnReason,
    driverName,
    cardObject,
    ResetContextValues,
  } = useJamaContext();
  const [carKmsError, setCarKmsError] = useState('');
  const [currentCarKmsError, setcurrentCarKmsError] = useState('');
  const [fasttagBalanceError, setfasttagBalanceError] = useState('');
  const [carReturnError, setCarReturnError] = useState({});
  const history = useHistory();

  const validateFormData = () => {
    let isValid = true;
    const errors = {};
    if (!carReturnReason.carReturnReasonValue) {
      errors.carReturnReason = 'Please select a reason for returning the car';
      isValid = false;
    }
    setCarReturnError(errors);
    return isValid;
  };

  const goToBatteryAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/sixtyfortyjama/BatteryAudit');
    }
  };
  return (
    <>
      <Helmet title="60:40 Jama" />
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
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Team:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
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
                {cardObject.drive_contact_number}
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              In-Time:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {moment(
                  cardObject.createdAt,
                ).format('DD-MM-YYYY, h:mm:ss a')}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Reason for Returning Car*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setCarReturnReason({ carReturnReasonValue: e.target.value })}
            value={carReturnReason.carReturnReasonValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Family/Personal obligations">Family/Personal obligations</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2 flex-1" value="Going to Village">Going to Village</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2 flex-1" value="Payment Issue">Payment Issue</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Don't want to drive Uber">Don&apos;t want to drive Uber</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Don't want to drive with Everest">Don&apos;t want to drive with Everest</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold flex mt-2" value="60:40 issue">60:40 issue</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold flex mt-2" value="ID Block">ID Block</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Defaulter - Misuse">Defaulter - Misuse</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Defaulter - Outstanding">Defaulter - Outstanding</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2 mr-10" value="Defaulter - Low Performance(Low Online hrs/Trips)">Defaulter - Low Performance(Low Online hrs/Trips)</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car Issue">Car Issue</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Health Issue">Health Issue</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="DM Issue">DM Issue</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from repair">Come from repair</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from insurance">Come from insurance</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from leasing">Come from leasing</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from B2B">Come from B2B</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from fitness">Come from fitness</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from Vinay Bhai">Come from Vinay Bhai</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from Miraki">Come from Miraki</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="New Car">New Car</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Moving to leasing">Moving to leasing</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car swap">Car swap</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car not registered in Ola">Car not registered in Ola</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Leasing rent too high">Leasing rent too high</Radio>
            <br />
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Move to 60:40">Move to 60:40</Radio>
          </Radio.Group>
          {Object.keys(carReturnError).map((key) => (
            <div style={{ color: 'red' }}>
              {carReturnError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => {
            ResetContextValues();
            history.push('/sixtyfortyjama/jamacarlist');
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
export default sixtyfortyjamadetails;

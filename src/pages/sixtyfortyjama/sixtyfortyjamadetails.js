/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button } from 'antd';
import { useState } from 'react';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import { useHistory } from 'react-router-dom';

const nestedPath = [
  'Home',
  '60:40 Jama',
];

const sixtyfortyjamadetails = () => {
  const {
    selectedCar,
    visitId,
    carReturnReason,
    setCarReturnReason,
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
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Reason for Returning Car*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setCarReturnReason({ carReturnReasonValue: e.target.value })}
            value={carReturnReason.carReturnReasonValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Family/Personal obligations">Family/Personal obligations</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2 flex-1" value="Going to Village">Going to Village</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2 flex-1" value="Payment Issue">
              Payment Issue
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Don't want to drive Uber">Don&apos;t want to drive Uber</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Don't want to drive with Everest">Don&apos;t want to drive with Everest</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold flex mt-2" value="60:40 issue">
              60:40 issue
              {'\t'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold flex mt-2" value="ID Block">
              ID Block
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Defaulter - Misuse">Defaulter - Misuse</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Defaulter - Outstanding">Defaulter - Outstanding</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2 mr-10" value="Defaulter - Low Performance(Low Online hrs/Trips)">Defaulter - Low Performance(Low Online hrs/Trips)</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car Issue">
              Car Issue
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Health Issue">
              Health Issue
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="DM Issue">
              DM Issue
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from repair">
              Come from repair
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from insurance">Come from insurance</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from leasing">
              Come from leasing
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from B2B">Come from B2B</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from fitness">Come from fitness</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from Vinay Bhai">Come from Vinay Bhai</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Come from Miraki">
              Come from Miraki
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="New Car">
              New Car
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Moving to leasing">
              Moving to leasing
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car swap">
              Car swap
              {'\n'}
            </Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Car not registered in Ola">Car not registered in Ola</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Leasing rent too high">Leasing rent too high</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mt-2" value="Move to 60:40">Move to 60:40</Radio>
          </Radio.Group>
          {Object.keys(carReturnError).map((key) => (
            <div style={{ color: 'red' }}>
              {carReturnError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 flex flex-row justify-end">
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

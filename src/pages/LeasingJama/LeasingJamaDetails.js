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

const LeasingJamaDetails = () => {
  const { driverReportedIssue, setdriverReportedIssue, fasttagBalance, setfasttagBalance } = useJamaContext();
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const [carReturnError, setCarReturnError] = useState({});
  const validateFormData = () => {
    let isValid = true;
    const errors = {};
    if (!driverReportedIssue.driverReportedIssueValue) {
      errors.carReturnReason = 'Please enter more details.';
      isValid = false;
    }
    setCarReturnError(errors);
    return isValid;
  };

  const goToBatteryAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/LeasingJama/LeasingBatteryAudit');
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
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Member Name</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>ETM Id</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Driver Ola Balance</p>
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
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Rent for first day</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Family/Personal obligations">Full Rent</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Going to Village">No Rent</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Payment Issue">Half Day Rent</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Fastag Balance</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance.fasttagBalanceValue}
            onChange={(e) => setfasttagBalance({ fasttagBalanceValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Rent for first day</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="0">0</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="1000">1000</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="2000">2000</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Other">Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Rent for first day</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Accident">Accident</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Damage">Damage</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>More details of penalty</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={driverReportedIssue.driverReportedIssueValue}
            onChange={(e) => setdriverReportedIssue({ driverReportedIssueValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        {Object.keys(carReturnError).map((key) => (
          <div style={{ color: 'red' }}>
            {carReturnError[key]}
          </div>
        ))}
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
export default LeasingJamaDetails;

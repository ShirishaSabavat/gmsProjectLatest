/* eslint-disable max-len */
/* eslint-disable global-require */
// import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import {
  Radio, Button, Input, Select,
} from 'antd';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import { getEmployeeList } from 'services/axios';
import moment from 'moment';

// const nestedPath = [
//   'Home',
//   'Leasing Jama',
// ];

const LeasingJamaDetails = () => {
  const {
    // selectedCar,
    // visitId,
    // driverReportedIssue,
    // setdriverReportedIssue,
    fasttagBalance,
    setfasttagBalance,
    memberName,
    etmId,
    setEtmId,
    driverBal,
    setDriverBal,
    rent,
    setRent,
    driverName,
    setDriverName,
    // penaltyAmount,
    // setPenaltyAmount,
    // penaltyReason,
    // setPenaltyReason,
    cardObject,
    ResetContextValues,
  } = useJamaContext();
  const history = useHistory();
  const [memberNameError, setMemberNameError] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
  // const [etmIdError, setEtmIdError] = useState({});
  const [driverBalError, setDriverBalError] = useState({});
  const [fasttagBalanceError, setFasttagBalanceError] = useState({});
  // const [carReturnError, setCarReturnError] = useState({});

  useEffect(() => {
    const tempcityID = localStorage.getItem('cityid');
    // setcityID(tempcityID);
    getEmployeeList(tempcityID).then((resp) => {
      setEmployeeList(resp?.data);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleOnHover = (result) => {
    const temp = employeeList.filter((item) => item.id === result);
    setDriverName({ driverNameValue: temp[0].name });
    setEtmId({ etmIdValue: temp[0].employee_id });
  };

  const validateFormData = () => {
    let isValid = true;
    const memberNamerErr = {};
    // const etmIdErr = {};
    const driverBalErr = {};
    const fasttagBalanceErr = {};
    // const carRetrurnErr = {};

    if (memberName.memberNameValue === '') {
      memberNamerErr.err = 'This field can not be empty';
      isValid = false;
    }
    // if (etmId.etmIdValue === '') {
    //   etmIdErr.err = 'This field can not be empty';
    //   isValid = false;
    // }
    if (driverBal.driverBalValue === '') {
      driverBalErr.err = 'This field can not be empty';
      isValid = false;
    }
    if (fasttagBalance.fasttagBalanceValue === '') {
      fasttagBalanceErr.err = 'This field can not be empty';
      isValid = false;
    }

    // if (!driverReportedIssue.driverReportedIssueValue) {
    //   carRetrurnErr.err = 'This field can not be empty';
    //   isValid = false;
    // }
    setMemberNameError(memberNamerErr);
    // setEtmIdError(etmIdErr);
    setDriverBalError(driverBalErr);
    setFasttagBalanceError(fasttagBalanceErr);
    // setCarReturnError(carRetrurnErr);
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
      </div>
      <div className="bg-white p-5 m-2">
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Team Name</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Team Name Here..."
            value={memberName.memberNameValue}
            readOnly
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(memberNameError).map((key) => (
            <div style={{ color: 'red' }}>
              {memberNameError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>ETM Id</p>
        {/* <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            placeholder="Enter Name Here..."
            onChange={(e) => setEtmId({ etmIdValue: e.target.value })}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(etmIdError).map((key) => (
            <div style={{ color: 'red' }}>
              {etmIdError[key]}
            </div>
          ))}
        </div> */}
        <Select
          onChange={(e) => {
            handleOnHover(e);
          }}
          style={{ width: '100%', backgroundColor: '#F5F8FC' }}
          placeholder="Search Employee"
          showSearch
          defaultValue={etmId.etmIdValue || undefined}
          optionFilterProp="children"
          filterOption={(input, option) => option.children
            .toString()
            .toLowerCase()
            .indexOf(input.toLowerCase()) >= 0}
        >
          {employeeList.map((items) => (
            <Select.Option key={items.id} value={items.id}>
              {items.employee_id}
            </Select.Option>
          ))}
        </Select>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Driver Name</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            readOnly
            value={driverName.driverNameValue}
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Driver Ola Balance</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            onChange={(e) => setDriverBal({ driverBalValue: e.target.value })}
            value={driverBal.driverBalValue}
            placeholder="Enter Ola Balance Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(driverBalError).map((key) => (
            <div style={{ color: 'red' }}>
              {driverBalError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-5 m-2">
        <p className="font-quicksand-bold text-sm">Car Details</p>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Rent for first day</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setRent({ rentValue: e.target.value })}
            value={rent.rentValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Full Rent</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>No Rent</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>Half Day Rent</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Fastag Balance</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance.fasttagBalanceValue}
            onChange={(e) => setfasttagBalance({ fasttagBalanceValue: e.target.value })}
            placeholder="Enter Fastag Balance Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fasttagBalanceError).map((key) => (
            <div style={{ color: 'red' }}>
              {fasttagBalanceError[key]}
            </div>
          ))}
        </div>
        {/* <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Penalty Amount</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setPenaltyAmount({ penaltyAmountValue: e.target.value })}
            value={penaltyAmount.penaltyAmountValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>0</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>1000</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>2000</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={4}>Other</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>Penalty Reason</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setPenaltyReason({ penaltyReasonValue: e.target.value })}
            value={penaltyReason.penaltyReasonValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={0}>Accident</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>Damage</Radio>
          </Radio.Group>
        </div>
        <p className="font-quicksand-semi-bold mt-4" style={{ fontSize: '12px' }}>More details of penalty</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={driverReportedIssue.driverReportedIssueValue}
            onChange={(e) => setdriverReportedIssue({ driverReportedIssueValue: e.target.value })}
            placeholder="Enter Details Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        {Object.keys(carReturnError).map((key) => (
          <div style={{ color: 'red' }}>
            {carReturnError[key]}
          </div>
        ))} */}
      </div>

      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => {
            ResetContextValues();
            history.push('/LeasingJama/leasingJamaCarlist');
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
export default LeasingJamaDetails;

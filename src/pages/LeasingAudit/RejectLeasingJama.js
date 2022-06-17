/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Button, Radio } from 'antd';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const nestedPath = [
  'Home',
  '60:40 Jama',
];

const RejectLeasingCarJama = () => {
  const location = useLocation();
  const [rejectfor, setrejectfor] = useState(0);
  const [rejectforRemark, setrejectforRemark] = useState('');
  const [remarksError, setRemarksError] = useState('');
  const [radioValue, setRadioValue] = useState('');
  // const validateFormData = () => {
  //   const RemarkError = {};
  //   let isValid = true;
  //   if (rejectforRemark.trim().length === 0) {
  //     RemarkError.err = 'Rejection reason not selected.';
  //     isValid = false;
  //   }
  //   // if (garageSeries.trim().length === 0) {
  //   //   garageSeriesNameError.err = 'Garage series can not be empty';
  //   //   isValid = false;
  //   // }
  //   // if (userSeries.trim().length === 0) {
  //   //   userSeriesNameError.err = 'User series can not be empty';
  //   //   isValid = false;
  //   // }

  //   setRemarksError(RemarkError);
  //   return isValid;
  // };

  const RejectRTAListMethod = () => {

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
        <div>
          <div className="bg-white p-4">
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Select Other Option</p>
            <div className="bg-white">
              <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Transfer to Repair">Transfer to Repair</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Transfer to Servicing">Transfer to Servicing</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Transfer to Fitness Queue">Transfer to Fitness Queue</Radio>
              </Radio.Group>
            </div>
            {Object.keys(remarksError).map((key) => (
              <div style={{ color: 'red' }}>
                {remarksError[key]}
              </div>
            ))}
          </div>
          <div className="col-12 flex flex-row justify-center my-3">
            <Button
              onClick={() => RejectRTAListMethod()}
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
              }}
            >
              Transfer
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RejectLeasingCarJama;

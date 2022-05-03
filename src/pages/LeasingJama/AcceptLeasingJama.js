/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input, Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import { addRTAList } from 'services/axios';
import { Link, useLocation, useHistory } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Leasing Jama',
];

const { TextArea } = Input;

const AcceptLeasingJama = () => {
  const location = useLocation();
  const [remarks, setRemarks] = useState('');
  const [GarageID, setGarageID] = useState('');
  const [remarksError, setRemarksError] = useState('');

  // const validateFormData = () => {
  //   const RemarkError = {};
  //   let isValid = true;
  //   if (remarks.trim().length === 0) {
  //     RemarkError.err = 'Please enter proper remarks.';
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
  const history = useHistory();
  const goToRejectRTAListMethod = () => {
    history.push('/LeasingJama/RejectLeasingJama');
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
        <div>
          <div className="bg-white rounded-lg my-3 mx-2">
            <div className="flex flex-row flex-nonwrap justify-center">
              <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
              <div>
                <h1 className="font-quicksand-bold text-xl mt-3">MH01 DR 1836</h1>
                <h1 className="font-quicksand-semi-bold text-sm mt-1">Maruti Suzuki Drive Vxi CNG</h1>
                <div className="flex flex-row justify-center">
                  <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
                  <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">DSFSDFSDF654654</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="font-quicksand-semi-bold text-base my-3">Driver Name: </h1>
              <h1 className="font-quicksand-semi-bold text-base my-3 text-teal-300">John Doe</h1>
            </div>
          </div>
          <div className="bg-white p-4 mx-2">
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Add Comments (Optional)</p>
            <div className="flex flex-nonwrap bg-white">
              <TextArea
                rows={4}
                placeholder="Enter Remarks Here..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                }}
              />

            </div>
            {Object.keys(remarksError).map((key) => (
              <div style={{ color: 'red' }}>
                {remarksError[key]}
              </div>
            ))}
          </div>
          <div className="col-12 flex flex-row justify-center my-3">
            <Button
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
              }}
            >
              Accept Car for Jama
            </Button>
          </div>
          <div className="col-12 flex flex-row justify-center">
            <Link
              onClick={goToRejectRTAListMethod}
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
              }}
            >
              Reject for Jama
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptLeasingJama;

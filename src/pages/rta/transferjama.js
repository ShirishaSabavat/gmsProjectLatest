/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { Helmet } from 'react-helmet';
import { Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addRTAList, rejectRTAList } from 'services/axios';
import { useRTAContext } from 'context/rtaContext';

const transferjama = () => {
  const {
    cardObject, remarks,
  } = useRTAContext();
  const { id } = useParams();
  const [rejectfor, setrejectfor] = useState(0);
  const [rejectforRemark, setrejectforRemark] = useState('');
  const [GarageID, setGarageID] = useState('');
  const [remarksError, setRemarksError] = useState('');
  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    setGarageID(tempGarageID);
  }, []);

  const validateFormData = () => {
    const RemarkError = {};
    let isValid = true;
    if (rejectforRemark.trim().length === 0) {
      RemarkError.err = 'Rejection reason not selected.';
      isValid = false;
    }
    // if (garageSeries.trim().length === 0) {
    //   garageSeriesNameError.err = 'Garage series can not be empty';
    //   isValid = false;
    // }
    // if (userSeries.trim().length === 0) {
    //   userSeriesNameError.err = 'User series can not be empty';
    //   isValid = false;
    // }

    setRemarksError(RemarkError);
    return isValid;
  };

  const RejectRTAListMethod = () => {
    const resp = validateFormData();
    if (resp) {
      let isLeasing = true;
      if (cardObject.visit_category === 1) {
        isLeasing = false;
      } else if (cardObject.visit_category === 2) {
        isLeasing = true;
      }
      addRTAList(id, GarageID, isLeasing, remarks.remarksValue, 2)
        .then((res) => {
          rejectRTAList(id, cardObject.visit_category, rejectfor, 'roadtest_reject', false)
            .then((innerRes) => {
              notification.success({
                message: 'Jama Rejected successfully',
              });
              window.location.href = '#/rta/carlistrta';
            })
            .catch((err) => {
              console.log('err', err);
            });
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  };
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-2 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Road Trial: Car Transfer
          </span>
        </div>
        <div>
          <div className="bg-white p-4">
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>
              Select Reject Option
              {' '}
              <span style={{ color: 'red' }}>*</span>
            </p>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => { setrejectfor(5), setrejectforRemark('Transfer to Repair'); }}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Repair
              </Button>

            </div>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => { setrejectfor(4), setrejectforRemark('Transfer to Servicing'); }}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Servicing
              </Button>
            </div>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => { setrejectfor(6), setrejectforRemark('Transfer to Fitness Queue'); }}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Fitness Queue
              </Button>
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

export default transferjama;

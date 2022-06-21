/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input, Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import { addRTAList } from 'services/axios';
import { useHistory, useParams } from 'react-router-dom';
import { useRTAContext } from 'context/rtaContext';
import moment from 'moment';

const { TextArea } = Input;

const carslistrta = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    selectedCarId,
    selectedCarNumber,
    selectedDriverName,
    selectedVisitId,
    selectedVisitCategory,
    remarks,
    setRemarks,
    cardObject,
    ResetContextValues,
  } = useRTAContext();
  const [GarageID, setGarageID] = useState('');
  const [remarksError, setRemarksError] = useState({});
  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    setGarageID(tempGarageID);
  }, []);

  const validateFormData = (rejectFlag) => {
    const RemarkError = {};
    let isValid = true;
    if (rejectFlag) {
      if (!remarks.remarksValue) {
        RemarkError.err = 'Please enter proper remarks.';
        isValid = false;
      }
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

  const AddRTAListMethod = (rejectFlag) => {
    const resp = validateFormData(rejectFlag);
    if (!rejectFlag) {
      if (resp) {
        let tempvisitid = 0;
        let isLeasing = true;
        if (selectedVisitCategory === '1' || selectedVisitCategory === 1) {
          tempvisitid = 1;
          isLeasing = false;
        } else if (selectedVisitCategory === '2' || selectedVisitCategory === 1) {
          tempvisitid = 2;
          isLeasing = true;
        }
        addRTAList(id, GarageID, isLeasing, remarks.remarksValue, 1)
          .then((res) => {
            notification.success({
              message: 'Jama added successfully',
            });
            window.location.href = '#/rta/carlistrta';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    } else if (resp) {
      history.push(`/rta/transferjama/${id}`);
    }
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-2 mx-3">
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
        <div className="bg-white p-4 mx-2">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Remarks</p>
          <div className="flex flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Enter Remarks Here..."
              value={remarks.remarksValue}
              onChange={(e) => setRemarks({ remarksValue: e.target.value })}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
              }}
            />

          </div>
          {Object.keys(remarksError).map((key) => (
            <div style={{ color: 'red' }}>
              {remarksError[key]}
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-between my-3">
          <Button
            onClick={() => {
              ResetContextValues();
              history.push('/rta/carlistrta');
            }}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => AddRTAListMethod(false)}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
            }}
          >
            Accept
          </Button>
          <Button
            onClick={() => {
              AddRTAListMethod(true);
            }}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#dc2626', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
            }}
          >
            Reject
          </Button>
        </div>
      </div>
    </>
  );
};

export default carslistrta;

/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input, Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import {
  addCompletion, rejectRTAList, editCarVisit, addCarVisit, editBreakdown, getCarDetailsList,
} from 'services/axios';
import { useHistory, useParams } from 'react-router-dom';
import { useCompletionContext } from 'context/CompletionContext';
import moment from 'moment';

const carslistrta = () => {
  const history = useHistory();
  const {
    cardObject,
    ResetContextValues,
  } = useCompletionContext();
  // alert(operator);
  const [GarageID, setGarageID] = useState('');
  const [locationId, setLocationId] = useState('');
  const [driverVisitCategoryError, setDriverVisitCategoryError] = useState({});
  const [transfer, setTransfer] = useState(10);
  const [carId, setCarId] = useState(0);
  const [revenueType, setRevenueType] = useState(1);

  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    setGarageID(tempGarageID);
    const tempLocationId = localStorage.getItem('locationid');
    setLocationId(tempLocationId);
    setCarId(cardObject?.carId?.id);
  }, []);

  useEffect(() => {
    if (carId !== 0) {
      getCarDetailsList(carId)
        .then((resp) => {
          console.log(resp?.data[0]?.team?.revenue_type);
          setRevenueType(resp?.data[0]?.team?.revenue_type);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [carId]);

  const validateFormData = () => {
    const driverVisitCategoryErr = {};
    let isValid = true;
    if (transfer === 10) {
      driverVisitCategoryErr.err = 'Please select reason for visit';
      isValid = false;
    }

    setDriverVisitCategoryError(driverVisitCategoryErr);
    return isValid;
  };

  const onSave = () => {
    const resp = validateFormData();
    if (resp) {
      if (transfer === 7 || transfer === 8) {
        const editCarVisitData = {
          status: transfer,
        };
        if (cardObject.visit_category === 6 || cardObject.visit_category === 7 || cardObject.visit_category === 8) {
          editBreakdown(cardObject.id, editCarVisitData)
            .then((res) => {
              notification.success({
                message: 'Transferred successfully',
              });
              history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
            })
            .catch((err) => {
              console.log('err', err);
            });
        } else {
          editCarVisit(cardObject.id, editCarVisitData)
            .then((res) => {
              notification.success({
                message: 'Transferred successfully',
              });
              history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
            })
            .catch((err) => {
              console.log('err', err);
            });
        }
      } else {
        let rejectReason = '';
        let isBreakdown = false;
        if (cardObject.visit_category === 4) {
          if (transfer === 1) {
            rejectReason = 'service_sixty';
          } else if (transfer === 2) {
            rejectReason = 'service_leasing';
          } else if (transfer === 3) {
            rejectReason = 'service_regular';
          } else if (transfer === 5) {
            rejectReason = 'service_repair';
          }
        } else if (cardObject.visit_category === 5) {
          if (transfer === 1) {
            rejectReason = 'repair_sixty';
          } else if (transfer === 2) {
            rejectReason = 'repair_leasing';
          } else if (transfer === 3) {
            rejectReason = 'repair_regular';
          } else if (transfer === 4) {
            rejectReason = 'repair_service';
          }
        } else if (cardObject.visit_category === 1) {
          if (transfer === 2) {
            rejectReason = 'sixty_leasing';
          } else if (transfer === 3) {
            rejectReason = 'sixty_regular';
          } else if (transfer === 4) {
            rejectReason = 'sixty_service';
          } else if (transfer === 5) {
            rejectReason = 'sixty_repair';
          }
        } else if (cardObject.visit_category === 2) {
          if (transfer === 1) {
            rejectReason = 'leasing_sixty';
          } else if (transfer === 3) {
            rejectReason = 'leasing_regular';
          } else if (transfer === 4) {
            rejectReason = 'leasing_service';
          } else if (transfer === 5) {
            rejectReason = 'leasing_repair';
          }
        } else if (cardObject.visit_category === 3) {
          if (transfer === 1) {
            rejectReason = 'regular_sixty';
          } else if (transfer === 2) {
            rejectReason = 'regular_leasing';
          } else if (transfer === 4) {
            rejectReason = 'regular_service';
          } else if (transfer === 5) {
            rejectReason = 'regular_repair';
          }
        } else if (cardObject.visit_category === 6) {
          isBreakdown = true;
          if (transfer === 1) {
            rejectReason = 'breakdown_sixty';
          } else if (transfer === 2) {
            rejectReason = 'breakdown_leasing';
          } else if (transfer === 3) {
            rejectReason = 'breakdown_regular';
          } else if (transfer === 4) {
            rejectReason = 'breakdown_service';
          } else if (transfer === 5) {
            rejectReason = 'breakdown_repair';
          }
        } else if (cardObject.visit_category === 7) {
          isBreakdown = true;
          if (transfer === 1) {
            rejectReason = 'insurance_sixty';
          } else if (transfer === 2) {
            rejectReason = 'insurance_leasing';
          } else if (transfer === 3) {
            rejectReason = 'insurance_regular';
          } else if (transfer === 4) {
            rejectReason = 'insurance_service';
          } else if (transfer === 5) {
            rejectReason = 'insurance_repair';
          }
        } else if (cardObject.visit_category === 8) {
          isBreakdown = true;
          if (transfer === 1) {
            rejectReason = 'car_recovery_sixty';
          } else if (transfer === 2) {
            rejectReason = 'car_recovery_leasing';
          } else if (transfer === 3) {
            rejectReason = 'car_recovery_regular';
          } else if (transfer === 4) {
            rejectReason = 'car_recovery_service';
          } else if (transfer === 5) {
            rejectReason = 'car_recovery_repair';
          }
        }
        // alert(rejectReason);
        history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
        rejectRTAList(cardObject.id, cardObject.visit_category, transfer, rejectReason, isBreakdown)
          .then((res) => {
            if (cardObject.visit_category === 6 || cardObject.visit_category === 7 || cardObject.visit_category === 8) {
              addCarVisit(
                transfer,
                cardObject.carId_id,
                cardObject.car_number,
                GarageID,
                cardObject.is_with_driver,
                cardObject.driverId,
                cardObject.driver_name,
                cardObject.drive_contact_number,
                cardObject.driverManagerId,
                cardObject.driver_manager_name,
                locationId,
                cardObject.employee_id,
              )
                .then(() => {
                  notification.success({
                    message: 'Transferred successfully',
                  });
                  history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
                })
                .catch((err) => {
                  console.log('err', err);
                });
            } else {
              notification.success({
                message: 'Transferred successfully',
              });
              history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
            }
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
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
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>
            Transfer To
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </p>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setTransfer(7)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 7 ? 'aqua' : 'white' }}
            >
              Driver
            </Button>
            {/* <Button
              onClick={() => setTransfer(8)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 8 ? 'aqua' : 'white' }}
            >
              Parking
            </Button> */}
          </div>
          <div className="flex flex-row flex-nonwrap">
            {/* {cardObject.visit_category === 3 ? '' : (
              <Button
                onClick={() => setTransfer(3)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 3 ? 'aqua' : 'white' }}
              >
                Regular Audit
              </Button>
            )} */}
            {cardObject.visit_category === 4 ? '' : (
              <Button
                onClick={() => setTransfer(4)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 4 ? 'aqua' : 'white' }}
              >
                Servicing
              </Button>
            )}
            {cardObject.visit_category === 5 ? '' : (
              <Button
                onClick={() => setTransfer(5)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 5 ? 'aqua' : 'white' }}
              >
                Repair
              </Button>
            )}
          </div>
          <div className="flex flex-row flex-nonwrap">
            {revenueType === 1
              ? cardObject.visit_category === 1 ? '' : (
                <Button
                  onClick={() => setTransfer(1)}
                  className="font-quicksand-medium"
                  style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 1 ? 'aqua' : 'white' }}
                >
                  Allotment Jama(Jama Desk)
                </Button>
              ) : ''}
            {revenueType === 2
              ? cardObject.visit_category === 2 ? '' : (
                <Button
                  onClick={() => setTransfer(2)}
                  className="font-quicksand-medium"
                  style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 2 ? 'aqua' : 'white' }}
                >
                  Allotment(Jama Desk)
                </Button>
              ) : ''}
          </div>
          {/* <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setTransfer(0)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: transfer === 0 ? 'aqua' : 'white' }}
            >
              Insurance
            </Button>
          </div> */}
          {Object.keys(driverVisitCategoryError).map((key) => (
            <div style={{ color: 'red' }}>
              {driverVisitCategoryError[key]}
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-between my-3">
          <Button
            onClick={() => {
              ResetContextValues();
              history.push(`/completion/CarsQueue/${cardObject.visit_category}`);
            }}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Back
          </Button>
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
            }}
          >
            Accept
          </Button>
        </div>
      </div>
    </>
  );
};

export default carslistrta;

/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Input, Radio, Button, notification, Select,
} from 'antd';
import {
  addBreakdown, editBreakdown, getCarDetailsList, getCarsListEverest, getEmployeeList, checkExistingCarDetails, getBreakdownDetails,
} from 'services/axios';

const insurancePage = () => {
  const [carWithDriver, setCarWithDriver] = useState(true);
  const [CarsList, setCarsList] = useState([]);
  const [DriverName, setDriverName] = useState('');
  const [DriverContact, setDriverContact] = useState('');
  const [DriverManagerName, setDriverManagerName] = useState('');
  const [DriverNameError, setDriverNameError] = useState('');
  const [DriverManagerNameError, setDriverManagerNameError] = useState('');
  const [DriverContactError, setDriverContactError] = useState('');
  const [DriverSelectedCarNumberError, setDriverSelectedCarNumberError] = useState('');
  const [SelectedCarID, setSelectedCarID] = useState(0);
  const [SelectedCarNumber, setSelectedCarNumber] = useState('');
  const [SelectedDriverID, setSelectedDriverID] = useState(0);
  const [SelectedDriverManagerID, setSelectedDriverManagerID] = useState('');
  const [etmId, setEtmId] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [insuranceId, setInsuranceId] = useState(-1);
  const [cityID] = useState(localStorage.getItem('cityid'));

  const resetData = () => {
    setCarWithDriver(true);
    setDriverName('');
    setDriverContact('');
    setDriverManagerName('');
    setSelectedCarID(0);
    setSelectedCarNumber('');
    setSelectedDriverID(0);
    setSelectedDriverManagerID(0);
    setEtmId('');
  };

  const getCarDetails = (carId) => {
    getCarDetailsList(carId).then((resp) => {
      if (resp?.data.length > 0) {
        if (resp?.data[0]?.team !== null) {
          setDriverManagerName(resp?.data[0]?.team?.name);
          // setSelectedDriverID(resp?.data[0].driver_id);
          setSelectedDriverManagerID(resp?.data[0]?.team?.id);
        } else {
          notification.error({
            message: 'No Team Allocated',
          });
        }
      } else {
        setDriverName('');
        setDriverContact('');
        setDriverManagerName('');
        setSelectedDriverID(0);
        setSelectedDriverManagerID('');
      }
    })
      .catch((err) => {
        console.log('err', err);
      });
  };

  // useEffect(() => {
  //   getVisitingCarDetails(id)
  //     .then((res) => {
  //       setSelectedCarNumber(res?.data?.results?.car_number);
  //       setCarWithDriver(res?.data?.results?.is_with_driver);
  //       setDriverName(res?.data?.results?.driver_name);
  //       setDriverContact(res?.data?.results?.drive_contact_number);
  //       setSelectedDriverManagerID(res?.data?.results?.driverManagerId);
  //       setDriverManagerName(res?.data?.results?.driver_manager_name);
  //       setVisitCategory(res?.data?.results?.visit_category);
  //       setSelectedCarID(res?.data?.results?.carId);
  //     })
  //     .catch((err) => {
  //       console.log('err1', err);
  //     });
  // }, []);

  useEffect(() => {
    getCarsListEverest(cityID)
      .then((resp) => {
        setCarsList(resp?.data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getEmployeeList(cityID).then((resp) => {
      setEmployeeList(resp?.data);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    const driverNameError = {};
    const selectedcarnumbererror = {};
    // const driverVisitCategoryError = {};
    const driverManagerError = {};
    const mobileErr = {};
    const numCheck = /^[0-9\b]+$/;
    let isValid = true;

    if (SelectedCarID === -1) {
      if (SelectedCarNumber.trim() === '' || SelectedCarNumber === 'Enter Car Number Here...') {
        selectedcarnumbererror.err = 'Please Select Car.';
        isValid = false;
      }

      // if (VisitCategory === 10) {
      //   driverVisitCategoryError.err = 'Please select reason for visit';
      //   isValid = false;
      // }

      setDriverSelectedCarNumberError(selectedcarnumbererror);
    } else {
      // if (VisitCategory === 10) {
      //   driverVisitCategoryError.err = 'Please select reason for visit';
      //   isValid = false;
      // }
      if (carWithDriver) {
        if (DriverContact.trim().length < 10 || DriverContact.trim().length > 10) {
          mobileErr.pinErr = 'Mobile Number should be of 10 digits only';
          isValid = false;
        }

        if (!numCheck.test(DriverContact)) {
          mobileErr.pinErr = 'Only digits allowed';
          isValid = false;
        }

        if (DriverContact.trim().length === 0) {
          mobileErr.pinErr = 'This field can not be empty';
          isValid = false;
        }

        if (DriverName.trim().length === 0) {
          driverNameError.pinErr = 'This field can not be empty';
          isValid = false;
        }
      }
      if (DriverManagerName.trim().length === 0) {
        driverManagerError.pinErr = 'This field can not be empty';
        isValid = false;
      }

      setDriverContactError(mobileErr);
      setDriverNameError(driverNameError);
      setDriverManagerNameError(driverManagerError);
    }

    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    if (resp) {
      const insuranceData = {
        carId: SelectedCarID,
        car_number: SelectedCarNumber,
        driverId: SelectedDriverID,
        driver_name: DriverName,
        drive_contact_number: DriverContact,
        driver_manager_name: DriverManagerName,
        driverManagerId: SelectedDriverManagerID,
        is_with_driver: carWithDriver,
        towing_required: false,
        status: 1,
        visit_category: 7,
        employee_id: etmId,
      };
      if (insuranceId === -1) {
        addBreakdown(insuranceData)
          .then(() => {
            notification.success({
              message: 'Visit Added successfully',
            });
            // window.location.href = '#/gatekeeper/homepage';
            resetData();
            setTimeout(() => {
              window.scrollTo(0, 0);
              window.location.reload();
            }, 1000);
          })
          .catch((err) => {
            notification.error({
              message: err.response.data.message,
            });
          });
      } else {
        editBreakdown(insuranceId, insuranceData)
          .then(() => {
            notification.success({
              message: 'Visit Edited successfully',
            });
            // window.location.href = '#/gatekeeper/homepage';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
    // getCarDetails(result.id);
    resetData();
    getCarDetails(result);
    checkExistingCarDetails(result)
      .then((resp) => {
        if (resp.data.car_status === 2) {
          setSelectedCarID(result);
          const temp = CarsList.filter((item) => item.id === result);
          setSelectedCarNumber(temp[0].name);
          // getCarDetails(result);
        } else if (resp.data.car_status === 0) {
          getBreakdownDetails(result)
            .then((res) => {
              const respData = res?.data?.results[0];
              if (respData) {
                setInsuranceId(respData?.id);
                setSelectedCarNumber(respData?.car_number);
                setCarWithDriver(respData?.is_with_driver);
                setDriverName(respData?.driver_name);
                setDriverContact(respData?.drive_contact_number);
                setSelectedDriverManagerID(respData?.driverManagerId);
                setDriverManagerName(respData?.driver_manager_name);
                setSelectedCarID(respData?.carId_id);
                setEtmId(respData?.employee_id);
              }
            })
            .catch((err) => {
              console.log('err1', err);
            });
        } else {
          let visitQueue = '';
          if (resp.data.visit_category === 1) {
            visitQueue = '60:40 Jama';
          } else if (resp.data.visit_category === 2) {
            visitQueue = 'Leasing Jama';
          } else if (resp.data.visit_category === 3) {
            visitQueue = 'Regular Audit';
          } else if (resp.data.visit_category === 4) {
            visitQueue = 'Serciving';
          } else if (resp.data.visit_category === 5) {
            visitQueue = 'Repair';
          } else if (resp.data.visit_category === 6) {
            visitQueue = 'Breakdown';
          } else if (resp.data.visit_category === 7) {
            visitQueue = 'Insurance';
          } else if (resp.data.visit_category === 8) {
            visitQueue = 'Car Recovery';
          }
          notification.error({
            message: `Car is already in the ${visitQueue} Queue`,
          });
        }
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const handleOnEtmChange = (result) => {
    const temp = employeeList.filter((item) => item.id === result);
    setEtmId(temp[0].employee_id);
    setDriverName(temp[0].name);
  };

  return (
    <>
      <Helmet title="Insurance" />
      <div className="flex flex-col space-y-2 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            Insurance
          </span>
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-sm">Car Details</p>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
            Car Number
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </p>
          <Select
            onChange={(e) => {
              handleOnHover(e);
            }}
            style={{ width: '100%', backgroundColor: '#F5F8FC' }}
            placeholder="Search Car"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) => option.children
              .toString()
              .toLowerCase()
              .indexOf(input.toLowerCase()) >= 0}
          >
            {CarsList.map((items) => (
              <Select.Option key={items.id} value={items.id}>
                {items.name}
              </Select.Option>
            ))}
          </Select>
          {Object.keys(DriverSelectedCarNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverSelectedCarNumberError[key]}
            </div>
          ))}
          <div className="bg-white py-5">
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Is Car with Driver?</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Radio.Group onChange={(e) => setCarWithDriver(e.target.value)} value={carWithDriver}>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Yes</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          {carWithDriver === true
            ? (
              <div>
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
                  ETM Id
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <Select
                  onChange={(e) => {
                    handleOnEtmChange(e);
                  }}
                  style={{ width: '100%', backgroundColor: '#F5F8FC', marginBottom: '8px' }}
                  placeholder="Search Employee"
                  value={etmId || undefined}
                  showSearch
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
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
                  Driver Name
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    readOnly
                    style={{
                      padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                    }}
                  />
                  {Object.keys(DriverNameError).map((key) => (
                    <div style={{ color: 'red' }}>
                      {DriverNameError[key]}
                    </div>
                  ))}
                </div>
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
                  Contact Number
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverContact}
                    onChange={(e) => setDriverContact(e.target.value)}
                    placeholder="Enter Contact Here..."
                    style={{
                      padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
                    }}
                  />
                  {Object.keys(DriverContactError).map((key) => (
                    <div style={{ color: 'red' }}>
                      {DriverContactError[key]}
                    </div>
                  ))}
                </div>
              </div>
            )
            : <div />}
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
            Team
            {' '}
            <span style={{ color: 'red' }}>*</span>
          </p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              value={DriverManagerName}
              readOnly
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
          {Object.keys(DriverManagerNameError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverManagerNameError[key]}
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-center">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Submit and add to Queue
          </Button>
        </div>
      </div>
    </>
  );
};

export default insurancePage;

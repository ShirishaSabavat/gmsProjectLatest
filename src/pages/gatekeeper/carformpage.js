/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import {
  Input, Radio, Button, notification, Select, Spin,
} from 'antd';
import {
  addCarVisit, editCarVisit, getCarDetailsList, getCarsListEverest, getVisitingCarDetails, checkExistingCarDetails, getEmployeeList,
} from 'services/axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
// import { useHistory } from 'react-router-dom';

const carformpage = () => {
  // const location = useLocation();
  // const {
  //   carId, carnumber, visitcategory, driverName, driveContactNumber,
  // } = location.state;
  // const { id } = useParams();
  // const history = useHistory();

  const [radioValue, setRadioValue] = useState(true);
  const [CarsList, setCarsList] = useState([]);
  const [cityID, setcityID] = useState('');
  const [DriverName, setDriverName] = useState('');
  const [DriverContact, setDriverContact] = useState('');
  const [DriverManagerName, setDriverManagerName] = useState('');
  const [DriverNameError, setDriverNameError] = useState('');
  const [DriverContactError, setDriverContactError] = useState('');
  const [DriverManagerNameError, setDriverManagerNameError] = useState('');
  const [DriverVisitCategoryError, setDriverVisitCategoryError] = useState('');
  const [DriverSelectedCarNumberError, setDriverSelectedCarNumberError] = useState('');
  const [VisitCategory, setVisitCategory] = useState(10);
  const [SelectedCarID, setSelectedCarID] = useState(0);
  const [SelectedCarNumber, setSelectedCarNumber] = useState('');
  const [GarageID, setGarageID] = useState('');
  const [LocationID, setLocationID] = useState('');
  const [SelectedDriverID, setSelectedDriverID] = useState(0);
  const [SelectedDriverManagerID, setSelectedDriverManagerID] = useState('');
  const [carNumber, setcarNumber] = useState('');
  const [etmId, setEtmId] = useState('');
  const [employeeList, setEmployeeList] = useState([]);
  const [visitId, setVisitId] = useState('-1');

  const resetData = () => {
    setRadioValue(true);
    setDriverName('');
    setDriverContact('');
    setDriverManagerName('');
    setVisitCategory(10);
    setSelectedCarID(0);
    setSelectedCarNumber('');
    // setGarageID('');
    // setLocationID('');
    setSelectedDriverID(0);
    setSelectedDriverManagerID('');
    setcarNumber('');
    setEtmId('');
  };

  const getCarDetails = (carId) => {
    getCarDetailsList(carId).then((resp) => {
      if (resp?.data.length > 0) {
        setDriverManagerName(resp?.data[0]?.team?.name);
        // setSelectedDriverID(resp?.data[0].driver_id);
        setSelectedDriverManagerID(resp?.data[0]?.team?.id);
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
  //       const respData = res?.data?.results[0];
  //       setcarNumber(respData?.car_number);
  //       setRadioValue(respData?.is_with_driver);
  //       setDriverName(respData?.driver_name);
  //       setDriverContact(respData?.drive_contact_number);
  //       setSelectedDriverManagerID(respData?.driverManagerId);
  //       setDriverManagerName(respData?.driver_manager_name);
  //       setVisitCategory(respData?.visit_category);
  //       setSelectedCarID(respData?.carId);
  //     })
  //     .catch((err) => {
  //       console.log('err1', err);
  //     });
  // }, []);

  useEffect(() => {
    const tempcityID = localStorage.getItem('cityid');
    setcityID(tempcityID);
    getCarsListEverest(tempcityID).then((resp) => {
      setCarsList(resp?.data);
      const tempGarageID = localStorage.getItem('garageid');
      const tempLocationID = localStorage.getItem('locationid');
      setGarageID(tempGarageID);
      setLocationID(tempLocationID);
      if (visitId === '-1') {
        setVisitCategory(VisitCategory);
      }
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

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

  const validateFormData = () => {
    const driverNameError = {};
    const selectedcarnumbererror = {};
    const driverManagerError = {};
    const driverVisitCategoryError = {};
    const mobileErr = {};
    const numCheck = /^[0-9\b]+$/;
    let isValid = true;

    if (SelectedCarID === -1) {
      if (SelectedCarNumber.trim() === '' || SelectedCarNumber === 'Enter Car Number Here...') {
        selectedcarnumbererror.err = 'Please Select Car.';
        isValid = false;
      }

      if (VisitCategory === 10) {
        driverVisitCategoryError.err = 'Please select reason for visit';
        isValid = false;
      }

      setDriverSelectedCarNumberError(selectedcarnumbererror);
      setDriverVisitCategoryError(driverVisitCategoryError);
    } else {
      if (VisitCategory === 10) {
        driverVisitCategoryError.err = 'Please select reason for visit';
        isValid = false;
      }
      if (radioValue) {
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

      setDriverVisitCategoryError(driverVisitCategoryError);
      setDriverContactError(mobileErr);
      setDriverNameError(driverNameError);
    }

    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();

    if (resp) {
      if (visitId === '-1') {
        addCarVisit(
          VisitCategory,
          SelectedCarID,
          SelectedCarNumber,
          GarageID,
          radioValue,
          SelectedDriverID,
          DriverName,
          DriverContact,
          SelectedDriverManagerID,
          DriverManagerName,
          LocationID,
          etmId,
        )
          .then((res) => {
            notification.success({
              message: 'Visit Added successfully1',
            });
            resetData();
            setSelectedCarID(0);
            // window.location.href = '#/gatekeeper/carformpage';
          })
          .catch((err) => {
            notification.error({
              message: err.response.data.message,
            });
          });
      } else {
        const editCarVisitData = {
          visit_category: VisitCategory,
          carId: SelectedCarID,
          garageId: GarageID,
          locationId: LocationID,
          is_with_driver: radioValue,
          driverId: SelectedDriverID,
          driver_name: DriverName,
          drive_contact_number: DriverContact,
          driverManagerId: SelectedDriverManagerID,
          driver_manager_name: DriverManagerName,
          employee_id: etmId,
          status: 1,
        };
        editCarVisit(visitId, editCarVisitData)
          .then((res) => {
            notification.success({
              message: 'Visit Edited successfully',
            });
            resetData();
            setSelectedCarID(0);
            // window.location.href = '#/gatekeeper/carformpage';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
    resetData();
    checkExistingCarDetails(result)
      .then((resp) => {
        if (resp.data.car_status === 2) {
          setSelectedCarID(result);
          const temp = CarsList.filter((item) => item.id === result);
          setSelectedCarNumber(temp[0].name);
          getCarDetails(result);
        } else if (resp.data.car_status === 0) {
          getVisitingCarDetails(result)
            .then((res) => {
              const respData = res?.data?.results[0];
              setcarNumber(respData?.car_number);
              setRadioValue(respData?.is_with_driver);
              setDriverName(respData?.driver_name);
              setDriverContact(respData?.drive_contact_number);
              setSelectedDriverManagerID(respData?.driverManagerId);
              setDriverManagerName(respData?.driver_manager_name);
              setVisitCategory(respData?.visit_category);
              setSelectedCarID(respData?.carId?.id);
              setVisitId(respData?.id);
              setEtmId(respData?.employee_id);
            })
            .catch((err) => {
              console.log('err1', err);
            });
          // notification.error({
          //   message: 'Car is already in the Audit Queue',
          // });
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
        console.log(err);
      });
  };

  const handleOnEtmChange = (result) => {
    const temp = employeeList.filter((item) => item.id === result);
    setEtmId(temp[0].employee_id);
    setDriverName(temp[0].name);
  };

  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-2 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            Car Visit
          </span>
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Number</p>
          <div className="bg-white">
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
          </div>
          {Object.keys(DriverSelectedCarNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverSelectedCarNumberError[key]}
            </div>
          ))}
          <div className="bg-white py-5">
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Is Car with Driver?</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Yes</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          {radioValue === true
            ? (
              <div>
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>ETM Id</p>
                <Select
                  onChange={(e) => {
                    handleOnEtmChange(e);
                  }}
                  style={{ width: '100%', backgroundColor: '#F5F8FC' }}
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
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Name</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverName}
                    readOnly
                    // onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Enter Driver Name Here..."
                    style={{
                      padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                    }}
                  />
                </div>
                {Object.keys(DriverNameError).map((key) => (
                  <div style={{ color: 'red' }}>
                    {DriverNameError[key]}
                  </div>
                ))}
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Contact Number</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverContact}
                    onChange={(e) => setDriverContact(e.target.value)}
                    placeholder="Enter Contact Here..."
                    style={{
                      padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                    }}
                  />
                </div>
                {Object.keys(DriverContactError).map((key) => (
                  <div style={{ color: 'red' }}>
                    {DriverContactError[key]}
                  </div>
                ))}
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverManagerName}
                    placeholder="Enter Team Name Here..."
                    readOnly
                    style={{
                      padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                    }}
                  />

                </div>
              </div>
            )
            : <div />}
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Reason for Visit</p>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(4)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: VisitCategory === 4 ? 'aqua' : 'white' }}
            >
              Servicing
            </Button>
            <Button
              onClick={() => setVisitCategory(5)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: VisitCategory === 5 ? 'aqua' : 'white' }}
            >
              Repair
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(3)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: VisitCategory === 3 ? 'aqua' : 'white' }}
            >
              Regular Audit
            </Button>
            <Button
              onClick={() => setVisitCategory(1)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: VisitCategory === 1 ? 'aqua' : 'white' }}
            >
              60:40 Jama
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(2)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px', backgroundColor: VisitCategory === 2 ? 'aqua' : 'white' }}
            >
              Leasing Car Jama
            </Button>
          </div>
          {Object.keys(DriverVisitCategoryError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverVisitCategoryError[key]}
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

export default carformpage;

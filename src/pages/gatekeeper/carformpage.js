/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Dropdown, notification,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  addCarVisit, editCarVisit, getCarDetailsList, getCarsListEverest, getVisitingCarDetails,
} from 'services/axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useParams, useHistory } from 'react-router-dom';

const { TextArea } = Input;
const nestedPath = [
  'Home',
  'New Car Visit',
];

const carformpage = () => {
  // const location = useLocation();
  // const {
  //   carId, carnumber, visitcategory, driverName, driveContactNumber,
  // } = location.state;
  const { id } = useParams();
  const history = useHistory();

  const [radioValue, setRadioValue] = useState(true);
  const [isFocused, setisFocused] = useState(false);
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

  const getCarDetails = (carId) => {
    getCarDetailsList(carId).then((resp) => {
      console.log('resppppp', resp?.data);
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

  useEffect(() => {
    getVisitingCarDetails(id)
      .then((res) => {
        console.log('CarResp', res?.data?.results);
        setcarNumber(res?.data?.results?.car_number);
        setRadioValue(res?.data?.results?.is_with_driver);
        setDriverName(res?.data?.results?.driver_name);
        setDriverContact(res?.data?.results?.drive_contact_number);
        setSelectedDriverManagerID(res?.data?.results?.driverManagerId);
        setDriverManagerName(res?.data?.results?.driver_manager_name);
        setVisitCategory(res?.data?.results?.visit_category);
        setSelectedCarID(res?.data?.results?.carId);
      })
      .catch((err) => {
        console.log('err1', err);
      });
  }, []);

  useEffect(() => {
    const tempcityID = localStorage.getItem('cityid');
    setcityID(tempcityID);
    getCarsListEverest(tempcityID).then((resp) => {
      console.log('resp', resp?.data);
      setCarsList(resp?.data);
      const tempGarageID = localStorage.getItem('garageid');
      const tempLocationID = localStorage.getItem('locationid');
      setGarageID(tempGarageID);
      setLocationID(tempLocationID);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    if (id === '-1') {
      const tempcityID = localStorage.getItem('cityid');
      setcityID(tempcityID);
      getCarsListEverest(tempcityID).then((resp) => {
        console.log(`Resp: ${resp?.data}`);
        setCarsList(resp?.data);
        const tempGarageID = localStorage.getItem('garageid');
        const tempLocationID = localStorage.getItem('locationid');

        setGarageID(tempGarageID);
        setLocationID(tempLocationID);
        setVisitCategory(visitcategory);

        // setCarsList(resp?.data);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
    // else {
    //   const tempGarageID = localStorage.getItem('garageid');
    //   const tempLocationID = localStorage.getItem('locationid');
    //   setGarageID(tempGarageID);
    //   setLocationID(tempLocationID);
    //   getCarDetails(SelectedCarID);
    //   setVisitCategory(VisitCategory);
    // }
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
      console.log('if');
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
      console.log('else');
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
    console.log(resp);

    if (resp) {
      if (id === '-1') {
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
        )
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Visit Added successfully',
            });
            window.location.href = '#/gatekeeper/homepage';
          })
          .catch((err) => {
            console.log('err', err.response);
            notification.error({
              message: err.response.data.message,
            });
          });
      } else {
        editCarVisit(
          id,
          VisitCategory,
          SelectedCarID,
          GarageID,
          radioValue,
          SelectedDriverID,
          DriverName,
          DriverContact,
          SelectedDriverManagerID,
          DriverManagerName,
          LocationID,
        )
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Visit Edited successfully',
            });
            window.location.href = '#/gatekeeper/homepage';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string);
    if (string === '') {
      setisFocused(false);
    } else {
      setisFocused(true);
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
    // getCarDetails(result.id);
    setSelectedCarID(result.id);
    setSelectedCarNumber(result.name);
    setisFocused(false);
    getCarDetails(result.id);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => (
    <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
  );
  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            {id === '-1' ? 'New Car Visit' : 'Edit Car Visit'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Number</p>
          {id === '-1'
            ? (
              <div className="bg-white">
                <ReactSearchAutocomplete
                  placeholder="Enter Car Number Here..."
                  resultStringKeyName="name"
                  inputSearchString={SelectedCarNumber === '' || SelectedCarNumber === 'Enter Car Number Here...' ? '' : SelectedCarNumber}
                  styling={{
                    height: '40px', backgroundColor: '#F5F8FC', border: '2px', fontSize: '12px',
                  }}
                  items={CarsList}
                  onSearch={handleOnSearch}
                  onHover={handleOnHover}
                  onClear={() => setisFocused(false)}
                  onFocus={handleOnFocus}
                  maxResults={10}
                  formatResult={formatResult}
                />
              </div>
            )
            : <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>{carNumber}</p>}
          {Object.keys(DriverSelectedCarNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverSelectedCarNumberError[key]}
            </div>
          ))}
          <div className={isFocused === true ? 'bg-white pt-80 pb-5' : 'bg-white py-5'}>
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
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Name</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Enter Name Here..."
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
                  {Object.keys(DriverContactError).map((key) => (
                    <div style={{ color: 'red' }}>
                      {DriverContactError[key]}
                    </div>
                  ))}
                </div>
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverManagerName}
                    placeholder="Enter Name Here..."
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

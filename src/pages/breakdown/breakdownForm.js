/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Dropdown, notification, Select,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  addBreakdown, editBreakdown, getCarDetailsList, getCarsListEverest, getBreakdownDetails, checkExistingCarDetails,
} from 'services/axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useParams, useHistory } from 'react-router-dom';

const { TextArea } = Input;

const carformpage = () => {
  // const location = useLocation();
  // const {
  //   carId, carnumber, visitcategory, driverName, driveContactNumber,
  // } = location.state;
  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    `${id === '-1' ? 'Add Car Breakdown' : 'Edit Car Breakdown'}`,
  ];

  const [carWithDriver, setCarWithDriver] = useState(true);
  const [breakdownType, setBreakdownType] = useState(true);
  const [isFocused, setisFocused] = useState(false);
  const [CarsList, setCarsList] = useState([]);
  const [cityID, setcityID] = useState(localStorage.getItem('cityid'));
  const [DriverName, setDriverName] = useState('');
  const [DriverContact, setDriverContact] = useState('');
  const [DriverManagerName, setDriverManagerName] = useState('');
  const [DriverNameError, setDriverNameError] = useState('');
  const [DriverContactError, setDriverContactError] = useState('');
  const [DriverManagerNameError, setDriverManagerNameError] = useState('');
  const [DriverVisitCategoryError, setDriverVisitCategoryError] = useState('');
  const [DriverSelectedCarNumberError, setDriverSelectedCarNumberError] = useState('');
  const [VisitCategory, setVisitCategory] = useState(10);
  const [SelectedCarID, setSelectedCarID] = useState(1);
  const [SelectedCarNumber, setSelectedCarNumber] = useState('');
  const [GarageID, setGarageID] = useState(localStorage.getItem('garageid'));
  const [LocationID, setLocationID] = useState(localStorage.getItem('locationid'));
  const [SelectedDriverID, setSelectedDriverID] = useState(0);
  const [SelectedDriverManagerID, setSelectedDriverManagerID] = useState(0);
  const [carNumber, setcarNumber] = useState('');
  const [locationName, setLocationName] = useState('');
  const [locationNameError, setLocationNameError] = useState([]);
  // const tempcityID = localStorage.getItem('cityid');
  // const tempGarageID = localStorage.getItem('garageid');
  // const tempLocationID = localStorage.getItem('locationid');
  // setcityID(tempcityID);
  // setGarageID(tempGarageID);
  // setLocationID(tempLocationID);

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

  useEffect(() => {
    getBreakdownDetails(id)
      .then((res) => {
        setSelectedCarNumber(res?.data?.results?.car_number);
        setCarWithDriver(res?.data?.results?.is_with_driver);
        setDriverName(res?.data?.results?.driver_name);
        setDriverContact(res?.data?.results?.driver_contact_number || '');
        setSelectedDriverManagerID(res?.data?.results?.driverManagerId);
        setDriverManagerName(res?.data?.results?.driver_manager_name);
        setVisitCategory(res?.data?.results?.visit_category);
        setSelectedCarID(res?.data?.results?.carId);
        setLocationName(res?.data?.results?.breakdown_location);
        setBreakdownType(res?.data?.results?.breakdown_type === 1);
      })
      .catch((err) => {
        console.log('err1', err);
      });
  }, []);

  useEffect(() => {
    if (id === '-1') {
      getCarsListEverest(cityID).then((resp) => {
        setCarsList(resp?.data);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, []);

  const validateFormData = () => {
    const driverNameError = {};
    const selectedcarnumbererror = {};
    const driverManagerError = {};
    const driverVisitCategoryError = {};
    const locationError = {};
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
        if (locationName.trim().length === 0) {
          locationError.Err = 'This field can not be empty';
          isValid = false;
        }
      }

      setDriverVisitCategoryError(driverVisitCategoryError);
      setDriverContactError(mobileErr);
      setDriverNameError(driverNameError);
      setLocationNameError(locationError);
    }

    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();

    if (resp) {
      const breakdownData = {
        carId: SelectedCarID,
        car_number: SelectedCarNumber,
        is_with_driver: carWithDriver,
        driverId: SelectedDriverID,
        driver_name: DriverName,
        driver_contact_number: DriverContact,
        driverManagerId: SelectedDriverManagerID,
        driver_manager_name: DriverManagerName,
        breakdown_type: breakdownType === true ? 1 : 2,
        breakdown_location: locationName,
        garage: Number(GarageID),
        towing_required: false,
        status: 1,
      };
      if (id === '-1') {
        addBreakdown(breakdownData)
          .then((res) => {
            notification.success({
              message: 'Breakdown Added successfully',
            });
            window.location.href = '#/breakdown/breakdownHome';
          })
          .catch((err) => {
            notification.error({
              message: err.response.data.message,
            });
          });
      } else {
        editBreakdown(id, breakdownData)
          .then((res) => {
            notification.success({
              message: 'Breakdown Edited successfully',
            });
            window.location.href = '#/breakdown/breakdownHome';
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
    if (string === '') {
      setisFocused(false);
    } else {
      setisFocused(true);
    }
  };

  const handleOnHover = (result) => {
    // the item hovered
    setSelectedCarID(result);
    const temp = CarsList.filter((item) => item.id === result);
    setSelectedCarNumber(temp[0].name);
    // setisFocused(false);
    getCarDetails(result);
  };

  const formatResult = (item) => (
    <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
  );
  return (
    <>
      <Helmet title="Breakdown" />
      <div className="flex flex-col space-y-12 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            {id === '-1' ? 'Add Car Breakdown' : 'Edit Car Breakdown'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-sm">Car Details</p>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Number</p>
          {id === '-1'
            ? (
              <div className="bg-white">
                {/* <ReactSearchAutocomplete
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
                /> */}
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
            )
            : <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>{SelectedCarNumber}</p>}
          {Object.keys(DriverSelectedCarNumberError).map((key) => (
            <div style={{ color: 'red' }}>
              {DriverSelectedCarNumberError[key]}
            </div>
          ))}
          <div className={isFocused === true ? 'bg-white pt-80 pb-5' : 'bg-white py-5'}>
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
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Name</p>
                <div className="flex flex-nonwrap bg-white">
                  <Input
                    value={DriverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    placeholder="Enter Driver Name Here..."
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
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Location of Breakdown</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Location Name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(locationNameError).map((key) => (
              <div style={{ color: 'red' }}>
                {locationNameError[key]}
              </div>
            ))}
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Type of Breakdown</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Radio.Group onChange={(e) => setBreakdownType(e.target.value)} value={breakdownType}>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Jumpstart</Radio>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Mechanical</Radio>
            </Radio.Group>
          </div>
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

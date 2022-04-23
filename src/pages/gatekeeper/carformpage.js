/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Dropdown,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { addCarVisit, editCarVisit, getCarDetailsList, getCarsListEverest } from 'services/axios';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useLocation } from 'react-router-dom';

const { TextArea } = Input;
const nestedPath = [
  'Home',
  'New Car Visit',
];

const carformpage = () => {
  const location = useLocation();
  const {
    carId, carnumber
  } = location.state;
  const [radioValue, setRadioValue] = useState(true);
  const [CarsList, setCarsList] = useState([]);
  const [DriverName, setDriverName] = useState("");
  const [DriverContact, setDriverContact] = useState("");
  const [DriverManagerName, setDriverManagerName] = useState("");
  const [DriverNameError, setDriverNameError] = useState("");
  const [DriverContactError, setDriverContactError] = useState("");
  const [DriverManagerNameError, setDriverManagerNameError] = useState("");
  const [VisitCategory, setVisitCategory] = useState(1);
  const [SelectedCarID, setSelectedCarID] = useState(0);
  const [SelectedCarNumber, setSelectedCarNumber] = useState("");
  const [GarageID, setGarageID] = useState("");
  const [LocationID, setLocationID] = useState("");
  const [SelectedDriverID, setSelectedDriverID] = useState(0);
  const [SelectedDriverManagerID, setSelectedDriverManagerID] = useState("");
  const [isCarWithDriver, setisCarWithDriver] = useState(true);

  useEffect(() => {
    if (carId === -1) {
      getCarsListEverest().then((resp) => {
        console.log(resp?.data);
        setCarsList(resp?.data);
        const tempGarageID = localStorage.getItem('garageid');
        const tempLocationID = localStorage.getItem('locationid');
        setGarageID(tempGarageID);
        setLocationID(tempLocationID);
        //setCarsList(resp?.data);
      })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      const tempGarageID = localStorage.getItem('garageid');
      const tempLocationID = localStorage.getItem('locationid');
      setGarageID(tempGarageID);
      setLocationID(tempLocationID);
      getCarDetails(carId);
    }
  }, []);

  const getCarDetails = (id) => {
    getCarDetailsList(id).then((resp) => {
      console.log(resp?.data);
      setDriverName(resp?.data[0].driver_name);
      setDriverContact(resp?.data[0].mobile);
      setDriverManagerName(resp?.data[0].manager_name);
      setSelectedDriverID(resp?.data[0].driver_id);
      setSelectedDriverManagerID(resp?.data[0].manager_id);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }

  const validateFormData = () => {
    const driverNameError = {};
    const driverContactError = {};
    const driverManagerError = {};
    let isValid = true;
    if (DriverName.trim().length === 0) {
      driverNameError.err = 'Driver name can not be empty';
      isValid = false;
    } else {

    }
    if (DriverContact.trim().length === 0) {
      driverContactError.err = 'Driver Contact can not be empty';
      isValid = false;
    } else {

    }
    if (DriverManagerName.trim().length === 0) {
      driverManagerError.err = 'Driver Manager name can not be empty';
      isValid = false;
    } else {

    }

    setDriverNameError(driverNameError);
    setDriverContactError(driverContactError);
    setDriverManagerNameError(driverManagerError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    console.log(resp);

    if (resp) {
      if (carId === -1) {
        addCarVisit(VisitCategory, SelectedCarID, SelectedCarNumber, GarageID, isCarWithDriver, SelectedDriverID, DriverName, DriverContact, SelectedDriverManagerID, DriverManagerName, LocationID)
          .then((res) => {
            console.log('res', res);
            alert('Visit Added successfully');
            window.location.href = '#/gatekeeper/homepage';
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        editCarVisit(VisitCategory, SelectedCarID, GarageID, isCarWithDriver, SelectedDriverID, DriverName, DriverContact, SelectedDriverManagerID, DriverManagerName, LocationID)
          .then((res) => {
            console.log('res', res);
            alert('Visit Edited successfully');
            window.location.href = '#/gatekeeper/homepage';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }

    } else {

    }
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
  }

  const handleOnHover = (result) => {
    // the item hovered
    getCarDetails(result.id);
    setSelectedCarID(result.id);
    setSelectedCarNumber(result.name);
  }

  const handleOnSelect = (item) => {
    // the item selected
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }
  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-4">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-xl mr-3.5">
            {carId === -1 ? "New Car Visit" : "Edit Car Visit"}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Number</p>
          {carId === -1 ?
            <div className="bg-white">
              <ReactSearchAutocomplete
                placeholder="Enter Car Number Here..."
                styling={{ height: '40px', backgroundColor: '#F5F8FC', border: '2px', fontSize: "12px" }}
                items={CarsList}
                onSearch={handleOnSearch}
                onHover={handleOnHover}
                onSelect={handleOnSelect}
                onFocus={handleOnFocus}
                autoFocus
                formatResult={formatResult}
              />
            </div> :
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>{carnumber}</p>}
          <div className="bg-white py-5">
            <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Is Car with Driver?</p>
            <div className="flex flex-row flex-nonwrap bg-white">
              <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Yes</Radio>
                <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>No</Radio>
              </Radio.Group>
            </div>
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Name</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              value={DriverName}
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Contact Number</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              value={DriverContact}
              placeholder="Enter Contact Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driver Manager Name</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              value={DriverManagerName}
              placeholder="Enter Name Here..."
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Reason for Visit</p>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(4)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Servicing
            </Button>
            <Button
              onClick={() => setVisitCategory(5)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Repair
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(3)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Regular Audit
            </Button>
            <Button
              onClick={() => setVisitCategory(1)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              60:40 Jama
            </Button>
          </div>
          <div className="flex flex-row flex-nonwrap">
            <Button
              onClick={() => setVisitCategory(2)}
              className="font-quicksand-medium"
              style={{ marginTop: '10px', marginLeft: '10px' }}
            >
              Leasing Car Jama
            </Button>
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

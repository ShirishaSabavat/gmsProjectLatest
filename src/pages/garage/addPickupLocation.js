/* eslint-disable camelcase */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import {
  Input, Button, Radio,
} from 'antd';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  addPickupLocation, getPickupLocation, editPickupLocation,
} from 'services/axios';
import { useLocation } from 'react-router-dom';

const createModules = () => {
  const location = useLocation();
  const { locationId, garage_id } = location.state;
  const nestedPath = [
    'Home',
    `${locationId === -1 ? 'Add Location' : 'Edit Location'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [pickupLocation, setPickupLocationName] = useState('');
  const [pickupLocationError, setPickupLocationError] = useState({});

  useEffect(() => {
    getPickupLocation(locationId)
      .then((res) => {
        console.log(res);
        setPickupLocationName(res.data.results?.name);
        setRadioValue(res.data.results?.isActive);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    // const pickupLocationError = {};
    let isValid = true;

    if (pickupLocation.trim().length === 0) {
      pickupLocationError.err = 'Pickup Location can not be empty';
      isValid = false;
    }
    setPickupLocationError(pickupLocationError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('pname', pickupLocation);
    console.log('locationid', locationId);
    console.log('garage_id', garage_id);
    const resp = validateFormData();
    if (resp) {
      if (locationId !== -1) {
        console.log('in edit');
        editPickupLocation(pickupLocation, radioValue, garage_id, locationId)
          .then((res) => {
            console.log('res', res);
            alert('Location Updated Successfully');
            window.location = '#/garage/garagelist';
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addPickupLocation(pickupLocation, radioValue, garage_id)
          .then((res) => {
            console.log('res', res);
            alert('Location Added Successfully');
            window.location = '#/garage/garagelist';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <div className="row px-4">
      <div className="space-y-2 basic-1/2">
        <span className="font-quicksand-semi-bold text-4xl mr-3.5">
          {locationId === -1 ? 'Add Location' : 'Edit Location'}
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Location</h6>
        <Input placeholder="Location Name" value={pickupLocation} onChange={(e) => setPickupLocationName(e.target.value)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
        {Object.keys(pickupLocationError).map((key) => (
          <div style={{ color: 'red' }}>
            {pickupLocationError[key]}
          </div>
        ))}
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Status</h6>
        <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
          <Radio style={{ color: '#9193A2' }} value={true} className="font-quicksand-semi-bold">Active</Radio>
          <Radio style={{ color: '#9193A2' }} value={false} className="font-quicksand-semi-bold">Inactive</Radio>
        </Radio.Group>
      </div>

      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick={onSave}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default createModules;

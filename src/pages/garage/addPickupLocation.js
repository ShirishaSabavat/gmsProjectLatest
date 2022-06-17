/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import {
  Input, Button, Radio, notification,
} from 'antd';
import {
  addPickupLocation, getPickupLocation, editPickupLocation,
} from 'services/axios';
import { useHistory, useParams } from 'react-router-dom';

const createModules = () => {
  const { locationId, garageId } = useParams();
  const history = useHistory();

  const [radioValue, setRadioValue] = useState(true);
  const [pickupLocationName, setPickupLocationName] = useState('');
  const [pickupLocationError, setPickupLocationError] = useState({});

  useEffect(() => {
    getPickupLocation(locationId)
      .then((res) => {
        setPickupLocationName(res.data.results[0]?.name);
        setRadioValue(res.data.results[0]?.isActive);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    const pickupLocationErr = {};
    let isValid = true;

    if (pickupLocationName.trim().length === 0) {
      pickupLocationErr.err = 'Pickup Location can not be empty';
      isValid = false;
    }
    setPickupLocationError(pickupLocationErr);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    if (resp) {
      if (locationId !== '-1') {
        editPickupLocation(pickupLocationName, radioValue, garageId, locationId)
          .then((res) => {
            notification.success({
              message: 'Location Updated Successfully',
            });
            history.push(`/garage/locationlist/${garageId}`);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        addPickupLocation(pickupLocationName, radioValue, garageId)
          .then((res) => {
            notification.success({
              message: 'Location Added Successfully',
            });
            history.push(`/garage/locationlist/${garageId}`);
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
          {locationId === '-1' ? 'Add Location' : 'Edit Location'}
        </span>
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Location</h6>
        <Input placeholder="Location Name" value={pickupLocationName} onChange={(e) => setPickupLocationName(e.target.value)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
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

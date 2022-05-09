/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, notification,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import { addCity, editCity, getCityData } from 'services/axios';

// const { TextArea } = Input;
const addcity = () => {
  const [radioValue, setRadioValue] = useState(true);
  const [cityName, setCityName] = useState('');
  // const [description, setDescription] = useState('');
  const [garageSeries, setGarageSeries] = useState('');
  const [userSeries, setUserSeries] = useState('');
  const [cityError, setCityError] = useState({});
  // const [descriptionError, setDescriptionError] = useState({});
  const [garageError, setGarageError] = useState({});
  const [userError, setUserError] = useState({});
  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    `${id === '-1' ? 'Add New City' : 'Edit City'}`,
  ];

  useEffect(() => {
    getCityData(id)
      .then((res) => {
        console.log('mod', res?.data?.results);
        setCityName(res?.data?.results?.name);
        // setDescription(res?.data?.results?.description);
        setGarageSeries(res?.data?.results?.garage_series);
        setUserSeries(res?.data?.results?.user_series);
        setRadioValue(res?.data?.results?.isActive);
      })
      .catch((err) => {
        console.log('err1', err);
      });
  }, []);

  const validateFormData = () => {
    const cityNameError = {};
    // const descriptionNameError = {};
    const garageNameError = {};
    const userNameError = {};
    let isValid = true;

    if (cityName.trim().length === 0) {
      cityNameError.err = 'City name can not be empty';
      isValid = false;
    }
    // if (description.trim().length === 0) {
    //   descriptionNameError.err = 'City description can not be empty';
    //   isValid = false;
    // }
    if (garageSeries.trim().length === 0) {
      garageNameError.err = 'Garage series can not be empty';
      isValid = false;
    }
    if (userSeries.trim().length === 0) {
      userNameError.err = 'User series can not be empty';
      isValid = false;
    }

    setCityError(cityNameError);
    // setDescriptionError(descriptionNameError);
    setGarageError(garageNameError);
    setUserError(userNameError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('cName', cityName);
    // console.log('des', description);
    console.log('garage', garageSeries);
    console.log('user', userSeries);
    const resp = validateFormData();
    console.log(resp);
    if (resp) {
      if (id !== '-1') {
        console.log('in edit');
        editCity(cityName, radioValue, garageSeries, userSeries, id)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'City Edited Successfully',
            });
            setTimeout(() => {
              history.push('/cities/citieslist');
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: err.response.data.errors[0].msg,
            });
            // setTimeout(() => {
            //   history.push('/cities/citieslist');
            // }, 1000);
          });
      } else {
        console.log('in add');
        addCity(cityName, radioValue, garageSeries, userSeries)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'City Added Successfully',
            });
            setTimeout(() => {
              history.push('/cities/citieslist');
            }, 1000);
          })
          .catch((err) => {
            console.log('err22', err.response.data.errors[0].msg);
            notification.error({
              message: err.response.data.errors[0].msg,
            });
            // setTimeout(() => {
            //   history.push('/cities/citieslist');
            // }, 1000);
          });
      }
    }
  };

  return (
    <>
      <Helmet title="Cities" />
      <div className="flex flex-col space-y-12" style={{ fontFamily: 'Quicksand' }}>
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {id === '-1' ? 'Add New City' : 'Edit City'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>City Name</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input placeholder="CITY NAME" value={cityName} onChange={(e) => setCityName(e.target.value)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
            {Object.keys(cityError).map((key) => (
              <div style={{ color: 'red' }}>
                {cityError[key]}
              </div>
            ))}
          </div>
          {/* <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Description</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Enter Description Here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(descriptionError).map((key) => (
              <div style={{ color: 'red' }}>
                {descriptionError[key]}
              </div>
            ))}

          </div> */}
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Garage Series</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              placeholder="Enter Garage Series Here..."
              value={garageSeries}
              onChange={(e) => setGarageSeries(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(garageError).map((key) => (
              <div style={{ color: 'red' }}>
                {garageError[key]}
              </div>
            ))}
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Series</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              placeholder="Enter User Series Here..."
              value={userSeries}
              onChange={(e) => setUserSeries(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(userError).map((key) => (
              <div style={{ color: 'red' }}>
                {userError[key]}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>City Status</p>
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={true}>Active</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
          </Radio.Group>
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            {id === '-1' ? 'Add New City' : 'Edit City'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addcity;

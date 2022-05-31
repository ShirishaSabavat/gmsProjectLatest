/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Menu, Dropdown, Button, Radio, notification,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  getAllCities, addGarageApi, editGarageApi, getGarageById,
} from 'services/axios';
import { useParams, useHistory } from 'react-router-dom';

const { TextArea } = Input;

const addgarage = () => {
  const { id } = useParams();
  const history = useHistory();

  const [garageTitle, setGarageTitle] = useState('');
  // const [garageDescription, setGarageDescription] = useState('');
  const [garageSeries, setGarageSeries] = useState('');
  const [userSeries, setUserSeries] = useState('');
  const [radioValue, setRadioValue] = useState(true);
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const [garageError, setGarageError] = useState({});
  // const [descriptionError, setDescriptionError] = useState({});
  const [cityError, setCityError] = useState({});
  const [garageSeriesError, setGarageSeriesError] = useState({});
  const [userSeriesError, setUserSeriesError] = useState({});

  const nestedPath = [
    'Home',
    `${id === '-1' ? 'Add New Garage' : 'Edit Garage'}`,
  ];

  const menu = (
    <Menu onClick={(e) => setSelectedItem(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {dropDownMenu?.map((data) => (
        <Menu.Item key={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    getAllCities()
      .then((res) => {
        console.log('resp', res?.data?.results);
        setDropDownMenu(res?.data?.results);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getGarageById(id)
      .then((res) => {
        console.log('getResp', res?.data?.results);
        setGarageTitle(res?.data?.results[0]?.name);
        setRadioValue(res?.data?.results[0]?.isActive);
        // setGarageDescription(res?.data?.results[0]?.description);
        setSelectedItem(res?.data?.results[0]?.city);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const validateFormData = () => {
    const garageNameError = {};
    // const descriptionNameError = {};
    const citySelectError = {};
    const garageSeriesNameError = {};
    const userSeriesNameError = {};
    let isValid = true;

    if (garageTitle.trim().length === 0) {
      garageNameError.err = 'Garage title can not be empty';
      isValid = false;
    }
    // if (garageDescription.trim().length === 0) {
    //   descriptionNameError.err = 'Description can not be empty';
    //   isValid = false;
    // }
    if (!selectedItem) {
      citySelectError.err = 'Select city';
      isValid = false;
    }
    // if (garageSeries.trim().length === 0) {
    //   garageSeriesNameError.err = 'Garage series can not be empty';
    //   isValid = false;
    // }
    // if (userSeries.trim().length === 0) {
    //   userSeriesNameError.err = 'User series can not be empty';
    //   isValid = false;
    // }

    setGarageError(garageNameError);
    // setDescriptionError(descriptionNameError);
    setCityError(citySelectError);
    setGarageSeriesError(garageSeriesNameError);
    setUserSeriesError(userSeriesNameError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    console.log(resp);
    console.log('garagetitle', garageTitle);
    // console.log('garagedescription', garageDescription);
    console.log('selectedItem', selectedItem);
    console.log('garageseries', garageSeries);
    console.log('userseries', userSeries);
    console.log('radioValue', radioValue);
    console.log('id', id);

    if (resp) {
      if (id !== '-1') {
        console.log('in edit');
        // eslint-disable-next-line max-len
        editGarageApi(garageTitle, selectedItem, radioValue, id)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Garage updated successfully',
            });
            setTimeout(() => {
              history.push('/garage/garagelist');
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addGarageApi(garageTitle, selectedItem, radioValue)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Garage added successfully',
            });
            setTimeout(() => {
              history.push('/garage/garagelist');
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <>
      <Helmet title="Garages" />
      <div className="flex flex-col space-y-12 mx-5">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {id === '-1' ? 'Add New Garage' : 'Edit Garage'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Garage Title</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              value={garageTitle}
              onChange={(e) => setGarageTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
          {Object.keys(garageError).map((key) => (
            <div style={{ color: 'red' }}>
              {garageError[key]}
            </div>
          ))}
          {/* <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Description</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Enter Description Here..."
              value={garageDescription}
              onChange={(e) => setGarageDescription(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
          {Object.keys(descriptionError).map((key) => (
            <div style={{ color: 'red' }}>
              {descriptionError[key]}
            </div>
          ))} */}
        </div>
        <div className="bg-white p-5">
          <p>Select City</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Dropdown overlay={menu}>
              <Button
                className="w-100"
                style={{
                  backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
                }}
              >
                <div className="row">
                  <div span={22} className="col-6 text-start font-quicksand-medium">
                    {dropDownMenu.find((x) => x.id === selectedItem)?.name || 'Select from Cities'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>
          {Object.keys(cityError).map((key) => (
            <div style={{ color: 'red' }}>
              {cityError[key]}
            </div>
          ))}
        </div>
        {/* <div className="bg-white p-5">
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
          </div>
          {Object.keys(garageSeriesError).map((key) => (
            <div style={{ color: 'red' }}>
              {garageSeriesError[key]}
            </div>
          ))}
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
          </div>
          {Object.keys(userSeriesError).map((key) => (
            <div style={{ color: 'red' }}>
              {userSeriesError[key]}
            </div>
          ))}
        </div> */}
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Garage Status</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Active</Radio>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
            </Radio.Group>
          </div>
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
    </>
  );
};

export default addgarage;

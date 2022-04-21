/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Menu, Dropdown,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  getUserProfiles, getPickupLocationByGarageId, addTeamApi, editTeamApi,
} from 'services/axios';
import { useLocation } from 'react-router-dom';
import { DropdownMenu } from 'reactstrap';

const { TextArea } = Input;

const addteam = () => {
  const location = useLocation();
  const {
    id, garageId, locationId, teamId, garage_name, garage_description
  } = location.state;

  const nestedPath = [
    'Home',
    `${id === -1 ? 'Add Team' : 'Edit Team'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [profileList, setProfileList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamTitle, setTeamTitle] = useState(garage_name);
  const [teamError, setTeamError] = useState({});
  const [selectedLocationID, setSelectedLocationID] = useState('');
  const [teamDescription, setTeamDescription] = useState(garage_description);
  const [teamDescriptionError, setTeamDescriptionError] = useState('');
  const [garageSeries, setGarageSeries] = useState('');
  const [userSeries, setUserSeries] = useState('');
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);
  const [cityError, setCityError] = useState({});

  const userRoleMenu = (
    <Menu onClick={(e) => { setSelectedItem(Number(e.key)) }} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {dropDownMenu?.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    getPickupLocationByGarageId(garageId)
      .then((res) => {
        console.log('garageList', res);
        setDropDownMenu(res?.data?.results?.pageData);
        getUserProfiles(0).then((resp) => {
          console.log('res', res);
          setProfileList(resp.data?.results.pageData);
        })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  const AddToArray = (id) => {
    setSelectedUsers([...selectedUsers, id]);
  }

  const RemoveFromArray = (id) => {
    const tempUsers = selectedUsers;
    console.log(tempUsers);
    const tempindex = tempUsers.indexOf(id);
    tempUsers.splice(tempindex, 1);
    setSelectedItem(tempUsers);
  }
  const validateFormData = () => {
    const teamNameError = {};
    const descriptionNameError = {};
    const citySelectError = {};
    let isValid = true;
    if (teamTitle.trim().length === 0) {
      teamNameError.err = 'Team title can not be empty';
      isValid = false;
    }
    if (teamDescription.trim().length === 0) {
      descriptionNameError.err = 'Description can not be empty';
      isValid = false;
    }
    if (!selectedItem) {
      citySelectError.err = 'Select city';
      isValid = false;
      alert('Select city');
    }
    // if (garageSeries.trim().length === 0) {
    //   garageSeriesNameError.err = 'Garage series can not be empty';
    //   isValid = false;
    // }
    // if (userSeries.trim().length === 0) {
    //   userSeriesNameError.err = 'User series can not be empty';
    //   isValid = false;
    // }

    setTeamError(teamNameError);
    setTeamDescriptionError(descriptionNameError);
    setCityError(citySelectError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    console.log(resp);
    console.log('teamtitle', teamTitle);
    console.log('teamdescription', teamDescription);
    console.log('selectedItem', selectedItem);
    console.log('garageid', garageId);
    console.log('locationid', locationId);
    console.log('radioValue', radioValue);

    if (resp) {
      if (id !== -1) {
        console.log('in edit');
        // eslint-disable-next-line max-len
        editTeamApi(teamTitle, '', teamDescription, locationId, garageId, teamId)
          .then((res) => {
            console.log('res', res);
            alert('Team edited successfully');
            window.location.href = '#/garage/garagelist';
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addTeamApi(teamTitle, teamDescription, locationId, garageId)
          .then((res) => {
            console.log('res', res);
            alert('Team added successfully');
            window.location.href = '#/garage/garagelist';
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-5">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {id === -1 ? 'Add Team' : 'Edit Team'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team Title</p>
          <div className="flex flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              value={teamTitle}
              onChange={(e) => setTeamTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          {Object.keys(teamError).map((key) => (
            <div style={{ color: 'red' }}>
              {teamError[key]}
            </div>
          ))}
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Description</p>
          <div className="flex flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Enter Description Here..."
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />

          </div>
          {Object.keys(teamDescriptionError).map((key) => (
            <div style={{ color: 'red' }}>
              {teamDescriptionError[key]}
            </div>
          ))}
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team Status</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value>Active</Radio>
              <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
            </Radio.Group>
          </div>
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Location</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Dropdown overlay={userRoleMenu}>
              <Button
                className="w-100"
                style={{
                  backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
                }}
              >
                <div className="row">
                  <div span={22} className="col-6 text-start font-quicksand-medium">
                    {dropDownMenu.find((x) => x.id === selectedItem)?.name || 'Select Location'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>

        </div>
        <div>
          {profileList.map((item) => (
            <div className={selectedUsers.includes(item.id) ? "h-36 flex flex-row flex-nonwrap bg-white rounded-lg my-3 mx-8 border-2 border-cyan-500" : "h-36 flex flex-row flex-nonwrap bg-white rounded-lg my-3 mx-8"}>
              <Button
                onClick={() => selectedUsers.includes(item.id) ? RemoveFromArray(item.id) : AddToArray(item.id)}
                className="font-quicksand-medium"
                style={{ marginTop: '50px', marginLeft: '30px' }}
              >
                {selectedUsers.includes(item.id) ? "Remove" : "Add"}
              </Button>
              <img className="w-28 h-28 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/defaultperson.jpg')} />
              <div>
                <h1 className="font-quicksand-bold text-2xl mt-6">{item.first_name}</h1>
                <h1 className="font-quicksand-semi-bold text-xl mt-6">{item.user_name}</h1>
              </div>

            </div>
          )
          )}
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            {id === -1 ? 'Add Team' : 'Edit Team'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addteam;

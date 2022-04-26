/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Menu, Dropdown, notification,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  getUserProfiles, getPickupLocationByGarageId, addTeamApi, editTeamApi,
} from 'services/axios';
import { useParams, useHistory } from 'react-router-dom';
import { DropdownMenu } from 'reactstrap';

const { TextArea } = Input;

const addteam = () => {
  const {
    teamId, garageId, locationId, garageName, team_name, team_description,
  } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    `${teamId === '-1' ? 'Add Team' : 'Edit Team'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [profileList, setProfileList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamTitle, setTeamTitle] = useState(team_name === '-1' ? '' : team_name);
  const [teamError, setTeamError] = useState({});
  const [selectedLocationID, setSelectedLocationID] = useState('');
  const [teamDescription, setTeamDescription] = useState(team_description === '-1' ? '' : team_description);
  const [teamDescriptionError, setTeamDescriptionError] = useState('');
  const [garageSeries, setGarageSeries] = useState('');
  const [userSeries, setUserSeries] = useState('');
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState(Number(locationId));
  const [cityError, setCityError] = useState({});

  const userRoleMenu = (
    <Menu onClick={(e) => { setSelectedItem(Number(e.key)); }} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
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
          console.log('res', resp);
          setProfileList(resp.data?.results.pageData);
          setSelectedItem(Number(locationId));
        })
          .catch((err) => {
            console.log('err', err);
          });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const AddToArray = (itemId) => {
    setSelectedUsers([...selectedUsers, itemId]);
  };

  const RemoveFromArray = (itemId) => {
    const tempUsers = selectedUsers;
    console.log(tempUsers);
    const tempindex = tempUsers.indexOf(itemId);
    tempUsers.splice(tempindex, 1);
    setSelectedItem(tempUsers);
  };
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
    console.log('locationid', Number(locationId));
    console.log('radioValue', radioValue);

    if (resp) {
      if (teamId !== '-1') {
        console.log('in edit');
        // eslint-disable-next-line max-len
        editTeamApi(teamTitle, '', teamDescription, Number(locationId), garageId, teamId)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Team edited successfully',
            });
            setTimeout(() => {
              history.push(`/garage/teamslist/${garageId}/${garageName}`);
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addTeamApi(teamTitle, teamDescription, Number(locationId), garageId)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Team added successfully',
            });
            setTimeout(() => {
              history.push(`/garage/teamslist/${garageId}/${garageName}`);
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
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-5">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {teamId === '-1' ? 'Add Team' : 'Edit Team'}
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
            {Object.keys(cityError).map((key) => (
              <div style={{ color: 'red' }}>
                {cityError[key]}
              </div>
            ))}
          </div>

        </div>
        <div className="bg-white p-0">
          {profileList.map((item) => (
            <div className={selectedUsers.includes(item.id) ? 'h-36 flex flex-row flex-nonwrap bg-white rounded-lg my-3 mx-8 border-2 border-cyan-500' : 'h-36 flex flex-row flex-nonwrap bg-white rounded-lg my-3 mx-8'}>
              <Button
                onClick={() => (selectedUsers.includes(item.id) ? RemoveFromArray(item.id) : AddToArray(item.id))}
                className="font-quicksand-medium"
                style={{ marginTop: '50px', marginLeft: '30px' }}
              >
                {selectedUsers.includes(item.id) ? 'Remove' : 'Add'}
              </Button>
              <img className="w-28 h-28 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/defaultperson.jpg')} />
              <div>
                <h1 className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '50px', marginLeft: '30px' }}>{item.first_name}</h1>
                <h1 className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginLeft: '30px' }}>{item.user_name}</h1>
              </div>

            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            {teamId === '-1' ? 'Add Team' : 'Edit Team'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addteam;

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
import { getUserProfiles, getPickupLocationByGarageId } from 'services/axios';
import { useLocation } from 'react-router-dom';
import { DropdownMenu } from 'reactstrap';

const { TextArea } = Input;

const addteam = () => {
  const location = useLocation();
  const { teamId, garageId } = location.state;

  const nestedPath = [
    'Home',
    `${teamId === -1 ? 'Add Team' : 'Edit Team'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [profileList, setProfileList] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [teamTitle, setTeamTitle] = useState('');
  const [teamError, setTeamError] = useState({});
  const [teamDescription, setTeamDescription] = useState('');
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState([]);

  const userRoleMenu = (
    <Menu onClick={(e) => setSelectedItem(e.key)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {dropDownMenu?.map((data, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={key} value={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    getUserProfiles(0).then((res) => {
      console.log('res', res);
      setProfileList(res.data?.results.pageData);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getPickupLocationByGarageId(garageId)
      .then((res) => {
        console.log('garageList', res);
        setDropDownMenu(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  // function AddToArray(id) {
  //   const tempUsers = [];
  //   tempUsers.push(id);
  //   setSelectedUsers(tempUsers);
  // }
  return (
    <>
      <Helmet title="Teams" />
      <div className="flex flex-col space-y-12 mx-5">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {teamId === -1 ? 'Add Team' : 'Edit Team'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Team Title</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              value={teamTitle}
              onChange={(e) => setTeamTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(teamError).map((key) => (
              <div style={{ color: 'red' }}>
                {teamError[key]}
              </div>
            ))}
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Description</p>
          <div className="flex flex-row flex-nonwrap bg-white">
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
            <div className="h-36 flex flex-row flex-nonwrap bg-white rounded-lg my-3 mx-8 w-2/6">
              <img className="w-28 h-28 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/defaultperson.jpg')} />
              <div>
                <h1 className="font-quicksand-bold text-2xl mt-6">{item.first_name}</h1>
                <h1 className="font-quicksand-semi-bold text-xl mt-6">{item.user_name}</h1>
              </div>
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '150px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Add Team
          </Button>
        </div>
      </div>
    </>
  );
};

export default addteam;

/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Menu, Dropdown, Radio, Button, Checkbox, DatePicker,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';
import {
  addRole, editRole, getModules, addRoleModule, getRoles, getAllCities, getAllGarages,
} from 'services/axios';

const nestedPath = [
  'Home',
  'User Roles',
  'Create New User',
];

const { TextArea } = Input;

const addrole = () => {
  const location = useLocation();
  const { id } = location.state;

  const [radioValue, setRadioValue] = useState(true);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleError, setRoleError] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [checkboxError, setCheckboxError] = useState('');
  const [userRoleDropDown, setUserRoleDropDown] = useState([]);
  const [roleSelect, setRoleSelect] = useState('');
  const [cityDropdown, setCityDropDown] = useState([]);
  const [citySelect, setCitySelect] = useState('');
  const [garageDropdown, setGarageDropDown] = useState([]);
  const [garageSelect, setGarageSelect] = useState('');

  const userRoleMenu = (
    <Menu onClick={(e) => setRoleSelect(e.key)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {userRoleDropDown?.map((data, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={key} value={data.id}>
          {data.role}
        </Menu.Item>
      ))}
    </Menu>
  );

  const cityMenu = (
    <Menu onClick={(e) => setCitySelect(e.key)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {cityDropdown?.map((data, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={key} value={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const garageMenu = (
    <Menu onClick={(e) => setGarageSelect(e.key)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {garageDropdown?.map((data, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={key} value={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    getModules()
      .then((res) => {
        console.log('mod', res?.data?.results?.pageData);
        const data = res?.data?.results?.pageData.map((item) => ({
          Module_ID: item.id,
          Module_Name: item.module,
          processes: item?.processes,
        }));
        setCheckboxList(data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getRoles()
      .then((res) => {
        console.log('rolesResp', res?.data?.results?.pageData);
        setUserRoleDropDown(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getAllCities()
      .then((res) => {
        console.log('resp', res?.data?.results);
        setCityDropDown(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getAllGarages()
      .then((res) => {
        console.log('garageResp', res?.data?.results);
        setGarageDropDown(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckboxValue([...checkboxValue, e.target.value]);
    } else {
      setCheckboxValue(checkboxValue.filter((item) => item !== e.target.value));
    }
  };

  const validateFormData = () => {
    const roleNameError = {};
    const checkboxValueError = {};
    let isValid = true;

    if (roleTitle.trim().length === 0) {
      roleNameError.err = 'Role name can not be empty';
      isValid = false;
    }

    if (checkboxValue.length === 0) {
      checkboxValueError.err = 'Please select at least one module';
      isValid = false;
    }

    setRoleError(roleNameError);
    setCheckboxError(checkboxValueError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('roleTitle', roleTitle);
    console.log('chkval', checkboxValue);
    const resp = validateFormData();
    if (resp) {
      if (id !== -1) {
        console.log('in edit');
        editRole(roleTitle, radioValue, id)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addRole(roleTitle)
          .then((res) => {
            console.log('respp', res?.data?.results?.id);
            const data = res?.data?.results?.id;
            checkboxValue.forEach((item) => {
              addRoleModule(data, item)
                .then((response) => {
                  console.log('response', response);
                })
                .catch((err) => {
                  console.log('err', err);
                });
            });
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <>
      <Helmet title="User" />
      <div className="flex flex-col space-y-12">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            Create User
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Name</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/3">
              <Input
                placeholder="First Name"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>

            <div className="flex basis-1/3">
              <Input
                placeholder="Middle Name"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>

            <div className="flex basis-1/3">
              <Input
                placeholder="Last Name"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>
          </div>
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Select User Role</p>
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
                    {userRoleDropDown[roleSelect]?.role || 'Select Role'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
            {Object.keys(roleError).map((key) => (
              <div style={{ color: 'red' }}>
                {roleError[key]}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Email Id</p>
            </div>
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Mobile Number</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <Input
                placeholder="Email Id"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>
            <div className="flex basis-1/2">
              <Input
                placeholder="Mobile Number"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>User Address</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Ultra Vision Optics, Borivali, Mumbai"
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
        </div>

        <div className="bg-white p-5">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driving License Number</p>
            </div>
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>License Validity</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <Input
                placeholder="License Number"
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>
            <div className="flex basis-1/2">
              <DatePicker
                value={roleTitle}
                onChange={(e) => setRoleTitle(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                }}
              />
              {Object.keys(roleError).map((key) => (
                <div style={{ color: 'red' }}>
                  {roleError[key]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Select City</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Dropdown overlay={cityMenu}>
              <Button
                className="w-100"
                style={{
                  backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
                }}
              >
                <div className="row">
                  <div span={22} className="col-6 text-start font-quicksand-medium">
                    {cityDropdown[citySelect]?.name || 'Select City'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>
          {Object.keys(roleError).map((key) => (
            <div style={{ color: 'red' }}>
              {roleError[key]}
            </div>
          ))}

          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Select Garage</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Dropdown overlay={garageMenu}>
              <Button
                className="w-100"
                style={{
                  backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
                }}
              >
                <div className="row">
                  <div span={22} className="col-6 text-start font-quicksand-medium">
                    {garageDropdown[garageSelect]?.name || 'Select Garage'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>
          {Object.keys(roleError).map((key) => (
            <div style={{ color: 'red' }}>
              {roleError[key]}
            </div>
          ))}
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>User Name</p>
          <div className="flex">
            <Input
              placeholder="Username"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
              }}
            />
            {Object.keys(roleError).map((key) => (
              <div style={{ color: 'red' }}>
                {roleError[key]}
              </div>
            ))}
          </div>

          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Password</p>
          <div className="flex">
            <Input
              placeholder="********"
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
              }}
            />
            {Object.keys(roleError).map((key) => (
              <div style={{ color: 'red' }}>
                {roleError[key]}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Status</p>
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={true}>Active</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
          </Radio.Group>
        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Assign Additional Processes</p>
          <div className="box-border h-100">
            {checkboxList.map((item) => (
              <div className="flex flex-row flex-nowrap">
                <h1 className="text-base font-quicksand-semi-bold basis-1/7 bg-white p-4 mr-0.5">
                  {item.Module_Name}
                </h1>
                <div className="flex flex-row flex-nowrap">
                  {item?.processes.map((data) => (
                    <Checkbox value={data.id} onChange={handleChange}>{data.process}</Checkbox>
                  ))}
                </div>
              </div>
            ))}
            {Object.keys(checkboxError).map((key) => (
              <div style={{ color: 'red' }}>
                {checkboxError[key]}
              </div>
            ))}
          </div>
        </div>

        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '140px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Add Role
          </Button>
        </div>
      </div>
    </>
  );
};

export default addrole;

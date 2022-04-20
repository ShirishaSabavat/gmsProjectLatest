/* eslint-disable no-unused-vars */
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
  editUserData, editUserProfile, getModules, getRoles, getAllCities, getAllGarages, addUserData, addUserProfile, addUserRole, addUserProcess, getUserProfile,
} from 'services/axios';
import moment from 'moment';

const { TextArea } = Input;

const CRUD = {
  create: 'Add',
  edit: 'Edit',
  view: 'View',
  deActive: 'Delete',
};

const addrole = () => {
  const location = useLocation();
  const { id } = location.state;

  const nestedPath = [
    'Home',
    'User Roles',
    `${id === -1 ? 'Create New User' : 'Edit User'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [fName, setFName] = useState('');
  const [mName, setMName] = useState('');
  const [lName, setLName] = useState('');
  const [userRoleDropDown, setUserRoleDropDown] = useState([]);
  const [roleSelect, setRoleSelect] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [address, setAddress] = useState('');
  const [license, setLicense] = useState('');
  const [licenseValidity, setLicenseValidity] = useState('');
  const [cityDropdown, setCityDropDown] = useState([]);
  const [citySelect, setCitySelect] = useState('');
  const [garageDropdown, setGarageDropDown] = useState([]);
  const [garageSelect, setGarageSelect] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);

  const [fNameError, setFNameError] = useState({});
  const [lNameError, setLNameError] = useState({});
  const [userRoleError, setUserRoleError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [mobileError, setMobileError] = useState({});
  const [addressError, setAddressError] = useState({});
  const [licenseError, setLicenseError] = useState({});
  const [licenseValidityError, setLicenseValidityError] = useState({});
  const [cityError, setCityError] = useState({});
  const [garageError, setGarageError] = useState({});
  const [userNameError, setUserNameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [processError, setProcessError] = useState({});

  const userRoleMenu = (
    <Menu onClick={(e) => setRoleSelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {userRoleDropDown?.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={data.id}>
          {data.role}
        </Menu.Item>
      ))}
    </Menu>
  );

  const cityMenu = (
    <Menu onClick={(e) => setCitySelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {cityDropdown?.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const garageMenu = (
    <Menu onClick={(e) => setGarageSelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {garageDropdown?.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={data.id}>
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
    getUserProfile(id)
      .then((res) => {
        console.log('getProfResp1', res?.data?.results);
        setFName(res?.data?.results?.first_name);
        setMName(res?.data?.results?.middle_name);
        setLName(res?.data?.results?.last_name);
        setUserName(res?.data?.results?.user_name);
        setAddress(res?.data?.results?.user_profile?.address);
        setLicense(res?.data?.results?.user_profile?.driving_license_no);
        // setLicenseValidity(res?.data?.results?.user_profile?.license_validity);
        setEmail(res?.data?.results?.user_profile?.email);
        setContactNo(res?.data?.results?.user_profile?.mobile_no);
        setRoleSelect(res?.data?.results?.roles[0]?.id);
        setCitySelect(res?.data?.results?.user_profile?.cityId);
        setGarageSelect(res?.data?.results?.user_profile?.garageId);
        let data = res?.data?.results?.processes;
        console.log('dataaaaaa', data);
        data = data.map((obj) => obj);
        setCheckboxValue(data);
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
      // console.log('permissions', permissions);
    } else {
      setCheckboxValue(checkboxValue.filter((item) => item !== e.target.value));
    }
  };

  const handlePermissionChange = (data, checked) => {
    console.log(data, 'datadatadata');
    console.log(checked, 'checkedchecked');
  };

  const dateFormat = 'DD/MM/YYYY';
  const onDateChange = (date) => {
    const dateSelected = moment(date);
    setLicenseValidity(dateSelected);
  };

  const validateFormData = () => {
    const fNameErr = {};
    const lNameErr = {};
    const userRoleSelectErr = {};
    const emailErr = {};
    const mobileErr = {};
    const addressErr = {};
    const licenseErr = {};
    const licenseValidityErr = {};
    const citySelectErr = {};
    const garageSelectErr = {};
    const userNameErr = {};
    const passwordErr = {};
    const processErr = {};
    const regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    const numCheck = /^[0-9\b]+$/;

    let isValid = true;

    if (fName.trim().length === 0) {
      fNameErr.err = 'First name can not be empty';
      isValid = false;
    }

    if (lName.trim().length === 0) {
      lNameErr.err = 'Last name can not be empty';
      isValid = false;
    }

    if (!roleSelect) {
      userRoleSelectErr.err = 'Please Select User Role';
      isValid = false;
    }

    if (!regexEmail.test(email)) {
      emailErr.emailErr = 'The email must be a valid email address.';
      isValid = false;
    }

    if (email.trim().length === 0) {
      emailErr.emailErr = "Email Id can't be empty";
      isValid = false;
    }

    if (contactNo.trim().length < 10 || contactNo.trim().length > 10) {
      mobileErr.pinErr = 'Mobile Number should be of 10 digits only';
      isValid = false;
    }

    if (!numCheck.test(contactNo)) {
      mobileErr.pinErr = 'Only digits allowed';
      isValid = false;
    }

    if (contactNo.trim().length === 0) {
      mobileErr.pinErr = 'This field can not be empty';
      isValid = false;
    }

    if (address.trim().length === 0) {
      addressErr.addressErr = 'Address can not be empty';
      isValid = false;
    }

    if (license.trim().length === 0) {
      licenseErr.licenseErr = 'Driving License can not be empty';
      isValid = false;
    }

    if (licenseValidity === '') {
      licenseValidityErr.err = 'License Expiry Date can not be empty';
      isValid = false;
    }

    if (!citySelect) {
      citySelectErr.err = 'Please Select City';
      isValid = false;
    }

    if (!garageSelect) {
      garageSelectErr.err = 'Please Select Garage';
      isValid = false;
    }

    if (userName.trim().length === 0) {
      userNameErr.err = 'User Name can not be empty';
      isValid = false;
    }

    if (password.trim().length === 0) {
      passwordErr.err = 'Password can not be empty';
      isValid = false;
    }

    if (checkboxValue.length === 0) {
      processErr.err = 'Please select at least one process';
      isValid = false;
    }

    setFNameError(fNameErr);
    setLNameError(lNameErr);
    setUserRoleError(userRoleSelectErr);
    setEmailError(emailErr);
    setMobileError(mobileErr);
    setAddressError(addressErr);
    setLicenseError(licenseErr);
    setLicenseValidityError(licenseValidityErr);
    setCityError(citySelectErr);
    setGarageError(garageSelectErr);
    setUserNameError(userNameErr);
    setPasswordError(passwordErr);
    setProcessError(processErr);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();

    const userData = {
      fName,
      mName,
      lName,
      userName,
      password,
    };

    const userProfileData = {
      address,
      email,
      contactNo,
      license,
      licenseValidity: moment(licenseValidity).format('YYYY-MM-DD'),
      cityId: cityDropdown[citySelect]?.id,
      garageId: garageDropdown[garageSelect]?.id,
    };

    const userRoleData = {
      roleId: userRoleDropDown[roleSelect]?.id,
    };

    if (resp) {
      if (id !== -1) {
        console.log('in edit');
        editUserData(userData, id)
          .then((res) => {
            console.log('res', res);
            editUserProfile(userProfileData, id)
              .then((editUserProfResp) => {
                console.log('editUserProfResp', editUserProfResp);
                addUserRole(userRoleData, id)
                  .then((userRoleResp) => {
                    console.log(userRoleResp);
                    checkboxValue.forEach((item) => {
                      addUserProcess(item, id)
                        .then((userProcessResp) => {
                          console.log(userProcessResp);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log('err', err);
                  });
              })
              .catch((err) => {
                console.log('err', err);
              });
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        addUserData(userData)
          .then((res) => {
            console.log('userDataResp', res);
            const userId = res?.data?.results?.id;
            addUserProfile(userProfileData, userId)
              .then((userProfileResp) => {
                console.log(userProfileResp);
                addUserRole(userRoleData, userId)
                  .then((userRoleResp) => {
                    console.log(userRoleResp);
                    checkboxValue.forEach((item) => {
                      addUserProcess(item, userId)
                        .then((userProcessResp) => {
                          console.log(userProcessResp);
                        })
                        .catch((err) => {
                          console.log('err', err);
                        });
                    });
                  })
                  .catch((err) => {
                    console.log('err', err);
                  });
              })
              .catch((err) => {
                console.log(err);
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
      <div className="flex flex-col space-y-8">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            {id === -1 ? 'Create New User' : 'Edit User'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>

        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Name</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/3">
              <div className="flex">
                <Input
                  placeholder="First Name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(fNameError).map((key) => (
                <div style={{ color: 'red' }}>
                  {fNameError[key]}
                </div>
              ))}
            </div>

            <div className="flex flex-col basis-1/3">
              <div className="flex">
                <Input
                  placeholder="Middle Name"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col basis-1/3">
              <div className="flex">
                <Input
                  placeholder="Last Name"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(lNameError).map((key) => (
                <div style={{ color: 'red' }}>
                  {lNameError[key]}
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
                    {userRoleDropDown.find((x) => x.id === roleSelect)?.role || 'Select Role'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>
          {Object.keys(userRoleError).map((key) => (
            <div style={{ color: 'red' }}>
              {userRoleError[key]}
            </div>
          ))}
        </div>

        <div className="bg-white p-4">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Email Id</p>
            </div>
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Mobile Number</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Input
                  placeholder="Email Id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(emailError).map((key) => (
                <div style={{ color: 'red' }}>
                  {emailError[key]}
                </div>
              ))}
            </div>
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Input
                  placeholder="Mobile Number"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(mobileError).map((key) => (
                <div style={{ color: 'red' }}>
                  {mobileError[key]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>User Address</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="USER ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
          </div>
          {Object.keys(addressError).map((key) => (
            <div style={{ color: 'red' }}>
              {addressError[key]}
            </div>
          ))}
        </div>

        <div className="bg-white p-4">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Driving License Number</p>
            </div>
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>License Validity</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Input
                  placeholder="License Number"
                  value={license}
                  onChange={(e) => setLicense(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(licenseError).map((key) => (
                <div style={{ color: 'red' }}>
                  {licenseError[key]}
                </div>
              ))}
            </div>
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <DatePicker
                  onChange={onDateChange}
                  value={licenseValidity}
                  format={dateFormat}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
                  }}
                />
              </div>
              {Object.keys(licenseValidityError).map((key) => (
                <div style={{ color: 'red' }}>
                  {licenseValidityError[key]}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white p-4">
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
                    {cityDropdown.find((x) => x.id === citySelect)?.name || 'Select City'}
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
                    {garageDropdown.find((x) => x.id === garageSelect)?.name || 'Select Garage'}
                  </div>
                  <div span={2} className="col-6 text-end">
                    <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                  </div>
                </div>
              </Button>
            </Dropdown>
          </div>
          {Object.keys(garageError).map((key) => (
            <div style={{ color: 'red' }}>
              {garageError[key]}
            </div>
          ))}
        </div>

        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>User Name</p>
          <div className="flex">
            <Input
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
              }}
            />
          </div>
          {Object.keys(userNameError).map((key) => (
            <div style={{ color: 'red' }}>
              {userNameError[key]}
            </div>
          ))}

          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px', marginTop: '24px' }}>Password</p>
          <div className="flex">
            <Input
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '85%',
              }}
            />
          </div>
          {Object.keys(passwordError).map((key) => (
            <div style={{ color: 'red' }}>
              {passwordError[key]}
            </div>
          ))}
        </div>

        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Status</p>
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={true}>Active</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
          </Radio.Group>
        </div>

        <div className="bg-white p-4">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Assign Additional Processes</p>
          <div className="box-border h-100">
            {checkboxList.map((item) => (
              <div className="flex flex-col flex-nowrap flex-auto">
                {item?.processes.length > 0 && (
                  <>
                    <h1 className="flex flex-row text-base font-quicksand-semi-bold bg-white p-4 mr-0.5">
                      {item.Module_Name}
                    </h1>
                    <div className="flex flex-col flex-nowrap font-quicksand-semi-bold bg-slate-200 py-1 px-4 mr-0.5">
                      {item?.processes.map((data) => (
                        <div className="flex flex-row">
                          <div className="my-3 mx-0 basis-1/4">
                            <Checkbox value={data.id} onChange={handleChange} checked={checkboxValue.includes(data.id)}>
                              {data.process}
                            </Checkbox>
                          </div>
                          <div className="my-3 mx-0 basis-3/4">
                            {console.log(data, 'dataaaaaaaaaaaaaa')}
                            {checkboxValue.map((key) => (
                              key === data.id && (
                                <>
                                  <Checkbox
                                    checked={data.permission.view}
                                    onChange={({ target: { checked } }) => handlePermissionChange(data, checked)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    View
                                  </Checkbox>
                                  <Checkbox
                                    checked={data.permission.create}
                                    onChange={({ target: { checked } }) => handlePermissionChange(data, checked)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    Create
                                  </Checkbox>
                                  <Checkbox
                                    checked={data.permission.edit}
                                    onChange={({ target: { checked } }) => handlePermissionChange(data, checked)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    Edit
                                  </Checkbox>
                                  <Checkbox
                                    checked={data.permission.deActive}
                                    onChange={({ target: { checked } }) => handlePermissionChange(data, checked)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    Delete
                                  </Checkbox>
                                </>
                              )
                            ))}

                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
            {Object.keys(processError).map((key) => (
              <div style={{ color: 'red' }}>
                {processError[key]}
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
            {id === -1 ? 'Add User' : 'Edit User'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addrole;

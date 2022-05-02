/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Menu, Dropdown, Radio, Button, Checkbox, DatePicker, notification,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { useParams, useHistory } from 'react-router-dom';
import {
  editUserData,
  editUserProfile,
  getModules,
  getRoles,
  getAllCities,
  getAllGaragesByCityId,
  getLocationsByGarageId,
  addUserData,
  addUserProfile,
  addUserRole,
  addUserProcess,
  getUserProfile,
} from 'services/axios';
import moment from 'moment';
import validator from 'validator';

const { TextArea } = Input;

const CRUD = {
  create: 'Add',
  edit: 'Edit',
  view: 'View',
  deActive: 'Delete',
};

const addrole = () => {
  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    'User Roles',
    `${id === '-1' ? 'Create New User' : 'Edit User'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [fName, setFName] = useState('');
  const [mName, setMName] = useState('');
  const [lName, setLName] = useState('');
  const [userRoleDropDown, setUserRoleDropDown] = useState([]);
  const [roleSelect, setRoleSelect] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  // const [address, setAddress] = useState('');
  const [license, setLicense] = useState('');
  const [licenseValidity, setLicenseValidity] = useState('');
  const [cityDropdown, setCityDropDown] = useState([]);
  const [citySelect, setCitySelect] = useState('');
  const [garageDropdown, setGarageDropDown] = useState([]);
  const [locationDropDown, setLocationDropDown] = useState([]);
  const [garageSelect, setGarageSelect] = useState('');
  const [locationSelect, setLocationSelect] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);

  const [fNameError, setFNameError] = useState({});
  const [lNameError, setLNameError] = useState({});
  const [userRoleError, setUserRoleError] = useState({});
  const [emailError, setEmailError] = useState({});
  const [mobileError, setMobileError] = useState({});
  // const [addressError, setAddressError] = useState({});
  const [licenseError, setLicenseError] = useState({});
  const [licenseValidityError, setLicenseValidityError] = useState({});
  const [cityError, setCityError] = useState({});
  const [garageError, setGarageError] = useState({});
  const [locationError, setLocationError] = useState({});
  const [userNameError, setUserNameError] = useState({});
  const [passwordError, setPasswordError] = useState({});
  const [processError, setProcessError] = useState({});

  const userRoleMenu = (
    <Menu onClick={(e) => setRoleSelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {userRoleDropDown?.map((data) => (
        <Menu.Item key={data.id}>
          {data.role}
        </Menu.Item>
      ))}
    </Menu>
  );

  const cityMenu = (
    <Menu onClick={(e) => setCitySelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {cityDropdown?.map((data) => (
        <Menu.Item key={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const garageMenu = (
    <Menu onClick={(e) => setGarageSelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {garageDropdown?.map((data) => (
        <Menu.Item key={data.id}>
          {data.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const locationMenu = (
    <Menu onClick={(e) => setLocationSelect(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {locationDropDown?.map((data) => (
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
    getAllGaragesByCityId(citySelect || 0)
      .then((res) => {
        console.log('garageResp', res?.data?.results);
        setGarageDropDown(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [citySelect || 0]);

  useEffect(() => {
    getLocationsByGarageId(garageSelect || 0)
      .then((res) => {
        console.log('locationResp', res?.data?.results);
        setLocationDropDown(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, [garageSelect || 0]);

  useEffect(() => {
    getUserProfile(Number(id))
      .then((res) => {
        console.log('getProfResp1', res?.data?.results);
        setFName(res?.data?.results?.first_name);
        setMName(res?.data?.results?.middle_name);
        setLName(res?.data?.results?.last_name);
        setUserName(res?.data?.results?.user_name);
        // setAddress(res?.data?.results?.user_profile?.address);
        setRadioValue(res?.data?.results?.isActive);
        setLicense(res?.data?.results?.user_profile?.driving_license_no);
        let tempDate = res?.data?.results?.user_profile?.license_validity;
        tempDate = moment(tempDate);
        console.log('tempDate', tempDate);
        setLicenseValidity(tempDate);
        setEmail(res?.data?.results?.user_profile?.email);
        setContactNo(res?.data?.results?.user_profile?.mobile_no);
        setRoleSelect(res?.data?.results?.roles[0]?.id);
        setCitySelect(res?.data?.results?.user_profile?.cityId);
        setGarageSelect(res?.data?.results?.user_profile?.garageId);
        setLocationSelect(res?.data?.results?.user_profile?.locationId);
        let data = res?.data?.results?.processes;
        console.log('dataaaaaaa', data);
        data = data.map((obj) => obj);
        setCheckboxValue(data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleChange = (e) => {
    const tempDataObj = {
      id: e.target.value,
      permission: {
        view: false,
        create: false,
        edit: false,
        deActive: false,
      },
    };
    if (e.target.checked) {
      // console.log(...checkboxValue);
      setCheckboxValue([...checkboxValue, tempDataObj]);
    } else {
      setCheckboxValue(checkboxValue.filter((item) => item.id !== e.target.value));
    }
  };

  const handlePermissionChange = (data, target) => {
    const { checked, name } = target;
    const dataTemp = {
      ...data,
      permission: {
        ...data.permission,
        [name]: checked,
      },
    };
    // console.log(data, dataTemp, 'datadatadata');
    const checkboxValueTemp = checkboxValue.map(({ id: tempId, ...keys }) => (
      tempId === dataTemp.id ? dataTemp : { id: tempId, ...keys }
    ));
    setCheckboxValue(checkboxValueTemp);
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
    // const addressErr = {};
    // const licenseErr = {};
    // const licenseValidityErr = {};
    const citySelectErr = {};
    const garageSelectErr = {};
    const locationSelectErr = {};
    const userNameErr = {};
    const passwordErr = {};
    // const processErr = {};
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

    if (validator.isEmail(email)) {
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

    // if (address.trim().length === 0) {
    //   addressErr.addressErr = 'Address can not be empty';
    //   isValid = false;
    // }

    // if (license.trim().length === 0) {
    //   licenseErr.licenseErr = 'Driving License can not be empty';
    //   isValid = false;
    // }

    // if (licenseValidity === '') {
    //   licenseValidityErr.err = 'License Expiry Date can not be empty';
    //   isValid = false;
    // }

    if (!citySelect) {
      citySelectErr.err = 'Please Select City';
      isValid = false;
    }

    if (!garageSelect) {
      garageSelectErr.err = 'Please Select Garage';
      isValid = false;
    }

    if (!locationSelect) {
      locationSelectErr.err = 'Please Select Location';
      isValid = false;
    }

    if (userName.trim().length === 0) {
      userNameErr.err = 'User Name can not be empty';
      isValid = false;
    }

    if (id === '-1' && password.trim().length === 0) {
      passwordErr.err = 'Password can not be empty';
      isValid = false;
    }

    // if (checkboxValue.length === 0) {
    //   processErr.err = 'Please select at least one process';
    //   isValid = false;
    // }

    setFNameError(fNameErr);
    setLNameError(lNameErr);
    setUserRoleError(userRoleSelectErr);
    setEmailError(emailErr);
    setMobileError(mobileErr);
    // setAddressError(addressErr);
    // setLicenseError(licenseErr);
    // setLicenseValidityError(licenseValidityErr);
    setCityError(citySelectErr);
    setGarageError(garageSelectErr);
    setLocationError(locationSelectErr);
    setUserNameError(userNameErr);
    setPasswordError(passwordErr);
    // setProcessError(processErr);
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
      radioValue,
    };

    const editUser = {
      fName,
      mName,
      lName,
      userName,
      radioValue,
    };

    const userProfileData = {
      email,
      contactNo,
      license,
      licenseValidity: moment(licenseValidity).format('YYYY-MM-DD'),
      cityId: citySelect,
      garageId: garageSelect,
      locationId: locationSelect,
    };

    const userRoleData = {
      roleId: roleSelect,
    };
    console.log('EDIT RESP', resp);
    console.log('EDIT USERDATA', userData);
    console.log('EDIT PROFILE', userProfileData);
    console.log('EDIT ROLE', userRoleData);
    console.log('EDIT checkData', checkboxValue);

    if (resp) {
      if (id !== '-1') {
        console.log('in edit');
        editUserData(editUser, Number(id))
          .then((res) => {
            console.log('res', res);
            editUserProfile(userProfileData, Number(id))
              .then((editUserProfResp) => {
                console.log('editUserProfResp', editUserProfResp);
                addUserRole(userRoleData, Number(id))
                  .then((userRoleResp) => {
                    console.log(userRoleResp);
                    addUserProcess(checkboxValue, Number(id))
                      .then((userProcessResp) => {
                        console.log(userProcessResp);
                        // alert('User Profile Edited Successfully');
                        notification.success({
                          message: 'User Profile Edited Successfully',
                        });
                        setTimeout(() => {
                          history.push('/userProfiles/userProfiles');
                        }, 1000);
                      })
                      .catch((err) => {
                        console.log('err', err);
                        notification.success({
                          message: 'Something went wrong, Please try again later',
                        });
                        setTimeout(() => {
                          history.push('/userProfiles/userProfiles');
                        }, 1000);
                      });
                  })
                  .catch((err) => {
                    console.log('err', err);
                    notification.success({
                      message: 'Something went wrong, Please try again later',
                    });
                    setTimeout(() => {
                      history.push('/userProfiles/userProfiles');
                    }, 1000);
                  });
              })
              .catch((err) => {
                console.log('err', err);
                notification.success({
                  message: 'Something went wrong, Please try again later',
                });
                setTimeout(() => {
                  history.push('/userProfiles/userProfiles');
                }, 1000);
              });
          })
          .catch((err) => {
            console.log('err', err);
            notification.success({
              message: 'Something went wrong, Please try again later',
            });
            setTimeout(() => {
              history.push('/userProfiles/userProfiles');
            }, 1000);
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
                    addUserProcess(checkboxValue, userId)
                      .then((userProcessResp) => {
                        console.log('USER PROCS RESP', userProcessResp);
                        notification.success({
                          message: 'User added successfully',
                        });
                        setTimeout(() => {
                          history.push('/userProfiles/userProfiles');
                        }, 1000);
                      })
                      .catch((err) => {
                        console.log('err', err);
                        notification.error({
                          message: err.response.data.errors[0].msg,
                        });
                        // setTimeout(() => {
                        //   history.push('/userProfiles/userProfiles');
                        // }, 1000);
                      });
                  })
                  .catch((err) => {
                    console.log('err', err);
                    notification.error({
                      message: err.response.data.errors[0].msg,
                    });
                    // setTimeout(() => {
                    //   history.push('/userProfiles/userProfiles');
                    // }, 1000);
                  });
              })
              .catch((err) => {
                console.log(err);
                notification.error({
                  message: err.response.data.errors[0].msg,
                });
                // setTimeout(() => {
                //   history.push('/userProfiles/userProfiles');
                // }, 1000);
              });
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: err.response.data.errors[0].msg,
            });
            // setTimeout(() => {
            //   history.push('/userProfiles/userProfiles');
            // }, 1000);
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
            {id === '-1' ? 'Create New User' : 'Edit User'}
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>

        <div className="bg-white p-4">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/3 mx-1">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>First Name</p>
            </div>
            <div className="flex basis-1/3 mx-1">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Middle Name</p>
            </div>
            <div className="flex basis-1/3 mx-1">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Last Name</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/3">
              <div className="flex basis-3/4 mx-1">
                <Input
                  placeholder="First Name"
                  value={fName}
                  onChange={(e) => setFName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC',
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
              <div className="flex basis-3/4 mx-1">
                <Input
                  placeholder="Middle Name"
                  value={mName}
                  onChange={(e) => setMName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC',
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col basis-1/3">
              <div className="flex basis-3/4 mx-1">
                <Input
                  placeholder="Last Name"
                  value={lName}
                  onChange={(e) => setLName(e.target.value)}
                  style={{
                    padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC',
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
                className="w-1/3"
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
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>User Name</p>
            </div>
            {id === '-1' && (
              <div className="flex basis-1/2">
                <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Password</p>
              </div>
            )}
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Input
                  placeholder="Username"
                  value={userName}
                  disabled={id !== '-1'}
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
            </div>
            {id === '-1' && (
              <div className="flex flex-col basis-1/2">
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
            )}
          </div>
        </div>

        <div className="bg-white p-4">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Select City</p>
            </div>
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Select Garage</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Dropdown overlay={cityMenu}>
                  <Button
                    style={{
                      backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A', width: '85%',
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
            </div>
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Dropdown overlay={garageMenu}>
                  <Button
                    style={{
                      backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A', width: '85%',
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
          </div>
        </div>

        <div className="bg-white p-4">
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex basis-1/2">
              <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Select Location</p>
            </div>
          </div>
          <div className="flex flex-row flex-nonwrap bg-white">
            <div className="flex flex-col basis-1/2">
              <div className="flex">
                <Dropdown overlay={locationMenu}>
                  <Button
                    style={{
                      backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A', width: '85%',
                    }}
                  >
                    <div className="row">
                      <div span={22} className="col-6 text-start font-quicksand-medium">
                        {locationDropDown.find((x) => x.id === locationSelect)?.name || 'Select Location'}
                      </div>
                      <div span={2} className="col-6 text-end">
                        <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
                      </div>
                    </div>
                  </Button>
                </Dropdown>
              </div>
              {Object.keys(locationError).map((key) => (
                <div style={{ color: 'red' }}>
                  {locationError[key]}
                </div>
              ))}
            </div>
          </div>
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

        {/* <div className="bg-white p-4">
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
        </div> */}

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
                            <Checkbox value={data.id} onChange={handleChange} checked={checkboxValue.find((x) => x.id === data.id)}>
                              {data.process}
                            </Checkbox>
                          </div>
                          <div className="my-3 mx-0 basis-3/4">
                            {checkboxValue.map((key) => (
                              key.id === data.id && (
                                <>
                                  <Checkbox
                                    checked={key.permission.view}
                                    name="view"
                                    onChange={({ target }) => handlePermissionChange(key, target)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    View
                                  </Checkbox>
                                  <Checkbox
                                    checked={key.permission.create}
                                    name="create"
                                    onChange={({ target }) => handlePermissionChange(key, target)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    Create
                                  </Checkbox>
                                  <Checkbox
                                    checked={key.permission.edit}
                                    name="edit"
                                    onChange={({ target }) => handlePermissionChange(key, target)}
                                    style={{ margin: '0 0 0 15%' }}
                                  >
                                    Edit
                                  </Checkbox>
                                  <Checkbox
                                    checked={key.permission.deActive}
                                    name="deActive"
                                    onChange={({ target }) => handlePermissionChange(key, target)}
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
            {id === '-1' ? 'Add User' : 'Edit User'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addrole;

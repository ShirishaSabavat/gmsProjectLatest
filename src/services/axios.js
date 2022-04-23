/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';

export const loginApi = async (userData) => {
  const { variables: { userName, password } } = userData;
  const data = JSON.stringify({
    user_name: userName,
    password,
  });
  try {
    const resp = await axios({
      method: 'POST',
      url: 'http://13.126.183.78:8086/api/v1/user/login',
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    console.log(resp.data.results.user.roles[0].role);
    localStorage.setItem('token', resp?.data?.results?.token);
    const user = `${resp?.data?.results?.user?.first_name} ${resp?.data?.results?.user?.last_name}`;
    localStorage.setItem('user', user);
    localStorage.setItem('garageid', resp?.data?.results?.user?.teams[0].garageId)
    localStorage.setItem('locationid', resp?.data?.results?.user?.teams[0].locationId)
    localStorage.setItem('role', resp?.data?.results?.user?.roles[0].role)
    return resp;
  } catch (err) {
    console.log(err);
    return false;
  }
};

// const apiToken = localStorage.getItem('token');
const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
  'Content-Type': 'application/json',
};

export const addModule = (moduleName, radioValue) => {
  console.log(moduleName);
  const data = JSON.stringify({
    module: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/modules',
    headers,
    data,
  });
};

export const getModuleById = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/modules/${id}`,
  headers,
});

export const getUserRoles = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/role?page=${page}&size=10`,
  headers,
});
export const getUserProfiles = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/user?page=${page}&size=10`,
  headers,
});
export const getModule = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/modules?page=${page}&size=10`,
  headers,
});

export const getGarages = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/garage?page=${page}&size=10`,
  headers,
});

export const getAllGarages = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/garage',
  headers,
});

export const getGarageById = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/garage/${id}`,
  headers,
});

export const getTeamGarages = (page, garageid) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/team/?garage_id=${garageid}page=${page}&size=10`,
  headers,
});
export const editModule = (moduleName, radioValue, moduleId) => {
  const data = JSON.stringify({
    module: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/modules/${moduleId}`,
    headers,
    data,
  });
};

export const addProcess = (processName, radioValue, selectedItem) => {
  console.log(processName, radioValue, selectedItem, 'axios');
  const data = JSON.stringify({
    process: processName,
    moduleId: selectedItem,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/process',
    headers,
    data,
  });
};

export const getModules = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/modules',
  headers,
});

export const getCities = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/city?page=${page}&size=10`,
  headers,
});

export const getAllCities = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/city',
  headers,
});

export const getProcess = (page) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/process?page=${page}&size=10`,
  headers,
});

export const getProcessById = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/process/${id}`,
  headers,
});

// AXIOS FOR PROCESS EDITING
export const editProcess = (processName, radioValue, selectedItem, processId) => {
  const data = JSON.stringify({
    process: processName,
    moduleId: selectedItem,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/process/${processId}`,
    headers,
    data,
  });
};

// City axios

export const addCity = (cityName, radioValue, garageSeries, userSeries) => {
  const data = JSON.stringify({
    name: cityName,
    user_series: userSeries,
    garage_series: garageSeries,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/city',
    headers,
    data,
  });
};

export const editCity = (cityName, radioValue, garageSeries, userSeries, processId) => {
  const data = JSON.stringify({
    name: cityName,
    user_series: userSeries,
    garage_series: garageSeries,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/city/${processId}`,
    headers,
    data,
  });
};

export const getCityData = (cityId) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/city/${cityId}`,
  headers,
});

// User Roles axios

export const addRole = (roleTitle) => {
  console.log(roleTitle);
  const data = JSON.stringify({
    role: roleTitle,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/role',
    headers,
    data,
  });
};

export const editRole = (roleTitle, roleId) => {
  const data = JSON.stringify({
    role: roleTitle,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/role/${roleId}`,
    headers,
    data,
  });
};

export const getRoles = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/role',
  headers,
});

export const getRole = (roleId) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/role/${roleId}`,
  headers,
});

export const addRoleModule = (roleId, moduleId) => {
  const data = JSON.stringify({
    roleId,
    moduleId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/modules/roleModule',
    headers,
    data,
  });
};

export const addTeamApi = (name, description, locationid, garageid) => {
  const data = JSON.stringify({
    name,
    logourl: '',
    description,
    locationId: locationid,
    garageId: garageid,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/team',
    headers,
    data,
  });
};

export const editTeamApi = (name, logourl, description, locationId, garageId, teamID) => {
  const data = JSON.stringify({
    name,
    logourl,
    description,
    locationId,
    garageId,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/team/${teamID}`,
    headers,
    data,
  });
};

export const addGarageApi = (garageTitle, garageDescription, cityId, garageSeries) => {
  const data = JSON.stringify({
    name: garageTitle,
    description: garageDescription,
    cityId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/garage',
    headers,
    data,
  });
};

export const editGarageApi = (garageTitle, garageDescription, cityId, garageId) => {
  const data = JSON.stringify({
    name: garageTitle,
    description: garageDescription,
    cityId,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/garage/${garageId}`,
    headers,
    data,
  });
};

export const addPickupLocation = (name, radioValue, garageId) => {
  console.log(name, radioValue, garageId, 'axios');
  const data = JSON.stringify({
    name,
    garageId,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/pickupLocation',
    headers,
    data,
  });
};

export const getPickupLocations = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/pickupLocation',
  headers,
});

export const getPickupLocation = (locationId) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/pickupLocation/${locationId}`,
  headers,
});

// AXIOS FOR PROCESS EDITING
export const editPickupLocation = (name, radioValue, garageId, locationId) => {
  const data = JSON.stringify({
    name,
    isActive: radioValue,
    garageId,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/pickupLocation/${locationId}`,
    headers,
    data,
  });
};

export const getPickupLocationByGarageId = (garageId) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/pickupLocation/?garage_id=${garageId}`,
  headers,
});

// USER PROFILE AXIOS

export const addUserData = (userData) => {
  const data = JSON.stringify({
    first_name: userData.fName,
    middle_name: userData.mName,
    last_name: userData.lName,
    user_name: userData.userName,
    password: userData.password,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/user',
    headers,
    data,
  });
};

export const addUserProfile = (userProfileData, userId) => {
  const data = JSON.stringify({
    address: userProfileData.address,
    email: userProfileData.email,
    mobile_no: userProfileData.contactNo,
    driving_license_no: userProfileData.license,
    license_validity: userProfileData.licenseValidity,
    userId,
    cityId: userProfileData.cityId,
    garageId: userProfileData.garageId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/user/userProfile',
    headers,
    data,
  });
};

export const addUserRole = (userRoleData, userId) => {
  const data = JSON.stringify({
    userId,
    roleId: userRoleData.roleId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/role/userRole',
    headers,
    data,
  });
};

export const addUserProcess = (processId, userId) => {
  const data = JSON.stringify({
    userId,
    processId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/process/userProcess',
    headers,
    data,
  });
};

export const editUserData = (userData, userId) => {
  const data = JSON.stringify({
    first_name: userData.fName,
    middle_name: userData.mName,
    last_name: userData.lName,
    user_name: userData.userName,
    password: userData.password,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/user/${userId}`,
    headers,
    data,
  });
};

export const editUserProfile = (userProfileData, userId) => {
  const data = JSON.stringify({
    address: userProfileData.address,
    email: userProfileData.email,
    mobile_no: userProfileData.contactNo,
    driving_license_no: userProfileData.license,
    license_validity: userProfileData.licenseValidity,
    userId,
    cityId: userProfileData.cityId,
    garageId: userProfileData.garageId,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/user/userProfile/${userId}`,
    headers,
    data,
  });
};

export const getUserProfile = (userId) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/user/${userId}`,
  headers,
});

export const getRolesUI = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/role/initialiseRoleUI/${id}`,
  headers,
});

export const getCarsList = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/visitingCars?createdBy=${id}`,
  headers,
});

export const getCarsListEverest = () => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/visitingCars/fetchCarsFromEverest/1`,
  headers,
});

export const getCarsListJama = () => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/visitingCars?visit_category=1,2`,
  headers,
});

export const getCarDetailsList = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/visitingCars/fetchCarDetailsFromEverest/${id}/2022-04-07`,
  headers,
});

export const addCarVisit = (visitcat, carid, carnumber, garageid, isdriverwithcar, driverId, driverName, drivercontactnumber, drivermanagerid, drivermanagername, locationId) => {
  const data = JSON.stringify({
    visit_category: visitcat,
    carId: carid,
    car_number: carnumber,
    garageId: garageid,
    locationId,
    is_with_driver: isdriverwithcar,
    driverId,
    driver_name: driverName,
    drive_contact_number: drivercontactnumber,
    driverManagerId: drivermanagerid,
    driver_manager_name: drivermanagername,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `http://13.126.183.78:8086/api/v1/visitingCars`,
    headers,
    data,
  })
};

export const editCarVisit = (visitcat, carid, garageid, isdriverwithcar, driverId, driverName, drivercontactnumber, drivermanagerid, drivermanagername, locationId) => {
  const data = JSON.stringify({
    visit_category: visitcat,
    carId: carid,
    garageId: garageid,
    locationId,
    is_with_driver: isdriverwithcar,
    driverId,
    driver_name: driverName,
    drive_contact_number: drivercontactnumber,
    driverManagerId: drivermanagerid,
    driver_manager_name: drivermanagername,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `http://13.126.183.78:8086/api/v1/visitingCars`,
    headers,
    data,
  })
};

export const addRTAList = (visitid, garageid, isleasing, roadtestcomment) => {
  const data = JSON.stringify({
    visitId: visitid,
    garageId: garageid,
    is_leasing: isleasing,
    road_test_comments: roadtestcomment,
    jama_status: 1,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `http://13.126.183.78:8086/api/v1/roadTest`,
    headers,
    data,
  })
};

export const rejectRTAList = (visitid, visitcategory, rejectid, rejectreason) => {
  const data = JSON.stringify({
    visitId: visitid,
    previousAudit: visitcategory,
    currentAudit: rejectid,
    transfer_reason: rejectreason,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `http://13.126.183.78:8086/api/v1/auditTransfer`,
    headers,
    data,
  })
};

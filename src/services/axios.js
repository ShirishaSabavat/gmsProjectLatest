/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';
import Cookies from 'js-cookie';

let headers = {
  Authorization: `Bearer ${Cookies.get('token')}`,
  'Content-Type': 'application/json',
};

const baseUrl = 'http://13.126.183.78:8086/api/v1';

export const loginApi = async (userData) => {
  const { variables: { userName, password } } = userData;
  const data = JSON.stringify({
    user_name: userName,
    password,
  });
  try {
    const resp = await axios({
      method: 'POST',
      url: `${baseUrl}/user/login`,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
    const { user, token } = resp?.data?.results || {};
    Cookies.set('token', token);
    headers = {
      ...headers,
      Authorization: `Bearer ${Cookies.get('token') || token}`,
    };
    localStorage.setItem('token', token);
    localStorage.setItem('user', user?.first_name);
    localStorage.setItem('role', user?.roles[0]?.role);
    // if (!(user?.roles[0]?.role === null || user?.roles[0]?.role === undefined || user?.roles[0]?.role === 'Super Admin')) {
    localStorage.setItem('empid', user?.user_profile?.emp_id);
    localStorage.setItem('garageid', user?.user_profile?.garageId);
    localStorage.setItem('createdby', user?.id);
    localStorage.setItem('locationid', user?.user_profile?.locationId);
    localStorage.setItem('cityid', user?.user_profile?.cityId);
    // }
    return resp;
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const addModule = (moduleName, radioValue) => {
  console.log(moduleName);
  const data = JSON.stringify({
    module: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/modules`,
    headers,
    data,
  });
};

export const getModuleById = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/modules/${id}`,
  headers,
});

export const getUserRoles = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/role?page=${page}&size=10`,
  headers,
});
export const getUserProfiles = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/user?page=${page}&size=10`,
  headers,
});
export const getModule = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/modules?page=${page}&size=10`,
  headers,
});

export const getGarages = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/garage?page=${page}&size=10`,
  headers,
});

export const getAllGarages = () => axios({
  method: 'GET',
  url: `${baseUrl}/garage`,
  headers,
});

export const getAllGaragesByCityId = (cityId) => axios({
  method: 'GET',
  url: `${baseUrl}/garage/?cityId=${cityId}`,
  headers,
});

export const getLocationsByGarageId = (garageId) => axios({
  method: 'GET',
  url: `${baseUrl}/pickupLocation/?garageId=${garageId}`,
  headers,
});

export const getGarageById = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/garage/${id}`,
  headers,
});

export const getTeamGarages = (page, garageid) => axios({
  method: 'GET',
  url: `${baseUrl}/team/?garageId=${garageid}page=${page}&size=10`,
  headers,
});
export const editModule = (moduleName, radioValue, moduleId) => {
  const data = JSON.stringify({
    module: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/modules/${moduleId}`,
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
    url: `${baseUrl}/process`,
    headers,
    data,
  });
};

export const getModules = () => axios({
  method: 'GET',
  url: `${baseUrl}/modules`,
  headers,
});

export const getCities = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/city?page=${page}&size=10`,
  headers,
});

export const getAllCities = () => axios({
  method: 'GET',
  url: `${baseUrl}/city?isActive=1`,
  headers,
});

export const getProcess = (page) => axios({
  method: 'GET',
  url: `${baseUrl}/process?page=${page}&size=10`,
  headers,
});

export const getProcessById = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/process/${id}`,
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
    url: `${baseUrl}/process/${processId}`,
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
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/city`,
    headers,
    data,
  });
};

export const editCity = (cityName, radioValue, garageSeries, userSeries, processId) => {
  const data = JSON.stringify({
    name: cityName,
    user_series: userSeries,
    garage_series: garageSeries,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/city/${processId}`,
    headers,
    data,
  });
};

export const getCityData = (cityId) => axios({
  method: 'GET',
  url: `${baseUrl}/city/${cityId}`,
  headers,
});

// User Roles axios

export const addRole = (roleTitle, radioValue) => {
  console.log(roleTitle);
  const data = JSON.stringify({
    role: roleTitle,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/role`,
    headers,
    data,
  });
};

export const editRole = (roleTitle, roleId, radioValue) => {
  const data = JSON.stringify({
    role: roleTitle,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/role/${roleId}`,
    headers,
    data,
  });
};

export const getRoles = () => axios({
  method: 'GET',
  url: `${baseUrl}/role`,
  headers,
});

export const getRole = (roleId) => axios({
  method: 'GET',
  url: `${baseUrl}/role/${roleId}`,
  headers,
});

export const addRoleModule = (roleId, roleModules) => {
  const data = [];
  roleModules.forEach((item) => {
    data.push({
      roleId,
      moduleId: item,
    });
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/modules/bulkRoleModules`,
    headers,
    data,
  });
};

export const addTeamApi = (name, description, locationid, garageid, radioValue) => {
  const data = JSON.stringify({
    name,
    logourl: '',
    description,
    locationId: locationid,
    garageId: garageid,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/team`,
    headers,
    data,
  });
};

export const editTeamApi = (name, logourl, description, locationId, garageId, teamID, radioValue) => {
  const data = JSON.stringify({
    name,
    logourl,
    description,
    locationId,
    garageId,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/team/${teamID}`,
    headers,
    data,
  });
};

export const addGarageApi = (garageTitle, cityId, radioValue) => {
  const data = JSON.stringify({
    name: garageTitle,
    cityId,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/garage`,
    headers,
    data,
  });
};

export const editGarageApi = (garageTitle, cityId, radioValue, garageId) => {
  const data = JSON.stringify({
    name: garageTitle,
    cityId,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/garage/${garageId}`,
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
    url: `${baseUrl}/pickupLocation`,
    headers,
    data,
  });
};

export const getPickupLocations = () => axios({
  method: 'GET',
  url: `${baseUrl}/pickupLocation`,
  headers,
});

export const getPickupLocation = (locationId) => axios({
  method: 'GET',
  url: `${baseUrl}/pickupLocation/${locationId}`,
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
    url: `${baseUrl}/pickupLocation/${locationId}`,
    headers,
    data,
  });
};

export const getPickupLocationByGarageId = (garageId) => axios({
  method: 'GET',
  url: `${baseUrl}/pickupLocation/?garageId=${garageId}`,
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
    isActive: userData.radioValue,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/user`,
    headers,
    data,
  });
};

export const addUserProfile = (userProfileData, userId) => {
  const data = JSON.stringify({
    email: userProfileData.email,
    mobile_no: userProfileData.contactNo,
    driving_license_no: userProfileData.license,
    license_validity: userProfileData.licenseValidity,
    userId,
    cityId: userProfileData.cityId,
    garageId: userProfileData.garageId,
    locationId: userProfileData.locationId,
  });
  return axios({
    method: 'POST',
    url: `${baseUrl}/user/userProfile`,
    headers,
    data,
  });
};

export const addUserRole = (userRoleData, userId) => {
  const data = JSON.stringify([
    {
      userId,
      roleId: userRoleData.roleId,
    },
  ]);
  return axios({
    method: 'POST',
    url: `${baseUrl}/role/bulkUserRole`,
    headers,
    data,
  });
};

export const addUserProcess = (process, userId) => {
  const tempData = process.map(({ id, permission }) => ({
    userId,
    processId: id,
    create: permission.create,
    deActive: permission.deActive,
    edit: permission.edit,
    view: permission.view,
  }));
  const data = JSON.stringify(tempData);
  return axios({
    method: 'POST',
    url: `${baseUrl}/process/bulkUserProcess`,
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
    isActive: userData.radioValue,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/user/${userId}`,
    headers,
    data,
  });
};

export const editUserProfile = (userProfileData, userId) => {
  const data = JSON.stringify({
    email: userProfileData.email,
    mobile_no: userProfileData.contactNo,
    driving_license_no: userProfileData.license,
    license_validity: userProfileData.licenseValidity,
    userId,
    cityId: userProfileData.cityId,
    garageId: userProfileData.garageId,
    locationId: userProfileData.locationId,
  });
  return axios({
    method: 'PUT',
    url: `${baseUrl}/user/userProfile/${userId}`,
    headers,
    data,
  });
};

export const getUserProfile = (userId) => axios({
  method: 'GET',
  url: `${baseUrl}/user/${userId}`,
  headers,
});

export const getRolesUI = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/role/initialiseRoleUI/${id}`,
  headers,
});

export const getCarsList = (garageid, createdby) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars?garageId[]=${garageid}&createdBy=${createdby}`,
  headers,
});

export const getCarsListEverest = (cityid) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars/fetchCarsFromEverest/${cityid}`,
  headers,
});

export const getQueueCarsList = (garageid, visitcategory, status) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars?garageId[]=${garageid}&visit_category[]=${visitcategory}&status=${status}`,
  headers,
});

export const getCarsListRoadTest = (garageid) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars?garageId[]=${garageid}&visit_category[]=1&visit_category[]=2&status=1`,
  headers,
});

export const getCarDetailsList = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars/fetchCarDetailsFromEverest/${id}/2022-04-07`,
  headers,
});

export const getVisitingCarDetails = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/visitingCars/${id}`,
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
    status: 1,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/visitingCars`,
    headers,
    data,
  });
};

export const editCarVisit = (visitCarId, visitcat, carid, garageid, isdriverwithcar, driverId, driverName, drivercontactnumber, drivermanagerid, drivermanagername, locationId) => {
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
    status: 1,
  });
  console.log(data);
  return axios({
    method: 'PUT',
    url: `${baseUrl}/visitingCars/${visitCarId}`,
    headers,
    data,
  });
};

export const addRTAList = (visitid, garageid, isleasing, roadtestcomment, jamaStatus) => {
  const data = JSON.stringify({
    visitId: visitid,
    garageId: garageid,
    is_leasing: isleasing,
    road_test_comments: roadtestcomment,
    jama_status: jamaStatus,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/roadTest`,
    headers,
    data,
  });
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
    url: `${baseUrl}/auditTransfer`,
    headers,
    data,
  });
};

export const addTeamMembersBulk = (users) => {
  const data = JSON.stringify(users);
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/team/bulkUserTeam`,
    headers,
    data,
  });
};

export const addBreakdown = (breakdownData) => {
  const data = JSON.stringify({
    carId: breakdownData.carId,
    car_number: breakdownData.carNumber,
    is_with_driver: breakdownData.isDriverWithCar,
    driverId: breakdownData.driverId,
    driver_name: breakdownData.driverName,
    driver_contact_number: breakdownData.contactNo,
    driverManagerId: breakdownData.driverManagerId,
    driver_manager_name: breakdownData.driverManagerName,
    breakdown_type: breakdownData.breakdownType,
    breakdown_location: breakdownData.breakdownLocation,
    towing_required: false,
    status: 1,
    garageId: breakdownData.garageId,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/breakdown`,
    headers,
    data,
  });
};

export const getBreakdownList = () => axios({
  method: 'GET',
  url: `${baseUrl}/breakdown`,
  headers,
});

export const getBreakdownDetails = (id) => axios({
  method: 'GET',
  url: `${baseUrl}/breakdown/${id}`,
  headers,
});

export const editBreakdown = (breakdownId, breakdownData) => {
  const data = JSON.stringify({
    carId: breakdownData.carId,
    car_number: breakdownData.carNumber,
    is_with_driver: breakdownData.isDriverWithCar,
    driverId: breakdownData.driverId,
    driver_name: breakdownData.driverName,
    driver_contact_number: breakdownData.contactNo,
    driverManagerId: breakdownData.driverManagerId,
    driver_manager_name: breakdownData.driverManagerName,
    breakdown_type: breakdownData.breakdownType,
    breakdown_location: breakdownData.breakdownLocation,
    towing_required: false,
    status: 1,
    garageId: breakdownData.garageId,
  });
  console.log(data);
  return axios({
    method: 'PUT',
    url: `${baseUrl}/breakdown/${breakdownId}`,
    headers,
    data,
  });
};

export const addAuditMaster = (auditmaster) => {
  const data = JSON.stringify({
    visitId: auditmaster.visitId,
    driver_reported_issue: null,
    car_return_reason: null,
    fastag_balance: auditmaster.fastagBalance,
    status: 1,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/auditDetails/auditMaster`,
    headers,
    data,
  });
};

export const addOtherAuditMaster = (auditmaster) => {
  const data = JSON.stringify({
    visitId: auditmaster.visitId,
    driver_reported_issue: auditmaster.driverReportedIssue,
    car_return_reason: auditmaster.carReturnReason,
    fastag_balance: auditmaster.fastagBalance,
    status: 1,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/auditDetails/auditMaster`,
    headers,
    data,
  });
};

export const addAuditDetails = (auditdetails) => {
  const data = JSON.stringify({
    auditId: auditdetails.id,
    car_km: auditdetails.carKm,
    front_right_tyre_worn_out: null,
    front_right_tyre_pressure: null,
    front_right_tyre_brand: null,
    front_right_tyre_number: null,
    front_left_tyre_worn_out: null,
    front_left_tyre_pressure: null,
    front_left_tyre_brand: null,
    front_left_tyre_number: null,
    rear_right_tyre_worn_out: null,
    rear_right_tyre_pressure: null,
    rear_right_tyre_brand: null,
    rear_right_tyre_number: null,
    rear_left_tyre_worn_out: null,
    rear_left_tyre_pressure: null,
    rear_left_tyre_brand: null,
    rear_left_tyre_number: null,
    fuel_indicator_petrol: auditdetails.fuelIndicatorOne,
    fuel_indicator_cng: auditdetails.cng,
    sticker_front_main: auditdetails.StickerFrontMain,
    sticker_back_main: auditdetails.StickerBackMain,
    sticker_back_right: auditdetails.StickerBackRight,
    sticker_back_left: auditdetails.StickerBackLeft,
    jack: auditdetails.jack,
    panna: auditdetails.panna,
    tommy: auditdetails.tommy,
    engine_oil: auditdetails.engineOil,
    break_oil: auditdetails.breakOil,
    coolant: auditdetails.coolant,
    stephney_available: false,
    battery_status: auditdetails.batteryCharge,
    battery_number: null,
    battery_brand: null,
    horn: auditdetails.horn,
    auditor_comment: null,
  });
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/auditDetails`,
    headers,
    data,
  });
};

export const addOtherAuditDetails = (auditdetails) => {
  // const data = JSON.stringify({
  // auditId: auditdetails.id,
  // car_km: auditdetails.carKm,
  // front_right_tyre_worn_out: auditdetails.frWornOut,
  // front_right_tyre_pressure: auditdetails.frPressure,
  // front_right_tyre_brand: auditdetails.frBrand,
  // front_right_tyre_number: auditdetails.frNumber,
  // front_left_tyre_worn_out: auditdetails.fLWornOut,
  // front_left_tyre_pressure: auditdetails.fLPressure,
  // front_left_tyre_brand: auditdetails.fLBrand,
  // front_left_tyre_number: auditdetails.fLNumber,
  // rear_right_tyre_worn_out: auditdetails.rrWornOut,
  // rear_right_tyre_pressure: auditdetails.rrPressure,
  // rear_right_tyre_brand: auditdetails.rrBrand,
  // rear_right_tyre_number: auditdetails.rrNumber,
  // rear_left_tyre_worn_out: auditdetails.rLWornOut,
  // rear_left_tyre_pressure: auditdetails.rLPressure,
  // rear_left_tyre_brand: auditdetails.rLBrand,
  // rear_left_tyre_number: auditdetails.rLNumber,
  // fuel_indicator_petrol: auditdetails.fuelIndicatorOne,
  // fuel_indicator_cng: auditdetails.cng,
  // sticker_front_main: auditdetails.StickerFrontMain,
  // sticker_back_main: auditdetails.StickerBackMain,
  // sticker_back_right: auditdetails.StickerBackRight,
  // sticker_back_left: auditdetails.StickerBackLeft,
  // jack: auditdetails.jack,
  // panna: auditdetails.panna,
  // tommy: auditdetails.tommy,
  // engine_oil: auditdetails.engineOil,
  // break_oil: auditdetails.breakOil,
  // coolant: auditdetails.coolant,
  // stephney_available: false,
  // battery_status: auditdetails.batteryCharge,
  // battery_number: null,
  // battery_brand: null,
  // horn: auditdetails.horn,
  // auditor_comment: null,
  // });
  const data = JSON.stringify(auditdetails);
  console.log(data);
  return axios({
    method: 'POST',
    url: `${baseUrl}/auditDetails`,
    headers,
    data,
  });
};

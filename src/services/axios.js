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
    console.log(resp);
    localStorage.setItem('token', resp.data.results.token);
    const user = `${resp.data.results.user.first_name} ${resp.data.results.user.last_name}`;
    localStorage.setItem('user', user);
    return resp;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const apiToken = localStorage.getItem('token');

const headers = {
  Authorization: `Bearer ${apiToken}`,
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

export const getTeamGarages = (page, garageid) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/team/?garage_id=${garageid}page=${page}&size=10`,
  headers,
});
export const editModule = (moduleName, radioValue, moduleId) => {
  const data = JSON.stringify({
    process: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/process/${moduleId}`,
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

export const addCity = (cityName, radioValue, description, garageSeries, userSeries) => {
  console.log(cityName, radioValue, description, garageSeries, userSeries, 'axios');
  const data = JSON.stringify({
    name: cityName,
    description,
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

export const editCity = (cityName, radioValue, description, garageSeries, userSeries, processId) => {
  const data = JSON.stringify({
    name: cityName,
    description,
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

export const editRole = (cityName, radioValue, description, garageSeries, userSeries, processId) => {
  const data = JSON.stringify({
    name: cityName,
    description,
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

export const getRoles = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/role',
  headers,
});

export const addRoleModule = (roleId, moduleId) => {
  console.log(roleId);
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

export const addGarageApi = (garageTitle, garageDescription, cityId, garageSeries) => {
  const data = JSON.stringify({
    name: garageTitle,
    description: garageDescription,
    garage_series: garageSeries,
    cityId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/garage',
    headers,
    data,
  });
};

export const editGarageApi = (garageTitle, garageDescription, cityId, garageSeries) => {
  const data = JSON.stringify({
    name: garageTitle,
    description: garageDescription,
    garage_series: garageSeries,
    cityId,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/garage',
    headers,
    data,
  });
};

export const addPickupLocation = (name, description, radioValue, garageId) => {
  console.log(name, radioValue, garageId, 'axios');
  const data = JSON.stringify({
    name,
    description,
    garageId,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/pickupLocation',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5Mzk5NzkyLCJleHAiOjE2NDk2NTg5OTJ9.pM3M9qL2WD_jGn2TTrhU5HnooAor66XxfG8IzDldHdc',
      'Content-Type': 'application/json',
    },
    data,
  });
};

export const getPickupLocations = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/pickupLocation',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5Mzk5NzkyLCJleHAiOjE2NDk2NTg5OTJ9.pM3M9qL2WD_jGn2TTrhU5HnooAor66XxfG8IzDldHdc',
    'Content-Type': 'application/json',
  },
});

export const getPickupLocation = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/pickupLocation/${id}`,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5Mzk5NzkyLCJleHAiOjE2NDk2NTg5OTJ9.pM3M9qL2WD_jGn2TTrhU5HnooAor66XxfG8IzDldHdc',
    'Content-Type': 'application/json',
  },
});

// AXIOS FOR PROCESS EDITING
export const editPickupLocation = (name, description, radioValue, garageId, pickupLocationId) => {
  const data = JSON.stringify({
    name,
    description,
    garageId,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/pickupLocation/${pickupLocationId}`,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5Mzk5NzkyLCJleHAiOjE2NDk2NTg5OTJ9.pM3M9qL2WD_jGn2TTrhU5HnooAor66XxfG8IzDldHdc',
      'Content-Type': 'application/json',
    },
    data,
  });
};

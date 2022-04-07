/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import axios from 'axios';

export const addModule = (moduleName, radioValue) => {
  console.log(moduleName);
  const data = JSON.stringify({
    module: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'POST',
    url: 'http://13.126.183.78:8086/api/v1/modules',
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
    data,
  });
};

export const teamDataApi = () => axios.get('/fleet/api/teamApi/', { headers });
export const getUserRoles = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/role',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
});
export const getModule = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/modules/${id}`,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
});

export const getGarages = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/garage',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
});
export const editModule = (moduleName, radioValue, moduleId) => {
  const data = JSON.stringify({
    process: moduleName,
    isActive: radioValue,
  });
  return axios({
    method: 'PUT',
    url: `http://13.126.183.78:8086/api/v1/process/${moduleId}`,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
    data,
  });
};

export const getModules = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/modules',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
});

export const getCities = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/city',
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
});
export const getProcess = (id) => axios({
  method: 'GET',
  url: `http://13.126.183.78:8086/api/v1/process/${id}`,
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
    'Content-Type': 'application/json',
  },
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
    data,
  });
};

// User Roles axios

export const addRole = (cityName, radioValue, description, garageSeries, userSeries) => {
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
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
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo',
      'Content-Type': 'application/json',
    },
    data,
  });
};

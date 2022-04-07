/* eslint-disable import/prefer-default-export */
import * as axios from 'axios';

const token = '418149c34f61424356e022a7c34e9c48c7c77135';
const headers = {
  Authorization: `Token ${token}`,
  'Access-Control-Allow-Origin': '*',
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

export const getGarages = () => axios({
  method: 'GET',
  url: 'http://13.126.183.78:8086/api/v1/garage',
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

/* eslint-disable import/prefer-default-export */
import * as axios from 'axios';

const token = '418149c34f61424356e022a7c34e9c48c7c77135';
const headers = {
  Authorization: `Token ${token}`,
  'Access-Control-Allow-Origin': '*',
};

export const teamDataApi = () => axios.get('/fleet/api/teamApi/', { headers });

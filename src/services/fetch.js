const myHeaders = new Headers();
myHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjQ5MDUxNjQ3LCJleHAiOjE2NDkzMTA4NDd9.aHouOCqk0nGDl2UQwrNn9qusIraOsAGwmVOiWdmEyzo');

const requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export const getUsers = () => fetch('http://13.126.183.78:8086/api/v1/user', requestOptions);
export const getUserRoles = () => fetch('http://13.126.183.78:8086/api/v1/role', requestOptions);

export const cities = () => fetch();

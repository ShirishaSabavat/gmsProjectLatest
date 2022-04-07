/* eslint-disable quote-props */
const myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ5MTM0MzIxLCJleHAiOjE2NDkzOTM1MjF9.S7utD2MLKftqXev0MY1qskGMN6GvDMYW1Tj1y1jGwRo",
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

export const getUsers = async ({ page, size }) => {
  const res = await fetch(
    `http://13.126.183.78:8086/api/v1/user/?page=${page - 1 || 0}&size=${size || 5}`,
    requestOptions,
  );
  const jsonRes = await res.json();
  return jsonRes;
};

export const addModule = async ({ moduleName }) => {
  console.log(moduleName);
  const res = await fetch("http://13.126.183.78:8086/api/v1/modules", {
    method: "POST",
    headers: myHeaders,
    body: {
      // eslint-disable-next-line key-spacing
      "module": moduleName,
    },
    redirect: "follow",
  });
  const jsonRes = await res.json();
  return jsonRes;
};

export const cities = () => fetch();

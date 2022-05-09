import { gql } from '@apollo/client';
import Cookies from 'js-cookie';
import client from 'services/apollo_link';

const verifyToken = gql`
    query verifyToken ($token: String!) {
        verifyToken (token: $token) {
          token
          userId
      }
    }
`;

// login user and save cookies data
export const login = async (payload) => {
  const { variables, mutation } = payload;
  try {
    const response = await client.mutate({
      mutation,
      variables,
      context: { clientName: 'auth-server' },
    });
    const {
      token,
      userId,
    } = response.data.employeeLogin;
    Cookies.set('appToken', token);
    Cookies.set('appUserId', userId);
    return true;
  } catch (error) {
    return false;
  }
};

// load current account if token is verified
// and dispatch data
export const currentAccountLoad = async () => {
  try {
    await client.query({
      query: verifyToken,
      variables: { token: Cookies.get('appToken') || '' },
      context: { clientName: 'auth-server' },
    });
    return true;
  } catch (error) {
    return false;
  }
};

// logout and remove all the cookies
export const logout = async () => {
  Cookies.remove('token');
  Cookies.remove('appUserId');
  localStorage.clear();
  return false;
};

import {
  InMemoryCache,
  ApolloClient,
  HttpLink,
  ApolloLink,
} from '@apollo/client';
import Cookies from 'js-cookie';
import createUploadLink from 'apollo-upload-client/public/createUploadLink';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { notification } from 'antd';
import { createHashHistory } from 'history';

const history = createHashHistory();
// main server link supporting upload functionality
const httpLinkTA = createUploadLink({ uri: process.env.REACT_APP_TA_SERVER_URL });
// auth server link
const httpLinkAuth = new HttpLink({ uri: process.env.REACT_APP_AUTH_SERVER_URL });

// error handling at global level
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // graphQL error
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) => {
      // show graphQL errors in console log
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      );
      const token = Cookies.get('appToken');
      // show graphQL errors notification excluding error for "jwt expired" and
      // "Unauthenticated Access" only if token is defined
      if (token
        && message !== 'jwt expired'
        && message !== 'Unauthenticated Access') {
        notification.error({
          message: 'GraphQL error',
          description: message,
        });
      }

      // for unauthenticated access logout the user and remove the cookies
      if (message === 'Unauthenticated Access') {
        if (token) Cookies.remove('appToken');
        history.push('/auth/sign-in');
      }
    });
  }

  // network error
  if (networkError) console.log(`[Network errors]: ${networkError}`);
});

// to create an instance of header supporting token
const authHeader = setContext((_, { headers }) => {
  const token = Cookies.get('appToken');
  const authorization = token ? `Bearer ${token}` : '';
  return { headers: { ...headers, authorization } };
});

// attach auth header to both server links
const MAIN_SERVER = authHeader.concat(ApolloLink.from([errorLink, httpLinkTA]));
const AUTH_SERVER = authHeader.concat(ApolloLink.from([errorLink, httpLinkAuth]));

// combining the two server links
const link = ApolloLink.split(
  (operation) => operation.getContext().clientName === 'auth-server',
  AUTH_SERVER,
  MAIN_SERVER,
);

// creating cache
const cache = new InMemoryCache({ addTypename: false });

// initiating apollo client instance
const client = new ApolloClient({ link, cache });
export default client;

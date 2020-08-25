import { AsyncStorage } from 'react-native';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
    return true;
  } catch (e) {
    return null;
  }
};

const httpLink = new HttpLink({ uri: `http://crm.demo.flexibleshop.net/graphql` });

let token;

const withToken = setContext(async (request) => {
  if (!token) {
    token = await AsyncStorage.getItem('authToken');
  }
  return {
    headers: token
      ? {
          authorization: `Bearer ${token}`,
          'content-type': 'application/json',
        }
      : {
          'content-type': 'application/json',
        },
  };
});

const resetToken = onError(({ networkError }) => {
  if (networkError && networkError.statusCode === 401) {
    token = undefined;
  }
});

const authFlowLink = withToken.concat(resetToken);

const link = authFlowLink.concat(httpLink);

const cache = new InMemoryCache();

export default new ApolloClient({
  link,
  cache,
});

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import './semantic/dist/semantic.min.css';
import { CookiesProvider } from 'react-cookie';



const URI_API = process.env.REACT_APP_GRAPHCMS_API;

const client = new ApolloClient({
      //uri: 'https://graphqlserver-productsinfo.herokuapp.com/'
      uri: URI_API

})
ReactDOM.render(
  <CookiesProvider>
  <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>
  </ApolloProvider>
  </CookiesProvider>
    , document.getElementById('root'));

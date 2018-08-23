import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
    uri: "https://graphqlserver-productsinfo.herokuapp.com/"
})
ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
    <App />
    </Provider>
  </ApolloProvider>
    , document.getElementById('root'));

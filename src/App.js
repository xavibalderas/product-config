import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link
} from 'react-router-dom';
import Header from './components/Header';
import Configurator from './components/Configurator';
import Settings from './components/Settings';
import BedPricing from './components/BedPricing';

const auth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

class Login extends React.Component{
  state = {
    redirectToReferrer: false
  };

  login = () => {
    auth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state|| { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <div>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/config">Config</Link></li>
          </ul>

          <hr/>

          <Route exact path="/" component={BedPricing}/>
          <Route path="/about" component={Configurator}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute path="/config" auth={auth.isAuthenticated} redirect={"/login"} component={Settings} />
        </div>
      </Router>
      );
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);


export default App;

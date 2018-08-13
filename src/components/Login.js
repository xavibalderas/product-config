import React, { Component } from 'react';

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

export default Login

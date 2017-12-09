import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import awsconfig from './aws_config';
import amplify from 'aws-amplify';
import { Authenticator } from 'aws-amplify-react/dist/Auth';

amplify.configure(awsconfig);

class App extends Component {
  render() {
    const Protected = ({ authState }) => {
      if (authState !== 'SignedIn') {
        return null;
      }
      return <h2>Protected Resource</h2>;
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React on AWS with CI/CD</h1>
        </header>
        <Authenticator federated={awsconfig.federated}>
          <Protected />
        </Authenticator>
      </div>
    );
  }
}

export default App;

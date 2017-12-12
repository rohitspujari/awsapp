import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import awsconfig from './aws_config';
import amplify from 'aws-amplify';
import SignIn from './Authentication/SignIn';
import { Authenticator, withAuthenticator } from 'aws-amplify-react/dist/Auth';
import Header from './Components/Header';
import Resource from './Components/Resource';
import require_authentication from './Authentication/require_authentication';
import { Container } from 'semantic-ui-react';

amplify.configure(awsconfig);

class App extends Component {
  render() {
    const Home = () => <h2>Home is the landing page. Please Sign In</h2>;
    const Friends = () => <h2>Your private friends</h2>;
    // const Resource = () => <h2>Private Resource</h2>;

    //const authenitcatedResource = require_authentication(Resource);
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/home" component={Home} />
            <Route exact path="/resource" component={Resource} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/signin" component={SignIn} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

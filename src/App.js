import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import awsconfig from './aws_config';
import amplify from 'aws-amplify';
import SignIn from './Authentication/SignIn';
import SignUp from './Authentication/SignUp';

import Header from './Components/Header';
import Resource from './Components/Resource';
import RequireAuth from './Authentication/require_authentication';
import Home from './Components/Home';
import { Container } from 'semantic-ui-react';

amplify.configure(awsconfig);

class App extends Component {
  render() {
    // const Home = () => <h2>Home is the landing page. Please Sign In</h2>;
    const Friends = () => <h2>Your private friends</h2>;

    return (
      <Container>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Home} />
            <Route exact path="/resource" component={Resource} />
            <Route exact path="/friends" component={RequireAuth(Friends)} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
          </div>
        </BrowserRouter>
      </Container>
    );
  }
}

export default App;

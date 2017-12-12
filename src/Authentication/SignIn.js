import {
  Segment,
  Button,
  Divider,
  Form,
  Icon,
  Grid,
  Label,
  Container
} from 'semantic-ui-react';
import { Auth } from 'aws-amplify';

import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { Authenticator } from 'aws-amplify-react/dist/Auth';
import { withFederated } from 'aws-amplify-react';

const federated = {
  google_client_id:
    '277830869306-6qj1p3mep3utio2c9a3lgudfgga9sd2j.apps.googleusercontent.com',
  facebook_app_id: ''
};

const Buttons = props => {
  return (
    <Grid columns={2} divided>
      <Grid.Row>
        <Grid.Column>
          <Button fluid color="google plus" onClick={props.googleSignIn}>
            <Icon name="google plus" /> Google Plus
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button fluid color="facebook" onClick={props.facebookSignIn}>
            <Icon name="facebook" /> Facebook
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: ''
    };
  }

  displayError = error => (
    <Form.Field>
      <Label>{error}</Label>
    </Form.Field>
  );

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.signIn(username, password);
    // console.log(this.state.username);
    // console.log(this.state.password);
    // const { username, password } = this.state;
    // //this.props.loginUser(username, password);
    // Auth.signIn(username, password)
    //   .then(user => {
    //     this.setState({ error: '' });
    //   })
    //   .catch(err => this.setState({ error: err }));
  };

  handleAuthStateChange = (state, data) => {
    if (state === 'signedIn') {
      // if (data.constructor.name === 'CognitoUser') {
      //   this.props.currentUser(data.username);
      // }
      if (data.email) {
        this.props.federatedSignIn(data.email);
      }
      this.props.history.push('/resource');
    }
    if (state === 'signIn') {
      this.props.currentUser(null);
    }

    console.log('handleAuthStateChange', data);
  };

  render() {
    const Federated = withFederated(Buttons);
    return (
      <Container>
        <Authenticator
          hideDefault={true}
          onStateChange={this.handleAuthStateChange}
        >
          <Segment padded={true}>
            <Form>
              <Form.Field>
                <input
                  placeholder="Username"
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </Form.Field>
              <Form.Field>
                <input
                  placeholder="Password"
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Form.Field>
              {this.props.auth && this.props.auth.loginError
                ? this.displayError(this.props.auth.loginError)
                : null}
              <Form.Field>
                <Button primary fluid onClick={this.handleLogin}>
                  Login
                </Button>
              </Form.Field>
              <Divider horizontal>Or</Divider>
              <Form.Field>
                <Federated federated={federated} />
              </Form.Field>
              <Divider horizontal>New user</Divider>
              <Button secondary fluid onClick={this.handleLogin}>
                Sign Up
              </Button>
            </Form>
          </Segment>
        </Authenticator>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(SignIn));
import {
  Segment,
  Button,
  Divider,
  Form,
  Icon,
  Grid,
  Label,
  Container,
  Input
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
    <Grid columns={2}>
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

  getLoginSignUpButtons = () => {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Button primary fluid onClick={this.handleLogin}>
              Login
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              secondary
              fluid
              onClick={() => this.props.history.push('/signup')}
            >
              Sign Up
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.signIn(username, password);
  };

  handleAuthStateChange = (state, data) => {
    const history = this.props.history;
    if (state === 'signedIn') {
      if (data.email) {
        this.props.federatedSignIn(data.email);
      }
      //console.log('props', this.props);
      // console.log('state', this.state);

      if (history.location.state) {
        const requested_uri = this.props.history.location.state.requested_uri;
        this.props.history.push(requested_uri);
      } else {
        history.push('/');
      }
    }
    if (state === 'signIn') {
      this.props.signOut();
      this.props.history.push('/signin');
      //this.props.history.goBack();
    }

    console.log('handleAuthStateChange', data);
  };

  render() {
    const Federated = withFederated(Buttons);
    return (
      <Authenticator
        hideDefault={true}
        onStateChange={this.handleAuthStateChange}
      >
        <Container>
          <Segment>
            <Form>
              <Form.Field>
                <Input iconPosition="left" placeholder="E-mail Address">
                  <Icon name="user" />
                  <input
                    type="text"
                    value={this.state.username}
                    onChange={e => this.setState({ username: e.target.value })}
                  />
                </Input>
              </Form.Field>
              <Form.Field>
                <Input iconPosition="left" placeholder="Password">
                  <Icon name="lock" />
                  <input
                    type="password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Input>
              </Form.Field>
              {this.props.auth && this.props.auth.loginError
                ? this.displayError(this.props.auth.loginError)
                : null}
              <Form.Field>{this.getLoginSignUpButtons()}</Form.Field>
              <Form.Field>
                <Link to={'/home'}>Forgot Password?</Link>
              </Form.Field>
              <Divider />
              <Form.Field>
                <Federated federated={federated} />
              </Form.Field>
            </Form>
          </Segment>
        </Container>
      </Authenticator>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(SignIn));

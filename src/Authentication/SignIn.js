import {
  Segment,
  Button,
  Divider,
  Form,
  Icon,
  Grid,
  Label,
  Input,
  Header
} from 'semantic-ui-react';
import { Auth, API } from 'aws-amplify';
import { AmplifyTheme } from 'aws-amplify-react';
import aws_config from '../aws_config';

import React, { Component } from 'react';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { Authenticator } from 'aws-amplify-react/dist/Auth';
import { withFederated } from 'aws-amplify-react';
import _ from 'lodash';

const MySectionHeader = Object.assign({}, AmplifyTheme.container, {
  textAlign: 'left'
});
const MyTheme = Object.assign({}, AmplifyTheme, { container: MySectionHeader });

const Buttons = props => {
  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column>
          <Button basic fluid color="google" onClick={props.googleSignIn}>
            <Icon name="google plus" /> Google
          </Button>
        </Grid.Column>
        <Grid.Column>
          <Button basic fluid color="facebook" onClick={props.facebookSignIn}>
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

  getLoginSignUpButtons = () => {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Button basic fluid onClick={this.handleSignIn}>
              <i class="checkmark icon" />
              Sign In
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              basic
              fluid
              onClick={() => {
                this.props.history.push('/signup');
              }}
            >
              <i class="add user icon" />
              New User
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  handleSignIn = async () => {
    const { username, password } = this.state;
    try {
      await Auth.signIn(username, password);

      //const creds = await Auth.currentCredentials();
      //console.log('creds', creds);
    } catch (err) {
      let error = err;
      if (err.code) {
        error = err.message;
      }
      this.props.authError(error);
    }
  };

  handleAuthStateChange = async (state, data) => {
    const { history } = this.props;
    if (state === 'signedIn') {
      //Change redux state
      this.props.signedIn(data);
      //const creds = await Auth.currentCredentials();
      //console.log(creds);

      //Get Requested URI - Useful when used with require_authentication HOC
      if (history.location.state) {
        const requested_uri = this.props.history.location.state.requested_uri;
        this.props.history.push(requested_uri);
      } else {
        history.push('/');
      }

      //Write to dynamo
      const { username, email, name } = await Auth.currentAuthenticatedUser();
      await API.post('rAPI', '/dev/api/user', {
        body: {
          username,
          email,
          name
        },
        headers: {}
      });
      //console.log(result);
    }
    if (state === 'signIn') {
      this.props.signOut();
      this.props.history.push('/signin');
    }

    console.log('handleAuthStateChange', state, data, Auth);
  };

  getForm = () => {
    const Federated = withFederated(Buttons);
    const { auth } = this.props;
    return (
      <Authenticator
        theme={MyTheme}
        hideDefault={true}
        onStateChange={this.handleAuthStateChange}
        // federated={aws_config.federated}
      >
        <Grid>
          <Grid.Row centered>
            <Grid.Column mobile="16" tablet="10" computer="8">
              <Segment>
                <Form>
                  <Form.Field>
                    <Input iconPosition="left" placeholder="Username">
                      <Icon name="user" />
                      <input
                        type="text"
                        value={this.state.username}
                        onChange={e =>
                          this.setState({ username: e.target.value })
                        }
                      />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    <Input iconPosition="left" placeholder="Password">
                      <Icon name="lock" />
                      <input
                        type="password"
                        value={this.state.password}
                        onChange={e =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </Input>
                  </Form.Field>
                  <Form.Field>
                    {_.has(auth, 'error') ? <Label>{auth.error}</Label> : null}
                  </Form.Field>
                  <Form.Field>{this.getLoginSignUpButtons()}</Form.Field>
                  <Form.Field>
                    <Link color="black" to={'/home'}>
                      Forgot Password?
                    </Link>
                  </Form.Field>
                  <Divider />
                  <Form.Field>
                    <Federated federated={aws_config.federated} />
                  </Form.Field>
                </Form>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Authenticator>
    );
  };

  render() {
    return (
      <div style={{ marginTop: 25 }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>eGlue</Header.Content>
        </Header>
        {this.getForm()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  //console.log(state);
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(SignIn));

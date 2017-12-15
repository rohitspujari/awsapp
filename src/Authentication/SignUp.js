import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import _ from 'lodash';
import {
  Segment,
  Icon,
  Form,
  Container,
  Button,
  Input,
  Grid,
  Label
} from 'semantic-ui-react';

class SignUp extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmCode: '',
    isUserConfirmingCode: false
  };

  getSignUpCancelButtons = () => {
    const { username, password, email } = this.state;
    const { auth } = this.props;
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Button
              secondary
              fluid
              onClick={() => {
                this.setState({ isUserConfirmingCode: false });
                this.props.history.push('/signin');
              }}
            >
              Cancel
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              disabled={_.has(auth, 'userConfirmed') && !auth.userConfirmed}
              primary
              fluid
              onClick={() => {
                //this.props.testAction();

                this.props.signUp(username, password, email);
              }}
            >
              Sign Up
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  getConfirmCodePrompt = auth => {
    if (_.has(auth, 'userConfirmed') && !auth.userConfirmed) {
      return (
        <div>
          <Form.Field>
            <div class="ui action input">
              <input
                type="text"
                placeholder="Code"
                value={this.state.code}
                onChange={e => this.setState({ code: e.target.value })}
              />
              <button
                class="ui button primary"
                onClick={() => {
                  this.props.confirmSignUp(
                    this.state.username,
                    this.state.code
                  );
                }}
              >
                Confirm
              </button>
            </div>
          </Form.Field>
          <Form.Field>
            <Label>{'Please check your email for the code'}</Label>
          </Form.Field>
          <Form.Field>
            {_.has(auth, 'userConfirmMessage') ? (
              <Label>{auth.userConfirmMessage}</Label>
            ) : null}
          </Form.Field>
        </div>
      );
    }
  };

  render() {
    const { auth, history } = this.props;
    const { username, password } = this.state;

    if (_.has(auth, 'username') && _.has(auth, 'username')) {
      history.push('/');
    }

    if (_.has(auth, 'userConfirmMessage') && auth.userConfirmMessage) {
      this.props.signInAfterSignUp(username, password, history);
      return null;
    }
    return (
      <Container>
        <Segment>
          <Form>
            <Form.Field>
              <Input
                iconPosition="left"
                placeholder="Username"
                disabled={_.has(auth, 'userConfirmed') && !auth.userConfirmed}
              >
                <Icon name="user" />
                <input
                  type="text"
                  value={this.state.username}
                  onChange={e => this.setState({ username: e.target.value })}
                />
              </Input>
            </Form.Field>

            <Form.Field>
              <Input
                iconPosition="left"
                placeholder="Password"
                disabled={_.has(auth, 'userConfirmed') && !auth.userConfirmed}
              >
                <Icon name="lock" />
                <input
                  type="password"
                  value={this.state.password}
                  onChange={e => this.setState({ password: e.target.value })}
                />
              </Input>
            </Form.Field>
            <Form.Field>
              <Input
                iconPosition="left"
                placeholder="E-mail Address"
                disabled={_.has(auth, 'userConfirmed') && !auth.userConfirmed}
              >
                <Icon name="mail icon" />
                <input
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
                />
              </Input>
            </Form.Field>
            <Form.Field>
              {_.has(auth, 'error') ? <Label>{auth.error}</Label> : null}
            </Form.Field>
            <Form.Field>{this.getConfirmCodePrompt(auth)}</Form.Field>
            <Form.Field>{this.getSignUpCancelButtons()}</Form.Field>
          </Form>
        </Segment>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(SignUp));

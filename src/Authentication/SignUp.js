import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import _ from 'lodash';
import {
  Segment,
  Header,
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
    confirmCode: ''
  };

  getSignUpCancelButtons = () => {
    const { username, password, email } = this.state;
    const { auth } = this.props;
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Button
              basic
              fluid
              onClick={() => {
                this.props.history.push('/signin');
              }}
            >
              <i class="remove icon" />
              Cancel
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              disabled={_.has(auth, 'userConfirmed') && !auth.userConfirmed}
              basic
              fluid
              onClick={() => {
                this.props.signUp(username, password, email);
              }}
            >
              <i class="add user icon" />
              Sign Up
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  getConfirmCodePrompt = auth => {
    const { username, password, code } = this.state;
    const { history } = this.props;
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
              <Button
                basic
                onClick={() => {
                  this.props.confirmSignUp(username, password, code, history);
                }}
              >
                <i class="checkmark icon" />
                Confirm
              </Button>
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

  getForm = () => {
    const { auth } = this.props;

    return (
      <Grid>
        <Grid.Row centered>
          <Grid.Column mobile="16" tablet="10" computer="8">
            <Segment>
              <Form>
                <Form.Field>
                  <Input
                    iconPosition="left"
                    placeholder="Username"
                    disabled={
                      _.has(auth, 'userConfirmed') && !auth.userConfirmed
                    }
                  >
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
                  <Input
                    iconPosition="left"
                    placeholder="Password"
                    disabled={
                      _.has(auth, 'userConfirmed') && !auth.userConfirmed
                    }
                  >
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
                  <Input
                    iconPosition="left"
                    placeholder="E-mail Address"
                    disabled={
                      _.has(auth, 'userConfirmed') && !auth.userConfirmed
                    }
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
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  render() {
    return (
      <div style={{ marginTop: 25 }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>RLabs</Header.Content>
        </Header>
        {this.getForm()}
      </div>
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

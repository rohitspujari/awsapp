import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
    email: '',
    password: '',
    confirmPassword: '',
    confirmCode: '',
    isUserConfirmingCode: false,
    message: null
  };

  getSignUpCancelButtons = () => {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Button
              primary
              fluid
              onClick={() => {
                this.setState({ isUserConfirmingCode: false, message: null });
                this.props.history.push('/signin');
              }}
            >
              Cancel
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              disabled={this.state.isUserConfirmingCode}
              primary
              fluid
              onClick={() => {
                //this.handleSignUp(); TODO
                this.setState({
                  isUserConfirmingCode: true,
                  message: 'Please check your email for the code'
                });
              }}
            >
              Sign Up
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  getConfirmCodePrompt = () => {
    if (this.state.isUserConfirmingCode) {
      return (
        <div class="ui action input">
          <input type="text" placeholder="Code" />
          <button
            class="ui button primary"
            role="button"
            onClick={() => {
              console.log('Code Confirmed');
            }}
          >
            Confirm
          </button>
        </div>
      );
    }
  };

  getMessageLabel = () => {
    if (this.state.message) {
      return <Label>{this.state.message}</Label>;
    }
  };
  render() {
    return (
      <Container>
        <Segment>
          <Form>
            <Form.Field>
              <Input iconPosition="left" placeholder="E-mail Address">
                <Icon name="user" />
                <input
                  type="text"
                  value={this.state.email}
                  onChange={e => this.setState({ email: e.target.value })}
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
            <Form.Field>
              <Input iconPosition="left" placeholder="Confirm Password">
                <Icon name="lock" />
                <input
                  type="password"
                  value={this.state.confirmPassword}
                  onChange={e =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
              </Input>
            </Form.Field>
            <Form.Field>{this.getMessageLabel()}</Form.Field>
            <Form.Field>{this.getSignUpCancelButtons()}</Form.Field>
            <Form.Field>{this.getConfirmCodePrompt()}</Form.Field>
          </Form>
        </Segment>
      </Container>
    );
  }
}

export default withRouter(SignUp);

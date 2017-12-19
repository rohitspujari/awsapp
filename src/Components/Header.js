import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import * as actions from '../actions';
import { connect } from 'react-redux';

import _ from 'lodash';

class Header extends Component {
  state = { activeItem: 'home' };

  componentWillMount() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.props.signedIn(user);
      })
      .catch(e => console.log(e));
  }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  AuthButton = activeItem => {
    if (_.has(this.props, 'auth.name') || _.has(this.props, 'auth.username')) {
      return (
        <Menu.Item
          name="SignOut"
          onClick={() => {
            this.props.signOut();
            this.props.history.push('/signin');
          }}
        />
      );
    } else {
      return (
        <Menu.Item
          name="SignIn"
          onClick={() => {
            this.props.history.push('/signin');
            this.setState({ activeItem: 'SignIn' });
          }}
          active={activeItem === 'SignIn'}
        />
      );
    }
  };

  render() {
    const { activeItem } = this.state;

    return (
      <Container>
        <Menu pointing secondary>
          <Menu.Item
            name="home"
            active={activeItem === 'home'}
            onClick={() => {
              this.props.history.push('/');
              this.setState({ activeItem: 'home' });
            }}
          />
          <Menu.Item
            name="Resource"
            active={activeItem === 'resource'}
            onClick={() => {
              this.props.history.push('/resource');
              this.setState({ activeItem: 'resource' });
            }}
          />

          <Menu.Item
            name="friends"
            active={activeItem === 'friends'}
            onClick={() => {
              this.props.history.push('/friends');
              this.setState({ activeItem: 'friends' });
            }}
          />
          <Menu.Menu position="right">
            <Menu.Item>
              {this.props.auth
                ? this.props.auth.name || this.props.auth.username
                : null}
            </Menu.Item>
            {this.AuthButton(activeItem)}
          </Menu.Menu>
        </Menu>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  };
}

export default connect(mapStateToProps, actions)(withRouter(Header));

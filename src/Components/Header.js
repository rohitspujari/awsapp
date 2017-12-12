import React, { Component } from 'react';
import { Menu, Segment, Container } from 'semantic-ui-react';
import { Link, withRouter } from 'react-router-dom';
import * as actions from '../actions';
import { connect } from 'react-redux';
import { Auth } from 'aws-amplify';

class Header extends Component {
  state = { activeItem: 'home' };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  AuthButton = activeItem => {
    if (this.props.auth) {
      return (
        <Menu.Item
          name="SignOut"
          onClick={() => {
            this.props.signOut();
            this.props.history.push('/home');
          }}
        />
      );
    } else {
      return (
        <Menu.Item
          name="SignIn"
          onClick={() => {
            this.props.history.push('/Signin');
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
              this.props.history.push('/home');
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
          <Menu.Menu position="right">{this.AuthButton(activeItem)}</Menu.Menu>
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

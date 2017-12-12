import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      //console.log(this.props.history.location.pathname);

      if (!this.props.auth || !this.props.auth.authenticated) {
        this.props.history.push('/signin', {
          requested_uri: this.props.history.location.pathname
        });
      }
    }

    componentWillUpdate(nextProps) {
      if (!this.props.auth || !this.props.auth.authenticated) {
        this.props.history.push('/signin', {
          requested_uri: this.props.history.location.pathname
        });
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state) {
    //console.log(state);
    return { auth: state.auth };
  }

  return connect(mapStateToProps)(withRouter(Authentication));
}

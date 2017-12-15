import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';

export default function(ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      this.route();
    }

    componentWillUpdate(nextProps) {
      this.route();
    }

    route = () => {
      if (
        !_.has(this.props.auth, 'username') &&
        !_.has(this.props.auth, 'name')
      ) {
        this.props.history.push('/signin', {
          requested_uri: this.props.history.location.pathname
        });
      }
    };

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

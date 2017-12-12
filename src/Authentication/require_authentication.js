import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-dom';

export default function(ComposedComponent) {
  class Authentication extends Component {
    // static contextTypes = {
    //   router: React.PropTypes.object
    // };

    componentWillMount() {
      console.log(this);
      if (!this.props.authenticated) {
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  //   function mapStateToProps(state) {
  //     return { authenticated: state.authenticated };
  //   }

  return Authentication;
}

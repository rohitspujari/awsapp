import React, { Component } from 'react';

export class Resource extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getResource = () => {
    if (this.props.authState !== 'signedIn') {
      return null;
    }
    return;
  };

  render() {
    return <h2>Your private resource</h2>;
  }
}

export default Resource;

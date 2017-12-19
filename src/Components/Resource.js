import React, { Component } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { Auth, API } from 'aws-amplify';

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

  handleClick = Auth => {
    console.log('I am clicked');
    console.log(Auth);

    Auth.currentAuthenticatedUser().then(d => console.log('tesing', d));
    const data = this.getData()
      .then(data => console.log(data))
      .catch(e => console.log(e));
  };

  getData = async () => {
    let apiName = 'Friends';
    let path = '/dev/api/friends';
    let myInit = {
      // OPTIONAL
      //headers: { 'Access-Control-Allow-Origin': '*' } // OPTIONAL
    };
    return await API.get(apiName, path, myInit);
  };

  render() {
    return (
      <Container>
        <div>
          <Button primary onClick={() => this.handleClick(Auth, API)}>
            Invoke API
          </Button>
        </div>
      </Container>
    );
  }
}

export default Resource;

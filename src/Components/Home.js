import React, { Component } from 'react';
import { Container, Grid, Image, Header, Icon } from 'semantic-ui-react';
class Home extends Component {
  state = {};
  render() {
    return (
      //   <Container style={{ backgroundColor: 'red' }}>
      <div style={{ marginTop: 25 }}>
        <Header as="h2" icon textAlign="center">
          <Icon name="users" circular />
          <Header.Content>Rlabs</Header.Content>
        </Header>
      </div>
    );
  }
}

export default Home;

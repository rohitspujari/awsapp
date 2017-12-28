import React, { Component } from 'react';
import {
  Input,
  Container,
  Label,
  Button,
  Segment,
  Icon
} from 'semantic-ui-react';
import { Storage, API } from 'aws-amplify';

class Files extends Component {
  state = {
    files: [],
    isUploading: false,
    filesProcessed: 0,
    videoLink: 'https://www.youtube.com/watch?v=ndj9CppYvv8'
  };

  handleUploadClick = () => {
    const { files, filesProcessed } = this.state;
    this.setState({ isUploading: true, filesProcessed: 0 });
    if (files.length > 0) {
      files.forEach(f => {
        const r = new FileReader();
        //Register onload event before calling readAsArrayBuffer
        r.onload = e => {
          var contents = e.target.result;
          Storage.put(f.name, contents, {
            level: 'private',
            contentType: f.type
          })
            .then(result => {
              //upload status of the file
              f.statusColor = 'olive';

              //update state
              this.setState({
                filesProcessed: this.state.filesProcessed + 1,
                files,
                isUploading: this.state.filesProcessed !== files.length - 1
              });
            })
            .catch(err => {
              //upload status of the file
              f.statusColor = 'red';

              //update state
              this.setState({
                filesProcessed: this.state.filesProcessed + 1,
                files,
                isUploading: this.state.filesProcessed !== files.length - 1
              });
            });
        };
        r.readAsArrayBuffer(f);
      });
    }
  };

  getUploadLink = () => {
    return (
      <Segment>
        <h5>Upload Youtube Video:</h5>

        <Input
          iconPosition="left"
          fluid
          type="text"
          placeholder="youtube video link"
        >
          <Icon name="file video outline" />
          <input
            type="text"
            value={this.state.videoLink}
            onChange={e => this.setState({ videoLink: e.target.value })}
          />
          <Button
            type="submit"
            onClick={() => {
              console.log(this.state.videoLink);
              API.post('rAPI', '/dev/api/video', {
                body: { link: this.state.videoLink },
                headers: {}
              }).then(data => console.log(data));
            }}
          >
            <i class="cloud upload icon" />
            Upload
          </Button>
        </Input>
      </Segment>
    );
  };

  render() {
    const { files, isUploading, filesProcessed } = this.state;
    return (
      <Container style={{ marginTop: 25 }}>
        <Segment>
          <h5>Upload Files:</h5>
          <Input
            style={{ marginBottom: 5 }}
            fluid
            multiple
            type="file"
            onChange={e => {
              this.setState({ files: Array.from(e.target.files) });
            }}
          />
          <Button
            loading={isUploading}
            disabled={isUploading || files.length === 0}
            onClick={this.handleUploadClick}
            // floated="right"
          >
            <i class="cloud upload icon" />
            Upload
          </Button>
          <div style={{ marginTop: 5 }}>
            {files.length > 1 &&
              files.map(i => (
                <Label
                  color={i.statusColor} //{filesProcessed === files.length ? 'olive' : ''}
                  style={{ marginBottom: 3 }}
                  key={i.lastModified}
                >
                  {i.name}
                </Label>
              ))}
          </div>
        </Segment>
        {this.getUploadLink()}
      </Container>
    );
  }
}

export default Files;

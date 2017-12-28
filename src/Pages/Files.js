import React, { Component } from 'react';
import { Input, Container, Label, Button, Segment } from 'semantic-ui-react';
import { Storage } from 'aws-amplify';

class Files extends Component {
  state = {
    files: [],
    isUploading: false,
    filesProcessed: 0
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
  render() {
    const { files, isUploading, filesProcessed } = this.state;
    return (
      <Container style={{ marginTop: 25 }}>
        <Segment>
          <h5>Upload Files to S3:</h5>
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
        </Segment>

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
      </Container>
    );
  }
}

export default Files;

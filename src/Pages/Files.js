import React, { Component } from 'react';
import { Input, Container, Label, Button, Segment } from 'semantic-ui-react';
import { Storage } from 'aws-amplify';

class Files extends Component {
  state = {
    files: [],
    isUploading: false,
    filesUploaded: 0
  };

  handleUploadClick = () => {
    const { files, filesUploaded } = this.state;
    this.setState({ isUploading: true, filesUploaded: 0 });
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
              // checking if all the files are uploaded
              if (this.state.filesUploaded === files.length - 1) {
                this.setState({
                  isUploading: false
                });
              }
              this.setState({ filesUploaded: this.state.filesUploaded + 1 });
              // Add File Names to elastic search
              //console.log(result);
            })
            .catch(err => alert(err));
        };
        r.readAsArrayBuffer(f);
      });
    }
  };
  render() {
    const { files, isUploading, filesUploaded } = this.state;
    return (
      <Container style={{ marginTop: 25 }}>
        <Segment>
          <h5>Upload Files to S3:</h5>
          <Input
            style={{ marginBottom: 5 }}
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
            style={{ marginLeft: 5 }}
          >
            <i class="cloud upload icon" />
            Upload
          </Button>
        </Segment>

        {files.length > 1 &&
          files.map(i => (
            <Label
              color={filesUploaded === files.length ? 'olive' : 'gray'}
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

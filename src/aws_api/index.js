import { Auth } from 'aws-amplify';
import AWS from 'aws-sdk';

//import AWS from './aws-sdk-2.176.0.min.js';

export const submitAWSBatchJob = () => {
  console.log(Auth);
  const {
    AccessKeyId,
    SecretKey,
    Expiration
  } = Auth.credentials.data.Credentials;

  AWS.config.update({
    accessKeyId: AccessKeyId,
    secretAccessKey: SecretKey,
    expireTime: Expiration.valueOf()
  });

  const batch = new AWS.Batch();
  const params = {
    jobDefinition: 'r-youtube-video',
    jobName: 'upload_video' + Date.now(),
    jobQueue: 'r-high-priority-youtube-videos'
  };
  batch.submitJob(params, function(err, data) {
    if (err)
      console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
    /*
    data = {
     jobId: "876da822-4198-45f2-a252-6cea32512ea8", 
     jobName: "example"
    }
    */
  });

  console.log(AWS.config.credentials);
};

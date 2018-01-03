const fs = require('fs');
const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({
  region: 'us-east-1'
});
const mediaconvert = new AWS.MediaConvert({
  region: 'us-east-1',
  endpoint: 'https://12f2liva.mediaconvert.us-east-1.amazonaws.com'
});
const youtubedl = require('youtube-dl');
const mediaConvertParams = require('./mediaconvert_params_template.json');
//const accessKeys = require('/Users/ropujari/aws/accessKeys.json'); // For Testing only
//AWS.config.update(accessKeys); For Testing only

//Reference:
//http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#constructor-property

const url = process.argv[2]; //'https://www.youtube.com/watch?v=OSBl32lNGBg';
const bucket = process.argv[3]; //'deletebucket-today'; storage.ruletheglobe.com/private/'+cognitoID
const jobId = process.env.AWS_BATCH_JOB_ID;
const video = youtubedl(url);
const metadata = {};

//Will be called when the download starts.
video.on('info', info => {
  // console.log(info)
  console.log('Download started');
  metadata.filename = info._filename;
  console.log('filename: ' + metadata.filename);
  metadata.size = info.size / 1000000;
  console.log('size in MB: ' + metadata.size);
});

writer = fs.createWriteStream('/tmp/tmpVideo.mov');

writer.on('finish', () => {
  console.error('All writes are now complete.');
  fs.readFile('/tmp/tmpVideo.mov', (err, data) => {
    if (err) {
      throw err;
    }
    const base64data = new Buffer(data, 'binary');
    // Write File to S3
    uploadToS3Multipart(base64data, metadata.filename, bucket);
  });
});

video.pipe(writer);

const uploadToS3Multipart = (data, filename, bucket) => {
  console.log('Multipart Upload');
  const upload = new AWS.S3.ManagedUpload({
    partSize: 10 * 1024 * 1024,
    params: { Bucket: bucket, Key: filename, Body: data, ACL: 'public-read' }
  });
  upload.send((err, data) => {
    if (err) {
      console.log('Error:', err.code, err.message);
    } else {
      console.log('Upload Result', data);
      console.log('Successfully uploaded video.');
      //Start media convertion from .mp4 to AWS Recognition compatible format MPEG-4 or Mov with H.264 codec
      mediaConvert(jobId, filename, bucket, data.Key, data.Bucket);
    }
  });
};

const updateTable = (
  batchjobId,
  mediaConvertJobId,
  mediaConvertJobSubmitted,
  key
) => {
  var params = {
    TableName: 'r_batch_jobs',
    Key: {
      batchJobId: {
        S: String(jobId)
      }
    },
    UpdateExpression:
      'SET batchJobCompleted=:bjc, mediaConvertJobId=:mcji, mediaConvertJobSubmitted=:mcjs, fileKey=:k',
    ExpressionAttributeValues: {
      ':bjc': {
        S: String(new Date(Date.now()))
      },
      ':mcji': {
        S: String(mediaConvertJobId)
      },
      ':mcjs': {
        S: String(mediaConvertJobSubmitted)
      },
      ':k': {
        S: String(key)
      }
    },
    ReturnValues: 'UPDATED_NEW'
  };

  dynamo.updateItem(params, (err, result) => {
    if (err) console.log(err);
    else console.log('Successfully updated status.');
  });
};

const mediaConvert = (jobId, filename, bucket_path, key, bucket) => {
  mediaConvertParams.UserMetadata.batchJobId = jobId;
  mediaConvertParams.UserMetadata.bucket = bucket;
  mediaConvertParams.UserMetadata.deleteKey = key;
  mediaConvertParams.UserMetadata.key = key.replace(/\.[^/.]+$/, '.mov');

  mediaConvertParams.Settings.Inputs[0].FileInput =
    's3://' + bucket_path + '/' + filename;

  console.log(mediaConvertParams.Settings.Inputs[0].FileInput);

  mediaConvertParams.Settings.OutputGroups[0].OutputGroupSettings.FileGroupSettings.Destination =
    's3://' + bucket_path + '/';

  console.log(
    mediaConvertParams.Settings.OutputGroups[0].OutputGroupSettings
      .FileGroupSettings.Destination
  );

  mediaconvert.createJob(mediaConvertParams, function(err, result) {
    if (err) console.log(err, err.stack);
    else {
      console.log(Object.keys(result.Job));
      updateTable(
        jobId,
        result.Job.Id,
        result.Job.CreatedAt,
        key.replace(/\.[^/.]+$/, '.mov')
      );
    } // successful response
  });
};

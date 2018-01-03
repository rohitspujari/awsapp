const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({ region: 'us-east-1' });
const mediaConvertParams = require('./mediaconvert_params_template.json');
var rekognition = new AWS.Rekognition({ region: 'us-east-1' });

const jobId = '512ce6b7-dd6b-49ad-b890-8cd72c2407ee';
const data = {
  Location: 'location',
  Bucket: 'bucket',
  Key: 'key'
};

const updateTable = (jobId, data) => {
  var params = {
    TableName: 'r_batch_jobs',
    Key: {
      batchJobId: {
        S: String(jobId)
      }
    },
    UpdateExpression: 'SET loc=:l, buc=:b, obj_key=:k, batchJobCompleted=:bc',
    ExpressionAttributeValues: {
      ':l': {
        S: String(data.Location)
      },
      ':b': {
        S: String(data.Bucket)
      },
      ':k': {
        S: String(data.Key)
      },
      ':bc': {
        S: String(new Date(Date.now()))
      }
    },
    ReturnValues: 'UPDATED_NEW'
  };

  dynamo.updateItem(params, (err, result) => {
    if (err) console.log(err);
    else console.log('Successfully updated status.');
  });
};

// //updateTable(jobId, data);

// console.log(params.Settings.Inputs[0].FileInput);

// params.Settings.Inputs[0].FileInput = 'rohit';
// //params.Settings.OutputGroups[0].OutputGroupSettings.FileGroupSettings.Destination = 'rohit';
// console.log(
//   params.Settings.OutputGroups[0].OutputGroupSettings.FileGroupSettings
//     .Destination
// );

// const mediaconvert = new AWS.MediaConvert({
//   endpoint: 'https://12f2liva.mediaconvert.us-east-1.amazonaws.com',
//   region: 'us-east-1'
// });

// mediaConvertParams.UserMetadata.BatchJobId = '3232323232';
// mediaConvertParams.UserMetadata.convertedUri = mediaConvertParams.Settings.Inputs[0].FileInput =
//   's3://storage.ruletheglobe.com/private/us-east-1:fd032985-afc3-4746-999d-106d082dcf56/When.mp4';
// mediaConvertParams.Settings.OutputGroups[0].OutputGroupSettings.FileGroupSettings.Destination =
//   's3://deletebucket-today/';

// mediaconvert.createJob(mediaConvertParams, function(err, data) {
//   if (err)
//     console.log(err, err.stack); // an error occurred
//   else console.log(data); // successful response
// });

const startFaceDetection = () => {
  var params = {
    Video: {
      /* required */
      S3Object: {
        Bucket: 'storage.ruletheglobe.com',
        Name:
          'private/us-east-1:fd032985-afc3-4746-999d-106d082dcf56/Fifty_Shades_Freed_-_Mrs._Grey_Will_See_You_Now_HD-8V08Gu1DOgE.mov'
      }
    },
    // ClientRequestToken: 'STRING_VALUE',
    // FaceAttributes: DEFAULT | ALL,
    // JobTag: 'STRING_VALUE',
    NotificationChannel: {
      RoleArn:
        'arn:aws:iam::465541050084:role/r_rekognition_publish_sns' /* required */,
      SNSTopicArn:
        'arn:aws:sns:us-east-1:465541050084:AmazonRekognition' /* required */
    }
  };
  rekognition.startFaceDetection(params, function(err, data) {
    if (err)
      console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
};

const getFaceDetection = () => {
  var params = {
    JobId:
      'd955717c306c67d284cddd9903312353b6b16f7e885f217ff94b629a5485bd9e' /* required */
  };
  rekognition.getFaceDetection(params, function(err, data) {
    if (err)
      console.log(err, err.stack); // an error occurred
    else console.log(data); // successful response
  });
};

getFaceDetection();

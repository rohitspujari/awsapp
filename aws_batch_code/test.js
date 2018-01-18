const AWS = require('aws-sdk');
const dynamo = new AWS.DynamoDB({ region: 'us-east-1' });
const mediaConvertParams = require('./mediaconvert_params_template.json');
var rekognition = new AWS.Rekognition({ region: 'us-east-1' });
var fs = require('fs');

const jobId = '6f541b36-43ba-474c-9d36-ba9230662d78';
const data = {
  Location: 'location',
  Bucket: 'bucket',
  Key: 'key'
};

const updateTable = (jobId, celebs) => {
  var params = {
    TableName: 'r_batch_jobs',
    Key: {
      batchJobId: {
        S: String(jobId)
      }
    },
    UpdateExpression: 'SET celebs=:c, rekognitionJobCompleted=:rjc',
    ExpressionAttributeValues: {
      ':c': {
        SS: celebs
      },
      ':rjc': {
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

const event = {
  Records: [
    {
      EventSource: 'aws:sns',
      EventVersion: '1.0',
      EventSubscriptionArn:
        'arn:aws:sns:us-east-1:465541050084:AmazonRekognition:d4282fc7-9b6e-4b90-8ad4-d09ec587adcc',
      Sns: {
        Type: 'Notification',
        MessageId: 'c6536f26-78bb-50a6-b245-3de17c238ac1',
        TopicArn: 'arn:aws:sns:us-east-1:465541050084:AmazonRekognition',
        Subject: null,
        Message:
          '{"JobId":"05ed9b2a8bd636674b1847c3559e980380289e266b271544fa51be7b727fb77c","Status":"SUCCEEDED","API":"StartFaceDetection","JobTag":"b2a63493-56fa-4b0c-8385-af630aa800e6","Timestamp":1514996312069,"Video":{"S3ObjectName":"private/us-east-1:fd032985-afc3-4746-999d-106d082dcf56/Ellen_Puts_Johnny_Depp_in_the_Hot_Seat-L147kFfchtI.mov","S3Bucket":"storage.ruletheglobe.com"}}',
        Timestamp: '2018-01-03T16:18:32.187Z',
        SignatureVersion: '1',
        Signature:
          'RHx/IdqB6QbPQf1nRLS1WiZ4e4UUGS9Zd+dGHRmJOQUEYct7nirFbA0H1qSijHMEVT4asi4jN4ZZIAybtl3Nzt4M5KwxP4C0YbT+Q1WvtZKtIdPlETvFJnzOj2ZQ68j9DlnGYrg0NaF5SOUGidWHQyallIuxDU4mBn1EgKastuaZipYOheJhEx46Wb7U4CnKzPf3QXmxWKk1U8UBf4GlQ+TmqyOIrB3ubdJ13j/maFBjlnnTD5Vgbd0iBrGB0+bmbGPjJSyHJltYXoVAYVXjc0cAo7ZIIZB1gaolreNBy+NV5lS6+RfHRl+5Wc0dXUZTVNk/UsQz9TnIXDnv5+afEw==',
        SigningCertUrl:
          'https://sns.us-east-1.amazonaws.com/SimpleNotificationService-433026a4050d206028891664da859041.pem',
        UnsubscribeUrl:
          'https://sns.us-east-1.amazonaws.com/?Action=Unsubscribe&SubscriptionArn=arn:aws:sns:us-east-1:465541050084:AmazonRekognition:d4282fc7-9b6e-4b90-8ad4-d09ec587adcc',
        MessageAttributes: {}
      }
    }
  ]
};

const getCelebrityRecognition = (JobId, S3ObjectName, S3Bucket) => {
  var params = {
    JobId
  };
  rekognition.getCelebrityRecognition(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else {
      // an error occurred
      const celebs = data.Celebrities;

      //const unique = removeDuplicates(celebs, 'Name');
      const unique = [
        ...new Set(
          celebs.map(
            item =>
              item.Celebrity.Name +
              (item.Celebrity.Urls.length > 0
                ? '|' + item.Celebrity.Urls[0]
                : '')
          )
        )
      ];
      //   ].map(a => {
      //     parts = a.split('|');
      //     return {
      //       Name: parts[0],
      //       Url: parts[1]
      //     };
      //   });

      //const x = celebs.map(i => i.Celebrity.Name);
      console.log(unique);
      updateTable(jobId, unique);

      ///fs.writeFile('myjsonfile.json', JSON.stringify(data), 'utf8');
    } // successful response
  });
};

//console.log(event.Records[0].Sns.Message);

const message = JSON.parse(event.Records[0].Sns.Message);

const { JobId, JobTag, Video: { S3ObjectName, S3Bucket } } = message;

console.log(jobId, JobTag, S3ObjectName, S3Bucket);

getCelebrityRecognition(JobId);

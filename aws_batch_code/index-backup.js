var fs = require('fs');
var AWS = require('aws-sdk');
var youtubedl = require('youtube-dl');
const accessKeys = require('/Users/ropujari/aws/accessKeys.json');

//Reference:
//http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#constructor-property

const url = process.argv[2]; //'https://www.youtube.com/watch?v=OSBl32lNGBg';
const bucket = process.argv[3]; //'deletebucket-today';
var video = youtubedl(url);

AWS.config.update(accessKeys);
const metadata = {};

//Will be called when the download starts.
video.on('info', function(info) {
  // console.log(info)
  console.log('Download started');
  metadata.filename = info._filename;
  console.log('filename: ' + metadata.filename);
  metadata.size = info.size / 1000000;
  console.log('size in MB: ' + metadata.size);
});

writer = fs.createWriteStream('/tmp/tmpVideo.mp4');

writer.on('finish', () => {
  console.error('All writes are now complete.');

  fs.readFile('/tmp/tmpVideo.mp4', function(err, data) {
    if (err) {
      throw err;
    }

    var base64data = new Buffer(data, 'binary');
    if (metadata.size > 100) {
      uploadToS3Multipart(base64data, metadata.filename, bucket);
    } else {
      var s3 = new AWS.S3();
      s3.putObject(
        {
          Bucket: bucket,
          Key: metadata.filename,
          Body: base64data,
          ACL: 'public-read'
        },
        function(resp) {
          //console.log(arguments);
          console.log('Successfully uploaded video.');
        }
      );
    }
  });
});

video.pipe(writer);

function uploadToS3(data, filename, bucket) {
  const s3 = new AWS.S3();
  s3.putObject(
    {
      Bucket: bucket,
      Key: filename,
      Body: data,
      ACL: 'public-read'
    },
    function(resp) {
      //console.log(arguments);
      console.log('Successfully uploaded video.');
    }
  );
}

const uploadToS3Multipart = (data, filename, bucket) => {
  console.log('Multipart Upload');
};

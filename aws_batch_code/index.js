const fs = require('fs');
const AWS = require('aws-sdk');
const youtubedl = require('youtube-dl');
//const accessKeys = require('/Users/ropujari/aws/accessKeys.json'); // For Testing only
//AWS.config.update(accessKeys); For Testing only

//Reference:
//http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#constructor-property

const url = process.argv[2]; //'https://www.youtube.com/watch?v=OSBl32lNGBg';
const bucket = process.argv[3]; //'deletebucket-today';
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

writer = fs.createWriteStream('/tmp/tmpVideo.mp4');

writer.on('finish', () => {
  console.error('All writes are now complete.');

  fs.readFile('/tmp/tmpVideo.mp4', (err, data) => {
    if (err) {
      throw err;
    }

    const base64data = new Buffer(data, 'binary');
    if (metadata.size > 100) {
      uploadToS3Multipart(base64data, metadata.filename, bucket);
    } else {
      uploadToS3(base64data, metadata.filename, bucket);
    }
  });
});

video.pipe(writer);

const uploadToS3 = (data, filename, bucket) => {
  const s3 = new AWS.S3();
  s3.putObject(
    {
      Bucket: bucket,
      Key: filename,
      Body: data,
      ACL: 'public-read'
    },
    (err, data) => {
      //console.log(arguments);
      if (err) console.log(err);
      console.log(data);
      console.log('Successfully uploaded video.');
    }
  );
};

const uploadToS3Multipart = (data, filename, bucket) => {
  console.log('Multipart Upload');
  const upload = new AWS.S3.ManagedUpload({
    partSize: 10 * 1024 * 1024,
    params: { Bucket: bucket, Key: filename, Body: data }
  });
  upload.send((err, data) => {
    if (err) console.log('Error:', err.code, err.message);
    else console.log(data);
    console.log('Successfully uploaded video.');
  });
};

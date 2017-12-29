var fs = require('fs');
var AWS = require('aws-sdk');
var youtubedl = require('youtube-dl');

//Reference:
//http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3/ManagedUpload.html#constructor-property

const url = process.argv[2]; //'https://www.youtube.com/watch?v=OSBl32lNGBg';
const bucket = process.argv[3]; //'deletebucket-today';
var video = youtubedl(url);

AWS.config.update({
  accessKeyId: 'AKIAIQHES5765PPRK7CA',
  secretAccessKey: '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'
});
const metadata = {};

//Will be called when the download starts.
video.on('info', function(info) {
  // console.log(info)
  console.log('Download started');
  console.log('filename: ' + info._filename);
  metadata.filename = info._filename;
  console.log('size in MB: ' + info.size / 1000000);
});

writer = fs.createWriteStream('/tmp/myvideo.mp4');

writer.on('finish', () => {
  console.error('All writes are now complete.');

  fs.readFile('/tmp/myvideo.mp4', function(err, data) {
    if (err) {
      throw err;
    }

    var base64data = new Buffer(data, 'binary');

    var s3 = new AWS.S3();
    s3.putObject(
      {
        Bucket: bucket,
        Key: metadata.filename,
        Body: base64data,
        ACL: 'public-read'
      },
      function(resp) {
        console.log(arguments);
        console.log('Successfully uploaded video.');
        //callback(null, { resp, arguments });
      }
    );
  });
});

video.pipe(writer);

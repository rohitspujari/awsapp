const awsconfig = {
  Auth: {
    identityPoolId: 'us-east-1:84e1a62a-ffab-4453-8543-3e0c63e8d104', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_CzKaWZXb5', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '1sg472r4rtesq50k589i3crdcq' //OPTIONAL - Amazon Cognito Web Client ID
  },
  federated: {
    google_client_id:
      '277830869306-6qj1p3mep3utio2c9a3lgudfgga9sd2j.apps.googleusercontent.com'
    // facebook_app_id: ''
  }
};

export default awsconfig;

const awsconfig = {
  Auth: {
    //r_awsapp_identity_pool
    identityPoolId: 'us-east-1:84078cba-600e-48e7-96ec-5d1860927264', //REQUIRED - Amazon Cognito Identity Pool ID
    region: 'us-east-1', // REQUIRED - Amazon Cognito Region
    userPoolId: 'us-east-1_CzKaWZXb5', //OPTIONAL - Amazon Cognito User Pool ID
    userPoolWebClientId: '1sg472r4rtesq50k589i3crdcq' //OPTIONAL - Amazon Cognito Web Client ID
  },
  federated: {
    google_client_id:
      '277830869306-6qj1p3mep3utio2c9a3lgudfgga9sd2j.apps.googleusercontent.com',
    facebook_app_id: '133718410632322'
  },
  API: {
    endpoints: [
      {
        name: 'Friends',
        endpoint: 'https://2lu91un42e.execute-api.us-east-1.amazonaws.com'
      }
    ]
  }
};

export default awsconfig;

var doc = require('aws-sdk');
var dynamo = new doc.DynamoDB();

exports.handler = (event, context, callback) => {
  var id = 0;
  if (event.context && event.context['cognito-identity-id'] !== '') {
    id = event.context['cognito-identity-id'];
  }

  var params = {
    TableName: 'r_users',
    Item: {
      userid: {
        S: String(id)
      },
      last_login: {
        S: String(new Date(Date.now()))
      }
    },
    ReturnConsumedCapacity: 'TOTAL',
    ReturnValues: 'ALL_OLD'
  };

  dynamo.putItem(params, (err, data) => {
    if (err)
      console.log(err, err.stack); // an error occurred
    else callback(null, { data, event }); // successful response
    /*
  data = {
    ConsumedCapacity: {
    CapacityUnits: 1, 
    TableName: "Music"
    }
  }
  */
  });
};

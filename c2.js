const FastMQ = require('fastmq');
 
var requestChannel;
// create a client with 'requestChannel' channel name and connect to server.
FastMQ.Client.connect('requestChannel', 'master')
.then((channel) => {
    // client connected
    requestChannel = channel;
    let reqPayload = {data: 'I want to send to c1 a hello'};
 
    // send request to 'responseChannel' channel  with topic 'test_cmd' and JSON format payload.
    return requestChannel.request('responseChannel', 'refresh', reqPayload, 'json');
})
.then((result) => {
    console.log('Got response from master, data:' + result.payload.data);
    // client channel disconnect
    requestChannel.disconnect();
})
.catch((err) => {
    console.log('Got error:', err.stack);
});
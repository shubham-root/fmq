const FastMQ = require('fastmq');
 
var requestChannel;
// create a client with 'requestChannel' channel name and connect to server.
FastMQ.Client.connect('requestChannel', 'master')
.then((channel) => {
    // client connected
    requestChannel = channel;
 
    // send request to 'master' channel  with topic 'test_cmd' and JSON format payload.
    let reqPayload = {data: {
        referenceId: "6019c84a04e2a90182ad02fa"
    }};
    return requestChannel.request('master', 'refresh', reqPayload, 'json');
})
.then((result) => {
    console.log('Got response from master, data:' + result.payload.data);
    // client channel disconnect
    requestChannel.disconnect();
})
.catch((err) => {
    console.log('Got error:', err.stack);
});
const FastMQ = require('fastmq');
 
// Create message broker server with 'master' channel name
const server = FastMQ.Server.create('master');
 
// Register topic: 'test_cmd', receive message and response back to client requester
server.response('refresh', (msg, res) => {
    console.log('Server receive request payload:', msg.payload);
    // echo request data back;
    let resData = {data: msg.payload.data};
    res.send(resData, 'json');
});
 
// start server
server.start().then(() => {
    console.log('Message Broker server started');
});
let FastMQ = require('fastmq');
var responseChannel;
// create a client with 'requestChannel' channel name and connect to server.
function startServer() {
    FastMQ.Client.connect('responseChannel', 'master').then((channel) => { // client connected
        console.log("Connected")
        responseChannel = channel;
        responseChannel.response('refresh', (msg, res) => {
            console.log('Receive request payload:', msg.payload);
            // echo request data back;
            let resData = {
                data: msg.payload.data
            };
            res.send(resData, 'json');
        });
    
    }).catch((err) => {
        console.log('Got error:', err.stack);
        setTimeout(startServer, 5000);
    });
}

startServer();


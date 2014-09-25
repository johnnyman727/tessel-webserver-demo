    // HTTP Request routing library
var router = require('tiny-router'),
    // Websocket library
    ws = require("nodejs-websocket"),
    // Use fs for static files
    fs = require('fs')
    // Use tessel for changing the LEDs
    tessel = require('tessel');
 
// The router should use our static folder for client HTML/JS
router
    .use('static', {path: './static'})
    // Use the onboard file system (as opposed to microsd)
    .use('fs', fs)
    // Listen on port 8080
    .listen(8080);

// When the router gets an HTTP request at /leds/[NUMBER]
router.get("/leds/{led}", function(req, res) {
  console.log('which led?', req.body.led)
  // Grab the LED being toggled
  var index = req.body.led;
  // Toggle the LED
  tessel.led[index].toggle();
  // Send a response
  res.send(200);
});

// Create a websocket server on port 8001
ws.createServer(function (conn) {
  console.log("New connection")
  // When we get a packet from a connection
  conn.on("text", function (str) {

    console.log("Received "+str)
    // Parse it as JSON
    var command = JSON.parse(str);
    // Actually set the LED state
    tessel.led[command.led].output(command.on)
    // Echo it back to confirm
    conn.sendText(JSON.stringify(command));
  });
  // Notify the console when the connection closes
  conn.on("close", function (code, reason) {
      console.log("Connection closed")
  })
}).listen(8081)

console.log('Running Server');
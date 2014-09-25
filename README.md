Tessel Webserver Demo
=========================

This is a demonstration of using both a routing library (`tiny-router`) to field HTTP requests as well as a websocket connection (using `nodejs-websocket`) to a client. This is useful when you want to display an interface to a client and have that client manipulate the state of Tessel.

When a client goes to the IP Address of the Tessel, the Tessel will serve the static html file. When the client receives the HTML file, it will run the included JavaScript which opens up a websocket connection back to Tessel.

The HTML provided buttons for toggling the LEDs and the websocket will toggle `led0` every five seconds by default.

### Configuration

Connect your tessel to wifi:
```
tessel wifi -n YOUR_SSID -p YOUR_PASSWORD
```

Your Tessel will print its IP address to the console. If you didn't see it, run:

```
tessel wifi -l
```

Once you have your IP Address, open up `/static/index.html` and insert your IP Address in [the websocket creation method](https://github.com/johnnyman727/tessel-webserver-demo/blob/master/static/index.html#L40).


### Running the example

```
tessel run app.js
```

Then go to the IP address of your Tessel (followed by the port) in your web browser (for example `192.168.2.100:8080`).

### What you can do

If you click any of the buttons in the loaded website, Tessel's LEDs will toggle. Additionally, the websocket will automatically toggle `led0` every five seconds.


### Extra Notes

I've noticed that using both websockets and HTTP on Tessel makes it less reliable. I usually have to reset it after each successful push in order to receive another HTTP request. We're working on it!

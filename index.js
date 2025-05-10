const Server = require('./core/server.js');

// Avvio del server
const myServer = new Server(3000);
myServer.startServer();
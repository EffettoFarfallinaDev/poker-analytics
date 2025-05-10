const Server = require('./core/server.js');

// const server = new Server(3000);
// server.startServer();

new Server(3000).startServer().then(() => {
    console.log('Server started successfully');
    }).catch((error) => {
    console.error('Error starting server:', error);
});
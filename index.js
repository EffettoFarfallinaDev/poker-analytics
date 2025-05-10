const Server = require('./core/server.js');

new Server(3000).startServer()
    .then(() => {
        console.log('Server started successfully');
        // Initialize database, configure routes, start background jobs, etc.
    })
    .catch((error) => {
        console.error('Error starting server:', error);
    });
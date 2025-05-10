const http = require('http');
const fs = require('fs');
const path = require('path');

class Server {
    constructor(port) {
        this.port = port || 3000;
    }

    startServer() {
        const server = http.createServer((req, res) => {
            this.handleRequest(req, res);
        });

        server.listen(this.port, () => {
            console.log(`Server is running at http://localhost:${this.port}/`);
        });
    }

    handleRequest(req, res) {
        console.log(`Request received: ${req.method} ${req.url}`);
        this.renderHTML(res);
    }

    handleError(res, errorMessage) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(errorMessage);
    }

    renderHTML(res) {
        const filePath = path.join(__dirname, "..", "views", "index.html");
        fs.readFile(filePath, (err, data) => {
            console.log(filePath);
            
            if (err) {
                this.handleError(res, "Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }
}

module.exports = Server;
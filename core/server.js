const http = require('http');
const fs = require('fs');
const fsPromises = fs.promises;
const path = require('path');

class Server {
    constructor(port) {
        this.port = port || 3000;
        // Cache per memorizzare i file letti ed evitare I/O inutili
        this.cache = {};
    }

    async startServer() {
        return new Promise(resolve => {
            const server = http.createServer((req, res) => {
                // Gestione degli errori nell'handler per evitare promesse non gestite
                this.handleRequest(req, res).catch(err => {
                    this.handleError(res, `Internal Server Error: ${err.message}`);
                });
            });

            server.listen(this.port, () => {
                console.log(`Server is running at http://localhost:${this.port}/`);
                resolve();
            });
        });
    }

    async handleRequest(req, res) {
        console.log(`Request received: ${req.method} ${req.url}`);
        // Qui puoi estendere il routing in base all'URL, se necessario
        await this.renderHTML(res);
    }

    handleError(res, errorMessage) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(errorMessage);
    }

    async renderHTML(res, filename = "index.html", view_dir = "views") {
        const filePath = path.join(__dirname, "..", view_dir, filename);
        console.log(`Serving file at: ${filePath}`);

        // Verifica se il file è già in cache
        if (this.cache[filePath]) {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(this.cache[filePath]);
            return;
        }

        try {
            const data = await fsPromises.readFile(filePath);
            // Salva il contenuto in cache per successive richieste
            this.cache[filePath] = data;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        } catch (err) {
            // Gestione dell'errore con un messaggio che indica il file problematico
            this.handleError(res, `Internal Server Error ... check: ${filename}`);
        }
    }
}

module.exports = Server;
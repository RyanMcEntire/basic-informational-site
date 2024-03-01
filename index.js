const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 8080;

const server = http.createServer((req, res) => {
  let filePath = '.' + (req.url === '/' ? '/index.html' : req.url);

  if (!path.extname(filePath)) {
    filePath += '.html';
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile('./404.html', (error404, content404) => {
        if (error404) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('404 Not Found (404 message from server)');
        } else {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content404);
        }
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

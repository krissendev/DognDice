//npm run dev
//fuser 3000/tcp
//kill <tasknumber>
//https://github.com/dataarts/dat.gui
//remember scripts in both http.createServer and in index.html

const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;
console.log("step 0");
const server = http.createServer((req, res) => {
  if (req.url === '/') {
    readResource(res,'index.html','text/html' );
  }
  //library 
  else if(req.url === '/lib/three/three.js'){
    readResource(res,'/lib/three/three.js','text/javascript' );
  }
  else if(req.url === '/lib/datgui/build/dat.gui.js'){
    readResource(res,'/lib/datgui/build/dat.gui.js','text/javascript' );
  } 
  //functionality
  else if (req.url === '/dog.js') {
    readResource(res,'/dog.js','text/javascript');
  }
  else if (req.url === '/dice3d.js') {
    readResource(res,'/dice3d.js','text/javascript' );
  }
  else if (req.url === '/testimg.jpg') {
    readResource(res,'/testimg.jpg','image/jpg' );
  }
  else {
    res.writeHead(404);
    res.end('Not found');
  }
});

function readResource(res, sourcepath, type){
  const file = path.join(__dirname, sourcepath);
  fs.readFile(file, (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading preload.js: ${err}`);
    } else {
      res.writeHead(200, { 'Content-Type': type });
      res.end(content);
    }
  });
}

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


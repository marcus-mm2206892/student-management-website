//trying to override CORS policy in chrome by running app on local server
// start server by using node server.js , then open browser and visit "localhost:3001"
const http = require('http');
const fs = require('fs');

const server = http.createServer(function(req,res){
    console.log(req);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html')
    res.setHeader("Access-Control-Allow-Origin", "*")
    try{
        if (req.url === "/") {
            res.setHeader("Content-type", "text/html");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.statusCode = 200;
            res.end(require("fs").readFileSync("../html/index.html", "utf8"));
          }
          else if (req.url.match(".css$")) {
            const cssPath = path.join(__dirname, request.url);
            const fileStream = fs.createReadStream(cssPath, "UTF-8");
            res.writeHead(200, { "Content-Type": "text/css" });
            fileStream.pipe(res);
          }
        
    }catch(e){
        res.statusCode=404;
        res.write("ERROR 404 FILE NOT FOUND");
        console.log(e);
        res.end;
    }

    
})

const port = 3001;

server.listen(port, function(){
    console.log("Server running on " + port);
    console.log("Updated!");
})
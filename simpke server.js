//simple server that take user input from html form and stored it



const http = require('http');
//allow us to work with the file system
const fs = require('fs');
//function that should be executed for evety incoming request
const server = http.createServer((req,res) =>
{
const url = req.url;
const method = req.method
if(url==='/')
{
//html form
 res.setHeader('content-type', 'text/html');
 res.write('<html>');
 res.write('<head><title>Enter message</title></head>');
 res.write('<body><form action = "/message" method = "POST"> <input type="text" name="message"><button type ="submit">send</button> </input></form></body>');
 res.write('</html>');
 return res.end();
}
if(url ==='/message' && method ==='POST')
{
const body = [];
req.on('data', (chunk) => //function that should be executed for every incoming data piece
{
//insert the data to body array
body.push(chunk);
} );    
//collect all the data in the end, converting to string and parsing it to the body array
req.on('end', () =>
{
  const parseBody = Buffer.concat(body).toString();
  //takes only the value
  const message = parseBody.split('=')[1];
  fs.writeFileSync('message.txt',message);


});
//parse the user to the previous location ("/")
res.statusCode = 302;
res.setHeader("location","/");
return res.end();
}
res.setHeader('content-type', 'text/html');
res.write('<html>');
res.write('<head><title>my first page</title></head>');
res.write('<body><h1>this is my first page</h1></body>');
res.write('</html>');
res.end();


} );
//port
server.listen(9000);

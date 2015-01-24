var express = require('express');
var  http = require('http');
var cassandra=require('cassandra-driver');
var client =new cassandra.Client({'contactPoints':['127.0.0.1'],keyspace:'alltotal'}); 
/* setting static html to be used*/
var app = express()
  .use(express.static('public'));
//useful functions
    var counter=0;

/* Route Definations */
app.get('/showusers/',function(req,res){
  client.execute("SELECT firstname,lastname,email FROM users", function (err, result) {
           var users=[];
           var index=0;
           if (!err){
               if ( result.rows.length > 0 ) {
                   while(index<result.rows.length){
                   var user = result.rows[index];
                   users.push({id:index,fname: user.firstname,lname:user.lastname, email: user.email});
                   index++;
                   }
                   res.contentType('application/json');
                   res.send(JSON.stringify(users));
                   counter=index;
                   res.end();
                } else {
                   console.log("No results");
                   res.end();
               }
           }
         });
});

app.get('/addUser/:fname/:lname/:email',function(req,res){
    var f=req.params.fname;
    var l=req.params.lname;
    var e=req.params.email;
    counter++;
    query="insert into users(id,firstname,lastname,email) values('"+counter+"','"+f+"','"+l+"','"+e+"')";
    console.info(query);
    client.execute(query,insertCB);
    function insertCB(err,result){
      console.info("result:"+result);
      console.info("err"+err);
      var resu={msg:"done"};
      res.end(JSON.stringify(resu));
    }
});

app.get('/*', function  (req, res) {
  res.status(404, {status: 'not found'});
  res.end();
});
/* Route Defination Over */

/* creating and starting server */
http.createServer(app).listen(3000, function () {
  console.log("Server ready at http://localhost:3000");
});

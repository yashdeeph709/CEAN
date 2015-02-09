var express = require('express');
var  http = require('http');
var bodyParse=require('body-parser');
var cassandra=require('cassandra-driver');
var client =new cassandra.Client({'contactPoints':['127.0.0.1'],keyspace:'alltotal'}); 

/* setting static html to be used*/
var app = express()
  .use(express.static('public'));
  app.use(bodyParse.urlencoded());

//useful functions
var counter=0;

/* Route Definations */
app.get('/showusers',function(req,res){
  client.execute("SELECT firstname,lastname,email FROM users", function (err, result) {
           if (!err){
                   counter=result.rows.length+1;
                   result.rows.sort();
                   res.json(result.rows);
                } else {
                   console.log("No results");
                   res.end();
               }
           
         });
});

app.get('/addUser',function(req,res){
    var firstname=req.param('firstname');
    var lastname=req.param('lastname');
    var email=req.param('email');
    client.execute("insert into users(id,firstname,lastname,email) values("+counter+",'"+firstname+"','"+lastname+"','"+email+"')",
      function(err,result){
      if(err){
        var error=[];
        error.push(err);
        res.json(err);
      }else{
        var resultt=[];
        resultt.push(result);
        res.json(resultt);
      }
    });
});

app.get('/*', function  (req, res) {
  res.status(404, {status: 'not found'});
  res.end();
});

app.listen(3000, function(){
  console.log("Server ready at http://localhost:3000");
});

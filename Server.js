var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb://Nayan:nv11b10..mongodbatlas@cluster0-shard-00-00-599cj.mongodb.net:27017,cluster0-shard-00-01-599cj.mongodb.net:27017,cluster0-shard-00-02-599cj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";


var express =require('express');

var app=express();

app.use(express.static('Public'));

var server=app.listen(3000);


console.log('server');

var socket=require('socket.io');


var io=socket(server);

	






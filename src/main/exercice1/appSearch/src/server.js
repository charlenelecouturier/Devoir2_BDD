var express =require('express');
var path = require("path");
var bodyParser=require('body-parser');
var mongo=require("mongoose");
const cors = require('cors');

var db=mongo.connect("mongodb://localhost:27017/DB",  { useNewUrlParser:true, useUnifiedTopology: true },function(err,response){
if (err){console.log(err);}
else{console.log('connected to DB');}
});

var app=express();



var corsOption = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
  };
  app.use(cors(corsOption));
  app.listen(3000, () => console.log('Server running'));

var Schema=mongo.Schema;
var MonstersSchema= new Schema({
name: {type:String},
spells: {type : Array}


}, {versionKey:false});

var model=mongo.model('monsters', MonstersSchema, 'monsters');

app.get("/api/getMonster",function(req,res){
model.find({},function(err,data){
    if(err){

        res.send(err);
    }else{
        res.send(data);
    }
    console.log(data)
})






})

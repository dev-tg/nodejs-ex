// imports
const express= require("express");
const app=express();
const bodyparser =require('body-parser');
const mongoose=require("mongoose");
const stockRoutes=require('./api/routes/stocks');
const morgan = require("morgan");
// middlewares

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
  var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
      mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
      mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
      mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
      mongoPassword = process.env[mongoServiceName + '_PASSWORD']
      mongoUser = process.env[mongoServiceName + '_USER'];

  if (mongoHost && mongoPort && mongoDatabase) {
    mongoURLLabel = mongoURL = 'mongodb://';
    if (mongoUser && mongoPassword) {
      mongoURL += mongoUser + ':' + mongoPassword + '@';
    }
    // Provide UI label that excludes user id and pw
    mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
    mongoURL += mongoHost + ':' +  mongoPort + '/' + mongoDatabase;

  }
    console.log(mongoURL);
}
//CORS HANDLER
app.use(morgan("dev"));  
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','* ');
    res.header('Access-Control-Allow-Headers','Orign,X-Requested-With,Content-Type,Accept,Authorization'); 
    if(req.method==="OPTIONS"){ 
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,PATCH");
    return res.status(200).json({});
    }
    next();

})

// routes which will handle req
app.use('/stock',stockRoutes);

app.use((req,res,next)=>{
    const error=new Error('Not Found');
    error.status=404;
    next(error);

});
app.use(((error,req,res,next)=>{
    res.status(error.status||500);
    res.json({error:{message:error.messsage}})
}))
module.exports=app;

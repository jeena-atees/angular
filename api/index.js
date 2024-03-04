var Express = require('express');
var MongoClient = require('mongodb').MongoClient;
var cors = require('cors');
const multer = require('multer');
var app =Express();
app.use(cors());
var CONNECTION_STRING ="mongodb+srv://jeenamadhavan:TIbmXrl4M1Mn9lpW@cluster0.uv0mzt2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
var DATABASE ='coursesdb';
var database;
app.listen(5038,()=>{
    MongoClient.connect(CONNECTION_STRING,(error,client)=>{
        database = client.db(DATABASE);
        console.log('Mongo DB Connection Successful!');
    })
})
app.get('/api/courses/GetCourses',(req,response)=>{
    database.collection("courses").find({}).toArray((error,result)=>{
        response.send(result);
    })
})
app.get('/api/courses/GetCategories',(req,response)=>{
    database.collection("categories").find({}).toArray((error,result)=>{
        response.send(result);
    })
})
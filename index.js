//Basic server structure

// 1. import express
const express = require ("express")

//2. intialization of express
const app = new express();
const path = require('path');



//passing body parameter
app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use(express.static(path.join(__dirname,'/build')));

//axios
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type ");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
})

// Connecting to Database

const movieInfo = require('./models/mongodb')

//3. API creation

// READ
app.get('/api/viewmovies',async(req,res)=>{
    try{
      let result = await movieInfo.find();
      res.json(result);
    }
    catch(error){
      res.status(500).send(error);
    }
  })

  //post for course

app.post('/api/createmovie',(req,res)=>{
    try {
        console.log(req.body)//server data
    let movie = new movieInfo(req.body); //passing the data to DB
    movie.save();//saving to db
    res.send("Data Added")
    } catch (error) {
        res.status(500).send(error);
    }
  })

  //get single Data
  
  //UPDATE

  app.post('/api/updatemovie',  async (req,res) => {
    try{
        let result =  await movieInfo.findByIdAndUpdate(req.body._id, req.body);
        res.send("Data Updated");
    }
    catch(error){
        res.status(500).send(error);
    }
})
  //DELETE

app.post('/api/deletemovie',async(req,res)=>{
    try {
      await movieInfo.findByIdAndDelete(req.body._id);
    res.send("Data deleted")
    } catch (error) {
      res.status(500).send(error);
    }
    
  })

  //SEARCH

app.post('/api/search',async(req,res)=>{
  try {
    let result = await movieInfo.find(req.body);
    //let result = await movieInfo.find({ "moviename": { $regex: '.' + req.body.moviename + '.' } });
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
})

//Cyclic_Deployment

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname,'/build/index.html'));
 });


//4. Setting PORT number
app.listen(5000,()=>{
    console.log("Server is running in port 5000")
})


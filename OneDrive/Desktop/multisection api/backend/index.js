const express = require('express')
const app = express()
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://srnaturalprakritikpaint:hUg821KPEeHqKniK@cluster0.avdag.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected successfully'))
  .catch((error) => console.error('MongoDB connection error:', error));
  
  app.use(express.json());

const port = 8000
app.listen(port,()=>{
    console.log('listening on port',port)
})
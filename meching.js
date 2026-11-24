const express=require('express');
const mongoose = require('mongoose');
const mechingApp=express();
mechingApp.use(express.json());
mechingApp.use(express.urlencoded({ extended: true }));
const cors = require('cors');
mechingApp.use(cors());
mechingApp.use(express.static('public'));


mongoose.connect('mongodb+srv://efrat:1234@cluster0.4kbuiha.mongodb.net/?appName=Cluster0')
  .then(() => console.log('Connected to MongoDB!'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

mechingApp.get('/',(req,res)=>{res.send('hello')},)


const groups = require('./rourers/groups')
const tromut = require('./rourers/tromut')
const turmim = require('./rourers/turmim')
const matrimim=require("./rourers/matrimim")

mechingApp.use('/tromut', tromut)
mechingApp.use('/groups', groups)
mechingApp.use('/turmim', turmim)
mechingApp.use('/matrimim', matrimim)


const port=3000
mechingApp.listen(port, () => {
console.log(`Example app listening on port ${port}`)})

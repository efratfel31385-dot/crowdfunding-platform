const express=require('express');
const app=express()
const port=3000
const arr=require('./Tormim.js');

app.get('/',(req,res)=>{console.log("Hi the donor");
res.send(arr)})

app.get('/donor/:id',(req,res)=>{console.log("Hi the donor"+req.params.id);
     let i=0,flag=true;
     for(;i<arr.length;i++)
          if(arr[i].id==req.params.id)
          {
               
               console.log("His name is:"+arr[i].firstName+" "+arr[i].lastName);
               res.send("Thank you for you -"+arr[i].firstName+" "+arr[i].lastName+"!!")
               flag=false;
               
          }
          if(flag)
               res.send("Error!!\nThere isn't donor with id "+req.params.id)})
app.listen(port,()=>console.log("I listen!!"))

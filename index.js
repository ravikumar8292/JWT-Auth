const express = require("express");
const jwt = require("jsonwebtoken");
const secretkey = "secretkey";

const app = express();


app.get('/', (req,res)=>{
    res.send({message:'json api'});
})

app.post('/login',(req,res)=>{
    const user= {
            id:1,
            username: "ravikumar",
            email: "ravibabu@test.com"
        }
        jwt.sign({user},secretkey,{expiresIn:'300s'},(err,token)=>{
            res.json({
                token
            })
        })
})

app.post('/profile',verifyToken,(req,res)=>{
    jwt.verify(req.token,secretkey,(err,authData)=>{
        if(err){
            res.send({result:'invalid token'});
        }else{
            res.json({
                message:"profile accessed",
                authData
            })
        }
    })
})

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        req.token = token;
        next();
    }else{
        res.send({result:'token is not valid'});
    }
}

app.listen(5000,()=>{
    console.log("app is running in 5000 port");
});
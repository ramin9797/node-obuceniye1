import express from 'express';

const userRouter = express.Router();
// userRouter.use((req,res,next)=>{

// })

userRouter.get("/login",(req,res,next)=>res.send('login'))
userRouter.get("/register",(req,res,next)=>res.send('register'))
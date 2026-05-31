const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const pool = require("./db");


router.post("/register", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const hashedPassword = await bcrypt.hash(password,10);
        await pool.query(
            "INSERT INTO users (email,password) VALUES ($1,$2)",
            [email,hashedPassword]
        );
        res.status(201).json({message: "User registered successfully"});
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
});


router.post("/login", async(req,res)=>{
    try{
        const {email,password} = req.body;
        const result = await pool.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );
        if(result.rows.length === 0){
            return res.status(400).json({error: "Invalid email or password"});
        }
        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({error: "Invalid email or password"});
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"});
        res.json({token});  
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}   
);

module.exports = router;
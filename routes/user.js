const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("./model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// router.get ("/",(req,res,next)=>{
//     res.status(200).json({
//         message:"Handling GET requests to /user"
//     })
// })

router.post("/", (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) {
      res.status(500).json({
        error: err,
      });
    } else {
      const user = new User({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        password: hash,
        phone: req.body.phone,
        email: req.body.email,
        userTypes: req.body.userTypes,
      });
      user
        .save()
        .then((result) => {
          res.status(200).json({
            message: result,
          });
        })
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    }
  });
});
 router.post ("/login",(req,res,next)=>{
     User.find({user:req.body.user})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth failed"
            })
        }
        bcrypt.compare(req.body.password,user[0],(result,err)=>{
        if(!result){
            return res.status(401).json({
                message:"incorrect password"
            })
        }
         else if(result){
           const token = jwt.sign({
            user:user[0].user,
            userTypes : user[0].userTypes,
            email:user[0].email,
            phone:user[0].phone
           },
           "login process",
           {
            expiresIn:"24h"
        })
           res.status(200).json({
            user:user[0].user,
            userTypes : user[0].userTypes,
            email:user[0].email,
            phone:user[0].phone,
            token:token
           })
        } 
        // else{
        //     return res.status(401).json({
        //         message:"Auth failed nouser"
        //     })
        // }
    })
        
    })
    .catch(err=>{
        res.status(500).json({
            message:"problem in login"
        })
    })
 })
module.exports = router;

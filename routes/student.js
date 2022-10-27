const express = require("express");
const router = express.Router();
const Student = require("./model/studentData");
const mongoose = require("mongoose");
const { json } = require("body-parser");
const checkAuth = require("./middleware/check-auth");
//get request
router.get("/",  checkAuth,(req, res, next) => {
  //   res.status(200).json({
  //     message: "Handling GET requests to /student",
  //   });
  Student.find()
    .then((data) => {
      res.status(200).json({
        message: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//post request
router.post("/",checkAuth,(req, res, next) => {
  //   res.status(200).json({
  //     message: "Handling POST requests to /student",
  //   });
  //   console.log(req.body);
  const student = new Student({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    phone: req.body.phone,
  });
  student
    .save()
    .then((result) => {
      //   console.log(result);
      res.status(200).json({
        newStudent: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//get  by id
router.get("/:id",checkAuth, (req, res, next) => {
  // console.log(req.params.id)
  const id = req.params.id;
  Student.findById(id)
    .then((data) => {
      res.status(200).json({
        message: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//delete request
router.delete("/:id", checkAuth, (req, res, next) => {
  const id = req.params.id;
  Student.remove({ _id: id })
    .then((data) => {
      res.status(200);
      // .json({
      // message:"your data is deleted",
      data;
      // })
    })
    .then((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

//put request
router.put("/:id", checkAuth,(req, res, next) => {
  // console.log(req.params.id)
  const id = req.params.id;
  Student.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        name: req.body.name,
        email: req.body.email,
        gender: req.body.gender,
        phone: req.body.phone,
      },
    }
  )
  .then(data=>{
    res.status(200).json({
        updated:data
    })
  })
  .catch(err=>{
    res.status(500).json({
        error:err
    })
  })
});
module.exports = router;

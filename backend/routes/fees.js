const express = require('express');
const User = require('../models/User')
const router = express.Router();


router.post('/payfees', async (req, res) => {
    const newUser= new User({
        username:req.body.username,
        age:req.body.age,
        feesOfMonth:req.body.feesOfMonth,
        batch:req.body.batch
    });

    try{
        await newUser.save();
        res.status(200).json({
            success:true,
            message:"Fees Paid Successfully"
        })
    }
    catch(e){
        console.log(e)
        res.status(406).json({
            success:false,
            message:"Some error occured"
        })
    }
    
});



module.exports = router;
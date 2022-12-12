const express = require('express');
const User = require('../models/User')
const router = express.Router();

//CompletePayment() [MOCK FUNCTION IS UPDATED HERE]
router.post('/payfees', async (req, res) => {

    //IF THE THIRD PARTY APP ACCEPTS THE PAYMENT THEN:
    const newUser= new User(req.body);
    User.findOne({username:newUser.username}).then((user)=>{
        console.log(user)
        if(user.feesOfMonth.find(function(element){
            return element == newUser.feesOfMonth
        }))
        {
            res.status(200).json({
                success:false,
                message:"You have already paid the fees for this month"
            })
        }
        else{
            User.findOneAndUpdate({username:newUser.username},{ "$set":{"batch":req.body.batch,"age":req.body.age},$push:{feesOfMonth:req.body.feesOfMonth}}).then((use)=>{
                console.log(use)
                res.status(200).json({
                    success:true,
                    message:"Fees Updated Successfully"
                })
            }).catch((e)=>{
                console.log(e)
            });
            
        }
    })
    .catch((newEntry)=>{
        console.log(newEntry)
        try{
            newUser.save();
            res.status(200).json({
                success:true,
                message:"Fees Paid Successfully"
            })
        }
        catch(e){
            console.log(e)
            res.status(400).json({
                success:false,
                message:"Some error occured"
            })
        }
    })
    //ELSE WE WILL RETURN THIS
    // .catch(e){
    //     res.status(400).json({
    //         success:false,
    //         message:"Payment Failed"
    //     })
    // }
});




module.exports = router;
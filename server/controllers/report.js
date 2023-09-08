const User = require('../models/user')

exports.addTest = (req,res,next) =>{
    const _id = req.params.id
    User.findOne({_id : _id}).then((user)=>{
        user.reports.push(req.body)
        user.save().then((user)=>{
            return res.status(200).json({
              message: 'success',
            })
        })
    })
}

exports.getUserTests = (req,res,next)=>{
    const email = req.params.email
    User.findOne({email : email}).then((user)=>{
        return res.status(200).json({
            message : 'success',
            tests : user.reports
        })
    })
}

const router = require('express').Router()
const Lead = require('../../models/Lead')
const User = require('../../models/User')

router.get('/getAll/:userId', (req,res,next) => {
  const { userId } = req.params
  User.findById(userId).populate('leads')
    .then( leads => {
      console.log(leads)
      res.status(200).json(leads)
    })
    .catch( err => res.status(500).json(err))
})

router.post('/newLead/:userId', (req,res,next) => {
  const { userId } = req.params
  Lead.create(req.body)
  .then( lead =>{
      User.findByIdAndUpdate(userId, {$push: {leads: lead._id}}, {new: true})
        .then(newUser => res.status(201).json(newUser))
        .catch( err => res.status(500).json(err))
     })
  .catch( err => res.status(500).json(err))
})

module.exports = router
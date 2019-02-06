const router = require('express').Router()
const Lead = require('../../models/Lead')
const User = require('../../models/User')

router.get('/getAll/:userId', (req,res,next) => {
  const { userId } = req.params
  User.findById(userId).populate('leads')
    .then( leads => {
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

router.post('/updateLead/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: req.body}, {new:true})
  .then(updatedLead => res.status(200).json(updatedLead))
  .catch(err => res.status(500).json(err))
})

router.post('/removeLead/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {active: false}, {new: true})
  .then(inactiveLead => res.status(200).json(inactiveLead))
  .catch(err => res.status(500).json(err))
})

router.post('/removeUserLead/:id', (req,res,next) => {
  const { id } = req.params
  User.findByIdAndUpdate(id, {$pull: {leads: req.body.id}}, {new: true})
  .then(inactiveLead => res.status(200).json(inactiveLead))
  .catch(err => res.status(500).json(err))
})

module.exports = router
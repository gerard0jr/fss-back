const router = require('express').Router()
const Quotation = require('../models/Quotation')
const Lead = require('../models/Lead')
const User = require('../models/User')

router.get('/getQuotations/:id', (req,res,next) => {
  const { id } = req.params
  User.findById(id).populate('quotations')
    .then(quotations => res.status(200).send(quotations))
    .catch(err => res.status(500).send(err))
})

router.post('/submitQuotation/:userId', (req,res,next) => {
  const { userId } = req.params
  Quotation.create(req.body)
    .then(quot => {
      User.findByIdAndUpdate(userId, {$push: {quotations: quot._id}}, {new: true})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  })

  router.post('/updateQuot/:id', (req,res,next) => {
    const { id } = req.params
    Quotation.findByIdAndUpdate(id, {$set: req.body}, {new:true})
    .then(updatedQuot => res.status(200).json(updatedQuot))
    .catch(err => res.status(500).json(err))
  })
  
  module.exports = router
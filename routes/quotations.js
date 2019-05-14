const router = require('express').Router()
const Quotation = require('../models/Quotation')
const Lead = require('../models/Lead')
const User = require('../models/User')

// Obtener todas las cotizaciones
router.get('/getQuotations/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findById(id).populate('quotations')
    .then(quotations => res.status(200).send(quotations))
    .catch(err => res.status(500).send(err))
})

// Nueva cotización
router.post('/submitQuotation/:leadId', (req,res,next) => {
  const { leadId } = req.params
  Quotation.create(req.body)
    .then(quot => {
      Lead.findByIdAndUpdate(leadId, {$push: {quotations: quot._id}}, {new: true})
        .then(user => res.status(200).send(user))
        .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  })

  // Eliminar cotización
  router.post('/delQuot/:id', (req,res) => {
    const { id } = req.params
    Quotation.findByIdAndUpdate(id, {active: false}, {new: true})
      .then(quot => res.status(200).send(quot))
      .catch(err => res.status(500).send(err))
  })

  // Actualizar cotización
  router.post('/updateQuot/:id', (req,res,next) => {
    const { id } = req.params
    Quotation.findByIdAndUpdate(id, {$set: req.body}, {new:true})
    .then(updatedQuot => res.status(200).json(updatedQuot))
    .catch(err => res.status(500).json(err))
  })
  
  module.exports = router
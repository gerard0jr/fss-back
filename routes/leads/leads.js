const router = require('express').Router()
const Lead = require('../../models/Lead')
const User = require('../../models/User')

// Obtener todos los deals
router.get('/getAll/:userId', (req,res,next) => {
  const { userId } = req.params
  User.findById(userId).populate({path:'leads', populate:{path:'clientName'}})
    .then( leads => {
      res.status(200).json(leads)
    })
    .catch( err => res.status(500).json(err))
})

// Agregar deal
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

// Actualizar deal
router.post('/updateLead/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: req.body}, {new:true})
  .then(updatedLead => res.status(200).json(updatedLead))
  .catch(err => res.status(500).json(err))
})

// Eliminar deal
router.post('/removeLead/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {active: false}, {new: true})
  .then(inactiveLead => res.status(200).json(inactiveLead))
  .catch(err => res.status(500).json(err))
})

// Eliminar ID de deal del usuario
router.post('/removeUserLead/:id', (req,res,next) => {
  const { id } = req.params
  User.findByIdAndUpdate(id, {$pull: {leads: req.body.id}}, {new: true})
  .then(inactiveLead => res.status(200).json(inactiveLead))
  .catch(err => res.status(500).json(err))
})

// Manejo de archivos de LEADS, crear y eliminar

router.post('/file0Upload/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: {fileURL0: req.body.link.link, file0Name: req.body.name}}, {new: true})
  .then(newLead => res.status(200).json(newLead))
  .catch(err => res.status(500).json(err))
})

router.post('/file1Upload/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: {fileURL1: req.body.link.link, file1Name: req.body.name}}, {new: true})
  .then(newLead => res.status(200).json(newLead))
  .catch(err => res.status(500).json(err))
})

router.get('/deleteFile0/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: {fileURL0: null}}, { new: true })
  .then(newLead => res.status(200).json(newLead))
  .catch(err => res.status(500).json(err))
})

router.get('/deleteFile1/:id', (req,res,next) => {
  const { id } = req.params
  Lead.findByIdAndUpdate(id, {$set: {fileURL1: null}}, { new: true })
  .then(newLead => res.status(200).json(newLead))
  .catch(err => res.status(500).json(err))
})

module.exports = router
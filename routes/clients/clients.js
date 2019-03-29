const router = require('express').Router()
const Lead = require('../../models/Lead')
const Client = require('../../models/Client')

router.post('/deleteClient/:id', (req,res) => {
  const { id } = req.params
  Client.findByIdAndUpdate(id, {active: false}, {new: true})
    .then(updatedClient => res.status(200).json(updatedClient))
    .catch(err => res.status(500).json(err))
})

router.post('/updateClient/:id', (req,res) => {
  const { id } = req.params
  Client.findByIdAndUpdate(id, {$set: req.body}, {new: true})
    .then(updatedClient => res.status(200).json(updatedClient))
    .catch(err => res.status(500).json(err))
})

router.get('/allClients', (req,res) => {
  Client.find().populate('clientName')
    .then(clients => res.status(200).json(clients))
    .catch(err => res.status(500).json(err))
})

router.post('/newClient', (req,res,next) => {
  Client.create(req.body)
    .then(newClient => res.status(201).json(newClient))
    .catch(err => res.status(500).json(err))
})

module.exports = router
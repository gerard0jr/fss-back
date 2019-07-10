const router = require('express').Router()
const User = require('../models/User')
const Bill = require('../models/Bill')

// Obtener todas las facturas
router.get('/allBills/:userId', (req,res,next) => {
  const { userId } = req.params
  User.findById(userId).populate({path:'bills', populate:{path:'client'}})
    .then( user => {
      res.status(200).json(user)
    })
    .catch( err => res.status(500).json(err))
})

// Agregar factura
router.post('/newBill/:userId', (req,res,next) => {
  const { userId } = req.params
  Bill.create(req.body)
  .then( bill =>{
      User.findByIdAndUpdate(userId, {$push: {bills: bill._id}}, {new: true})
        .then(newUser => res.status(201).json(newUser))
        .catch( err => res.status(500).json(err))
     })
  .catch( err => res.status(500).json(err))
})

// Actualizar factura
router.post('/updateBill/:id', (req,res,next) => {
  const { id } = req.params
  Bill.findByIdAndUpdate(id, {$set: req.body}, {new:true})
  .then(updatedBill => res.status(200).json(updatedBill))
  .catch(err => res.status(500).json(err))
})

// Eliminar factura
router.post('/removeBill/:id', (req,res,next) => {
  const { id } = req.params
  Bill.findByIdAndUpdate(id, {active: false}, {new: true})
  .then(inactiveBill => res.status(200).json(inactiveBill))
  .catch(err => res.status(500).json(err))
})


module.exports = router
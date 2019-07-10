const router = require('express').Router()
const User = require('../models/User')
const Order = require('../models/Order')

// Obtener todas las órdenes
router.get('/allOrders/:userId', (req,res,next) => {
  const { userId } = req.params
  User.findById(userId).populate({path:'orders', populate:{path:'client'}})
    .then( user => {
      res.status(200).json(user)
    })
    .catch( err => res.status(500).json(err))
})

// Agregar orden
router.post('/newOrder/:userId', (req,res,next) => {
  const { userId } = req.params
  Order.create(req.body)
  .then( order =>{
      User.findByIdAndUpdate(userId, {$push: {orders: order._id}}, {new: true})
        .then(newUser => res.status(201).json(newUser))
        .catch( err => res.status(500).json(err))
     })
  .catch( err => res.status(500).json(err))
})

// Actualizar orden
router.post('/updateOrder/:id', (req,res,next) => {
  const { id } = req.params
  Order.findByIdAndUpdate(id, {$set: req.body}, {new:true})
  .then(updatedOrder => res.status(200).json(updatedOrder))
  .catch(err => res.status(500).json(err))
})

// Eliminar orden
router.post('/removeOrder/:id', (req,res,next) => {
  const { id } = req.params
  Order.findByIdAndUpdate(id, {active: false}, {new: true})
  .then(inactiveOrder => res.status(200).json(inactiveOrder))
  .catch(err => res.status(500).json(err))
})

module.exports = router
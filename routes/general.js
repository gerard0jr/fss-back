const router = require('express').Router()
const Lead = require('../models/Lead')
const User = require('../models/User')

router.get('/getSellers', (req,res,next) => {
  User.find().populate('leads')
    .then(sellers => res.status(200).send(sellers))
    .catch(err => res.status(500).send(err))
})

module.exports = router
const router = require('express').Router()
const Lead = require('../../models/Lead')

router.get('/all', (req,res,next) => {
  res.send({message: 'Leads'})
})

module.exports = router
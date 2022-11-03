var express = require('express');
var router = express.Router();
const fs = require('fs')
var users = require('../user.json')
var candidates = require('../candidates.json')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

router.post('/',(req,res) => {
  fs.writeFile('./user.json',JSON.stringify(req.body),err => console.log(err))
  // console.log(req.body)
  res.sendStatus(200)
})

router.get('/candidates',(req,res,next) => {
  res.json(candidates)
})

router.post('/candidates',(req,res) => {
  fs.writeFile('./candidates.json',JSON.stringify(req.body),err => console.log(err))
  // console.log(req.body)
  res.sendStatus(200)
})

module.exports = router;

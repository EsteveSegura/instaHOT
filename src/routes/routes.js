const axios = require('axios');
const express = require('express');
const router = express.Router();

const accActions = require('../crud/accActions');
const similarActions = require('../crud/similarsActions');
const utils = require('../utils/utils')


router.get('/', async (req,res) => {
     console.log("s")
     let allSimilars = await similarActions.get()
     console.log(allSimilars)
     res.render('index.ejs',{
          profiles : allSimilars
     })
});



router.get('/add/:acc', async (req,res) => {
     let add = await accActions.createNewAcc(req.params.acc)
     console.log(req.params.acc)
     res.json({'message' : add})
});

module.exports = router;
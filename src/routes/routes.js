const axios = require('axios');
const express = require('express');
const router = express.Router();

const accActions = require('../crud/accActions');
const utils = require('../utils/utils')


router.get('/', async (req,res) => {
     let allSimilars = await accActions.getAllSimilar()
     console.log(allSimilars.length)
     let callingApi = await axios.get(`http://girlazo.com/instagramapi/user/${allSimilars[utils.randomInt(0,allSimilars.length)]}/`)
     res.render('index.ejs',{
          profile : callingApi.data
     })
});



router.get('/add/:acc', async (req,res) => {
     let add = await accActions.createNewAcc(req.params.acc)
     console.log(req.params.acc)
     res.json({'message' : add})
});

module.exports = router;
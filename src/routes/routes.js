const axios = require('axios');
const express = require('express');
const router = express.Router();

const accActions = require('../crud/accActions');
const similarActions = require('../crud/similarsActions');
const utils = require('../utils/utils')


router.get('/', async (req,res) => {
     let allSimilars = await similarActions.get()
     res.render('index.ejs',{
          profiles : allSimilars
     })
});


router.get('/add/:acc', async (req,res) => {
     let add = await accActions.createNewAcc(req.params.acc)
     let similar = await similarActions.similarAdd(req.params.acc)
     console.log(similar)
     console.log(req.params.acc)
     res.json({'message' : add})
});

router.get('/deleteAcc/:acc', async (req,res) => {
     let deleteAction = await accActions.deleteAcc(req.params.acc)
     res.json({'message' : deleteAction})
})

router.get('/delete/:acc', async (req,res) => {
     let similar = await similarActions.similarAdd(req.params.acc)
     console.log(req.params.acc)
     res.json({'message' : "DELETED"})
});

module.exports = router;
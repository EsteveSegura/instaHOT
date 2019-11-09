const mongoose = require('mongoose')

//Util
const convertNewDataDb = require('./convertData')
const accActions = require('../crud/accActions')

//Models
const Acc = require('../models/acc');

//Conect to mongo
mongoose.connect('mongodb://localhost/instahot', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => console.log('Conectado con exito a la base de datos')).catch((err) => console.log('Fallo al conectar la base de datos'));

async function createNewRecord(acc){
     return new Promise(async(resolve,reject) => {
          let newAcc = new Acc({
               acc: acc,
               lastIdPicture: '0',
               lastUrlPicture: 'http://null.com'
          });

          await newAcc.save((err) => {
               if (err) {
                    reject('error_on_create');
               }
               resolve(`new acc on database: ${acc} -`);
          });
     })

}


(async () => {
     let data = await convertNewDataDb.getNewData()
     data.forEach(async(acc,index) => {
          let newRecord = await accActions.createNewAcc(acc)
          console.log(`${newRecord} at index: ${index}`)
     });
})(); 
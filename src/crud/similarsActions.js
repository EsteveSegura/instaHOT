const mongoose = require('mongoose')

//Models
const Acc = require('../models/acc');
const Similars = require('../models/similars')

//Conect to mongo
mongoose.connect('mongodb://localhost/instahot', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => console.log('Conectado con exito a la base de datos')).catch((err) => console.log('Fallo al conectar la base de datos'));


async function get(acc){
     return new Promise(async(resolve,reject) => {
          if(typeof acc == "undefined"){
               Similars.find({added:false}, (err,similars) => {
                    if(err){
                         reject(err)
                    }
                    resolve(similars)
               });
          }else{
               Similars.findOne({acc: acc}, (err,similars) => {
                    if(err){
                         reject(err)
                    }
                    resolve(similars)
               });
          }
     });
}

async function craeteSimilar(acc,actualFeed){
     return new Promise(async(resolve,reject) => {
          let exists = await get(acc)
          if(exists == null){
               let newSimilar = new Similars({
                    acc: acc,
                    actualFeed:actualFeed
               });
     
               await newSimilar.save((err) => {
                    if (err) {
                         reject('error_on_create');
                    }
                    resolve(`new similar on database: ${acc}`);
               });
          }else{
               resolve(`@${acc} : already exists`)
          }
     });
}

module.exports = { get, craeteSimilar }
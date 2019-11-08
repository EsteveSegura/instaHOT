const mongoose = require('mongoose')

//Models
const Acc = require('../models/acc');

//Conect to mongo
mongoose.connect('mongodb://localhost/instahot', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => console.log('Conectado con exito a la base de datos')).catch((err) => console.log('Fallo al conectar la base de datos'));

//Create new record
async function createNewAcc(acc){
     return new Promise(async(resolve,reject) => {
          let newAcc = new Acc({
               acc: acc,
               lastIdPicture: '0'
          });

          await newAcc.save((err) => {
               if (err) {
                    reject('error_on_create');
               }
               resolve(`new acc on database: ${acc}`);
          });
     })
}

//get specific acc or all accs
async function get(acc){
     return new Promise(async(resolve,reject) => {
          if(typeof acc == "undefined"){
               Acc.find({}, (err,accs) => {
                    if(err){
                         reject(err)
                    }
                    resolve(accs)
               });
          }else{
               Acc.findOne({acc: acc}, (err,acc) => {
                    if(err){
                         reject(err)
                    }
                    resolve(acc)
               });
          }
     });
}

(async () =>{
     let getData = await get()
     console.log(getData)
})();

module.exports = { createNewAcc }

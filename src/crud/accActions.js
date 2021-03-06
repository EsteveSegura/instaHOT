const mongoose = require('mongoose')

//Models
const Acc = require('../models/acc');

//Conect to mongo
mongoose.connect('mongodb://localhost/instahot', { useNewUrlParser: true, useUnifiedTopology: true }).then((db) => console.log('Conectado con exito a la base de datos')).catch((err) => console.log('Fallo al conectar la base de datos'));

//Create new record
async function createNewAcc(acc){
     return new Promise(async(resolve,reject) => {
          let exists = await get(acc)
          if(exists == null){
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
          }else{
               resolve(`@${acc} : already exists`)
          }
     })
}

//Update record
async function updateAcc(acc,newIdPicture,newUrlPicture,actualFeed,similars){
     return new Promise(async (resolve,reject) =>{
          let account = await get(acc);
          if(account){


               await Acc.update({ 'acc' : acc }, {
                    acc: acc,
                    lastIdPicture: newIdPicture ,
                    lastUrlPicture: newUrlPicture,
                    actualFeed: actualFeed,
                    similars: similars || account.similars
               });

               resolve("OK")
          }
     })
}

//Get specific acc or all accs
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

async function deleteAcc(acc){
     return new Promise(async(resolve,reject) => {
          Acc.deleteOne({acc: acc}, (err) =>{
               if(err){
                    console.log(err)
               }
               resolve("Deleted")
          })
     });
}

async function deletePrivatesAndChanguedName(){
     return new Promise(async(resolve,reject) => {
          Acc.deleteMany({lastUrlPicture: "http://null.com"}, (err) =>{
               if(err){
                    reject(err)
               }
               resolve("Deleted")
          })
     })
}

async function getAllSimilar(){
     return new Promise(async(resolve,reject) => { 
          let allAccs = await get();
          let allSimilars = allAccs.map((users) =>{
               return users.similars
          });
          allSimilars = [].concat(...allSimilars)
          resolve(allSimilars)
     });
}



(async () =>{
     //let d = await createNewAcc("rang92_")
     //console.log(d)

     //let AllSimilars = await getAllSimilar()
     //console.log(AllSimilars)

     /*let deleteAction = await deletePrivatesAndChanguedName()
     console.log(deleteAction)*/
})();


module.exports = { createNewAcc, deleteAcc, get, updateAcc, deletePrivatesAndChanguedName, getAllSimilar}

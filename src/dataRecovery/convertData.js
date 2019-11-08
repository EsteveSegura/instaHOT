const fs = require('fs');

function delay(s){
     return new Promise((resolve,reject) =>{
          setTimeout(() => {
               resolve("OK")
          }, 1000 * s);
     })
}

async function getNewData(){
     return new Promise ((resolve , reject) =>{
          let data = fs.readFile('./oldDataBase.json', async(err, f) =>{
               let allData = f.toString().split('\n');
               let instaUser = allData.map((line,index) =>{
                    let splitOne = line.split('"user":"')[1]
                    let splitTwo = splitOne.split('"')[0]
                    return splitTwo
               })
               resolve(instaUser)
          });
     })
}



module.exports = { getNewData } 
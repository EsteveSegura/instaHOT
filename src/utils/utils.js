
async function delay(s){
     return new Promise(async(resolve,reject) => {
          setTimeout(() => {
               console.log(`delay: ${s}s`)
               resolve("END")
          }, 1000 * s);
     })
}

function randomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1) + min);
}

module.exports = { delay, randomInt }
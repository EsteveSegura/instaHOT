
async function delay(s){
     return new Promise(async(resolve,reject) => {
          setTimeout(() => {
               console.log(`delay: ${s}s`)
               resolve("END")
          }, 1000 * s);
     })
}

module.exports = {delay}
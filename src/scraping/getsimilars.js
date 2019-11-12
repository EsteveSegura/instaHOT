let noCount = []
let siCount = []


for(let i = 1 ; i < 100; i++){
     if (Math.random() < 0.85) {
          console.log("SI")
          siCount.push("si")
     } else {
          console.log("NO")
          noCount.push("si")
     }
}

setTimeout(() => {
     console.log(`NO: ${noCount.length} - SI: ${siCount.length}`)
}, 200);
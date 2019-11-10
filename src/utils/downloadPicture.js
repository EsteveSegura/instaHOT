const fs = require('fs')
const axios = require('axios')

async function downloadImage(url){
     axios.get(url, {responseType: "stream"} )  
     .then(response => {  
         response.data.pipe(fs.createWriteStream(`../tmp/IMG_${Date.now()}.jpg`));  
     })  
     .catch(error => {  
         console.log(error);  
     });  
}

function deleteImage(path){
     fs.unlinkSync(path);
     console.log('File deleted!');
} 

/*
( async () => {
    await downloadImage("https://scontent-mxp1-1.cdninstagram.com/vp/99550a21686ca1835ddae36cc5412c33/5E484BC0/t51.2885-15/e35/s1080x1080/75640841_708283152985882_8228650718121646758_n.jpg?_nc_ht=scontent-mxp1-1.cdninstagram.com&_nc_cat=110&ig_cache_key=MjE2ODI5NTY0OTIxNzM3OTQ3NQ%3D%3D.2")  
})();
*/

module.exports = { downloadImage, deleteImage }
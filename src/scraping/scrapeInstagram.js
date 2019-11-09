require('dotenv').config()
require('tools-for-instagram');
const accActions = require('../crud/accActions');

async function getCustomFeed(ig){
     let allAccs = await accActions.get();
     let lastPosts;

     for(let i = 0 ; i < 12/*allAccs.length*/ ; i++){
          await sleep(1)
          try {
               lastPosts = await getUserRecentPosts(ig,allAccs[i].acc)
               lastPosts = Promise.all(lastPosts.map(async(posts) => {
                    let url = await getPhotoUrl(ig,posts.pk)
                    let objFeed = {
                         acc: allAccs[i].acc,
                         id: posts.pk,
                         url: url
                    }
                    return objFeed
               }))
          } catch (error) {
               console.log(error)               
          }
     }

     return lastPosts
}

(async () => {
     let ig = await login();
     let feed = await getCustomFeed(ig)
     console.log(feed)

     /*let infoUser = await getUserInfo(ig,"cintiaroldan_11")
     let similars = await getSimilarAccountsByUserId(ig, infoUser.pk)
     console.log(similars);*/
     
})();
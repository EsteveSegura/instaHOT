require('dotenv').config()
require('tools-for-instagram');
const accActions = require('../crud/accActions');


async function getCustomFeed(ig){
     let allAccs = await accActions.get();
     let fullFeed = [];

     for(let i = 0 ; i < allAccs.length ; i++){

          await sleep(17)
          try {
               let lastPosts = await getUserRecentPosts(ig,allAccs[i].acc)
               let _fullFeed = []

               await sleep(4)

               let infoUser = await getUserInfo(ig,allAccs[i].acc)

               await sleep(4)
               
               let chain = await getSimilarAccountsByUserId(ig, infoUser.pk)
               chain = chain.users.map((user) =>{
                    return user.username
               })

               let objFeed = {
                    acc: allAccs[i].acc,
                    id: lastPosts[0].pk,
                    url: await getPhotoUrl(ig,lastPosts[0].pk)
               }

               for(let z = 0 ; z < lastPosts.length ;z++){
                    _fullFeed.push({
                         id: lastPosts[z].pk,
                         url: await getPhotoUrl(ig,lastPosts[z].pk)
                    })
               }
               let updateAcc = await accActions.updateAcc(objFeed.acc, objFeed.id, objFeed.url, _fullFeed, chain)
               fullFeed.push(objFeed)
          } catch (error) {
               console.log(error)               
          }
     }

     return fullFeed
}

(async () => {
     let ig = await login();
     let feed = await getCustomFeed(ig)
     console.log(feed)
 

     /*let infoUser = await getUserInfo(ig,"cintiaroldan_11")
     let similars = await getSimilarAccountsByUserId(ig, infoUser.pk)
     console.log(similars);*/
     
})();
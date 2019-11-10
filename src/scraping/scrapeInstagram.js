require('dotenv').config()
const axios = require('axios');
const accActions = require('../crud/accActions');
const utils = require('../utils/utils');


async function getCustomFeedNative(ig){
     let allAccs = await accActions.get();
     let fullFeed = [];
     
     for(let i = 0 ; i < allAccs.length ; i++){
          
          await sleep(17)
          try {
               let lastPosts = await getUserRecentPosts(ig,allAccs[i].acc)
               let _fullFeed = []
               
               await sleep(9)
               
               let infoUser = await getUserInfo(ig,allAccs[i].acc)
               
               await sleep(13)
               
               let chain = await getSimilarAccountsByUserId(ig, infoUser.pk)
               chain = chain.users.map((user) =>{
                    return user.username
               })
               
               let objFeed = {
                    acc: allAccs[i].acc,
                    id: lastPosts[0].pk,
                    url: await getPhotoUrl(ig,lastPosts[0].pk)
               }

               //Download
               console.log(`db Acc: ${allAccs[i].lastIdPicture} - post actual in instagram: ${lastPosts[0].pk}`)
               if(allAccs[i].lastIdPicture == lastPosts[2].pk ){
                    console.log('same')
               }else{
                    console.log('not the same')
               }
               
               for(let z = 0 ; z < lastPosts.length ;z++){
                    _fullFeed.push({
                         id: lastPosts[z].pk,
                         url: await getPhotoUrl(ig,lastPosts[z].pk)
                    })
               }

               //let updateAcc = await accActions.updateAcc(objFeed.acc, objFeed.id, objFeed.url, _fullFeed, chain)

               fullFeed.push(objFeed)

          } catch (error) {
               console.log(error)               
          }
     }
     return fullFeed
}

async function getCustomFeedWeb(){
     return new Promise(async(resolve,reject) => {
          let allAccs = await accActions.get();
          for(let i = 0 ; i < allAccs.length ; i++){
               try {
                    console.log(allAccs[i].acc)
                    const config = {
                         method: 'get',
                         url: `https://instagram.com/${allAccs[i].acc}/?__a=1`,
                         headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36' }
                    }
                    let instagramResponse = await axios(config);
                    console.log(instagramResponse)
                    console.log(`https://instagram.com/${allAccs[i].acc}/?__a=1`)
                    let lastFeedPosts = instagramResponse.data.graphql.user.edge_owner_to_timeline_media.edges
                    lastFeedPosts = lastFeedPosts.map((posts) => {
                         return{
                              id : posts.node.id,
                              url : posts.node.display_url
                         }
                    })
                    console.log(lastFeedPosts[0])
                    let updateAcc = await accActions.updateAcc(allAccs[i].acc, lastFeedPosts[0].id, lastFeedPosts[0].url, lastFeedPosts)
                    console.log(updateAcc)
                    await utils.delay(1);
               } catch (error) {
                    //console.log("fail ops!")
                    console.log(error)
               }
          }
          resolve("Done")
          //console.log(allAccs)
     })
}


(async () => {
     native = true;
     if(native){
          require('tools-for-instagram');
          let ig = await login();
          await setAntiBanMode(ig);
          let feed = await getCustomFeedNative(ig)
          console.log(feed)

     }else{
          let feed = await getCustomFeedWeb()
          console.log(feed)
     }

     
})();
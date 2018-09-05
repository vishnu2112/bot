console.log("bot is started");
var twitter = require('twitter');
var config = require('./config.js');
var T = new twitter(config);
console.log("retweet is started");
var retweet = function() {
    var params = {
        q: '#python, #Html, #java, #Java',
        count: 7,
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data) {

        if(!err) {
            var retweetId = data.statuses[0].id_str;
            T.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if(response) {
                    console.log('Retweeted');
                }
                if (err) {
                     console.log('Something went wrong while Retweeting may be duplication ..');
                }
            });
        }
        else {
            console.log('Something went wrong while Searching' + JSON.stringify(err) );
        }
    });
}
retweet();
setInterval(retweet, 1000*60*20);


console.log("favoriteTweet is startted");
var favoriteTweet = function() {
    var params = {
        q: '#python, #Html, #java, #Java',
        count: 10,
        lang: 'en'
    }
    T.get('search/tweets', params, function(err, data, response) {
  
        if(!err){
    
            for(let i = 0; i < data.statuses.length; i++){
  
                let id = { id: data.statuses[i].id_str }
      
                    T.post('favorites/create', id, function(err, response){
        
                    if(err){
                        console.log(err[0].message);
                    }
      
                    else{
                        let username = response.user.screen_name;
                        let tweetId = response.id_str;
                        console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
                    }
                    });
            }
        } 
        else {
            console.log(err);
        }
    });
}
favoriteTweet();
setInterval(favoriteTweet, 1000*60*20);

console.log("follow is started");
var follow = function () {
  var params = {
  q: '#python, #Html, #java, #Java',
  count: 5,
  result_type: 'popular',
  lang: 'en'
}
T.get('search/tweets', params, function(err, data, response) {
    
    if(!err){
        for(let i = 0; i < data.statuses.length; i++) {
      
            let screen_name = data.statuses[i].user.screen_name;
    
            T.post('friendships/create', {screen_name}, function(err, response){
                if(err){
                    console.log(err);
                }   else {
                    console.log(screen_name, ': **FOLLOWED**');
                }
            });
        }
    } 
    else {
        console.log(err);
    }
});
}
follow();
setInterval(follow, 1000*60*20);


                






var twitter = require("twitter");
var keys = require("./config.json");


var scoffers = new twitter(keys);

console.log("Norman Scoffers v1.0")





/*
	Gratifies a joke with a "Good one, sir." to whomever
	the author of tweet is.
*/

var goodOne = function(tweet){
	//Actual message to send:
	var message = "@"+tweet.user.screen_name+"\nGood one, sir.";
	//JSON to send to twitter
	var post = {
		status:message,
		in_reply_to_status_id:tweet.id_str,
	};
	//Call the post method, feed in the above post object and run callback when complete.
	scoffers.post('statuses/update',post,function(error,tweet,response){
		if(error){
			console.log(tweet);
			console.log(response);
		}else{
			console.log("Hilarity appealed.");
		}
	});
}


/*
	Stream through all #joke tagged tweets and respond wittily when
	Khal posts a joke.
*/

scoffers.stream("statuses/filter",{track:'#joke',include_retweets:false},function(stream){
	//Handle #joke datastream
	stream.on('data',function(tweet){

		if(tweet.user.id_str==='40078553'){
			console.log(tweet.user.name+" made a #joke: \n"+tweet.text);
			goodOne(tweet);
		}else{
			console.log(tweet.user.name,": ",tweet.text);
		}
	});


	//Handle errors
	stream.on('error',function(error){
		console.log(error);
	});

});


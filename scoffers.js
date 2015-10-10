/*

			Norman Scoffers, Bot Butler

*/

var twitter = require("twitter");
var keys = require("./config.json");

/*
			General purpose methods
		Section for general methods not
		tied to any specific object
*/

//Clear terminal window
var clear = function(center){
    process.stdout.write('\033c\n\n\n');
    //Center cursor
    if(center){
		for(var x=0;x<Math.floor(process.stdout.rows/2);x++){process.stdout.write("\n");}
    }
}



Scoffers = function(){
	clear();
	
	version = "1.2";
	console.log("Norman Scoffers",version)
	var self = this;
	this.client = new twitter(keys);

	//Gratify a #joke with a "Good one, sir."
	this.goodOne = function(tweet){
		var message = "@"+tweet.user.screen_name+"\nGood one, sir.";
		var post = {
			status:message,
			in_reply_to_status_id:tweet.id_str,
		};
		//Post to twitter
		self.client.post('statuses/update',post,function(error,tweet,response){
			if(error){
				console.log(tweet);
				console.log(response);
			}else{
				console.log("Hilarity gratified.");
			}
		});
	};

	//Datastream callback
	this.dataStream = function(stream){
		stream.on('data',function(tweet){

			//Check if has Khal ID
			if(tweet.user.id_str==='40078553'){
				console.log(tweet.user.name+" made a #joke: \n"+tweet.text);
				self.goodOne(tweet);
			}else{
				console.log(tweet.user.name,": ",tweet.text);
			}

		});

		stream.on('error',function(error){
			clear();
			console.log(error);
		});
	}
	post = {
		track:"#joke",
		include_retweets:false
	}
	this.client.stream("statuses/filter",post,this.dataStream)


}

Scoffers();
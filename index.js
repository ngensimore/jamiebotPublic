const GoogleImages = require('google-images');
const Discord = require('discord.js');
const client = new Discord.Client();
const googleimages = new GoogleImages('key goes here');
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

let googleResults = function(searchCriteria){
	return googleimages.search(searchCriteria, {page: 1, safe: 'off'}).then(images => {return images});
}

let googleImageUrl = function(searchCriteria,msg)
{

	let userImage = googleResults(searchCriteria);
	userImage.then(function(result)
	{
		msg.reply( result[0].url);
	})

}

client.on('message', msg => {
	var wordString = msg.toString();
	var words = wordString.split(' ');
	var i;
	var query = ''; 
  	if(msg.isMentioned(client.user))
  	{
  		if((words[1] + words [2]) == 'pullup')
  		{
  			words.splice(0,3);
  			for(i = 0; i < words.length; i++){
  				query += words[i] + ' '; 
  			}
  			googleImageUrl(query, msg);
  		}
  	}
});

client.login('key goes here');
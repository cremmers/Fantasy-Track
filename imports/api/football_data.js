import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './football-data.js';

export var Football_data = new Mongo.Collection("football_data");

export var Teams = new Mongo.Collection("teams");

if (Meteor.isServer){
	
	Meteor.startup(function() {
	  // code to run on server at startup
	  if (!Football_data.findOne()) {
	  	for (var i=0; i<player_data.length; i++) {
	  		Football_data.insert(player_data[i]);
	  	};
	  };
	  console.log("Startup server says: " + Football_data.find().count() + " players.");
	});

	Meteor.publish('football_data', function (){
		return Football_data.find();
	});

	Meteor.publish('teams', function (){
		var currentUserId = this.userId;
		return Teams.find({createdBy: currentUserId});
		// return Teams.find();
	});
};
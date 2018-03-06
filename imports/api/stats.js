import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './qb-stats.js';
import './rb-stats.js';
import './wr-stats.js';
import './te-stats.js';

export var Stats = new Mongo.Collection("statistics");

if (Meteor.isServer){

	Meteor.startup(function() {
	  // code to run on server at startup
	  if (!Stats.findOne()) {
	  	for (var i=0; i<qb_stats.length; i++) {
	  		Stats.insert(qb_stats[i]);
	  	};
	  	for (var i=0; i<rb_stats.length; i++) {
	  		Stats.insert(rb_stats[i]);
	  	};
	  	for (var i=0; i<wr_stats.length; i++) {
	  		Stats.insert(wr_stats[i]);
	  	};
	  	for (var i=0; i<te_stats.length; i++) {
	  		Stats.insert(te_stats[i]);
	  	};
	  };
	  console.log("Startup server says: " + Stats.find().count() + " projected player stats.");
	});

	Meteor.publish('statistics', function (){
		return Stats.find();
	});
};
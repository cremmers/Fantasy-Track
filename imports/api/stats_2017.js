import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import './qb-2017-full_stats.js';
import './rb-2017-full_stats.js';
import './wr-2017-full_stats.js';
import './te-2017-full_stats.js';

export var Stats_2017 = new Mongo.Collection("stats_2017");

if (Meteor.isServer){

	Meteor.startup(function() {
	  // code to run on server at startup
	  if (!Stats_2017.findOne()) {
	  	for (var i=0; i<qb_2017_stats.length; i++) {
	  		Stats_2017.insert(qb_2017_stats[i]);
	  	};
	  	for (var i=0; i<rb_2017_stats.length; i++) {
	  		Stats_2017.insert(rb_2017_stats[i]);
	  	};
	  	for (var i=0; i<wr_2017_stats.length; i++) {
	  		Stats_2017.insert(wr_2017_stats[i]);
	  	};
	  	for (var i=0; i<te_2017_stats.length; i++) {
	  		Stats_2017.insert(te_2017_stats[i]);
	  	};
	  };
	  console.log("Startup server says: " + Stats_2017.find().count() + " player stats.");
	});

	Meteor.publish('stats_2017', function (){
		return Stats_2017.find();
	});
};
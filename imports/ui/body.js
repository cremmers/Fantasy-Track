import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import {Football_data} from '../api/football_data.js';

import {Teams} from '../api/football_data.js';

import {Stats} from '../api/stats.js';

import {Stats_2017} from '../api/stats_2017.js';

import '../api/lists/methods.js';

import './body.html';

Router.configure({
	layoutTemplate: 'ApplicationLayout'
});

Router.route('/', {
	name: 'home',
	yieldRegions: {
	    'navbar': {to: 'navbar'},
	    'sidebar': {to: 'sidebar'},
	    'football': {to: 'main'}
  	},
  	onBeforeAction: function() {
		console.log("Delete Session");
		Session.set('loadedTeam', undefined);
		delete Session.keys.loadedTeam;
		this.next();
  	}
});

Router.route('/team', {
	name: 'team',
	yieldRegions: {
	    'navbar': {to: 'navbar'},
	    'sidebar': {to: 'sidebar'},
	    'team': {to: 'main'} 
  	}
});

Router.route('/team/:name', {
	name: 'player',
	yieldRegions: {
	    'navbar': {to: 'navbar'},
	    'sidebar': {to: 'sidebar'},
	    'player': {to: 'main'}
  	},
  	data: function() {
		console.log(this.params);
		return Football_data.findOne({name: this.params.name});
	}
});

if (Meteor.isClient){

	Meteor.subscribe('football_data');

	Meteor.subscribe('teams');

	Meteor.subscribe('statistics');

	Meteor.subscribe('stats_2017');

	Template.registerHelper('toFixed', function (x, decimals) {
		// converts projected stats to whole numbers
    	return x.toFixed(decimals);
	});

	Template.football.helpers({
		// get players from collection that contains player names and team logos, remove suffix, order them by last name or first name if last names are equal
	 	'players': function() {
	    	var player_array = Football_data.find().fetch();

	    	function compare (a, b) {
				var splitA = a.name.split(" ");
    			var splitB = b.name.split(" ");
    			splitA.splice(2);
    			splitB.splice(2);
    			var lastA = splitA[splitA.length - 1].toLowerCase();
    			var lastB = splitB[splitB.length - 1].toLowerCase();
	    	
				if (lastA > lastB) return 1; 
				if (lastA < lastB) return -1;
				else {
					var firstA = splitA[splitA.length - 2].toLowerCase();
	    			var firstB = splitB[splitB.length - 2].toLowerCase();
	    			if (firstA > firstB) return 1; 
					if (firstA < firstB) return -1;
					return 0;
    			};
	    	};
	 
	    	player_array.sort(compare);    
	    	return player_array;
	  	},
	  	// get teams from teams collection
	  	'teams': function() {
	  		return Teams.find();
	  	},
	  	// check to see if a team has been loaded and show certain elements if one has been loaded
	  	'isTeam': function() {
	  	 	return Session.get("loadedTeam");
	    },
	    // get team attributes from session for displaying the team name
	    'showTeam': function() {
	    	var loadTeam = Session.get("loadedTeam");
			// console.log(loadTeam);
			var team_array = [];
			team_array.push(loadTeam)
			// console.log(team_array);	
			return team_array;
	    },
	});

	Template.team.helpers({
		// get team for team page
		'showTeam': function() {
			var loadTeam = Session.get("loadedTeam");
			// console.log(loadTeam);
			var team_array = [];
			team_array.push(loadTeam)
			// console.log(team_array);	
			return team_array;
	    },
	    // get the QB's projected stats
	    'findQB': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	// console.log(loadTeam);
	    	var loadQB = Stats.findOne({Player: loadTeam.QB.name});	    	
	    	// console.log(loadQB);
	    	var stats_array = [];
	    	stats_array.push(loadQB);
	    	return stats_array;
	    },
	    // get the QB's current stats
	    'findQB_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadQB = Stats_2017.findOne({PLAYER: loadTeam.QB.name});
	    	var stats_array = [];
	    	stats_array.push(loadQB);
	    	return stats_array;
	    },
	     // get the RB1's projected stats
	    'findRB1': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadRB = Stats.findOne({Player: loadTeam.RB1.name});
	    	var stats_array = [];
	    	stats_array.push(loadRB);
	    	// console.log(stats_array);
	    	return stats_array;
	    },
	     // get the RB1's current stats
	    'findRB1_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadRB = Stats_2017.findOne({PLAYER: loadTeam.RB1.name});
	    	var stats_array = [];
	    	stats_array.push(loadRB);
	    	return stats_array;
	    },
	     // get the RB2's projected stats
	    'findRB2': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadRB = Stats.findOne({Player: loadTeam.RB2.name});
	    	var stats_array = [];
	    	stats_array.push(loadRB);
	    	// console.log(stats_array);
	    	return stats_array;
	    },
	     // get the RB2's current stats
	    'findRB2_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadRB = Stats_2017.findOne({PLAYER: loadTeam.RB2.name});
	    	var stats_array = [];
	    	stats_array.push(loadRB);
	    	return stats_array;
	    },
	    // get the WR1's projected stats
	    'findWR1': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats.findOne({Player: loadTeam.WR1.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the WR1's current stats
	    'findWR1_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats_2017.findOne({PLAYER: loadTeam.WR1.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the WR2's projected stats
	     'findWR2': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats.findOne({Player: loadTeam.WR2.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the WR2's current stats
	    'findWR2_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats_2017.findOne({PLAYER: loadTeam.WR2.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the W/R/T's projected stats
	     'findWR3': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats.findOne({Player: loadTeam.WR3.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the W/R/T's current stats
	    'findWR3_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadWR = Stats_2017.findOne({PLAYER: loadTeam.WR3.name});
	    	var stats_array = [];
	    	stats_array.push(loadWR);
	    	return stats_array;
	    },
	    // get the TE's projected stats
	    'findTE': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadTE = Stats.findOne({Player: loadTeam.TE.name});
	    	var stats_array = [];
	    	stats_array.push(loadTE);
	    	return stats_array;
	    },
	    // get the TE's current stats
	    'findTE_2017': function() {
	    	var loadTeam = Session.get("loadedTeam");
	    	var loadTE = Stats_2017.findOne({PLAYER: loadTeam.TE.name});
	    	var stats_array = [];
	    	stats_array.push(loadTE);
	    	return stats_array;
	    },
	});

	Template.player.helpers({
		// get projected stats for a specific player
		'showStats': function() {
	    	var player_stats = Stats.findOne({Player: this.name});
	    	// console.log(player_stats);
	    	var stats_array = [];
	    	stats_array.push(player_stats)
	    	return stats_array;
	    },
	    // get projected stats for a specific player at the QB position
	    'isQB': function() {
	    	var player_stats = Stats.findOne({Player: this.name});
	    	if (player_stats.hasOwnProperty("PASS YDS")) {
	    		// console.log(player_stats)
	    		return true;
	    	}; 
	    },
	    'isRB': function() {
	    	// get projected stats for a specific player at the RB position
	    	var player_stats = Stats.findOne({Player: this.name});
	    	if (player_stats.hasOwnProperty("REC YDS")) {
	    		return true;
	    	}; 
	    },
	    // get projected stats for a specific player at the WR position
	    'isWR': function() {
	    	var player_stats = Stats.findOne({Player: this.name});
	    	if (!(player_stats.hasOwnProperty("PASS YDS")) && !(player_stats.hasOwnProperty("REC YDS")) && (player_stats.hasOwnProperty("ATT"))) {
	    		return true;
	    	}; 
	    },
	    // get projected stats for a specific player at the TE position
	    'isTE': function() {
	    	var player_stats = Stats.findOne({Player: this.name});
	    	if (!(player_stats.hasOwnProperty("ATT"))) {
	    		return true;
	    	}
	    },
	    'show2017Stats': function() {
	    	// get actual stats for a specific player
	    	var player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// console.log(player_stats);
	    	var stats_array = [];
	    	stats_array.push(player_stats)
	    	return stats_array;
	    },
	    'pickBetterQB': function() {
	    	// get players at the QB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"QB"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var qb_array = [];
	    	var better_QB = [];
	    	var better_QB_logos = [];
	    	// get actual stats for players at the QB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PASS YDS")) {	    			
	    			qb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get QBs that have more fantasy points than specific player 
	    	for (var j=0; j < qb_array.length; j++) {
				if (qb_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_QB.push(qb_array[j]);
				};
			};
			// get player info for player that have more fantasy points from collection that has names and logos
			for (var k=0; k < better_QB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == better_QB[k].PLAYER) {
						better_QB_logos.push(player_array[l]);
					};						
				};				
			};
	    	// console.log(qb_array);
	    	// console.log(better_QB);
	    	// console.log(better_QB_logos);
	    	return better_QB_logos;
	    },
	     'pickWorseQB': function() {
	    	// get players at the QB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"QB"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var qb_array = [];
	    	var worse_QB = [];
	    	var worse_QB_logos = [];
	    	// get actual stats for players at the QB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PASS YDS")) {	    			
	    			qb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get QBs that have less fantasy points than specific player 
	    	for (var j=0; j < qb_array.length; j++) {
				if (qb_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_QB.push(qb_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_QB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_QB[k].PLAYER) {
						worse_QB_logos.push(player_array[l]);
					};						
				};				
			};
	    	// console.log(qb_array);
	    	// console.log(worse_QB);
	    	// console.log(worse_QB_logos);
	    	return worse_QB_logos;
	    },
	    'pickBetterRB': function() {
	    	// get players at the RB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"RB"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var rb_array = [];
	    	var better_RB = [];
	    	var better_RB_logos = [];
	    	// get actual stats for players at the RB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("REC YDS")) {	    			
	    			rb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get RBs that have more fantasy points than specific player 
	    	for (var j=0; j < rb_array.length; j++) {
				if (rb_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_RB.push(rb_array[j]);
				};
			};
			// get player info for player that have more fantasy points from collection that has names and logos
			for (var k=0; k < better_RB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == better_RB[k].PLAYER) {
						better_RB_logos.push(player_array[l]);
					};						
				};				
			};
	    	return better_RB_logos;
	    },
	     'pickWorseRB': function() {
	    	// get players at the RB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"RB"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var rb_array = [];
	    	var worse_RB = [];
	    	var worse_RB_logos = [];
	    	// get actual stats for players at the RB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("REC YDS")) {	    			
	    			rb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get RBs that have less fantasy points than specific player 
	    	for (var j=0; j < rb_array.length; j++) {
				if (rb_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_RB.push(rb_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_RB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_RB[k].PLAYER) {
						worse_RB_logos.push(player_array[l]);
					};						
				};				
			};
	    	return worse_RB_logos;
	    },
	    'pickBetterWR': function() {
	    	// get players at the WR position from collection that has names and logos
	    	var player_array = Football_data.find({position:"WR"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var wr_array = [];
	    	var better_WR = [];
	    	var better_WR_logos = [];
	    	// get actual stats for players at the WR position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			wr_array.push(player_stats[i]);
	    		};
	    	};
	    	// get WRs that have more fantasy points than specific player 
	    	for (var j=0; j < wr_array.length; j++) {
				if (wr_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_WR.push(wr_array[j]);
				};
			};
			// get player info for player that have more fantasy points from collection that has names and logos
			for (var k=0; k < better_WR.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == better_WR[k].PLAYER) {
						better_WR_logos.push(player_array[l]);
					};						
				};				
			};
	    	return better_WR_logos;
	    },
	    'pickWorseWR': function() {
	    	// get players at the WR position from collection that has names and logos
	    	var player_array = Football_data.find({position:"WR"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var wr_array = [];
	    	var worse_WR = [];
	    	var worse_WR_logos = [];
	    	// get actual stats for players at the WR position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			wr_array.push(player_stats[i]);
	    		};
	    	};
	    	// get WRs that have more fantasy points than specific player 
	    	for (var j=0; j < wr_array.length; j++) {
				if (wr_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_WR.push(wr_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_WR.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_WR[k].PLAYER) {
						worse_WR_logos.push(player_array[l]);
					};						
				};				
			};
	    	return worse_WR_logos;
	    },
	    'pickBetterTE': function() {
	    	// get players at the TE position from collection that has names and logos
	    	var player_array = Football_data.find({position:"TE"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var te_array = [];
	    	var better_TE = [];
	    	var better_TE_logos = [];
	    	// get actual stats for players at the TE position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (!player_stats[i].hasOwnProperty("ATT") && !player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			te_array.push(player_stats[i]);
	    		};
	    	};
	    	// get TEs that have more fantasy points than specific player 
	    	for (var j=0; j < te_array.length; j++) {
				if (te_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_TE.push(te_array[j]);
				};
			};
			// get player info for player that have more fantasy points from collection that has names and logos
			for (var k=0; k < better_TE.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == better_TE[k].PLAYER) {
						better_TE_logos.push(player_array[l]);
					};						
				};				
			};
	    	return better_TE_logos;
		},
		'pickWorseTE': function() {
	    	// get players at the TE position from collection that has names and logos
	    	var player_array = Football_data.find({position:"TE"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find({}, {sort: {FPTS: -1}}).fetch();
	    	var te_array = [];
	    	var worse_TE = [];
	    	var worse_TE_logos = [];
	    	// get actual stats for players at the TE position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (!player_stats[i].hasOwnProperty("ATT") && !player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			te_array.push(player_stats[i]);
	    		};
	    	};
	    	// get TEs that have less fantasy points than specific player 
	    	for (var j=0; j < te_array.length; j++) {
				if (te_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_TE.push(te_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_TE.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_TE[k].PLAYER) {
						worse_TE_logos.push(player_array[l]);
					};						
				};				
			};
	    	return worse_TE_logos;
		},
	    'isBetterQB': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var qb_array = [];
	    	var better_QB = [];
	    	// get actual stats for players at the QB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PASS YDS")) {	    			
	    			qb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get QBs that have more fantasy points than specific player
	    	for (var j=0; j < qb_array.length; j++) {
				if (qb_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_QB.push(qb_array[j]);
				};
			};
			// if any players are found in the better QB array, return true
			if (better_QB.length != 0) {
				// console.log(better_QB);
				return true;
			};
	    },
	    'isWorseQB': function() {
	    	// get players at the QB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"QB"}).fetch();
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var qb_array = [];
	    	var worse_QB = [];
	    	var worse_QB_logos = [];
	    	// get actual stats for players at the QB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PASS YDS")) {	    			
	    			qb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get QBs that have less fantasy points than specific player
	    	for (var j=0; j < qb_array.length; j++) {
				if (qb_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_QB.push(qb_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_QB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_QB[k].PLAYER) {
						worse_QB_logos.push(player_array[l]);
					};						
				};				
			};
			// if any players are found in the worse QB array, return true
			if (worse_QB_logos.length != 0) {
				console.log(worse_QB_logos);
				return true;
			};
	    },
	    'isBetterRB': function() {
	    	// get acutal stats for a specific player 
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var rb_array = [];
	    	var better_RB = [];
	    	// get actual stats for players at the RB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("REC YDS")) {	    			
	    			rb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get RBs that have more fantasy points than specific player
	    	for (var j=0; j < rb_array.length; j++) {
				if (rb_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_RB.push(rb_array[j]);
				};
			};
			// if any players are found in the better RB array, return true
			if (better_RB.length != 0) {
				return true;
			};	
		},
		'isWorseRB': function() {
			// get players at the RB position from collection that has names and logos
	    	var player_array = Football_data.find({position:"RB"}).fetch();
	    	// get acutal stats for a specific player 
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var rb_array = [];
	    	var worse_RB = [];
	    	var worse_RB_logos = [];
	    	// get actual stats for players at the RB position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("REC YDS")) {	    			
	    			rb_array.push(player_stats[i]);
	    		};
	    	};
	    	// get RBs that have less fantasy points than specific player
	    	for (var j=0; j < rb_array.length; j++) {
				if (rb_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_RB.push(rb_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_RB.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_RB[k].PLAYER) {
						worse_RB_logos.push(player_array[l]);
					};						
				};				
			};
			// if any players are found in the worse RB array, return true
			if (worse_RB_logos.length != 0) {
				console.log(worse_RB_logos);
				return true;
			};	
		},
		'isBetterWR': function() {
			// get acutal stats for a specific player 
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var wr_array = [];
	    	var better_WR = [];
	    	// get actual stats for players at the WR position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			wr_array.push(player_stats[i]);
	    		};
	    	};
	    	// get WRs that have more fantasy points than specific player
	    	for (var j=0; j < wr_array.length; j++) {
				if (wr_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_WR.push(wr_array[j]);
				};
			};
			// if any players are found in the better WR array, return true
			if (better_WR.length != 0) {
				return true;
			};	
		},
		'isWorseWR': function() {
			// get players at the WR position from collection that has names and logos
	    	var player_array = Football_data.find({position:"WR"}).fetch();
	    	// get acutal stats for a specific player 
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var wr_array = [];
	    	var worse_WR = [];
	    	var worse_WR_logos = [];
	    	// get actual stats for players at the WR position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			wr_array.push(player_stats[i]);
	    		};
	    	};
	    	// get RBs that have less fantasy points than specific player
	    	for (var j=0; j < wr_array.length; j++) {
				if (wr_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_WR.push(wr_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_WR.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_WR[k].PLAYER) {
						worse_WR_logos.push(player_array[l]);
					};						
				};				
			};
			// if any players are found in the worse WR array, return true
			if (worse_WR_logos.length != 0) {
				console.log(worse_WR_logos);
				return true;
			};	
		},
		'isBetterTE': function() {
			// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var te_array = [];
	    	var better_TE = [];
	    	// get actual stats for players at the TE position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (!player_stats[i].hasOwnProperty("ATT") && !player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			te_array.push(player_stats[i]);
	    		};
	    	};
	    	// get TEs that have more fantasy points than specific player
	    	for (var j=0; j < te_array.length; j++) {
				if (te_array[j]["FPTS"] > this_player_stats["FPTS"]) {
					better_TE.push(te_array[j]);
				};
			};
			// if any players are found in the better TE array, return true
			if (better_TE.length != 0) {
				return true;
			};
		},
		'isWorseTE': function() {
			// get players at the TE position from collection that has names and logos
	    	var player_array = Football_data.find({position:"TE"}).fetch();
			// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for all players
	    	var player_stats = Stats_2017.find().fetch();
	    	var te_array = [];
	    	var worse_TE = [];
	    	var worse_TE_logos = [];
	    	// get actual stats for players at the TE position
	    	for (var i=0; i < player_stats.length; i++) {
	    		if (!player_stats[i].hasOwnProperty("ATT") && !player_stats[i].hasOwnProperty("PLAYS")) {	    			
	    			te_array.push(player_stats[i]);
	    		};
	    	};
	    	// get TEs that have less fantasy points than specific player
	    	for (var j=0; j < te_array.length; j++) {
				if (te_array[j]["FPTS"] < this_player_stats["FPTS"]) {
					worse_TE.push(te_array[j]);
				};
			};
			// get player info for player that have less fantasy points from collection that has names and logos
			for (var k=0; k < worse_TE.length; k++) {
				for (var l=0; l < player_array.length; l++) {
					if (player_array[l].name == worse_TE[k].PLAYER) {
						worse_TE_logos.push(player_array[l]);
					};						
				};				
			};
			// if any players are found in the worse TE array, return true
			if (worse_TE_logos.length != 0) {
				console.log(worse_TE_logos);
				return true;
			};	
		},		
	    'compStats': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get projected stats for a specific player
	    	var player_stats = Stats.findOne({Player: this.name});
	    	// compare actual stats to projected stats
	    	if (this_player_stats.FPTS >= player_stats.FPTS) {
	    		console.log("This player is meeting the projected stats.")
	    		return true;
	    	};
	    },
	    'isTopFiveQB': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the QB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'PASS YDS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first five positions of the actual stats array (or five and six are tied)
	    	if (this_player_stats.PLAYER == all_stats[5].PLAYER && all_stats[4].FPTS == all_stats[5].FPTS) {
	    		return true;
	    	}
	    	else if (this_player_stats.PLAYER == all_stats[0].PLAYER || this_player_stats.PLAYER == all_stats[1].PLAYER || this_player_stats.PLAYER == all_stats[2].PLAYER || this_player_stats.PLAYER == all_stats[3].PLAYER || this_player_stats.PLAYER == all_stats[4].PLAYER) {
	    		console.log(all_stats);
	    		return true;
	    	};
	    },
	    'isTopFiveRB': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the RB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'REC YDS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first five positions of the actual stats array (or five and six are tied)
	    	if (this_player_stats.PLAYER == all_stats[5].PLAYER && all_stats[4].FPTS == all_stats[5].FPTS) {
	    		return true;
	    	}
	    	else if (this_player_stats.PLAYER == all_stats[0].PLAYER || this_player_stats.PLAYER == all_stats[1].PLAYER || this_player_stats.PLAYER == all_stats[2].PLAYER || this_player_stats.PLAYER == all_stats[3].PLAYER || this_player_stats.PLAYER == all_stats[4].PLAYER) {
	    		console.log(all_stats);
	    		return true;
	    	};
	    },
	    'isTopFiveWR': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the WR position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'PLAYS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first five positions of the actual stats array (or five and six are tied)
	    	if (this_player_stats.PLAYER == all_stats[5].PLAYER && all_stats[4].FPTS == all_stats[5].FPTS) {
	    		return true;
	    	}
	    	else if (this_player_stats.PLAYER == all_stats[0].PLAYER || this_player_stats.PLAYER == all_stats[1].PLAYER || this_player_stats.PLAYER == all_stats[2].PLAYER || this_player_stats.PLAYER == all_stats[3].PLAYER || this_player_stats.PLAYER == all_stats[4].PLAYER) {
	    		console.log(all_stats);
	    		return true;
	    	};
	    },
	    'isTopFiveTE': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the TE position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'ATT': {$exists: false}, 'PLAYS': {$exists: false}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first five positions of the actual stats array (or five and six are tied)
	    	if (this_player_stats.PLAYER == all_stats[5].PLAYER && all_stats[4].FPTS == all_stats[5].FPTS) {
	    		return true;
	    	}
	    	else if (this_player_stats.PLAYER == all_stats[0].PLAYER || this_player_stats.PLAYER == all_stats[1].PLAYER || this_player_stats.PLAYER == all_stats[2].PLAYER || this_player_stats.PLAYER == all_stats[3].PLAYER || this_player_stats.PLAYER == all_stats[4].PLAYER) {
	    		console.log(all_stats);
	    		return true;
	    	};
	    },
	    'isBad': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get projected stats for a specific player
	    	var player_stats = Stats.findOne({Player: this.name});
	    	// return true if player has actual stats less than or equal to projected stats
	    	if ((this_player_stats.FPTS * 2) <= player_stats.FPTS) {	    		
	    		return true;
	    	};
	    },
	    'isTopTwelveQB': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the QB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'PASS YDS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first twelve positions of the actual stats array
	    	for (var i=0; i < all_stats.length; i++) {
	    		if (all_stats[i].PLAYER == this_player_stats.PLAYER) {
	    			if (i <= 11) {
			    		console.log("Top Twelve");
			    		return true;
			    	};
	    		};	
	    	};	    	
	    },
	    'isTopTwelveRB': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the QB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'REC YDS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first twelve positions of the actual stats array
	    	for (var i=0; i < all_stats.length; i++) {
	    		if (all_stats[i].PLAYER == this_player_stats.PLAYER) {
	    			if (i <= 23) {
			    		console.log("Top Twelve");
			    		return true;
			    	};
	    		};	
	    	};	    	
	    },
	    'isTopTwelveWR': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the QB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'PLAYS': {$exists: true}}, {sort: {FPTS: -1}}).fetch();
	    	// console.log(all_stats);
	    	// return true if player is in the first twelve positions of the actual stats array
	    	for (var i=0; i < all_stats.length; i++) {
	    		if (all_stats[i].PLAYER == this_player_stats.PLAYER) {
	    			if (i <= 35) {
			    		console.log("Top Twelve");
			    		return true;
			    	};
	    		};	
	    	};	    	
	    },
	    'isTopTwelveTE': function() {
	    	// get acutal stats for a specific player
	    	var this_player_stats = Stats_2017.findOne({PLAYER: this.name});
	    	// get actual stats for the QB position, sorted by fantasy points
	    	var all_stats = Stats_2017.find({'ATT': {$exists: false}, 'PLAYS': {$exists: false}}, {sort: {FPTS: -1}}).fetch();
	    	// return true if player is in the first twelve positions of the actual stats array
	    	for (var i=0; i < all_stats.length; i++) {
	    		if (all_stats[i].PLAYER == this_player_stats.PLAYER) {
	    			if (i <= 11) {
			    		console.log("Top Twelve");
			    		return true;
			    	};
	    		};	
	    	};	    	
	    },
	});

	Template.football.events({
		'click #player_list a': function() {
			// save id of player that was clicked on and make a copy of the player element
			var player = document.getElementById(this._id).parentNode.innerHTML;
			var player_elem = document.getElementById(this._id).parentNode;
			var player_clone = $(player_elem).clone();
			var player_unbold = $(player_clone).find('b').contents().unwrap();
			console.log(player_elem);

			// save the empty slot for positions that could be duplicated
			var qb_slot = $("#roster_list > li").eq(0).find("p");
			var rb1_slot = $("#roster_list > li").eq(1).find("a");
			var rb2_slot = $("#roster_list > li").eq(2).find("a");
			var wr1_slot = $("#roster_list > li").eq(3).find("a");
			var wr2_slot = $("#roster_list > li").eq(4).find("a");
			var wr3_slot = $("#roster_list > li").eq(5).find("a");
			var te_slot = $("#roster_list > li").eq(6).find("a");

			if (player.indexOf("- QB") != -1 && !$('#qb-1').is(":contains('- QB')")) {
				// copy player into slot in table
				$("#qb-1").replaceWith(player_clone);

				// create delete button and attach to QB
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "qb-del");

				// recereate empty table slot
				$("#qb-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var QB = document.createTextNode("QB");
					p.appendChild(QB);
					empty_player.appendChild(p),
					$(empty_player).attr({"class":"list-group-item", "id":"qb-1"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);			
					$("#qb-del").hide();
				})
			}
			else if (player.indexOf("- RB") != -1 && $('#rb-1').is(":contains('RB1')") && $(rb2_slot).attr("id") != this._id && $(wr3_slot).attr("id") != this._id) {
				// copy player into slot in table
				$("#rb-1").replaceWith(player_clone);	

				// create delete button and attach to RB1		
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "rb1-del");
				$("#rb1-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var RB = document.createTextNode("RB1");
					p.appendChild(RB);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"rb-1"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#rb1-del").hide();
				});	
			}
			else if (player.indexOf("- RB") != -1 && $('#rb-2').is(":contains('RB2')") && $(rb1_slot).attr("id") != this._id && $(wr3_slot).attr("id") != this._id) {
				// copy player into slot in table
				$("#rb-2").replaceWith(player_clone);

				// create delete button and attach to RB2
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "rb2-del");

				// recereate empty table slot
				$("#rb2-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var RB = document.createTextNode("RB2");
					p.appendChild(RB);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"rb-2"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#rb2-del").hide();
				});				
			}
			else if (player.indexOf("- WR") != -1 && $('#wr-1').is(":contains('WR1')") && $(wr2_slot).attr("id") != this._id && $(wr3_slot).attr("id") != this._id) {
				// copy player into slot in table
				$("#wr-1").replaceWith(player_clone);

				// create delete button and attach to WR1
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "wr1-del");

				// recereate empty table slot
				$("#wr1-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var WR = document.createTextNode("WR1");
					p.appendChild(WR);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"wr-1"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#wr1-del").hide();
				});				
			}
			else if (player.indexOf("- WR") != -1 && !$('#wr-1').is(":contains('WR1')") && $('#wr-2').is(":contains('WR2')") && $(wr1_slot).attr("id") != this._id && $(wr3_slot).attr("id") != this._id) {
				// copy player into slot in table
				$("#wr-2").replaceWith(player_clone);

				// create delete button and attach to WR2
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "wr2-del");

				// recereate empty table slot
				$("#wr2-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var WR = document.createTextNode("WR2");
					p.appendChild(WR);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"wr-2"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#wr2-del").hide();
				});				
			}

			else if (player.indexOf("- TE") != -1 && ($('#te-1').is(":contains('TE')")) && !($('#te-1').is(":contains('- TE')")) && $(te_slot).attr("id") != this._id && $(wr3_slot).attr("id") != this._id){
				// copy player into slot in table
				$("#te-1").replaceWith(player_clone);

				// create delete button and attach to TE
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "te-del");

				// recereate empty table slot
				$("#te-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var TE = document.createTextNode("TE");
					p.appendChild(TE);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"te-1"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#te-del").hide();
				});				
			}

			else if ((player.indexOf("- RB") != -1 || player.indexOf("- WR") != -1 || player.indexOf("- TE") != -1) && !($('#wr-3').is(":contains('- RB')")) && !($('#wr-3').is(":contains('- WR')")) && !($('#wr-3').is(":contains('- TE')")) && $(wr1_slot).attr("id") != this._id && $(wr2_slot).attr("id") != this._id && $(rb1_slot).attr("id") != this._id && $(rb2_slot).attr("id") != this._id && $(te_slot).attr("id") != this._id) {
				// copy player into slot in table
				$("#wr-3").replaceWith(player_clone);

				// create delete button and attach to W/R/T
				var delete_player = document.createElement("button");
				var x = document.createTextNode("x");
				delete_player.appendChild(x);
				$(player_clone).append(delete_player);
				$(delete_player).attr("id", "wr3-del");

				// recereate empty table slot
				$("#wr3-del").click(function(){
					event.preventDefault();
					var empty_player = document.createElement("li");
					var p = document.createElement("p");
					var WR = document.createTextNode("W/R/T");
					p.appendChild(WR);
					empty_player.appendChild(p);
					$(empty_player).attr({"class":"list-group-item", "id":"wr-3"});
					var current_player = $(this).parent();
					$(current_player).replaceWith(empty_player);
					$("#wr3-del").hide();
				});				
			}

			// show alert for each situation where a duplicate player might be chosen
			if ($(rb2_slot).attr("id") == this._id && $('#rb-1').is(":contains('RB1')")) {
				sAlert.warning("Duplciate players are not allowed.", {offset: '45px'});
			}

			else if ($(rb2_slot).attr("id") == this._id && $('#wr-3').is(":contains('W/R/T')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ((player.indexOf("- RB") != -1) && $(wr3_slot).attr("id") == this._id && $('#rb-1').is(":contains('RB1')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			};

			if ($(rb1_slot).attr("id") == this._id && $('#rb-2').is(":contains('RB2')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ($(rb1_slot).attr("id") == this._id && $('#wr-3').is(":contains('W/R/T')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ((player.indexOf("- RB") != -1) && $(wr3_slot).attr("id") == this._id && $('#rb-2').is(":contains('RB2')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			};

			if ($(wr1_slot).attr("id") == this._id && $('#wr-2').is(":contains('WR2')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ($(wr1_slot).attr("id") == this._id && $('#wr-3').is(":contains('W/R/T')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ((player.indexOf("- WR") != -1) && $(wr3_slot).attr("id") == this._id && $('#wr-1').is(":contains('WR1')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			};

			if ($(wr2_slot).attr("id") == this._id && $('#wr-1').is(":contains('WR1')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ($(wr2_slot).attr("id") == this._id && $('#wr-3').is(":contains('W/R/T')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ((player.indexOf("- WR") != -1) && $(wr3_slot).attr("id") == this._id && $('#wr-2').is(":contains('WR2')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			};

			if ($(te_slot).attr("id") == this._id && $('#te-1').is(":contains('TE')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ($(te_slot).attr("id") == this._id && $('#wr-3').is(":contains('W/R/T')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			}

			else if ((player.indexOf("- TE") != -1) && $(wr3_slot).attr("id") == this._id && $('#te-1').is(":contains('TE')")) {
				sAlert.warning("Duplicate players are not allowed.", {offset: '45px'});
			};

			// show alert for QB being chosen for W/R/T spot
			if ((player.indexOf("- QB") != -1) && ($('#wr-3').is(":contains('W/R/T')")) && ($(qb_slot).is(":contains('- QB')"))) {
				sAlert.warning("Quarterbacks are not allowed in the W/R/T spot.", {offset: '45px'});
			};
		},

		'click #js-reset': function() {
			$("#js-save").show();
			Session.set('loadedTeam', undefined);
			delete Session.keys.loadedTeam;
			$("#roster_list").empty();

			// delete player and create "QB"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var QB = document.createTextNode("QB");
			p.appendChild(QB);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"qb-1"});
			$("#roster_list").append(empty_player);	

			// delete player and create "RB1"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var RB = document.createTextNode("RB1");
			p.appendChild(RB);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"rb-1"});
			$("#roster_list").append(empty_player);

			// delete player and create "RB2"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var RB = document.createTextNode("RB2");
			p.appendChild(RB);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"rb-2"});
			$("#roster_list").append(empty_player);

			// delete player and create "WR1"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var WR = document.createTextNode("WR1");
			p.appendChild(WR);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"wr-1"});
			$("#roster_list").append(empty_player);

			// delete player and create "WR2"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var WR = document.createTextNode("WR2");
			p.appendChild(WR);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"wr-2"});
			$("#roster_list").append(empty_player);

			// delete player and create "W/R/T"
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var WR = document.createTextNode("W/R/T");
			p.appendChild(WR);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"wr-3"});
			$("#roster_list").append(empty_player);

			// delete player and create "TE"	
			var empty_player = document.createElement("li");
			var p = document.createElement("p");
			var TE = document.createTextNode("TE");
			p.appendChild(TE);
			empty_player.appendChild(p);
			$(empty_player).attr({"class":"list-group-item", "id":"te-1"});
			$("#roster_list").append(empty_player);		
		},

		'submit .save_team': function(event) {
			event.preventDefault();

			// get team name, created on, created by
			var name = event.target.saveTeam.value;
			var createdOn = new Date();
			var createdBy = Meteor.userId();
			console.log(name);

			// get ids of selected players
			var qb_id = $("#roster_list > li").eq(0).find("a").attr("id");
			var rb1_id = $("#roster_list > li").eq(1).find("a").attr("id");
			var rb2_id = $("#roster_list > li").eq(2).find("a").attr("id");
			var wr1_id = $("#roster_list > li").eq(3).find("a").attr("id");
			var wr2_id = $("#roster_list > li").eq(4).find("a").attr("id");
			var wr3_id = $("#roster_list > li").eq(5).find("a").attr("id");
			var te_id = $("#roster_list > li").eq(6).find("a").attr("id");
			console.log(qb_id);

			// find ids of selected players in collection
	  		var QB = Football_data.findOne({_id: qb_id});
	  		var RB1 = Football_data.findOne({_id: rb1_id});
	  		var RB2 = Football_data.findOne({_id: rb2_id});
	  		var WR1 = Football_data.findOne({_id: wr1_id});
	  		var WR2 = Football_data.findOne({_id: wr2_id});
	  		var WR3 = Football_data.findOne({_id: wr3_id});
	  		var TE = Football_data.findOne({_id: te_id});
			console.log(QB);

			var addedTeam = {name, QB, RB1, RB2, WR1, WR2, WR3, TE, createdOn, createdBy};

			// call insert method for teams collection
			Meteor.call('addTeam', addedTeam, function (error, result) {
				if (error && error.error === "Duplicate team found.") {
					sAlert.error("Team name already exists.", {offset: '45px'});
				}
				else if (error && error.error === "Position missing.") {
					sAlert.error("A position is missing.", {offset: '45px'});
				}
				else if (error) {
					sAlert.error("Unknown error.", {offset: '45px'});
				}
				else {
					Session.setPersistent('loadedTeam', result);
					sAlert.success("Team saved!", {offset: '45px'});
				}
			});
		},

		'submit .load_team': function(event) {
			event.preventDefault();

			// find team that was selected in collection
			var team_id = event.target.loadTeam.value;
			console.log(team_id);
			var team = Teams.findOne({_id: team_id});
			Session.setPersistent('loadedTeam', team);
			// check to see if any teams exist before hiding save button and clearing roster list
			if (team) {			
				$("#js-save").hide();
				$("#roster_list").empty();
			};

			// create slot in table for QB
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"qb-1"});
			var _id = team.QB._id;
			console.log(_id);
			var name = team.QB.name;
			console.log(name);
			var alt = team.QB.alt;
			var logo = team.QB.logo;
			console.log(logo);
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.QB.position;
			var player_team = team.QB.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");

			// create delete button and attach to QB
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "qb-del");
			$("#roster_list").append(load_player);
			$("#qb-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var QB = document.createTextNode("QB");
				p.appendChild(QB);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"qb-1"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#qb-del").hide();
			})

			// create slot in table for RB1
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"rb-1"});
			var _id = team.RB1._id;
			var name = team.RB1.name;
			var logo = team.RB1.logo;
			var alt = team.RB1.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.RB1.position;
			var player_team = team.RB1.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to RB1
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "rb1-del");
			$("#roster_list").append(load_player);
			$("#rb1-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var RB = document.createTextNode("RB1");
				p.appendChild(RB);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"rb-1"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#rb1-del").hide();
			})

			// create slot in table for RB2
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"rb-2"});
			var _id = team.RB2._id;
			var name = team.RB2.name;
			var logo = team.RB2.logo;
			var alt = team.RB2.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.RB2.position;
			var player_team = team.RB2.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to RB2
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "rb2-del");
			$("#roster_list").append(load_player);
			$("#rb2-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var RB = document.createTextNode("RB2");
				p.appendChild(RB);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"rb-2"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#rb2-del").hide();
			})

			// create slot in table for WR1
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"wr-1"});
			var _id = team.WR1._id;
			var name = team.WR1.name;
			var logo = team.WR1.logo;
			var alt = team.WR1.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.WR1.position;
			var player_team = team.WR1.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to WR1
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "wr1-del");
			$("#roster_list").append(load_player);
			$("#wr1-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var WR = document.createTextNode("WR1");
				p.appendChild(WR);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"wr-1"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#wr1-del").hide();
			})

			// create slot in table for WR2
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"wr-2"});
			var _id = team.WR2._id;
			var name = team.WR2.name;
			var logo = team.WR2.logo;
			var alt = team.WR2.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.WR2.position;
			var player_team = team.WR2.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to WR2
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "wr2-del");
			$("#roster_list").append(load_player);
			$("#wr2-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var WR = document.createTextNode("WR2");
				p.appendChild(WR);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"wr-2"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#wr2-del").hide();
			})

			// create slot in table for W/R/T
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"wr-3"});
			var _id = team.WR3._id;
			var name = team.WR3.name;
			var logo = team.WR3.logo;
			var alt = team.WR3.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.WR3.position;
			var player_team = team.WR3.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to W/R/T
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "wr3-del");
			$("#roster_list").append(load_player);
			$("#wr3-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var WR = document.createTextNode("W/R/T");
				p.appendChild(WR);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"wr-3"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#wr3-del").hide();
			})

			// create slot in table for TE
			var load_player = document.createElement("li");
			$(load_player).attr({"class":"list-group-item", "id":"te-1"});
			var _id = team.TE._id;
			var name = team.TE.name;			
			var logo = team.TE.logo;
			var alt = team.TE.alt;
			var logo_element = document.createElement("img");
			$(logo_element).attr({"src":logo, "class":"logo", "alt":alt});
			var position = team.TE.position;
			var player_team = team.TE.team;
			$(load_player).append(logo_element);
			var link_element = document.createElement("a");
			$(link_element).attr("id", _id).append(" " + name);
			$(load_player).append(link_element);
			$(load_player).append("<p>" + " - " + position + " - " + player_team + " " + "</p>");
			$("#roster_list").append(load_player);

			// create delete button and attach to TE
			var delete_player = document.createElement("button");
			var x = document.createTextNode("x");
			delete_player.appendChild(x);
			$(load_player).append(delete_player);
			$(delete_player).attr("id", "te-del");
			$("#roster_list").append(load_player);
			$("#te-del").click(function(){
				var empty_player = document.createElement("li");
				var p = document.createElement("p");
				var TE = document.createTextNode("TE");
				p.appendChild(TE);
				empty_player.appendChild(p),
				$(empty_player).attr({"class":"list-group-item", "id":"te-1"});
				var current_player = $(this).parent();
				$(current_player).replaceWith(empty_player);			
				$("#te-del").hide();
			})

			// show alert that team has been loaded		
			sAlert.success("Team loaded!", {offset: '45px'}); 										
		},

		'click #js-update': function() {
			// get team that was loaded from session
			var selectedTeam = Session.get('loadedTeam');
			// console.log(selectedTeam);

			// get ids of selected players
			var qb_id = $("#roster_list > li").eq(0).find("a").text().trim();
			var rb1_id = $("#roster_list > li").eq(1).find("a").text().trim();
			var rb2_id = $("#roster_list > li").eq(2).find("a").text().trim();
			var wr1_id = $("#roster_list > li").eq(3).find("a").text().trim();
			var wr2_id = $("#roster_list > li").eq(4).find("a").text().trim();
			var wr3_id = $("#roster_list > li").eq(5).find("a").text().trim();
			var te_id = $("#roster_list > li").eq(6).find("a").text().trim();
			console.log(qb_id);
			console.log(rb1_id);
			console.log(rb2_id);
			console.log(wr1_id);
			console.log(wr2_id);
			console.log(wr3_id);
			console.log(te_id);

			// find ids of selected players in collection
	  		var QB = Football_data.findOne({name: qb_id});
	  		var RB1 = Football_data.findOne({name: rb1_id});
	  		var RB2 = Football_data.findOne({name: rb2_id});
	  		var WR1 = Football_data.findOne({name: wr1_id});
	  		var WR2 = Football_data.findOne({name: wr2_id});
	  		var WR3 = Football_data.findOne({name: wr3_id});
	  		var TE = Football_data.findOne({name: te_id});
			console.log(QB);
			console.log(RB1);
			console.log(RB2);
			console.log(WR1);
			console.log(WR2);
			console.log(WR3);
			console.log(TE);

			// get name, createdOn, and createdBy properties
			var name = selectedTeam.name;
			var createdOn = new Date();
			var createdBy = Meteor.userId();

			// create team object
			var updatedTeam = {name, QB, RB1, RB2, WR1, WR2, WR3, TE, createdOn, createdBy};

			// call update team method
			Meteor.call('updateTeam', selectedTeam, updatedTeam, function (error, result) {
				if (error && error.error === "Position missing.") {
					sAlert.error("A position is missing.", {offset: '45px'});
				}
				else if (error && error.error === "No update.") {
					sAlert.error("No change was made to the team.", {offset: '45px'});
				}
				else if (error) {
					sAlert.error("Unknown error.", {offset: '45px'});
				}
				else {
					Session.set("loadedTeam", result);
					sAlert.success("Team updated!", {offset: '45px'});
				}
			});
		},

		'keyup #js-name_search': function() {
    		// search variables
		    var input = document.getElementById('js-name_search');
		    console.log(input);
		    var filter = input.value.toUpperCase();
		    var ul = document.getElementById("player_list");
		    var li = ul.getElementsByTagName('li');

		    // loop through all list items, and hide those who don't match the search query
		    for (var i = 0; i < li.length; i++) {
		        var a = li[i].getElementsByTagName("a")[0];
		        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		            li[i].style.display = "";
		        } 
		        else {
		            li[i].style.display = "none";
		        }
	    	}
  		},

		'keyup #js-position_search': function() {
    		// search variables
		    var input = document.getElementById('js-position_search');
		    console.log(input);
		    var filter = input.value.toUpperCase();
		    var ul = document.getElementById("player_list");
		    var li = ul.getElementsByTagName('li');

		    // loop through all list items, and hide those who don't match the search query
		    for (var i = 0; i < li.length; i++) {
		        var a = li[i].getElementsByTagName("p")[0];
		        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		            li[i].style.display = "";
		        } 
		        else {
		            li[i].style.display = "none";
		        }
	    	}
  		},

		'keyup #js-team_search': function() {
    		// search variables
		    var input = document.getElementById('js-team_search');
		    console.log(input);
		    var filter = input.value.toUpperCase();
		    var ul = document.getElementById("player_list");
		    var li = ul.getElementsByTagName('li');

		    // loop through all list items, and hide those who don't match the search query
		    for (var i = 0; i < li.length; i++) {
		        var a = li[i].getElementsByTagName("p")[1];
		        if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
		            li[i].style.display = "";
		        } 
		        else {
		            li[i].style.display = "none";
		        }
	    	}
  		}, 	 	 	
	});

	Template.team.events ({
		'click #js-delete': function() {
			// get team that was loaded from session
			var loadedTeam = Session.get('loadedTeam');
			$("#roster").hide();
			$("#js-delete").hide();

			// call delete team method
			Meteor.call('deleteTeam', loadedTeam, function (error, result) {
				if (error) {
					sAlert.error("Unknown error.", {offset: '45px'});
				}
				else {
					Session.set('loadedTeam', undefined);
					delete Session.keys.loadedTeam; 
					sAlert.success("Team deleted!", {offset: '45px'});
				}
			});
		},

		'click #js-player_back': function() {
			// destroy session from player page
			Session.set('loadedTeam', undefined);
			delete Session.keys.loadedTeam; 
		},
	});
};

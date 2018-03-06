import {Football_data} from '../football_data.js';

import {Teams} from '../football_data.js';

import {Stats} from '../stats.js';

import {Stats_2017} from '../stats_2017.js';

Meteor.methods({

	'addTeam': function(addedTeam) {
		// get user ID and find search database for a team name that was already chosen by that user		
		var currentUserId = this.userId;
		var team_name = (Teams.find({"name": addedTeam.name, "createdBy": currentUserId})).fetch();
		console.log(team_name.length);
		console.log(team_name);
		console.log(currentUserId);

		// check to see if team name already exists and that every position is selected, otherwise send back an error
		if ((team_name.length == 0) && (addedTeam.QB) && (addedTeam.RB1) && (addedTeam.RB2) && (addedTeam.WR1) && (addedTeam.WR2) && (addedTeam.WR3) && (addedTeam.TE)) {
			if (Meteor.userId()) {
				var team_id = Teams.insert(addedTeam);
				console.log("Added team with id:" + team_id);
				var new_team = Teams.findOne({"_id": team_id});
				return new_team;
			}
		}
		else if (team_name.length != 0)  {
			throw new Meteor.Error("Duplicate team found.", "A duplicate team name was found.");
		}
		else if ((!addedTeam.QB) || (!addedTeam.RB1) || (!addedTeam.RB2) || (!addedTeam.WR1) || (!addedTeam.WR2) || (!addedTeam.WR3) || (!addedTeam.TE)) {
			throw new Meteor.Error("Position missing.", "A position was not selected.");
		}
	},

	'updateTeam': function(selectedTeam, updatedTeam){
		// check to see if any positions are missing or if no changes were made, otherswise update team
		if ((!updatedTeam.QB) || (!updatedTeam.RB1) || (!updatedTeam.RB2) || (!updatedTeam.WR1) || (!updatedTeam.WR2) || (!updatedTeam.WR3) || (!updatedTeam.TE)) {
			throw new Meteor.Error("Position missing.", "A position was not selected.");
		}
		else if ((selectedTeam.QB.name == updatedTeam.QB.name) && (selectedTeam.RB1.name == updatedTeam.RB1.name) && (selectedTeam.RB2.name == updatedTeam.RB2.name) && (selectedTeam.WR1.name == updatedTeam.WR1.name) && (selectedTeam.WR2.name == updatedTeam.WR2.name) && (selectedTeam.WR3.name == updatedTeam.WR3.name) && (selectedTeam.TE.name == updatedTeam.TE.name)) {
			throw new Meteor.Error("No update.", "No change was made to the loaded team.");
		}	
		else if ((updatedTeam.QB) && (updatedTeam.RB1) && (updatedTeam.RB2) && (updatedTeam.WR1) && (updatedTeam.WR2) && (updatedTeam.WR3) && (updatedTeam.TE)) {
			if (Meteor.userId()) {
				// var team_id = Teams.upsert({_id: selectedTeam._id}, updatedTeam);
				Teams.remove({_id: selectedTeam._id});
				var team_id = Teams.insert(updatedTeam);
				console.log("Updated team with id:" + team_id);
				console.log(selectedTeam.QB._id);
				console.log(updatedTeam.QB._id);
				var new_team = Teams.findOne({"_id": team_id});
				return new_team;
			}
		}		
	},

	'deleteTeam': function(loadedTeam){
		// remove loaded team from the database
		Teams.remove({_id: loadedTeam._id});
	},

});
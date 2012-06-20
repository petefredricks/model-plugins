// Dependencies
var util = require( "util" );
var events = require( "events" );
var app, History;

// Basic setup for a model
exports.setup = function ( schema, prefix ) {
	
	// set date last modified
	schema.plugin( require( './modified' ) );

	// send updates to listeners
	schema.plugin( require( './socket' ), { 
		prefix: prefix,
		app: app
	});

	// add ability to return only public fields
	schema.plugin( require( './fields' ) );
	
	// simply returns the prefix
	schema.methods.getPrefix = function() {
		return prefix.toLowerCase();
	}
	
	// returns the history collection
	schema.methods.getHistoryModel = function() {
		return History || false;
	}
};

// Set the app variable
exports.init = function( server ) {
	app = server;
}

// Set the history collection used for saveHistory
exports.setHistoryModel = function( his ) {
	History = his;
}

// Manage query filters
exports.smartQuery = require( './smart-query' );

// Manage query filters
exports.saveHistory = require( './save-history' );
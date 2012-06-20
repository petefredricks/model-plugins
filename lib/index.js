// Dependencies
var util = require( "util" );
var events = require( "events" );
var saveHistory = require( './save-history' );
var socketFunc = require( './socket' );
var app, History;

// Basic setup for a model
exports.setup = function ( schema, prefix ) {
	
	// set date last modified
	schema.plugin( require( './modified' ) );

	// add ability to return only public fields
	schema.plugin( require( './fields' ) );
	
	// simply returns the prefix
	schema.methods.getPrefix = function() {
		return prefix.toLowerCase();
	}	
	
	// get the key that is saved in Redis
	schema.methods.getRedisKey = function() {
		return [ this.getPrefix(), this._id ].join( ':' );
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

// Add the ability to save changes to the history collection
exports.initHistory = function( schema ) {
	schema.methods.saveHistory = saveHistory;
}

// Add the ability to stream changes via socket.io
exports.initSocket = function( schema ) {	
	schema.plugin( socketFunc, { app: app });
}

	

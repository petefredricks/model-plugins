// Dependencies
var util = require( "util" );
var events = require( "events" );
var app;

// Basic setup a model
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
};

// Set the app variable
exports.init = function( server ) {
	app = server;
}
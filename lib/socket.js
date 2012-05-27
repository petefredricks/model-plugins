// File: plugins/socketUpdate.js

var app = require('../../server');

module.exports = exports = function( schema, options ) {
	
	var prefix = ( options && options.prefix || 'model' ) + ':';
	
	// send updates to listeners
	schema.pre( 'save', function( next ) {

		app.socketMapper.sendUpdates( prefix + this._id, this );

		next();
	});
}


module.exports = exports = function( schema, options ) {
	
	var prefix = ( options && options.prefix || 'model' ) + ':';
	var app = options && options.app;
	
	// send updates to listeners
	schema.pre( 'save', function( next ) {
		
		if ( app && app.socketMapper ) {
			app.socketMapper.sendUpdates( prefix + this._id, this );
		}	

		next();
	});
}
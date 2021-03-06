
module.exports = exports = function( schema, options ) {
	
	var app = options && options.app;
	
	if ( app && app.socketMapper ) {
	
		// send updates to listeners
		schema.pre( 'save', function( next ) {
			app.socketMapper.sendUpdates( this.getSearchKeys(), this );
			next();
		});
	}
}
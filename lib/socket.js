
module.exports = exports = function( schema, options ) {
	
	var prefix = ( ( options && options.prefix || 'model' ) + ':' ).toLowerCase();
	var app = options && options.app;
	
	if ( app && app.socketMapper ) {
	
		// send updates to listeners
		schema.pre( 'save', function( next ) {
			app.socketMapper.sendUpdates( prefix + this._id, this );
			next();
		});
	}
}

module.exports = exports = function( schema, options ) {
	console.log(5)
	var prefix = ( ( options && options.prefix || 'model' ) + ':' ).toLowerCase();
	var app = options && options.app;
	
	if ( app ) {
		console.log(6)
		// send updates to listeners
		schema.pre( 'save', function( next ) {
			
			if ( app.socketMapper ) {
				app.socketMapper.sendUpdates( prefix + this._id, this );
				next();
			}
		});
	}
}
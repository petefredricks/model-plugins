
module.exports = exports = function( schema, options ) {
	console.log(5)
	var prefix = ( ( options && options.prefix || 'model' ) + ':' ).toLowerCase();
	var app = options && options.app;
	
	if ( app && app.socketMapper ) {
		console.log(6)
		// send updates to listeners
		schema.pre( 'save', function( next ) {
			console.log(7)
			app.socketMapper.sendUpdates( prefix + this._id, this );
			next();
		});
	}
}
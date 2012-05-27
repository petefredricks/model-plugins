// File: plugins/lastModified.js

module.exports = exports = function( schema, options ) {
	
	schema.add({
		updated: Date
	});

	schema.pre( 'save', function( next ) {
		this.updated = new Date();
		next();
	});

	if ( options && options.index ) {
		schema.path( 'updated' ).index( options.index );
	}
}

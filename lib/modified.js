var mongoose = require( 'mongoose' );

module.exports = exports = function ( schema, options ) {

	schema.add( {
		updated:   Date,
		updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
	} );

	schema.pre( 'save', function ( next ) {
		this.updated = new Date();
		next();
	} );

	if ( options && options.index ) {
		schema.path( 'updated' ).index( options.index );
	}
}

var mongoose = require( 'mongoose' );

module.exports = exports = function ( schema, options ) {

	schema.add( {
		updated: Date,
		updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
	});

	// auto-set updated field on save
	schema.pre( 'save', function ( next ) {
		this.updated = new Date();
		next();
	});
	
	// use this method to set the updater id
	schema.methods.setUpdater = function( userId ) {
		this.updatedBy = userId;
	}

	if ( options && options.index ) {
		schema.path( 'updated' ).index( options.index );
	}
}

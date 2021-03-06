
module.exports = exports = function( schema ) {
	
	var publicFields = [];
	
	for ( var field in schema.paths ) {
		
		if ( field.charAt( 0 ) == '_' ) continue;
		
		publicFields.push( field );
	}
	
	schema.methods.publicFields = schema.statics.publicFields = function( editor ) {
		
		var fields = [].concat( publicFields );
		
		return editor ? editor( fields ) : fields;
	}
	
	schema.methods.publicFieldsString = schema.statics.publicFieldsString = function() {
		
		return this.publicFields.apply( this, arguments ).join( ' ' );
	}
}

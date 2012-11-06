
module.exports = exports = function( schema ) {
	
	var publicFields = [];
	
	for ( var field in schema.paths ) {
		
		if ( field.charAt( 0 ) == '_' ) continue;
		
		publicFields.push( field );
	}
	
	schema.statics.fields = function( editor ) {
		
		var fields = [].concat( publicFields );
		
		return editor ? editor( fields ).join( ' ' ) : fields.join( ' ' );
	}
	
	schema.methods.fields = function() {
		
		return [].concat( publicFields );
	}
}

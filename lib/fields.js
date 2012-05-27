
module.exports = exports = function( schema ) {
	
	var publicFields = [];
	
	for ( var field in schema.paths ) {
		if ( ~field.indexOf( '_' ) ) continue;
		
		publicFields.push( field );
	}
	
	schema.statics.fields = function() {
		return publicFields;
	}
}

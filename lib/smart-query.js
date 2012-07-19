
module.exports = exports = function( query, req ) {
	
	for ( var key in req.query ) {
		
		switch( key ) {			
			case 'filter':
				
				var keys = ( req.query[ key ] || '' ).split( ',' );
				
				for ( var i = 0, len = keys.length; i < len; i++ ) {
				
					switch( keys[ i ] ) {
						case 'team':
							query.where( 'team', req.session.user || 'false' );
							break;
						case 'owner':
							query.where( 'owner', req.session.user || 'false' );
							break;
					}
				}
				
				break;
				
			case 'limit':
				query.limit( req.query[ key ] );
				break;
			
			// this is for jquery caching
			case '_':
				break;
				
			default:
				query.where( key, req.query[ key ] );
				break;
		}
	}
	
	return query;
}
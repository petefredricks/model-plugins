
module.exports = exports = function( query, req ) {
	
	for ( var key in req.query ) {
		
		switch( key ) {			
			case 'filter':
				
				switch( req.query[ key ] ) {
					case 'user':
						query.where( 'team', req.session.user || 'false' );
						break;
				}
				
				break;
				
			default:
				query.where( key, req.query[ key ] );			
		}
	}
	
	return query;
}

module.exports = exports = function( query, req ) {
	
	var status = 1;
	
	for ( var key in req.query ) {
		
		switch( key ) {			
			case '__filter':
				
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
				
			case '__limit':
				query.limit( req.query[ key ] );
				break;
				
			case '__skip':
				query.skip( req.query[ key ] );				
				break;
				
			case '__sort':
				
				var sort = req.query[ key ].split( '|' );
				var dir = sort[ 1 ] === '-1' ? -1 : 1;
				
				query.sort( sort[ 0 ], dir );
				
				break;
			
			case '_': // this is for jquery cache busting
			case '__admin': // this is for our zing admin
				break;
			
			// change the desired status of document (default is 1)
			case '_status':
				status = req.query[ key ];
				break;
				
			default:
				query.where( key, req.query[ key ] );
				break;
		}
	}
	
	query.where( '_status', status );
	
	return query;
}
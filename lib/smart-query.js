
module.exports = exports = function( query, params, user ) {
	
	var state = 1;
	
	for ( var key in params ) {
		
		switch( key ) {			
			case '__filter':
				
				var keys = ( params[ key ] || '' ).split( ',' );
				
				for ( var i = 0, len = keys.length; i < len; i++ ) {
				
					switch( keys[ i ] ) {
						case 'team':
							query.where( 'team' ).equals( user || 'false' );
							break;
						case 'owner':
							query.where( 'owner' ).equals( user || 'false' );
							break;
					}
				}
				
				break;
				
			case '__limit':
				query.limit( params[ key ] );
				break;
				
			case '__skip':
				query.skip( params[ key ] );
				break;
				
			case '__sort':
				
				var sort = params[ key ].split( '|' );
				var obj = {};
				
				obj[ sort[ 0 ] ] = sort[ 1 ] === '-1' ? -1 : 1;
				
				query.sort( obj );
				
				break;
			
			case '_': // this is for jquery cache busting
			case '__admin': // this is for our zing admin
				break;
			
			// change the desired state of document (default is 1)
			case 'documentState':
				state = params[ key ];
				break;
				
			default:
				query.where( key ).equals( params[ key ] );
				break;
		}
	}

	if ( state !== 'all' ) {
		query.where( 'documentState' ).equals( state );
	}
	
	return query;
};
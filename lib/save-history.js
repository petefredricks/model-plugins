

// helper method on instances to track model changes
module.exports = exports = function saveHistory( prefix, body, userId, accountId, History ) {
	
	var newVal, oldVal;
	var changes = {};
	var hasChanged = false;
	
	for ( var key in body ) {
		
		newVal = body[ key ];
		oldVal = this[ key ];
		
		if ( compare( newVal, oldVal ) ) {
			
			changes[ key ] = newVal;
			
			hasChanged = true;
		}
	}
	
	if ( hasChanged ) {
		
		var History = mongoose.model( 'History' );
		
		History.findById( body._id, function( err, doc ) {
			
			if ( err ) {
				return;
			}
			
			var now = new Date();
			
			if ( !doc ) {
				doc = new History({
					_id: body._id,
					model: prefix,
					updated: now,
					changes: [{
						UPDATED: now,
						USER: session.user,
						ACTION: 'added'
					}]
				});
			}
			else {
				doc.updated = now;
				
				changes.UPDATED = now,
				changes.USER = session.user,
				changes.ACTION ='changed'
				
				doc.changes.push( changes );
			}
			
			doc.save();
		});
	}
}

function _compare( newVal, oldVal ) {
	
	var isDiff = false;
		
	if ( oldVal instanceof Array ) {
		
		var	len = oldVal.length;
		
		if ( len !== newVal.length ) {
			isDiff = true;
		}
		else {
			var v;
			var i = 0;
		
			while ( i < len && !isDiff ) {
				v = oldVal[ i ];
				isDiff = _compare( ( v._id || v ), ( newVal[ i ]._id || newVal[ i ] ) );
				i++;
			}
		}
	}
	else {
		isDiff = JSON.stringify( oldVal ) !== JSON.stringify( newVal );
	}	
	
	return isDiff;
}
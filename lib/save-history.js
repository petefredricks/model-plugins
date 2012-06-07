
// helper method on instances to track model changes
module.exports = exports = function saveHistory( body, accountId, userId ) {
	
	var newVal, oldVal;
	var changes = {};
	var hasChanged = false;
	
	for ( var key in body ) {
		
		newVal = body[ key ];
		oldVal = this[ key ];
		
		if ( _compare( newVal, oldVal ) ) {
			
			changes[ key ] = newVal;
			
			hasChanged = true;
		}
	}
	
	if ( hasChanged ) {
		
		var History = this.getHistoryModel();
		var prefix = this.getPrefix();
		
		if ( History && prefix ) {
		
			History.findById( body._id, function( err, doc ) {

				if ( err ) {
					return;
				}

				var now = new Date();

				if ( !doc ) {
					doc = new History({
						_id: body._id,
						_account: accountId,
						model: prefix,
						updated: now,
						changes: [{
							UPDATED: now,
							USER: userId,
							ACTION: 'added'
						}]
					});
				}
				else {
					doc.updated = now;

					changes.UPDATED = now,
					changes.USER = userId,
					changes.ACTION ='changed'

					doc.changes.push( changes );
				}

				doc.save();
			});
		}
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
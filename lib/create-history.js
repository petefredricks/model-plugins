
// helper method on instances to track model changes
module.exports = exports = function createHistory( body, accountId, userId ) {
	
	var newVal, oldVal;
	var changes = {};
	var hasChanged = false;
	var isNew = !body;

	for ( var key in body ) {

		newVal = body[ key ];
		oldVal = this[ key ];

		if ( _compare( newVal, oldVal ) ) {

			changes[ key ] = newVal;

			hasChanged = true;
		}
	}
	
	if ( isNew || hasChanged ) {
		
		var History = this.getHistoryModel();
		var prefix = this.getPrefix();
		
		if ( History && prefix ) {
					
			return new History({
				_account: accountId,
				key: this._id,
				type: prefix,
				user: userId,
				action: isNew ? 'created' : 'updated',
				changes: changes
			});
		}
	}
	
	return null;
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
	else if ( oldVal instanceof Date ) {
		isDiff = ( oldVal ).getTime() !== new Date( newVal ).getTime();
	}
	else {
		isDiff = JSON.stringify( oldVal ) !== JSON.stringify( newVal );
	}	
	
	return isDiff;
}
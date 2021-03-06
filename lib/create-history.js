// helper method on instances to track model changes
module.exports = exports = function createHistory( body, userId ) {
	
	var newVal, oldVal, len, i, keys, field;
	var changes = {};
	var hasChanged = false;
	var isNew = !body;

	if ( !isNew ) {

		keys = Object.keys( body );
		len = keys.length;

		for ( i = 0; i < len; i++ ) {

			field = keys[ i ];
			newVal = body[ field ];
			oldVal = this[ field ];

			if ( _compare( newVal, oldVal ) ) {

				changes[ field ] = {
					from: oldVal,
					to: newVal
				};

				hasChanged = true;
			}
		}
	}
	
	if ( isNew || hasChanged ) {
		
		var History = this.getHistoryModel();
		var prefix = this.getPrefix();
		
		if ( History && prefix ) {
					
			return new History({
				key: this._id,
				type: prefix,
				user: userId,
				action: isNew ? 'created' : 'updated',
				changes: changes				
			});
		}
	}
	
	return null;
};

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
				isDiff = _compare( ( ( v && v._id ) || v ), ( newVal[ i ]._id || newVal[ i ] ) );
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
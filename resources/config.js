/* This JS file handles configuration */

/* Copied from Themes.js */
function getKey(key) {
var str = window.localStorage,
    result = str.getItem('-evelution-pref-'+key);
if (!result) {
   return '-1';
}
return result;
}

function insertKey(key,value) {
	window.localStorage.setItem('-evelution-pref-' + key, '' + value);
}


/**/

mw.notify = function ( message, options ) {
	// Lazy load
	return mw.loader.using( 'mediawiki.notification', function () {
		return NotificationHandler( message, options );
	} );
};


function NotificationHandler(message,options) {
	var mode = 'message';
	var notificationContent = $( '<div></div>' );
	if ( typeof message === 'object' ) {
		// Handle mw.Message objects separately from DOM nodes and jQuery objects
		if ( message instanceof mw.Message ) {
			notificationContent.html( message.parse() );
		} else {
			notificationContent.append( message );
		}
	} else {
		notificationContent.text( message );
	}
	var content = notificationContent.html();
	if (options) {
		if(options.type){
			options.type=options.type.replace(/[ _-]+/g,'-').replace(/[^-a-z0-9]+/ig,'');
			if (options.type === 'error') {
				mode = 'alert'
			}
			if (options.type === 'warn') {
				mode = 'warning'
			}
			if (options.type === 'success') {
				mode = 'success'
			}
		}
		if (options.title) {
			var content = '<big><b>' + options.title + '</b></big><br>' + notificationContent.html(); 
		}

		if (options.tag) {
			var extraclass = options.tag;
			if ($('.cpe-banner-notification#Tag-' + extraclass).length) {
				$('.cpe-banner-notification#Tag-' + extraclass).remove();
			}
		}
	}
	return (extraclass) ? AddFloatingBanner(content,mode,'Tag-' + extraclass) : AddFloatingBanner(content,mode);
};
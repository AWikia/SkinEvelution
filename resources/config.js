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



(function() {
    'use strict';

  const mwConfig2 = mw.config.get([
    "wgNamespaceNumber",
    "wgTitle",
    "wgCanonicalSpecialPageName",
    "wgArticlePath"
  ]);
    
	if (mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgTitle === "EvelutionSystemBackdropTypes") {

		$.when( mw.loader.using( [ 'mediawiki.jqueryMsg' ] ), $.ready ).then( function() {
		InitSBT();
		} );
	}


})();

function InitSBT() {
	// Change Title
	$(".evelution-page-header .evelution-title > span, .evelution-minibar .namespace-and-title .title > a").html( 'System Backdrop Types' );

	$("#mw-content-text").empty().attr('style','overflow:visible');
	$("#mw-content-text").append(
		'<button class="cpe-button" id="SBTStart">Start Test</button>'
	);
	$("container").append(
		'<div style="--backdrop-opacity:var(--dropdown-opacity); position:fixed; display:flex; top:0; left:0; width:100%; height:100%; align-items:center; gap:2px; justify-content:center; background-color:rgba(var(--canvas-secondary-background-color-rgb),var(--backdrop-opacity)); color:var(--canvas-text-secondary-background-color); -webkit-backdrop-filter:var(--acryllic-filter); backdrop-filter:var(--acryllic-filter); z-index:999999999;" class="SBT">' +
		'<div class="lunalevit sbtll hidden"></div>' +
		'<section>' +
		'<input type="checkbox" name="SBT2" id="none"></input>' +
		'<label for="none">Disable</label>' +
		'</section>' +
		'<section>' +
		'<input type="radio" name="SBT" checked id="AC"></input>' +
		'<label for="AC">Luna Lovit</label>' +
		'</section>' +
		'<section>' +
		'<input type="radio" name="SBT" id="MI"></input>' +
		'<label for="MI">Luna Levit</label>' +
		'</section>' +
		'</div>'
	);
	
$('#AC[name="SBT"]').click(
							function(e) {
								e.preventDefault
								$('div.sbtll').addClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","var(--dropdown-opacity)");
							}   
);

$('#MI[name="SBT"]').click(
							function(e) {
								e.preventDefault
								$('div.sbtll').removeClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","1");
							}   
);

$('#none[name="SBT2"]').click(
							function(e) {
								e.preventDefault
								$('div.SBT').remove();
							}   
);

$('button#SBTStart').click(
							function(e) {
								e.preventDefault
								InitSBT();
							}   
);


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
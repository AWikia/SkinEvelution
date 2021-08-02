/* This JS file handles configuration */

/* Copied from Themes.js */
function getKey(key) {
var str = window.localStorage,
    result = str.getItem('-eve-pref-'+key);
if (!result) {
   return '-1';
}
return result;
}

function insertKey(key,value) {
	window.localStorage.setItem('-eve-pref-' + key, '' + value);
}


(function() {
    'use strict';
    var config = mw.config.get('wgEvelution');

    if (config.LeftPersonalLinks === true) {
		$('body').addClass( "left-links" );
    }
    if (config.ForceOneHeader === true) {
		$('body').addClass( "single-header" );
    }
    if (config.DisableColorManagement === true) {
		$('.color-management-on').remove();
		$('body').addClass( "disabled-theming" );	
		$("body").attr('community-background-mode', 'modern' );
		$("body").attr('community-background-size', 'cover' );
		$("body").attr('community-background-alignment', 'top' );
    }
	if (config.DisableRightRail === true ) {
		$('body').addClass( "no-rail" );
	}
	if (config.ServerMode === true ) {
		$('body').addClass( "server-mode" );
	} else {
		$('body').addClass( "home-mode" );
	}
	document.querySelector('html').style.setProperty("--custom-font", config.CustomFont);
	$("html").attr('icon-mode', config.IconStyle);
})();
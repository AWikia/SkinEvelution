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

/* Visual Themes */
var visualThemeNames_l10n = [mw.msg( 'eve-style-basic' ),mw.msg( 'eve-style-contrast' ),mw.msg( 'eve-style-simple' ),mw.msg( 'eve-style-classic' )];
/* Visual Colors */
var visualColorNames_l10n = [mw.msg( 'eve-color-factorycolors' ), mw.msg( 'eve-color-lunacolors' ), mw.msg( 'eve-color-classicforced' ), mw.msg( 'eve-color-campbellforced' ), mw.msg( 'eve-color-forced' ), mw.msg( 'eve-color-tangoforced' ),mw.msg( 'eve-color-rgbcolors' ),mw.msg( 'eve-color-retro' ),mw.msg( 'eve-color-retro' ) + ' II',mw.msg( 'eve-color-retro' ) + ' III',mw.msg( 'eve-color-retro' ) + ' IV',mw.msg( 'eve-color-retro' ) + ' V',mw.msg( 'eve-color-retro' ) + ' VI',mw.msg( 'eve-color-retro' ) + ' VII',mw.msg( 'eve-color-fandomcolors' ) ];


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
	$("html").attr('icon-wireframe', config.IconWireframe);
	
	

// Changes Strings into l10ned version
/* Visual Styles */
	for (let i = 0; i < visualThemeNames_l10n.length; i++) {
		var str = '<a onclick="VisualStyle(' + i + ')">' + visualThemeNames_l10n[i] + '</a>'
		$('li[id="style' + i + '"]').html(str);
	}
/* Visual Colors */
	for (let i = 0; i < visualColorNames_l10n.length; i++) {
		var str = '<a onclick="VisualColor(' + i + ')">' + visualColorNames_l10n[i] + '</a>'
		$('li[id="color' + i + '"]').html(str);
	}


// In the Visual Styles Options

})();
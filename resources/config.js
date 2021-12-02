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
	CompileVisualL10N();
})();

function CompileVisualL10N() {

/* Visual Themes */
var visualThemeNames_l10n = ['Lite',mw.msg( 'evelution-style-basic' ),mw.msg( 'evelution-style-contrast' ),mw.msg( 'evelution-style-simple' )];
/* Visual Colors */
var visualColorNames_l10n = [mw.msg( 'evelution-color-factorycolors' ), mw.msg( 'evelution-color-forced' ), mw.msg( 'evelution-color-forced' ) + ' II', mw.msg( 'evelution-color-techno' ), mw.msg( 'evelution-color-retro' ), mw.msg( 'evelution-color-retro' ) + ' II', mw.msg( 'evelution-color-retro' ) + ' III', mw.msg( 'evelution-color-retro' ) + ' IV', mw.msg( 'evelution-color-neon' )];


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
}
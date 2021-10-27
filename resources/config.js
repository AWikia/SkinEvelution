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
    var config = mw.config.get('wgEvelution');

    if (config.LeftPersonalLinks === true) {
		$('html').addClass( "left-links" );
    }
    if (config.ForceOneHeader === true) {
		$('html').addClass( "single-header" );
    }
    if (config.DisableColorManagement === true) {
		$('.color-management-on').remove();
		$('html').addClass( "disabled-theming" );
    }
	if (config.DisableRightRail === true ) {
		$('html').addClass( "no-rail" );
	}
	if (config.ServerMode === true ) {
		$('html').addClass( "server-mode" );
	} else {
		$('html').addClass( "home-mode" );
	}
	document.querySelector('html').style.setProperty("--custom-font", config.CustomFont);
	$("html").attr('sticky-rail', config.StickyRail);
	if (! ( ($("#ca-edit").length) || ($("#ca-viewsource").length)  ) ) { // Remove Edit Button
		$(".evelution-floating-actions .cpe-floating-button.edit").remove();
	} 
	if (! ($("#ca-edit").length) ) { // Rename to viewsource
		$(".evelution-floating-actions .cpe-floating-button.edit").attr("cpe-tooltip", mw.msg( 'viewsource' ) );
		$(".evelution-floating-actions .cpe-floating-button.edit .cpe-icon.material-icons").html('lock');
	}
	if (! ($("#ca-history").length) ) { // Remove History Button
		$(".evelution-floating-actions .cpe-floating-button.history").remove();
	}
})();

function CompileVisualL10N() {

/* Visual Themes */
var visualThemeNames_l10n = ['Lite',mw.msg( 'evelution-style-basic' ),mw.msg( 'evelution-style-contrast' ),mw.msg( 'evelution-style-simple' )];
/* Visual Colors */
var visualColorNames_l10n = [mw.msg( 'evelution-color-factorycolors' ), mw.msg( 'evelution-color-lunacolors' ), mw.msg( 'evelution-color-classicforced' ), mw.msg( 'evelution-color-classicforced' ) + ' II', mw.msg( 'evelution-color-campbellforced' ), mw.msg( 'evelution-color-forced' ), mw.msg( 'evelution-color-forced' ) + ' II', mw.msg( 'evelution-color-forced' ) + ' III', mw.msg( 'evelution-color-tangoforced' ),mw.msg( 'evelution-color-rgbcolors' ),mw.msg( 'evelution-color-retro' ),mw.msg( 'evelution-color-retro' ) + ' II',mw.msg( 'evelution-color-retro' ) + ' III',mw.msg( 'evelution-color-retro' ) + ' IV',mw.msg( 'evelution-color-retro' ) + ' V',mw.msg( 'evelution-color-retro' ) + ' VI',mw.msg( 'evelution-color-retro' ) + ' VII',mw.msg( 'evelution-color-fandomcolors' ),mw.msg( 'evelution-color-fandomcolors' ) + ' II',mw.msg( 'evelution-color-fandomcolors' ) + ' III', mw.msg( 'evelution-color-candycrush' ), mw.msg( 'evelution-color-candycrush' ) + ' II' , mw.msg( 'evelution-color-discord' ),'Evelution OS'];

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
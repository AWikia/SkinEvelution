/* Local Storage */
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

/* Enable New Global Navigation - No exception for now */
(function () {
	if (getKey('nav-full') === '-1') {
		insertKey('nav-full', 'true' );
	}
	var nav_full = getKey('nav-full');
	$('body').attr('nav', nav_full );
})();

function ToggleNav() {
	if 	($('body').attr('nav') == 'true') {
		$('body').attr('nav', 'false');
	} else {
		$('body').attr('nav', 'true');
	}
	insertKey('nav-full', $(' body').attr('nav') );
}

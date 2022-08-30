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
	if (getKey('theme') === '-1') {
		insertKey('theme', 'standard' );
	}
	var theme = getKey('theme');
	Theme(theme);
})();

function Theme(theme="standard") {
	insertKey('theme', theme );
	$('html').attr('theme', theme );
	$('.themes li.selected').removeClass('selected');
	$('.themes li[data-theme="' + theme + '"]').addClass('selected');
}

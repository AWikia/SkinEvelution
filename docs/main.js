// MediaWiki
	var mediawiki = document.querySelector("html:not(.ivilution-loaded) body.mediawiki");

/* Mobile Only CSS */

if (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0)) {
document.querySelector("html").className += " touch-events"
}

/* Local Storage */
function getKey(key) {
var str = window.localStorage,
    result = str.getItem('-evelution-preference-'+key);
if (!result) {
   return '-1';
}
return result;
}

function insertKey(key,value) {
	window.localStorage.setItem('-evelution-preference-' + key, '' + value);
}

function getParams() {
	if (window.location.search != "") {
		var params = window.location.search.split("?")[1].split("&");
    } else {
		var params = []
    }
	return params
}


/* Dropdowns */
// Calls the function on all toggles
function DropDownUpdate() {
	var dropdowns = document.querySelectorAll(".cpe-dropdown");
	dropdowns.forEach(function(x) {
		x.setAttribute('tabindex',-1); // Add the CPE button class
	});


/* Select Inputs */
	var select_items = document.querySelectorAll(".cpe-dropdown.cpe-select .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2)");
	select_items.forEach(function(y) {
		y.setAttribute('onclick','UpdateSelectValue()')
		y.addEventListener('click', (function(e) {
						e.preventDefault();
						var selected = this;


		var x = document.querySelector(".cpe-dropdown.cpe-select:focus-within .cpe-dropdown__content .cpe-list li.selected");
		if (x) {
			x.classList.remove("selected");
		}
//		this.classList.add("selected");


						var value = selected.getAttribute("value");
						document.querySelector(' .cpe-dropdown.cpe-select:focus-within')
						.addEventListener('click',(function() {
									if (selected != undefined) {
										var content = selected.innerText;
										document.querySelector('.cpe-select:focus-within .cpe-select__value').setAttribute("value", value);
										document.querySelector('.cpe-select:focus-within .cpe-select__value').innerHTML= content;
										selected = undefined;
//										TestDynamicTheme(); // Change
									}
								}));
        }) );
	});

					
}


/* Range Inputs and Selects */
function UpdateSelectValue() { // Handles Blurring
		setTimeout(
		(function() { document.querySelector(' .cpe-dropdown.cpe-select:focus-within').blur(); 	document.querySelector('.focus-overlay').focus(); } )
	,0)
}


function UpdateRange() {
	var ranges = document.querySelectorAll('input[type="range"]');
	ranges.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.value) - x.getAttribute('min') ) * 100) / (x.getAttribute('max') - x.getAttribute('min')) ) + '%'  );
	});

	var progresses = document.querySelectorAll('progress');
	progresses.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.getAttribute('value')) - 0 ) * 100) / (x.getAttribute('max') - 0) ) + '%'  );
	});

}

function UpdateRangeInputs() {
	UpdateRange();

	var ranges2 = document.querySelectorAll('input[type="range"]');
	ranges2.forEach(function(x) {
		x.addEventListener("input", function(e) { UpdateRange(); });
	});

}

/* Enable New Global Navigation - No exception for now */
(function () {
//	UpdateRangeInputs();
	DropDownUpdate();

	/* DITTO */
	document.querySelector("body").addEventListener("mouseenter", ( function(e) { CheckTheme(); } ) );
	document.querySelector("body").addEventListener("mouseleave", ( function(e) { DropDownUpdate(); CheckTheme(); } ) );
	

	/* END DITTO */


})();


/* Banners */
function RemoveBanner() {
		var banner= document.querySelector('#floatingbanner .cpe-banner-notification:focus-within');
		banner.classList.add("is-transparent")
		setTimeout(
		(function () {
			banner.remove();			
			if (!(document.querySelectorAll("#floatingbanner .cpe-banner-notification").length)) {
				document.querySelector('#floatingbanner').remove();
			}
			document.querySelector('.focus-overlay').focus();
		}),405);
	

}

function RemoveBanners() {
	var banners = document.querySelectorAll('#floatingbanner .cpe-banner-notification');
	banners.forEach(function(banner) {
		banner.classList.add("is-transparent")
		setTimeout(
		(function () {
			banner.remove();			
			if (!(document.querySelectorAll("#floatingbanner .cpe-banner-notification").length)) {
				document.querySelector('#floatingbanner').remove();
			}
			document.querySelector('.focus-overlay').focus();
		}),405);

	});

}

function AddFloatingBanner(content='Sample Content',kind='message',extraclass='') {
	if (kind === 'alert') {
		var icon = 'report'
	} else if (kind === 'pause') {
		var icon = 'pause'
	} else if (kind === 'warning') {
		var icon = 'report_problem'
	} else if (kind === 'success') {
		var icon = 'done'
	} else if (kind === 'progress') {
		var icon = 'pending'
	} else {
		var icon = 'info'
	}
	var nogap = false;
	if (!(document.querySelector(".top-gap #floatingbanner"))) {
		var nogap = true;
		document.querySelector(".top-gap").insertAdjacentHTML('afterbegin', 
			  '<div class="cpe-banner-notification__container" id="floatingbanner" style="pointer-events:none;">' +
			  '<div style="display:flex; flex-flow:column;"><button style="pointer-events:auto; align-self:flex-end; margin-right:8.5px;" class="cpe-button" onclick="RemoveBanners()">Clear all</button></div>' +
			  '\n<div class="banners" style="pointer-events:auto;"></div></div>'
		);
	}

	document.querySelector(".top-gap #floatingbanner .banners").insertAdjacentHTML('beforeend', 
			'<div class=" cpe-banner-notification is-' + kind + '" id="' + extraclass  + '">' +
			  '<div class="cpe-banner-notification__icon">' +
				'<span class="cpe-icon cpe-icon-small material-icons">' +
					icon + 
				'</span>' +
			  '</div>' +
			  '<span class="cpe-banner-notification__text">' + content + '</span>' +
			  '<span tabindex="-1" onclick="RemoveBanner()" class="cpe-banner-notification__close">' +
				'<span class="cpe-icon cpe-icon-tiny cpe-icon-large material-icons">close</span>' +
			  '</span>' +
			'</div>' 
	);
	


}

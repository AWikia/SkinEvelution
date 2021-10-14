(function () {
    var config = mw.config.get('wgEvelution');

    if ( (config.Designer === false) || ($("#footer-icons img[alt='Miraheze Wiki Hosting']").length) ) { // Don't run with disabled designer or on Miraheze Wikis
	$(".link.theme-designer").remove();
		return
    }


  const mwConfig2 = mw.config.get([
    "wgNamespaceNumber",
    "wgTitle",
    "wgCanonicalSpecialPageName",
    "wgArticlePath"
  ]);

if (mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgCanonicalSpecialPageName === "Specialpages") {
	$("#mw-specialpagesgroup-other + .mw-specialpages-list ul").append('<li><a href="' + mwConfig2.wgArticlePath.replace("$1", 'Special:CPEThemeDesigner') + '" title="CPE Theme Designer">' + mw.msg( 'evelution-designer-title' ) + '</a></li>')
}


if (($("body.page-CPE_ThemeDesigner").length) ||
	(mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgTitle === "CPEThemeDesigner") ) {

	$.when( mw.loader.using( [ 'mediawiki.jqueryMsg' ] ), $.ready ).then( function() {
	InitDesigner();
    } );
}



})();

function InitDesigner() {
	$("body").attr("testing", "false");
	// Change Title
	$(".evelution-page-header .evelution-title > span").html( mw.msg( 'evelution-designer-title' ) );
	$(".link[designer-on]").addClass( 'active' );
	// Remove the following things
	$(".cpe-button-group.views, .cpe-button-group.actions, #catlinks, .td-off, .evelution-floating-actions .cpe-floating-button.edit, .evelution-floating-actions .cpe-floating-button.history").remove();
	// Put new buttons
	$(".evelution-page-header-contribution-buttons").append(
		'<div class="designer-buttons cpe-button-group"></div>' +
		'<div class="designer-buttons2 cpe-button-group"></div>'
	);
	// Copy theme
	$(".evelution-page-header-contribution-buttons .designer-buttons").append(
		'<button class="cpe-button theme-copy-button">' +
		'<span class="cpe-icon cpe-icon-small material-icons">' +
		'content_copy' +
		'</span>' +
		'<span>' +
		mw.msg( 'evelution-designer-copy' ) +
		'</span>' +
		'</button>'
	);
	$(".evelution-page-header-contribution-buttons .designer-buttons .theme-copy-button").click( function(e) { e.preventDefault; CopyTheme();  });
	// Paste theme
	$(".evelution-page-header-contribution-buttons .designer-buttons").append(
		'<button class="cpe-button theme-paste-button">' +
		'<span class="cpe-icon cpe-icon-small material-icons">' +
		'content_paste' +
		'</span>' +
		'<span>' +
		mw.msg( 'evelution-designer-paste' ) +
		'</span>' +
		'</button>'
	);
	$(".evelution-page-header-contribution-buttons .designer-buttons .theme-paste-button").click( function(e) { e.preventDefault; PasteTheme();  });
	// Applly theme
	$(".evelution-page-header-contribution-buttons .designer-buttons2").append(
		'<button class="cpe-button theme-apply-button">' +
		'<span class="cpe-icon cpe-icon-small material-icons">' +
		'verified' +
		'</span>' +
		'<span>' +
		mw.msg( 'evelution-designer-apply' ) +
		'</span>' +
		'</button>'
	);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-apply-button").click( function(e) { e.preventDefault; ApplyTheme();  });
	
	$(".evelution-page-header-contribution-buttons .designer-buttons2").append(
		'<button class="cpe-button theme-test-button">' +
		'<span class="cpe-icon cpe-icon-small material-icons">' +
		'build' +
		'</span>' +
		'<span>' +
		mw.msg( 'evelution-designer-test' ) +
		'</span>' +
		'</button>'
	);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-test-button").click( function(e) { e.preventDefault; TestTheme();  });
	$(".evelution-page-header-contribution-buttons .designer-buttons2").append(
		'<button class="cpe-button theme-clear-button">' +
		'<span class="cpe-icon cpe-icon-small material-icons">' +
		'undo' +
		'</span>' +
		'<span>' +
		mw.msg( 'evelution-designer-clear' ) +
		'</span>' +
		'</button>'
	);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").click( function(e) { e.preventDefault; ClearTheme();  }).prop('disabled', true);

	// Clear out content area
	$("#mw-content-text").empty().addClass('cpe-theme-designer').attr('style','overflow:visible');
	$("#mw-content-text").append(
		'<div style="margin-bottom:10px;">' + mw.message( 'evelution-designer-notice' ).text() + '</div>' +
		'<div class="cpe-is-hidden" style="display:none;">' +
		// Body Background Color
			'<datalist id="bodybg_colors">' + // community-background-color
				'<option value="#ffc995">' +
				'<option value="#ad6140">' +
			'</datalist>' +
			'<datalist id="bodybg2_colors">' + // community-header-text-background-color
				'<option value="#1b2a34">' +
				'<option value="#f4f4f4">' +
			'</datalist>' +
			'<datalist id="headercolor_colors">' + // sticky-header-backgrouund-color
				'<option value="#0a1327">' +
				'<option value="#f58624">' +
				'<option value="#543324">' +
				'<option value="#eeeeee">' +
				'<option value="#c27f53">' +
			'</datalist>' +
			'<datalist id="pagebg_colors">' + // page-background-color
				'<option value="#ffffff">' +
				'<option value="#f4f4f4">' +
				'<option value="#767676">' +
				'<option value="#646464">' +
				'<option value="#000000">' +
				'<option value="#ffff80">' +
				'<option value="#fc97ac">' +
			'</datalist>' +
			'<datalist id="pagebg3_colors">' + // page-text-background-color
				'<option value="#1b2a34">' +
				'<option value="#f4f4f4">' +
			'</datalist>' +
			'<datalist id="pagebg2_colors">' +  // page-border-background-color
				'<option value="#d0d0d0">' +
				'<option value="#646464">' +
				'<option value="#eeeeee">' +
			'</datalist>' +
			'<datalist id="anchorcolor_colors">' + // anchor-background-color
				'<option value="#1e5aa8">' +
				'<option value="#00aaa4">' +
				'<option value="#d3359d">' +
				'<option value="#9dc3f7">' +
				'<option value="#ffff80">' +
				'<option value="#fc97ac">' +
			'</datalist>' +
			'<datalist id="accentcolor_colors">' + // accent-background-color
				'<option value="#9dc3f7">' +
				'<option value="#1e5aa8">' +
				'<option value="#68c3e2">' +
				'<option value="#1b2a34">' +
				'<option value="#aee9ef">' +
				'<option value="#fac80a">' +
				'<option value="#ffffff">' +
				'<option value="#b40000">' +
				'<option value="#ff6d77">' +
				'<option value="#c27f53">' +
			'</datalist>' +
			'<datalist id="caretcolor_colors">' + // caret-color
				'<option value="#237841">' +
				'<option value="#afbed6">' +
			'</datalist>' +
		'</div>' +
		'<table class="wikitable" style="max-width:300px; font-size:14px; margin:0 auto;">' +
			'<tr>' +
				'<th colspan="2">' + mw.msg( 'evelution-designer-body' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffc995" id="bodybg" list="bodybg_colors" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-text-color' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="checkbox" name="auto1" id="auto1">' + '<label for="auto1">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1b2a34" id="bodybg2" list="bodybg2_colors" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="url" id="bodyimage" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="URL" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-opacity' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="bodyimageopacity" value="100" min="0" max="100" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-mode' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_mode cpe-dropdown__toggle" style="width:130px; min-width:130px;">' +
							'<span class="cpe-select__value" value="standard">Standard</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="standard"><a>Standard</a></li>' +
								'<li value="full"><a>Full</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-alignment' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align cpe-dropdown__toggle" style="width:130px; min-width:130px;">' +
							'<span class="cpe-select__value" value="center">Middle</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="top"><a>Top</a></li>' +
								'<li value="center"><a>Middle</a></li>' +
								'<li value="bottom"><a>Bottom</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-alignment2' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align2 cpe-dropdown__toggle" style="width:130px; min-width:130px;">' +
							'<span class="cpe-select__value" value="center">Middle</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="left"><a>Left</a></li>' +
								'<li value="center"><a>Middle</a></li>' +
								'<li value="right"><a>Right</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-size' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_size cpe-dropdown__toggle" style="width:130px; min-width:130px;">' +
							'<span class="cpe-select__value" value="cover">Cover</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="cover"><a>Cover</a></li>' +
								'<li value="contain"><a>Contain</a></li>' +
								'<li value="stretched"><a>Stretched</a></li>' +
								'<li value="full"><a>Full</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +

		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-tiling' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<div><span styke="vertical-align:middle">X:</span> <input type="checkbox" name="tiling" id="tilingH" checked></div>' +
					'<div><span styke="vertical-align:middle">Y:</span> <input type="checkbox" name="tiling" id="tilingV" checked></div>' +
				'</td>' +
			'</tr>' +


			'<tr>' +
				'<th colspan="2">' + mw.msg( 'nstab-main' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg" list="pagebg_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-text' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto3" id="auto3">' + '<label for="auto3">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1b2a34" id="pagebg3" list="pagebg3_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-border' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto2" id="auto2">' + '<label for="auto2">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color"  class="cpe-button is-square" style="width:68px;" value="#d0d0d0" id="pagebg2" list="pagebg2_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-anchor' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1e5aa8" id="anchorcolor" list="anchorcolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#9dc3f7" id="accentcolor" list="accentcolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-sticky-header' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#0a1327" id="headercolor" list="headercolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<th colspan="2">' + mw.msg( 'evelution-designer-other' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-caret' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto5" id="auto5">' + '<label for="auto5">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#237841" id="caretcolor" list="caretcolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-border-radius' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="border-radius" value="3" min="0" max="15" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-secondary-font' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="secondfont" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="Font" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="Filter" value="opacity(1)" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-hover' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter2" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="Filter" value="opacity(0.8)" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-duration' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="filter3" value="300" min="0" max="1000" step="20" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-delay' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="filter4" value="0" min="0" max="1000" step="20" />' + // Body Background 
				'</td>' +
			'</tr>' +
		'</table>' +
		'<hr>' +
		'<div class="button-testing">' +
			'<div class="cpe-button">Base Color</div>' +
			'<div class="cpe-button is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-alert-color">Alert Background Color</div>' +
			'<div class="cpe-button is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-message-color">Message Background Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-secondary">Base Color</div>' +
			'<div class="cpe-button is-secondary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-secondary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-secondary is-alert-color">Alert Background Color</div>' +
			'<div class="cpe-button is-secondary is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-secondary is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-secondary is-message-color">Message Background Color</div>' +
		'</div>' +
		'<div class="theme-code"></div>'
	);
	SelectInputs();
    var pageTitle = $("#firstheading > span").html();
    var title = mw.message( 'pagetitle' ).text();
    document.title = title.replace("$1", pageTitle)
	$("html").attr("visualcolors", "standard"); // Unset Visual Colors mode
	ColorUpdate();
}

function ApplyTheme () {
	// Copies theme to clipboard
	if (document.querySelector('.wikitable #auto1').checked) {
		var autocolor1 = 'auto';
	} else {
		var autocolor1 = $('#bodybg2').val();
	}
	if (document.querySelector('.wikitable #auto2').checked) {
		var autocolor2 = 'auto';
	} else {
		var autocolor2 = $('#pagebg2').val();
	}
	if (document.querySelector('.wikitable #auto3').checked) {
		var autocolor3 = 'auto';
	} else {
		var autocolor3 = $('#pagebg3').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#caretcolor').val();
	}
	if ( ( ( $('#bodyimage').val().startsWith('url("') ) && ( $('#bodyimage').val().endsWith('")') ) ) ||
		  ( ( $('#bodyimage').val().startsWith('url(') ) && ( $('#bodyimage').val().endsWith(')') ) ) ) {
		var image = $('#bodyimage').val();
    } else {
		var image = 'url("' + $('#bodyimage').val() + '")';
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = '""';
    } else {
		var customfont = $('#secondfont').val();
    }
		result = '\n/* Community Theme */\n' +
				 '[theme="' + $('html').attr('theme') + '"][visualcolors="standard"] {\n' + // Beginning
				 '--community-background-image:' + image + ';\n' +
				 '--community-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + ';\n' +
				 '--community-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--community-header-text-background-color:' + autocolor1  + ';\n' +
				 '--community-background-mode:' + $('.bg_mode .cpe-select__value').attr('value')  + ';\n' +
				 '--community-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--community-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--community-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--community-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--community-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--anchor-background-color:' + $('#anchorcolor').val() + ';\n' +
				 '--page-background-color:' + $('#pagebg').val() + ';\n' +
				 '--page-border-background-color:' + autocolor2  + ';\n' +
				 '--page-text-background-color:' + autocolor3  + ';\n' +
				 '--accent-background-color:' + $('#accentcolor').val() + ';\n' +
				 '--sticky-header-background-color:' + $('#headercolor').val() + ';\n' +
				 '--caret-color:' + autocolor5  + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--logo-filter:' + $('#filter').val() + ';\n' +
				 '--logo-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--logo-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--logo-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '}\n' // Ending

/*
	edit.js

	MediaWiki API Demos
	Demo of `Edit` module: POST request to edit a page

	MIT License
*/

var params = {
		action: 'edit',
		title: 'MediaWiki:Evelution.css',
		appendtext: result,
		minor: 'true',
		bot: 'true',
		summary: 'Inserting Evelution Theme ' +  $('html').attr('theme'),
		recreate: 'true',
		format: 'json'
	},
	api = new mw.Api();

api.postWithToken( 'csrf', params ).done( function ( data ) { AddFloatingBanner('Succesfully applied Theme '  +  $('html').attr('theme') + ' to MediaWiki:Evelution.css.','success'); } ).fail( function (data) { AddFloatingBanner('Failed to apply Theme '  +  $('html').attr('theme') + ' to MediaWiki:Evelution.css as page couldn\'t be edited.','alert'); } );

}

function CopyTheme() {
	// Copies theme to clipboard
	if (document.querySelector('.wikitable #auto1').checked) {
		var autocolor1 = 'auto';
	} else {
		var autocolor1 = $('#bodybg2').val();
	}
	if (document.querySelector('.wikitable #auto2').checked) {
		var autocolor2 = 'auto';
	} else {
		var autocolor2 = $('#pagebg2').val();
	}
	if (document.querySelector('.wikitable #auto3').checked) {
		var autocolor3 = 'auto';
	} else {
		var autocolor3 = $('#pagebg3').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#caretcolor').val();
	}
	if ( ( ( $('#bodyimage').val().startsWith('url("') ) && ( $('#bodyimage').val().endsWith('")') ) ) ||
		  ( ( $('#bodyimage').val().startsWith('url(') ) && ( $('#bodyimage').val().endsWith(')') ) ) ) {
		var image = $('#bodyimage').val();
    } else {
		var image = 'url("' + $('#bodyimage').val() + '")';
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = '""';
    } else {
		var customfont = $('#secondfont').val();
    }
		result = '[theme="' + $('html').attr('theme') + '"][visualcolors="standard"] {\n' + // Beginning
				 '--community-background-image:' + image + ';\n' +
				 '--community-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + ';\n' +
				 '--community-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--community-header-text-background-color:' + autocolor1  + ';\n' +
				 '--community-background-mode:' + $('.bg_mode .cpe-select__value').attr('value')  + ';\n' +
				 '--community-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--community-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--community-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--community-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--community-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--anchor-background-color:' + $('#anchorcolor').val() + ';\n' +
				 '--page-background-color:' + $('#pagebg').val() + ';\n' +
				 '--page-border-background-color:' + autocolor2  + ';\n' +
				 '--page-text-background-color:' + autocolor3  + ';\n' +
				 '--accent-background-color:' + $('#accentcolor').val() + ';\n' +
				 '--sticky-header-background-color:' + $('#headercolor').val() + ';\n' +
				 '--caret-color:' + autocolor5  + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--logo-filter:' + $('#filter').val() + ';\n' +
				 '--logo-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--logo-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--logo-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '}' // Ending
		if (navigator.clipboard) {
			navigator.clipboard.writeText(result).then(function() {
			 AddFloatingBanner('Successfully copied CPE Framework theme to Clipboard','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
			}, function() {
			 AddFloatingBanner('Failed to copy CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select it and copy that to the clipboard.','alert');
			$("div.theme-code").empty().append(
				'<h2>Code</h2>' +
				'<pre>' +
				result +
				'</pre>'
			);
			});
		} else {
			 AddFloatingBanner('Failed to copy CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select it and copy that to the clipboard.','alert');
			$("div.theme-code").empty().append(
				'<h2>Code</h2>' +
				'<pre>' +
				result +
				'</pre>'
			);
		}
}

function PasteTheme() {
	// Pastes theme
	// Body BG
	$('#bodybg').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-color") );
	// Body Header Text
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto1').checked = true;
	} else {
		document.querySelector('.wikitable #auto1').checked = false;
		$('#bodybg2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-background-color") );
	}
	$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
	// Body Image
	$('#bodyimage').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-image") );
	// Body Image Opacity
	$('#bodyimageopacity').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-image-opacity")) );
	// Body Image Mode
	bg_mode = ["Standard", "Full"][["standard", "full"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") ) ]
	$('.bg_mode .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-mode") );
	$('.bg_mode .cpe-select__value').html( bg_mode );
	// Body Image Alignment V
	bg_align = ["Top", "Middle", "Bottom"][["top", "center", "bottom"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-vertical-alignment") ) ]
	$('.bg_align .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-vertical-alignment") );
	$('.bg_align .cpe-select__value').html( bg_align );
	// Body Image Alignment H
	bg_align2 = ["Left", "Middle", "Right"][["left", "center", "right"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-horizontal-alignment") ) ]
	$('.bg_align2 .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-horizontal-alignment") );
	$('.bg_align2 .cpe-select__value').html( bg_align2 );
	// Body Image Size
	bg_size = ["Cover", "Contain", "Stretched", "Full"][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") ) ]
	$('.bg_size .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-size") )
	$('.bg_size .cpe-select__value').html( bg_size );
	// Body Image Tiling
	document.querySelector('input#tilingH').checked = (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-no-horizontal-tiling") === 'false');
	document.querySelector('input#tilingV').checked = (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-no-vertical-tiling") === 'false');
	// Page BG
	$('#pagebg').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-background-color") );
	// Page Text BG
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto3').checked = true;
	} else {
		document.querySelector('.wikitable #auto3').checked = false;
		$('#pagebg3').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-text-background-color") );
	}
	$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
	// Page Border BG
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto2').checked = true;
	} else {
		document.querySelector('.wikitable #auto2').checked = false;
		$('#pagebg2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--page-border-background-color") );
	}
	$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
	// Anchor BG
	$('#anchorcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--anchor-background-color") );
	// Accent BG
	$('#accentcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--accent-background-color") );
	// Header BG
	$('#headercolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--sticky-header-background-color") );
	// Caret Color
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--caret-color") === 'auto' ) {
		document.querySelector('.wikitable #auto5').checked = true;
	} else {
		document.querySelector('.wikitable #auto5').checked = false;
		$('#caretcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--caret-color") );
	}
	$('.wikitable #caretcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
	// Border Radius
	$('#border-radius').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--border-radius")) );
	// Secondary Font
	var sfont = getComputedStyle(document.querySelector('html')).getPropertyValue("--custom-secondary-font");
	if (sfont == '""') {
		var sfont = '';
	}
	$('#secondfont').val( sfont );
	// Filter
	$('#filter').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter") );
	// Filter (Hover)
	$('#filter2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter-hover") );
	// Filter Duration
	$('#filter3').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter-duration")) );
	// Filter Delay
	$('#filter4').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter-delay")) );
	UpdateRangeInputs();
}

function TestTheme() {
	// Tests theme
	$("body").attr("testing", "true");
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', false);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-test-button").prop('disabled', true);
	if (document.querySelector('.wikitable #auto1').checked) {
		var autocolor1 = 'auto';
	} else {
		var autocolor1 = $('#bodybg2').val();
	}
	if (document.querySelector('.wikitable #auto2').checked) {
		var autocolor2 = 'auto';
	} else {
		var autocolor2 = $('#pagebg2').val();
	}
	if (document.querySelector('.wikitable #auto3').checked) {
		var autocolor3 = 'auto';
	} else {
		var autocolor3 = $('#pagebg3').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#caretcolor').val();
	}
	if ( ( ( $('#bodyimage').val().startsWith('url("') ) && ( $('#bodyimage').val().endsWith('")') ) ) ||
		  ( ( $('#bodyimage').val().startsWith('url(') ) && ( $('#bodyimage').val().endsWith(')') ) ) ) {
		var image = $('#bodyimage').val();
    } else {
		var image = 'url("' + $('#bodyimage').val() + '")';
    }
	document.querySelector('html').style.setProperty("--community-background-color", $('#bodybg').val() );
	document.querySelector('html').style.setProperty("--community-background-image", image );
	document.querySelector('html').style.setProperty("--community-background-image-opacity", $('#bodyimageopacity').val() + "%" );
	document.querySelector('html').style.setProperty("--community-background-mode", $('.bg_mode .cpe-select__value').attr('value') );
	document.querySelector('html').style.setProperty("--community-background-vertical-alignment", $('.bg_align .cpe-select__value').attr('value') );
	document.querySelector('html').style.setProperty("--community-background-horizontal-alignment", $('.bg_align2 .cpe-select__value').attr('value') );
	document.querySelector('html').style.setProperty("--community-background-size", $('.bg_size .cpe-select__value').attr('value') );
	document.querySelector('html').style.setProperty("--community-background-no-horizontal-tiling", (!( document.querySelector('input#tilingH').checked )) );
	document.querySelector('html').style.setProperty("--community-background-no-vertical-tiling", (!( document.querySelector('input#tilingV').checked )) );
	document.querySelector('html').style.setProperty("--community-header-text-background-color", autocolor1 );
	document.querySelector('html').style.setProperty("--page-background-color", $('#pagebg').val() );
	document.querySelector('html').style.setProperty("--page-border-background-color", autocolor2 );
	document.querySelector('html').style.setProperty("--page-text-background-color", autocolor3 );
	document.querySelector('html').style.setProperty("--anchor-background-color", $('#anchorcolor').val() );
	document.querySelector('html').style.setProperty("--accent-background-color", $('#accentcolor').val() );
	document.querySelector('html').style.setProperty("--sticky-header-background-color", $('#headercolor').val() );
	document.querySelector('html').style.setProperty("--caret-color", autocolor5 );
	document.querySelector('html').style.setProperty("--border-radius", $('#border-radius').val() + "px" );
	document.querySelector('html').style.setProperty("--custom-secondary-font", $('#secondfont').val() );
	document.querySelector('html').style.setProperty("--logo-filter", $('#filter').val() );
	document.querySelector('html').style.setProperty("--logo-filter-hover", $('#filter2').val() );
	document.querySelector('html').style.setProperty("--logo-filter-duration", $('#filter3').val() + "ms" );
	document.querySelector('html').style.setProperty("--logo-filter-delay", $('#filter4').val() + "ms" );
	ColorUpdate(true,true);
}

function TestDynamicTheme() {
	if ($("body").attr("testing") === "true" ) {
		TestTheme();
	}
}


function ClearTheme() {
	$("body").attr("testing", "false");
	// Tests theme
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', true);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-test-button").prop('disabled', false);
	document.querySelector('html').style.removeProperty("--community-background-color");
	document.querySelector('html').style.removeProperty("--community-background-image");
	document.querySelector('html').style.removeProperty("--community-background-image-opacity");
	document.querySelector('html').style.removeProperty("--community-background-mode");
	document.querySelector('html').style.removeProperty("--community-background-vertical-alignment");
	document.querySelector('html').style.removeProperty("--community-background-horizontal-alignment");
	document.querySelector('html').style.removeProperty("--community-background-size");
	document.querySelector('html').style.removeProperty("--community-background-no-horizontal-tiling");
	document.querySelector('html').style.removeProperty("--community-background-no-vertical-tiling");
	document.querySelector('html').style.removeProperty("--community-header-text-background-color");
	document.querySelector('html').style.removeProperty("--page-background-color");
	document.querySelector('html').style.removeProperty("--page-border-background-color");
	document.querySelector('html').style.removeProperty("--page-text-background-color");
	document.querySelector('html').style.removeProperty("--anchor-background-color");
	document.querySelector('html').style.removeProperty("--accent-background-color");
	document.querySelector('html').style.removeProperty("--sticky-header-background-color");
	document.querySelector('html').style.removeProperty("--caret-color");
	document.querySelector('html').style.removeProperty("--border-radius");
	document.querySelector('html').style.removeProperty("--custom-secondary-font");
	document.querySelector('html').style.removeProperty("--logo-filter");
	document.querySelector('html').style.removeProperty("--logo-filter-hover");
	document.querySelector('html').style.removeProperty("--logo-filter-duration");
	document.querySelector('html').style.removeProperty("--logo-filter-delay");
	ColorUpdate(true,true);

}

function SelectInputs() {
/* Select Inputs */
$('.wikitable #tilingV').click(
							function(e) {
								e.preventDefault
								TestDynamicTheme();
							}   
						);
$('.wikitable #tilingH').click(
							function(e) {
								e.preventDefault
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto1').click(
							function(e) {
								e.preventDefault
								$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto2').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto3').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto5').click(
							function(e) {
								e.preventDefault
								$('.wikitable #caretcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
								TestDynamicTheme();
							}   
						);
// UpdateRangeInputs();
	$('input[type="range"]').css( "--range-percent", function( ) {
		return (($(this).val() * 100) / $(this).attr('max')) + '%';
	});
	$("input[type='range']").on("input", function(e) { UpdateRange(); } ).change( function(e) { TestDynamicTheme(); } ); // Change
	$("input[type='color']").change( function(e) { TestDynamicTheme(); } ); // Change
	$("input.designer-text").change( function(e) { TestDynamicTheme(); } ); // Change

/* Select Inputs */
$(' .cpe-dropdown.cpe-select .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2)')
.click(function(e) {
						e.preventDefault();
						var value = $(this).attr("value");
						$(' .cpe-dropdown.cpe-select')
						.click(function() {
									var content = $('.cpe-select:focus-within .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2):hover > a').html();
									$('.cpe-select:focus-within .cpe-select__value').attr("value", value);
									$('.cpe-select:focus-within .cpe-select__value').html(content);
									TestDynamicTheme(); // Change
									$(this).blur();
									$(' .cpe-dropdown.cpe-select').off( "click" );
								});
        });
					


}
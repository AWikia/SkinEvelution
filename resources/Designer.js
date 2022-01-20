(function () {
    if ( ($("#footer-icons img[alt='Miraheze Wiki Hosting']").length) || ($("#footer-icons img[alt='Hosted by Miraheze']").length) ) { // Don't run with disabled designer or on Miraheze Wikis
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
	// Change Title
	$(".evelution-page-header .evelution-title > span").html( mw.msg( 'evelution-designer-title' ) );
	$(".link[designer-on]").addClass( 'active' );
	// Remove the following things
	$(".evelution-page-header-contribution, #catlinks, .td-off, .evelution-floating-actions .cpe-floating-button.edit, .evelution-floating-actions .cpe-floating-button.history").remove();
	// Put new buttons
	$(".evelution-page-header-contribution-buttons").append(
		'<div class="designer-buttons cpe-button-group"></div>' +
		'<div class="designer-buttons2 cpe-button-group"></div>'
	);
	// Copy theme
	$(".evelution-page-header-contribution-buttons .designer-buttons").append(
		'<button class="cpe-button is-tertiary theme-copy-button">' +
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
		'<button class="cpe-button is-tertiary theme-paste-button">' +
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
		'<button class="cpe-button is-tertiary theme-apply-button">' +
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
		'<button class="cpe-button is-tertiary theme-test-button">' +
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
		'<button class="cpe-button is-tertiary theme-clear-button">' +
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
		'<style class="theme-designer-css"></style>' +
		'<div style="margin-bottom:10px;">' + mw.message( 'evelution-designer-notice' ).text() + '</div>' +
		'<div class="cpe-is-hidden" style="display:none;">' +
		// Body Background Color
			'<datalist id="td_colors">' + // community-background-color (27)
				'<option value="#EED9C4">' +
				'<option value="#C88A65">' +
				'<option value="#FDD5B1">' +
				'<option value="#95E0E8">' +
				'<option value="#7BA05B">' +
				'<option value="#FBE7B2">' +
				'<option value="#926F5B">' +
				'<option value="#FE6F5E">' +
				'<option value="#000000">' +
				'<option value="#2EB4E6">' +
				'<option value="#4570E6">' +
				'<option value="#0066FF">' +
				'<option value="#9999CC">' +
				'<option value="#C8C8CD">' +
				'<option value="#0095B7">' +
				'<option value="#6456B7">' +
				'<option value="#3C69E7">' +
				'<option value="#DB5079">' +
				'<option value="#C62D42">' +
				'<option value="#E667CE">' +
				'<option value="#AF593E">' +
				'<option value="#FF7034">' +
				'<option value="#E97451">' +
				'<option value="#805533">' +
				'<option value="#A9B2C3">' +
				'<option value="#FFFF99">' +
				'<option value="#00CC99">' +
				'<option value="#E62E6B">' +
				'<option value="#FFA6C9">' +
				'<option value="#7070CC">' +
				'<option value="#DA3287">' +
				'<option value="#02A4D3">' +
				'<option value="#339ACC">' +
				'<option value="#736A62">' +
				'<option value="#B94E48">' +
				'<option value="#8C90C8">' +
				'<option value="#DDEBEC">' +
				'<option value="#DA8A67">' +
				'<option value="#93CCEA">' +
				'<option value="#FFB7D5">' +
				'<option value="#F1D651">' +
				'<option value="#FED85D">' +
				'<option value="#B33B24">' +
				'<option value="#1560BD">' +
				'<option value="#EDC9AF">' +
				'<option value="#614051">' +
				'<option value="#CC474B">' +
				'<option value="#63B76C">' +
				'<option value="#5FA777">' +
				'<option value="#C154C1">' +
				'<option value="#87421F">' +
				'<option value="#92926E">' +
				'<option value="#E6BE8A">' +
				'<option value="#FCD667">' +
				'<option value="#9DE093">' +
				'<option value="#8B8680">' +
				'<option value="#01A638">' +
				'<option value="#2887C8">' +
				'<option value="#F1E788">' +
				'<option value="#AFE313">' +
				'<option value="#4F69C6">' +
				'<option value="#A50B5E">' +
				'<option value="#29AB87">' +
				'<option value="#BF8FCC">' +
				'<option value="#FBAED2">' +
				'<option value="#FFFF9F">' +
				'<option value="#8FD8D8">' +
				'<option value="#BEE64B">' +
				'<option value="#e6735c">' +
				'<option value="#FFB97B">' +
				'<option value="#CC3336">' +
				'<option value="#F653A6">' +
				'<option value="#CA3435">' +
				'<option value="#F2C649">' +
				'<option value="#8D90A1">' +
				'<option value="#E77200">' +
				'<option value="#C32148">' +
				'<option value="#F091A9">' +
				'<option value="#47ABCC">' +
				'<option value="#30BFBF">' +
				'<option value="#ACACE6">' +
				'<option value="#5E8C31">' +
				'<option value="#D9E650">' +
				'<option value="#733380">' +
				'<option value="#D92121">' +
				'<option value="#A63A79">' +
				'<option value="#FAFA37">' +
				'<option value="#F2BA49">' +
				'<option value="#6CA67C">' +
				'<option value="#D96CBE">' +
				'<option value="#8F47B3">' +
				'<option value="#FEBAAD">' +
				'<option value="#7ED4E6">' +
				'<option value="#8DD9CC">' +
				'<option value="#8B72BE">' +
				'<option value="#4D8C57">' +
				'<option value="#ACBF60">' +
				'<option value="#D982B5">' +
				'<option value="#E58E73">' +
				'<option value="#A55353">' +
				'<option value="#FFEB00">' +
				'<option value="#ECAC76">' +
				'<option value="#003366">' +
				'<option value="#1AB385">' +
				'<option value="#C8509B">' +
				'<option value="#0066CC">' +
				'<option value="#D9DAD2">' +
				'<option value="#B5B35C">' +
				'<option value="#FF8833">' +
				'<option value="#FF5349">' +
				'<option value="#F8D568">' +
				'<option value="#E29CD2">' +
				'<option value="#2D383A">' +
				'<option value="#009DC4">' +
				'<option value="#FFCBA4">' +
				'<option value="#C3CDE6">' +
				'<option value="#E12C2C">' +
				'<option value="#FDD7E4">' +
				'<option value="#01786F">' +
				'<option value="#FC74FD">' +
				'<option value="#F7A38E">' +
				'<option value="#8E3179">' +
				'<option value="#C0D5F0">' +
				'<option value="#652DC1">' +
				'<option value="#D6AEDD">' +
				'<option value="#D27D46">' +
				'<option value="#E6BC5C">' +
				'<option value="#665233">' +
				'<option value="#E30B5C">' +
				'<option value="#ED0A3F">' +
				'<option value="#FF681F">' +
				'<option value="#BB3385">' +
				'<option value="#00CCCC">' +
				'<option value="#6B3FA0">' +
				'<option value="#FF91A4">' +
				'<option value="#FD0E35">' +
				'<option value="#93DFB8">' +
				'<option value="#9E5B40">' +
				'<option value="#837050">' +
				'<option value="#33CC99">' +
				'<option value="#C9C0BB">' +
				'<option value="#76D7EA">' +
				'<option value="#ECEBBD">' +
				'<option value="#FE4C40">' +
				'<option value="#FA9D5A">' +
				'<option value="#008080">' +
				'<option value="#D8BFD8">' +
				'<option value="#FC80A5">' +
				'<option value="#D9D6CF">' +
				'<option value="#00755E">' +
				'<option value="#DEA681">' +
				'<option value="#6CDAE7">' +
				'<option value="#3F26BF">' +
				'<option value="#664228">' +
				'<option value="#CC553D">' +
				'<option value="#732E6C">' +
				'<option value="#8359A3">' +
				'<option value="#766EC8">' +
				'<option value="#F7468A">' +
				'<option value="#FF9980">' +
				'<option value="#803790">' +
				'<option value="#FFFFFF">' +
				'<option value="#7A89B8">' +
				'<option value="#FF3399">' +
				'<option value="#C9A0DC">' +
				'<option value="#FBE870">' +
				'<option value="#C5E17A">' +
				'<option value="#FFAE42">' +

			'</datalist>' +
			'<datalist id="td_fonts">' + // Fonts
				'<option value="Exo 2">' +
				'<option value="Work Sans">' +
				'<option value="Lora">' +
				'<option value="Roboto Slab">' +
				'<option value="BioRhyme">' +
				'<option value="Inknut Antiqua">' +
			'</datalist>' +
			'<datalist id="td_imageopacity">' + // Image Opacity
				'<option value="0" label="0%">' +
				'<option value="25">' +
				'<option value="50" label="50%">' +
				'<option value="75">' +
				'<option value="100" label="100%">' +
			'</datalist>' +
			'<datalist id="td_aopacity">' + // Image Opacity
				'<option value="0.4" label="40%">' +
				'<option value="0.6" label="60%">' +
				'<option value="0.8" label="80%">' +
			'</datalist>' +
			'<datalist id="td_filterdur">' + // Image Opacity
				'<option value="0">' +
				'<option value="300">' +
				'<option value="600" >' +
				'<option value="1000" >' +
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
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffcba4" id="bodybg" list="td_colors" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-text-color' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="checkbox" name="auto1" id="auto1">' + '<label for="auto1">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="bodybg2" list="td_colors" />' + // Body Background 
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
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="bodyimageopacity" value="100" min="0" max="100" list="td_imageopacity" autocomplete="off" />' + // Body Background 
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
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-text' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto3" id="auto3">' + '<label for="auto3">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-border' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto2" id="auto2">' + '<label for="auto2">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color"  class="cpe-button is-square" style="width:68px;" value="#c8c8cd" id="pagebg2" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-saccent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1e5aa8" id="saccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#93cceA" id="accentcolor" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-taccent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto5" id="auto5">' + '<label for="auto5">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#00755e" id="taccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-qaccent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto4" id="auto4">' + '<label for="auto4">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#01786f" id="qaccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +

			'<tr>' +
				'<th colspan="2">' + mw.msg( 'evelution-designer-other' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-border-radius' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="border-radius" value="3" min="0" max="15" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-font' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="firstfont" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="Font" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-secondary-font' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="secondfont" class="cpe-input designer-text" style="width:130px; min-width:130px;" placeholder="Font" list="td_fonts" autocomplete="off" />' + // Body Background 
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
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="filter3" value="300" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-delay' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="filter4" value="0" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off"  />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-acryllic-opacity' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:130px; min-width:130px;" id="aopacity" value="0.6" min="0.4" max="0.8" step="0.01" list="td_aopacity" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +

		'</table>' +
		'<hr>' +

/**/
'<div class="preview-window-desk">' +
	'	<div class="gradient-overlay" style="position:absolute; pointer-events:none;"></div>' +
	'	<div class="invertion-on" style=" pointer-events: none; position: absolute; z-index: -2; width: 100%; height: 100%;"><div class="body-background fandom-community-header__background" style="position:absolute; pointer-events:none;" id="body-background"></div></div>' +
	'	<div class="body-background-color" style="position:absolute; pointer-events:none;"></div>' +
	'<div class="preview-window-window" force-active>' +
		'<h2>' +
			'<span>Active Window #1</span>' +
			'<button class="minimize" title="Minimize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'remove' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-medium close">' +
					'check_box_outline_blank' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Content' +
		'</section>' +
	'</div>' +

	'<div class="preview-window-window" force-active>' +
		'<h2>' +
			'<span>Active Window #2</span>' +
			'<button class="minimize" title="Minimize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'remove' +
                '</span>' +
			'</button>' +
			'<button class="maximize title="Restore">' +
				'<span style="transform:scaleX(calc(var(--icon-scale) * -1)) scaleY(var(--icon-scale)) rotate(var(--icon-rotate))" class="material-icons cpe-icon cpe-icon-tiny cpe-icon-medium close">' +
					'content_copy' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Maximized Content' +
			'<br>' +
			'I\'m Multiline' +
		'</section>' +
	'</div>' +

	'<div class="preview-window-window" force-active>' +
		'<h2>' +
			'<span>Active Window #3</span>' +
			'<button class="minimize" title="Minimize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'remove' +
                '</span>' +
			'</button>' +
			'<button class="fullscreen" title="Enter Fullscreen">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'fullscreen' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-medium close">' +
					'check_box_outline_blank' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Content ready for fullscreen' +
			'<br>' +
			'I\'m a Static Window' +
		'</section>' +
	'</div>' +

	'<div class="preview-window-window" force-active>' +
		'<h2>' +
			'<span>Active Window #4</span>' +
			'<button class="minimize" title="Minimize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'remove' +
                '</span>' +
			'</button>' +
			'<button class="fullscreen" title="Exit Fullscreen">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'fullscreen_exit' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Content ready for fullscreen' +
			'<br>' +
			'I\'m a Static Window' +
		'</section>' +
	'</div>' +

	'<div class="preview-window-window" force-active>' +
		'<h2>' +
			'<span>Active Window #5</span>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Message' +
			'<div style="width:100%; display:flex; justify-content:center;">' +
				'<button class="ui-button cpe-button">OK</button>' +
			'</div>' +
		'</section>' +
	'</div>' +

	'<div class="preview-window-window inactive" force-inactive>' +
		'<h2>' +
			'<span>Inactive Window</span>' +
			'<button class="minimize" title="Minimize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'remove' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-medium close">' +
					'check_box_outline_blank' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-large close">' +
					'close' +
                '</span>' +
			'</button>' +
		'</h2>' +
		'<section>' +
			'Sample Content' +
		'</section>' +
	'</div>' +
	
'</div>' +
/**/
		'<hr>' +
		'<div style="margin:0 auto;">' +
			'<div class="preview-theme-wrapper custom-theme" force-active style="margin:0 auto; background-color:var(--canvas-secondary-background-color);">' +
				'<div class="background"></div>' +
				'<div class="window">' +
					'<div class="header">' +
						'<text></text>' +
					'</div>' +
					'<div class="content">' +
						'<text></text>' +
					'</div>' +
				'</div>' +
				'<span class="name">Custom Theme</span>' +
			'</div>' +
		'</div>' +
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
			'<hr>' +
			'<div class="cpe-button is-tertiary">Base Color</div>' +
			'<div class="cpe-button is-tertiary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-tertiary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-tertiary is-alert-color">Alert Background Color</div>' +
			'<div class="cpe-button is-tertiary is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-tertiary is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-tertiary is-message-color">Message Background Color</div>' +
		'</div>' +
		'<div class="theme-code"></div>'
	);
	SelectInputs();
    var pageTitle = $("#firstheading > span").html();
    var title = mw.message( 'pagetitle' ).text();
    document.title = title.replace("$1", pageTitle);
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
	if (document.querySelector('.wikitable #auto4').checked) {
		var autocolor4 = 'auto';
	} else {
		var autocolor4 = $('#qaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#taccentcolor').val();
	}
	if ( ( ( $("#bodyimage").val().startsWith('url("') ) && ( $("#bodyimage").val().endsWith('")') ) ) ||
		  ( ( $("#bodyimage").val().startsWith('url(') ) && ( $("#bodyimage").val().endsWith(')') ) ) ) {
		var image = $("#bodyimage").val();
    } else {
		var image = 'url("' + $("#bodyimage").val() + '")';
    }
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = '""';
    } else {
		var customfont2 = $('#firstfont').val();
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = '""';
    } else {
		var customfont = $('#secondfont').val();
    }
		result = '\n/* Community Theme */\n' +
				 '.theme-' + window.MW18ActiveTheme + '.visualcolors-standard {\n' + // Beginning
				 '--desktop-background-image:' + image + ';\n' +
				 '--desktop-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + ';\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-mode:' + $('.bg_mode .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--highlight-background-color:' + $('#accentcolor').val() + ';\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + ';\n' +
				 '--active-title-background-color:' + autocolor5  + ';\n' +
				 '--inactive-title-background-color:' + autocolor4  + ';\n' +
				 '--custom-font:' + customfont2 + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
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
		summary: 'Inserting Evelution Theme ' +  window.MW18ActiveTheme,
		recreate: 'true',
		format: 'json'
	},
	api = new mw.Api();

api.postWithToken( 'csrf', params ).done( function ( data ) { AddFloatingBanner('Succesfully applied Theme '  +  window.MW18ActiveTheme + ' to MediaWiki:Evelution.css.','success'); } ).fail( function (data) { AddFloatingBanner('Failed to apply Theme '  +  window.MW18ActiveTheme + ' to MediaWiki:Evelution.css as page couldn\'t be edited.','alert'); } );

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
	if (document.querySelector('.wikitable #auto4').checked) {
		var autocolor4 = 'auto';
	} else {
		var autocolor4 = $('#qaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#taccentcolor').val();
	}
	if ( ( ( $("#bodyimage").val().startsWith('url("') ) && ( $("#bodyimage").val().endsWith('")') ) ) ||
		  ( ( $("#bodyimage").val().startsWith('url(') ) && ( $("#bodyimage").val().endsWith(')') ) ) ) {
		var image = $("#bodyimage").val();
    } else {
		var image = 'url("' + $("#bodyimage").val() + '")';
    }
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = '""';
    } else {
		var customfont2 = $('#firstfont').val();
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = '""';
    } else {
		var customfont = $('#secondfont').val();
    }
		result = '.theme-' + window.MW18ActiveTheme + '.visualcolors-standard {\n' + // Beginning
				 '--desktop-background-image:' + image + ';\n' +
				 '--desktop-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + ';\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-mode:' + $('.bg_mode .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--highlight-background-color:' + $('#accentcolor').val() + ';\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + ';\n' +
				 '--active-title-background-color:' + autocolor5  + ';\n' +
				 '--inactive-title-background-color:' + autocolor4  + ';\n' +
				 '--custom-font:' + customfont2 + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
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
	$('#bodybg').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-color") );
	// Body Header Text
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto1').checked = true;
	} else {
		document.querySelector('.wikitable #auto1').checked = false;
		$('#bodybg2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-text-background-color") );
	}
	$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
	// Body Image
	$('#bodyimage').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-image") );
	// Body Image Opacity
	$('#bodyimageopacity').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-image-opacity")) );
	// Body Image Mode
	bg_mode = ["Standard", "Full"][["standard", "full"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-mode") ) ]
	$('.bg_mode .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-mode") );
	$('.bg_mode .cpe-select__value').html( bg_mode );
	// Body Image Alignment V
	bg_align = ["Top", "Middle", "Bottom"][["top", "center", "bottom"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-vertical-alignment") ) ]
	$('.bg_align .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-vertical-alignment") );
	$('.bg_align .cpe-select__value').html( bg_align );
	// Body Image Alignment H
	bg_align2 = ["Left", "Middle", "Right"][["left", "center", "right"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-horizontal-alignment") ) ]
	$('.bg_align2 .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-horizontal-alignment") );
	$('.bg_align2 .cpe-select__value').html( bg_align2 );
	// Body Image Size
	bg_size = ["Cover", "Contain", "Stretched", "Full"][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-size") ) ]
	$('.bg_size .cpe-select__value').attr('value', getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-size") )
	$('.bg_size .cpe-select__value').html( bg_size );
	// Body Image Tiling
	document.querySelector('input#tilingH').checked = (getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-no-horizontal-tiling") === 'false');
	document.querySelector('input#tilingV').checked = (getComputedStyle(document.querySelector('html')).getPropertyValue("--desktop-background-no-vertical-tiling") === 'false');
	// Page BG
	$('#pagebg').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--canvas-background-color") );
	// Page Text BG
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--canvas-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto3').checked = true;
	} else {
		document.querySelector('.wikitable #auto3').checked = false;
		$('#pagebg3').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--canvas-text-background-color") );
	}
	$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
	// Page Border BG
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--inactive-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto2').checked = true;
	} else {
		document.querySelector('.wikitable #auto2').checked = false;
		$('#pagebg2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--inactive-text-background-color") );
	}
	$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
	// Anchor BG
	$('#saccentcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--hyperlink-background-color") );
	// Accent BG
	$('#accentcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--highlight-background-color") );
	// Caret Color
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--active-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto5').checked = true;
	} else {
		document.querySelector('.wikitable #auto5').checked = false;
		$('#taccentcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--active-title-background-color") );
	}
	$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
	// Quaternary Accent Color
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--inactive-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto4').checked = true;
	} else {
		document.querySelector('.wikitable #auto4').checked = false;
		$('#qaccentcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--inactive-title-background-color") );
	}
	$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
	// Border Radius
	$('#border-radius').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--border-radius")) );
	// Primary Font
	var pfont = getComputedStyle(document.querySelector('html')).getPropertyValue("--custom-font");
	if (pfont == '""') {
		var pfont = '';
	}
	$('#firstfont').val( pfont );
	// Secondary Font
	var sfont = getComputedStyle(document.querySelector('html')).getPropertyValue("--custom-secondary-font");
	if (sfont == '""') {
		var sfont = '';
	}
	$('#secondfont').val( sfont );
	// Filter
	$('#filter').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--icon-filter") );
	// Filter (Hover)
	$('#filter2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--icon-filter-hover") );
	// Filter Duration
	$('#filter3').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--icon-filter-duration")) );
	// Filter Delay
	$('#filter4').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--icon-filter-delay")) );
	// Acryllic Opacity
	$('#aopacity').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--system-acryllic-opacity") );
	UpdateRangeInputs();
}

function TestTheme() {
	// Tests theme
	if (!($("body.td-testing-on").length)) {
		$("body").addClass('td-testing-on');
	}
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', false);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-test-button").prop('disabled', true);
	document.querySelector('body').focus();
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
	if (document.querySelector('.wikitable #auto4').checked) {
		var autocolor4 = 'auto';
	} else {
		var autocolor4 = $('#qaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto5').checked) {
		var autocolor5 = 'auto';
	} else {
		var autocolor5 = $('#taccentcolor').val();
	}
	if ( ( ( $("#bodyimage").val().startsWith('url("') ) && ( $("#bodyimage").val().endsWith('")') ) ) ||
		  ( ( $("#bodyimage").val().startsWith('url(') ) && ( $("#bodyimage").val().endsWith(')') ) ) ) {
		var image = $("#bodyimage").val();
    } else {
		var image = 'url("' + $("#bodyimage").val() + '")';
    }
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = '""';
    } else {
		var customfont2 = $('#firstfont').val();
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = '""';
    } else {
		var customfont = $('#secondfont').val();
    }
		result = ':root {\n' + // Beginning
				 '--desktop-background-image:' + image + '!important;\n' +
				 '--desktop-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + '!important;\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + '!important;\n' +
				 '--desktop-text-background-color:' + autocolor1  + '!important;\n' +
				 '--desktop-background-mode:' + $('.bg_mode .cpe-select__value').attr('value')  + '!important;\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + '!important;\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + '!important;\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + '!important;\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + '!important;\n' +
				 '--inactive-text-background-color:' + autocolor2  + '!important;\n' +
				 '--canvas-text-background-color:' + autocolor3  + '!important;\n' +
				 '--highlight-background-color:' + $('#accentcolor').val() + '!important;\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + '!important;\n' +
				 '--active-title-background-color:' + autocolor5  + '!important;\n' +
				 '--inactive-title-background-color:' + autocolor4  + '!important;\n' +
				 '--custom-font:' + customfont2 + '!important;\n' +
				 '--custom-secondary-font:' + customfont + '!important;\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + '!important;\n' +
				 '--icon-filter:' + $('#filter').val() + '!important;\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + '!important;\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + '!important;\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + '!important;\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + '!important;\n' +
				 '}' // Ending
			document.querySelector("#mw-content-text .theme-designer-css").innerHTML = result;
	ColorUpdate(true,true);
}

function TestDynamicTheme() {
	if ($("body.td-testing-on").length) {
		TestTheme();
	}
}


function ClearTheme() {
	if ($("body.td-testing-on").length) {
		$("body").removeClass('td-testing-on');
	}
	// Tests theme
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', true);
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-test-button").prop('disabled', false);
	document.querySelector('body').focus();
	document.querySelector("#mw-content-text .theme-designer-css").innerHTML = '';
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
$('.wikitable #auto4').click(
							function(e) {
								e.preventDefault
								$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto5').click(
							function(e) {
								e.preventDefault
								$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
								TestDynamicTheme();
							}   
						);
// UpdateRangeInputs();
	var ranges = document.querySelectorAll('input[type="range"]');
	ranges.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.value) - x.getAttribute('min') ) * 100) / (x.getAttribute('max') - x.getAttribute('min')) ) + '%'  );
	});
	
	var ranges2 = document.querySelectorAll('input[type="range"]');
	ranges2.forEach(function(x) {
		x.addEventListener("input", function(e) { UpdateRange(); });
	});

// Misc
	$("input[type='color']").change( function(e) { TestDynamicTheme(); } ); // Change
	$("input.designer-text").change( function(e) { TestDynamicTheme(); } ); // Change


/* Select Inputs */
	$(' .cpe-dropdown.cpe-select').blur(function() { TestDynamicTheme() })
	$(' input[type="range"]').change(function() { TestDynamicTheme() })
	var select_items = document.querySelectorAll(".cpe-dropdown.cpe-select .cpe-dropdown__content .cpe-list li:not(.cpe-dropdown-level-2)");
	select_items.forEach(function(y) {
		y.setAttribute('onclick','UpdateSelectValue()');
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
									var content = selected.innerText;
									document.querySelector('.cpe-select:focus-within .cpe-select__value').setAttribute("value", value);
									document.querySelector('.cpe-select:focus-within .cpe-select__value').innerHTML= content;
								}));
        }) );
	});
					
					


}
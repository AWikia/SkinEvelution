window.MW18TDTest = false;

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


if (mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgTitle === "CPEThemeDesigner") {

	$.when( mw.loader.using( [ 'mediawiki.jqueryMsg' ] ), $.ready ).then( function() {
	InitDesigner();
    } );
}



})();

function InitDesigner() {
	// Change Title
	$(".evelution-page-header .evelution-title > span, .evelution-minibar .namespace-with-title .title > a").html( mw.msg( 'evelution-designer-title' ) );

	$(".link[designer-on]").addClass( 'active' );
	document.querySelector("body").classList.replace("mw-invalidspecialpage","mw-special-cpethemedesigner");
	// Remove the following things
	$(".evelution-article #catlinks, .td-off, .evelution-floating-actions .cpe-floating-button.edit, .evelution-floating-actions .cpe-floating-button.history").remove();
	// Put new buttons
	// Copy theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button accent theme-copy-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-copy' ) + ' (CSS)">' +
			'<span class="cpe-icon material-icons" style="position:absolute; top:1.5px;">' +
				'content_copy' +
			'</span>' +
			'<span class="cpe-icon material-icons" style="position:absolute; bottom:-6px;">' +
				'css' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-copy-button").click( function(e) { e.preventDefault; CopyTheme();  });
	// Copy theme 2
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button accent theme-copy-button-2 page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-copy' ) + ' (PHP)">' +
			'<span class="cpe-icon material-icons" style="position:absolute; top:1.5px;">' +
				'content_copy' +
			'</span>' +
			'<span class="cpe-icon material-icons" style="position:absolute; bottom:-6px;">' +
				'php' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-copy-button-2").click( function(e) { e.preventDefault; CopyTheme2();  });

	// Paste theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button accent theme-paste-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-paste' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'content_paste' +
			'</span>' +
		'</button>'
	);

	$(".evelution-floating-actions.extra-actions .theme-paste-button").click( function(e) { e.preventDefault; PasteTheme();  });
	// Apply theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button critical theme-apply-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-apply' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'verified' +
			'</span>' +
		'</button>'
	);


	$(".evelution-floating-actions.extra-actions .theme-apply-button").click( function(e) { e.preventDefault; ApplyTheme();  });
	

	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button good theme-test-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-test' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'build' +
			'</span>' +
		'</button>'
	);

	$(".evelution-floating-actions.extra-actions .theme-test-button").click( function(e) { e.preventDefault; TestTheme(true);  });


	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button accent theme-clear-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-clear' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'undo' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-clear-button").click( function(e) { e.preventDefault; ClearTheme();  }).prop('disabled', true);

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
			'<datalist id="td_imagefilter">' + // Fonts
				'<option value="opacity(100%)">' +
				'<option value="opacity(75%)">' +
				'<option value="opacity(50%)">' +
				'<option value="opacity(25%)">' +
				'<option value="opacity(0%)">' +
				'<option value="invert(100%)">' +
				'<option value="invert(100%) hue-rotate(180deg)">' +
				'<option value="invert(100%) opacity(50%)">' +
				'<option value="invert(100%) hue-rotate(180deg) opacity(50%)">' +
			'</datalist>' +
			'<datalist id="td_aopacity">' + // Image Opacity
				'<option value="0.4" label="40%">' +
				'<option value="0.6" label="60%">' +
				'<option value="0.8" label="80%">' +
			'</datalist>' +
			'<datalist id="td_gchs">' + // Image Opacity
				'<option value="-10" label="-10deg">' +
				'<option value="0" label="0deg">' +
				'<option value="10" label="10deg">' +
			'</datalist>' +
			'<datalist id="td_filterdur">' + // Image Opacity
				'<option value="0">' +
				'<option value="300">' +
				'<option value="600" >' +
				'<option value="1000" >' +
			'</datalist>' +

		'</div>' +
		'<table class="wikitable" style="max-width:var(--breakpoint-size); font-size:14px; margin:0 auto;">' +
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
					'<input type="text" id="bodyimage" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="URL" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-filter' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="bodyimagefilter" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Filter" value="opacity(1)" list="td_imagefilter" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-alignment' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align cpe-dropdown__toggle" style="width:150px; min-width:150px;">' +
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
						'<div class="cpe-input bg_align2 cpe-dropdown__toggle" style="width:150px; min-width:150px;">' +
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
						'<div class="cpe-input bg_size cpe-dropdown__toggle" style="width:150px; min-width:150px;">' +
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
					'<hr>' +
					'<input type="checkbox" name="auto7" id="auto7" checked>' + '<label for="auto7">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg_s" list="td_colors" disabled />' + // Page BG
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
					'<br><label>Ration:</label> <br>' +
					'<progress max="4.5" value="0" id="pagebg3-pagebg-test"></progress>' +
					'<hr>' +
					'<input type="checkbox" name="auto8" id="auto8" checked>' + '<label for="auto8">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3_s" list="td_colors" disabled />' + // Page BG
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
					'<br><label>Ration:</label> <br>' +
					'<progress max="1.875" id="pagebg2-pagebg-test">' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-saccent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1e5aa8" id="saccentcolor" list="td_colors" />' + // Page BG
					'<br><label>Ration:</label> <br>' +
					'<progress max="4.5" value="0" id="saccentcolor-pagebg-test">' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto6" id="auto6">' + '<label for="auto6">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#93cceA" id="accentcolor" list="td_colors" />' + // Page BG
					'<br><label>Ration:</label> <br>' +
					'<progress max="1.875" value="0" id="accentcolor-pagebg-test">' +
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
					'<input type="range" class="big" style="min-width:150px; min-width:150px;" id="border-radius" value="5" min="0" max="15" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-font' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="firstfont" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Font" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-secondary-font' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="secondfont" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Font" list="td_fonts" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Filter" value="opacity(1)" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-hover' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter2" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Filter" value="opacity(0.8)" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-duration' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px; min-width:150px;" id="filter3" value="300" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-delay' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px; min-width:150px;" id="filter4" value="0" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off"  />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-acryllic-opacity' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px; min-width:150px;" id="aopacity" value="0.6" min="0.4" max="0.8" step="0.01" list="td_aopacity" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-gchs' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px; min-width:150px;" id="gchs" value="0" min="-10" max="10" step="1" list="td_gchs" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +

		'</table>' +
		'<hr>' +

/**/
'<div class="preview-window-desk">' +
	'<div class="preview-window-window" force-active>' +
		'<div class="lunalevit disables-on-accent"></div>' +
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
		'<div class="lunalevit disables-on-accent"></div>' +
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
		'<div class="lunalevit disables-on-accent"></div>' +
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
		'<div class="lunalevit disables-on-accent"></div>' +
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
		'<div class="lunalevit disables-on-accent"></div>' +
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
		'<div class="lunalevit disables-on-accent"></div>' +
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
				'<div class="background"><div class="background-image"></div></div>' +
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
			'<div class="cpe-button is-pause-color">Pause Background Color</div>' +
			'<div class="cpe-button is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-progress-color">Progress Background Color</div>' +
			'<div class="cpe-button is-message-color">Message Background Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-secondary">Base Color</div>' +
			'<div class="cpe-button is-secondary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-secondary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-secondary is-alert-color">Alert Background Color</div>' +
			'<div class="cpe-button is-secondary is-pause-color">Pause Background Color</div>' +
			'<div class="cpe-button is-secondary is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-secondary is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-secondary is-progress-color">Progress Background Color</div>' +
			'<div class="cpe-button is-secondary is-message-color">Message Background Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-tertiary">Base Color</div>' +
			'<div class="cpe-button is-tertiary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-tertiary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-tertiary is-alert-color">Alert Background Color</div>' +
			'<div class="cpe-button is-tertiary is-pause-color">Pause Background Color</div>' +
			'<div class="cpe-button is-tertiary is-warning-color">Warning Background Color</div>' +
			'<div class="cpe-button is-tertiary is-success-color">Success Background Color</div>' +
			'<div class="cpe-button is-tertiary is-progress-color">Progress Background Color</div>' +
			'<div class="cpe-button is-tertiary is-message-color">Message Background Color</div>' +
		'</div>' +
		'<div class="theme-code"></div>'
	);
	SelectInputs();
	UpdateContrastRatios();
    var pageTitle = $("#firstheading > span").html();
    var title = mw.message( 'pagetitle' ).text();
    document.title = title.replace("$1", pageTitle);
}

function ApplyTheme () {
	// Copies theme to clipboard
	$(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', true);
	AddFloatingBanner('Applying Theme '  +  window.MW18ActiveTheme + ' to MediaWiki:Evelution.css. Please wait...','progress','InProgressBanner')
	document.querySelector('.focus-overlay').focus();
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
	if (document.querySelector('.wikitable #auto6').checked) {
		var autocolor6 = 'auto';
	} else {
		var autocolor6 = $('#accentcolor').val();
	}
	if (document.querySelector('.wikitable #auto7').checked) {
		var autocolor7 = 'auto';
	} else {
		var autocolor7 = $('#pagebg_s').val();
	}
	if (document.querySelector('.wikitable #auto8').checked) {
		var autocolor8 = 'auto';
	} else {
		var autocolor8 = $('#pagebg3_s').val();
	}
	var image = $("#bodyimage").val().replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = 'Roboto';
    } else {
		var customfont2 = $('#firstfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
		result = '\n/* Community Theme */\n' +
				 '.theme-' + window.MW18ActiveTheme + '.visualcolors-standard {\n' + // Beginning
				 '--desktop-background-image:' + image + ';\n' +
				 '--desktop-background-image-filter:' + $('#bodyimagefilter').val() + ';\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--highlight-background-color:' + autocolor6 + ';\n' +
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
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
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

api.postWithToken( 'csrf', params ).done( function ( data ) { $(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', false); $("#InProgressBanner").remove(); /* Success */ AddFloatingBanner('Succesfully applied Theme '  +  window.MW18ActiveTheme + ' to MediaWiki:Evelution.css.','success'); } ).fail( function (data) { $(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', false); $("#InProgressBanner").remove(); /* Fail */ AddFloatingBanner('Failed to apply Theme '  +  window.MW18ActiveTheme + ' to MediaWiki:Evelution.css as page couldn\'t be edited.','alert'); } );

}


function CopyTheme() {
	$(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', true);
	$(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', true);
	AddFloatingBanner('Copying CPE Framework theme to Clipboard. Please wait...','progress','InProgressBanner3')
	document.querySelector('.focus-overlay').focus();
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
	if (document.querySelector('.wikitable #auto6').checked) {
		var autocolor6 = 'auto';
	} else {
		var autocolor6 = $('#accentcolor').val();
	}
	if (document.querySelector('.wikitable #auto7').checked) {
		var autocolor7 = 'auto';
	} else {
		var autocolor7 = $('#pagebg_s').val();
	}
	if (document.querySelector('.wikitable #auto8').checked) {
		var autocolor8 = 'auto';
	} else {
		var autocolor8 = $('#pagebg3_s').val();
	}
	var image = $("#bodyimage").val().replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = 'Roboto';
    } else {
		var customfont2 = $('#firstfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
		result = '.theme-' + window.MW18ActiveTheme + '.visualcolors-standard {\n' + // Beginning
				 '--desktop-background-image:' + image + ';\n' +
				 '--desktop-background-image-filter:' + $('#bodyimagefilter').val() + ';\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + ';\n' +
				 '--canvas-secondary-background-color:' + autocolor7  + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--canvas-text-secondary-background-color:' + autocolor8  + ';\n' +
				 '--highlight-background-color:' + autocolor6 + ';\n' +
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
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
				 '}' // Ending
		if (navigator.clipboard) {
			navigator.clipboard.writeText(result).then(function() {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Successfully copied CPE Framework theme to Clipboard','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
			}, function() {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Failed to copy CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select it and copy that to the clipboard.','alert');
			$("div.theme-code").empty().append(
				'<h2>Code</h2>' +
				'<pre>' +
				result +
				'</pre>'
			);
			});
		} else {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Failed to copy CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select it and copy that to the clipboard.','alert');
			$("div.theme-code").empty().append(
				'<h2>Code</h2>' +
				'<pre>' +
				result +
				'</pre>'
			);
		}
}


function CopyTheme2() {
	$(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', true);
	$(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', true);
	AddFloatingBanner('Copying PHP CPE Framework theme to Clipboard. Please wait...','progress','InProgressBanner3')
	document.querySelector('.focus-overlay').focus();
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
	if (document.querySelector('.wikitable #auto6').checked) {
		var autocolor6 = 'auto';
	} else {
		var autocolor6 = $('#accentcolor').val();
	}
	if (document.querySelector('.wikitable #auto7').checked) {
		var autocolor7 = 'auto';
	} else {
		var autocolor7 = $('#pagebg_s').val();
	}
	if (document.querySelector('.wikitable #auto8').checked) {
		var autocolor8 = 'auto';
	} else {
		var autocolor8 = $('#pagebg3_s').val();
	}
	var image = $("#bodyimage").val().replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = 'Roboto';
    } else {
		var customfont2 = $('#firstfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
		result = "$wgEvelutionTheme" + window.MW18ActiveTheme + " = [\n" + // Beginning
				 "'desktop-background-image' => '" + image + "',\n" +
				 "'desktop-background-image-filter' => '" + $("#bodyimagefilter").val() + "',\n" +
				 "'desktop-background-color' => '" + $("#bodybg").val()  + "',\n" +
				 "'desktop-text-background-color' => '" + autocolor1  + "',\n" +
				 "'desktop-background-horizontal-alignment' => '" + $(".bg_align2 .cpe-select__value").attr("value") + "',\n" +
				 "'desktop-background-vertical-alignment' => '" + $(".bg_align .cpe-select__value").attr("value") + "',\n" +
				 "'desktop-background-size' => '" + $(".bg_size .cpe-select__value").attr("value")  + "',\n" +
				 "'desktop-background-no-horizontal-tiling' => '" + (!( document.querySelector("input#tilingH").checked ))  + "',\n" +
				 "'desktop-background-no-vertical-tiling' => '" + (!( document.querySelector("input#tilingV").checked ))  + "',\n" +
				 "'canvas-background-color' => '" + $("#pagebg").val() + "',\n" +
				 "'canvas-secondary-background-color' => '" + autocolor7  + "',\n" +
				 "'inactive-text-background-color' => '" + autocolor2  + "',\n" +
				 "'canvas-text-background-color' => '" + autocolor3  + "',\n" +
				 "'canvas-text-secondary-background-color' => '" + autocolor8  + "',\n" +
				 "'highlight-background-color' => '" + autocolor6 + "',\n" +
				 "'hyperlink-background-color' => '" + $("#saccentcolor").val() + "',\n" +
				 "'active-title-background-color' => '" + autocolor5  + "',\n" +
				 "'inactive-title-background-color' => '" + autocolor4  + "',\n" +
				 "'custom-font' => '" + customfont2 + "',\n" +
				 "'custom-secondary-font' => '" + customfont + "',\n" +
				 "'border-radius' => '" + $("#border-radius").val() + 'px'  + "',\n" +
				 "'icon-filter' => '" + $("#filter").val() + "',\n" +
				 "'icon-filter-hover' => '" + $("#filter2").val()  + "',\n" +
				 "'icon-filter-duration' => '" + $("#filter3").val() + 'ms' + "',\n" +
				 "'icon-filter-delay' => '" + $("#filter4").val() + 'ms' + "',\n" +
				 "'system-acryllic-opacity' => '" + $("#aopacity").val() + "',\n" +
				 "'system-generic-color-hue-shift' => '" + $("#gchs").val() + "',\n" +
				 "];" // Ending
		if (navigator.clipboard) {
			navigator.clipboard.writeText(result).then(function() {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Successfully copied PHP CPE Framework theme to Clipboard. Apply the copied code to LocalSettings.php','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
			}, function() {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Failed to copy PHP CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select, and copy that to the clipboard and apply that to LocalSettings.php.','alert');
			$("div.theme-code").empty().append(
				'<h2>Code</h2>' +
				'<pre>' +
				result +
				'</pre>'
			);
			});
		} else {
			 $(".evelution-floating-actions.extra-actions .theme-copy-button").prop('disabled', false);
			 $(".evelution-floating-actions.extra-actions .theme-copy-button2").prop('disabled', false);
			 $("#InProgressBanner3").remove();
			 AddFloatingBanner('Failed to copy PHP CPE Framework theme to Clipboard. You can, however find the generated theme code below the Theme Designer applet so that you will be able to select, and copy that to the clipboard and apply that to LocalSettings.php.','alert');
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
	$(".evelution-floating-actions.extra-actions .theme-paste-button").prop('disabled', true);
	AddFloatingBanner('Pasting theme. Please wait...','progress','InProgressBanner2')
	document.querySelector('.focus-overlay').focus();
	// Body BG
	$('#bodybg').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color") );
	// Body Header Text
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto1').checked = true;
	} else {
		document.querySelector('.wikitable #auto1').checked = false;
		$('#bodybg2').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-text-background-color") );
	}
	$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
	// Body Image
	$('#bodyimage').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image").replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("") );
	// Body Image Opacity
	$('#bodyimagefilter').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter") );
	// Body Image Alignment V
	bg_align = ["Top", "Middle", "Bottom"][["top", "center", "bottom"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment") ) ]
	$('.bg_align .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment") );
	$('.bg_align .cpe-select__value').html( bg_align );
	// Body Image Alignment H
	bg_align2 = ["Left", "Middle", "Right"][["left", "center", "right"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment") ) ]
	$('.bg_align2 .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment") );
	$('.bg_align2 .cpe-select__value').html( bg_align2 );
	// Body Image Size
	bg_size = ["Cover", "Contain", "Stretched", "Full"][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") ) ]
	$('.bg_size .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") )
	$('.bg_size .cpe-select__value').html( bg_size );
	// Body Image Tiling
	document.querySelector('input#tilingH').checked = (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-horizontal-tiling") === 'false');
	document.querySelector('input#tilingV').checked = (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-vertical-tiling") === 'false');
	// Page BG
	$('#pagebg').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color") );
	// 2nd Page BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto7').checked = true;
	} else {
		document.querySelector('.wikitable #auto7').checked = false;
		$('#pagebg_s').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-secondary-background-color") );
	}
	$('.wikitable #pagebg_s').prop('disabled',(document.querySelector('.wikitable #auto7').checked) );
	// Page Text BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto3').checked = true;
	} else {
		document.querySelector('.wikitable #auto3').checked = false;
		$('#pagebg3').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-background-color") );
	}
	$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
	// 2nd Page Text BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto8').checked = true;
	} else {
		document.querySelector('.wikitable #auto8').checked = false;
		$('#pagebg3_s').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-text-secondary-background-color") );
	}
	$('.wikitable #pagebg3_s').prop('disabled',(document.querySelector('.wikitable #auto8').checked) );
	// Page Border BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto2').checked = true;
	} else {
		document.querySelector('.wikitable #auto2').checked = false;
		$('#pagebg2').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-text-background-color") );
	}
	$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
	// Anchor BG
	$('#saccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color") );
	// Accent BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto6').checked = true;
	} else {
		document.querySelector('.wikitable #auto6').checked = false;
		$('#accentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") );
	}
	$('.wikitable #accentcolor').prop('disabled',(document.querySelector('.wikitable #auto6').checked) );
	// Caret Color
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto5').checked = true;
	} else {
		document.querySelector('.wikitable #auto5').checked = false;
		$('#taccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") );
	}
	$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
	// Quaternary Accent Color
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto4').checked = true;
	} else {
		document.querySelector('.wikitable #auto4').checked = false;
		$('#qaccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") );
	}
	$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
	// Border Radius
	$('#border-radius').val( parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--border-radius")) );
	// Primary Font
	var pfont = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-font").replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (pfont == '""') {
		var pfont = '';
	}
	$('#firstfont').val( pfont );
	// Secondary Font
	var sfont = getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--custom-secondary-font").replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (sfont == '""') {
		var sfont = '';
	}
	$('#secondfont').val( sfont );
	// Filter
	$('#filter').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter") );
	// Filter (Hover)
	$('#filter2').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-hover") );
	// Filter Duration
	$('#filter3').val( parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-duration")) );
	// Filter Delay
	$('#filter4').val( parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--icon-filter-delay")) );
	// Acryllic Opacity
	$('#aopacity').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-acryllic-opacity") );
	// Acryllic Opacity
	$('#gchs').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-hue-shift") );
	UpdateContrastRatios();
	UpdateRangeInputs();
	$(".evelution-floating-actions.extra-actions .theme-paste-button").prop('disabled', false);
	$("#InProgressBanner2").remove();
	AddFloatingBanner('Successfully pasted active theme to Theme Designer','success'); // alert('Successfully copied CPE Framework theme to Clipboard');

}

function TestTheme(banner=false) {
	// Tests theme
	if (!window.MW18TDTest) {
		if (banner) {
			AddFloatingBanner('Enabling theme preview. Please wait...','progress','InProgressBanner4');
		}
	}
	$(".evelution-floating-actions.extra-actions .theme-clear-button").prop('disabled', false);
	$(".evelution-floating-actions.extra-actions .theme-test-button").prop('disabled', true);
	document.querySelector('.focus-overlay').focus();
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
	if (document.querySelector('.wikitable #auto6').checked) {
		var autocolor6 = 'auto';
	} else {
		var autocolor6 = $('#accentcolor').val();
	}
	if (document.querySelector('.wikitable #auto7').checked) {
		var autocolor7 = 'auto';
	} else {
		var autocolor7 = $('#pagebg_s').val();
	}
	if (document.querySelector('.wikitable #auto8').checked) {
		var autocolor8 = 'auto';
	} else {
		var autocolor8 = $('#pagebg3_s').val();
	}
	var image = $("#bodyimage").val().replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
    if ( $('#firstfont').val().length === 0) {
		var customfont2 = 'Roboto';
    } else {
		var customfont2 = $('#firstfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace('"<', '').replace('>"', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
		oldhtml = document.querySelector("#mw-content-text .theme-designer-css").innerHTML;
		result = ':root .theme-A, .theme-B, .theme-C, .theme-D, .theme-E, .theme-F, .theme-G, .theme-H {\n' + // Beginning
				 '--desktop-background-image:' + image + '!important;\n' +
				 '--desktop-background-image-filter:' + $('#bodyimagefilter').val() + '!important;\n' +
				 '--desktop-background-color:' + $('#bodybg').val()  + '!important;\n' +
				 '--desktop-text-background-color:' + autocolor1  + '!important;\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + '!important;\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + '!important;\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + '!important;\n' +
				 '--canvas-background-color:' + $('#pagebg').val() + '!important;\n' +
				 '--canvas-secondary-background-color:' + autocolor7  + '!important;\n' +
				 '--inactive-text-background-color:' + autocolor2  + '!important;\n' +
				 '--canvas-text-background-color:' + autocolor3  + '!important;\n' +
				 '--canvas-text-secondary-background-color:' + autocolor8  + ';\n' +
				 '--highlight-background-color:' + autocolor6 + '!important;\n' +
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
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + '!important;\n' +
				 '}' // Ending
			document.querySelector("#mw-content-text .theme-designer-css").innerHTML = result;
			try {
				ColorUpdate(true,true)
				if (!window.MW18TDTest) {
					if (banner) {
						$("#InProgressBanner4").remove();
						AddFloatingBanner('Successfully enabled theme preview','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
					}
				}
			}
			catch (err) {
				if (!window.MW18TDTest) {
					if (banner) {
						$("#InProgressBanner4").remove();
						AddFloatingBanner('Failed to  enable theme preview as typographic errors have been found. The latest working version has been loaded instead.','alert'); // alert('Successfully copied CPE Framework theme to Clipboard');
						result = oldhtml;
						ColorUpdate(true,true);
					}
				}
			}

	if (!window.MW18TDTest) {
		window.MW18TDTest = true;
	}
}

function UpdateContrastRatios() {
	var pagebg = $('#pagebg').val();
	var pagebg2 = $("#pagebg2").val();
	var pagebg3 = $("#pagebg3").val();
	var saccentcolor = $("#saccentcolor").val();
	var accentcolor = $("#accentcolor").val();
	if (document.querySelector('.wikitable #auto2').checked) {
		$('#pagebg2-pagebg-test').val('21');
	} else {
		$('#pagebg2-pagebg-test').val( chroma.contrast(pagebg, pagebg2)  - 1.25 );
	}
	if (document.querySelector('.wikitable #auto3').checked) {
		$('#pagebg3-pagebg-test').val('21');
	} else {
		$('#pagebg3-pagebg-test').val( chroma.contrast(pagebg, pagebg3)  - 3 );
	}
	$('#saccentcolor-pagebg-test').val( chroma.contrast(pagebg, saccentcolor)  - 3 );
	if (document.querySelector('.wikitable #auto6').checked) {
		$('#accentcolor-pagebg-test').val('21');
	} else {
		$('#accentcolor-pagebg-test').val( chroma.contrast(pagebg, accentcolor)  - 1.25 );
	}
	var progresses = document.querySelectorAll('progress');
	progresses.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.getAttribute('value')) - 0 ) * 100) / (x.getAttribute('max') - 0) ) + '%'  );
	});

}

function TestDynamicTheme() {
	UpdateContrastRatios();
	if (window.MW18TDTest) {
		TestTheme();
	}
}


function ClearTheme() {
	window.MW18TDTest = false;
	// Tests theme
	$(".evelution-floating-actions.extra-actions .theme-clear-button").prop('disabled', true);
	$(".evelution-floating-actions.extra-actions .theme-test-button").prop('disabled', false);
	document.querySelector('.focus-overlay').focus();
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
$('.wikitable #auto6').click(
							function(e) {
								e.preventDefault
								$('.wikitable #accentcolor').prop('disabled',(document.querySelector('.wikitable #auto6').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto7').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg_s').prop('disabled',(document.querySelector('.wikitable #auto7').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto8').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg3_s').prop('disabled',(document.querySelector('.wikitable #auto8').checked) );
								TestDynamicTheme();
							}   
						);

// UpdateRangeInputs();
	var ranges = document.querySelectorAll('input[type="range"]');
	ranges.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.value) - x.getAttribute('min') ) * 100) / (x.getAttribute('max') - x.getAttribute('min')) ) + '%'  );
	});

	var progresses = document.querySelectorAll('progress');
	progresses.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.getAttribute('value')) - 0 ) * 100) / (x.getAttribute('max') - 0) ) + '%'  );
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
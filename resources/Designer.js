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
	$(".evelution-page-header .evelution-title > span, .evelution-header .namespace-with-title .title > a").html( mw.msg( 'evelution-designer-title' ) );

	$(".link[designer-on]").addClass( 'active' );
	document.querySelector("body").classList.replace("mw-invalidspecialpage","mw-special-cpethemedesigner");
	// Remove the following things
	$(".evelution-article #catlinks, .td-off, .evelution-floating-actions .cpe-floating-button.edit, .evelution-floating-actions .cpe-floating-button.history").remove();
	// Put new buttons
	// Copy theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button theme-copy-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-copy' ) + ' (CSS)">' +
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
		'<button class="cpe-floating-button theme-copy-button-2 page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-copy' ) + ' (PHP)">' +
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
		'<button class="cpe-floating-button is-alternate theme-paste-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-paste' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'content_paste' +
			'</span>' +
		'</button>'
	);

	$(".evelution-floating-actions.extra-actions .theme-paste-button").click( function(e) { e.preventDefault; PasteTheme();  });
	// Apply theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-alert-color theme-apply-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-apply' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'verified' +
			'</span>' +
		'</button>'
	);


	$(".evelution-floating-actions.extra-actions .theme-apply-button").click( function(e) { e.preventDefault; ApplyTheme();  });
	

	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-success-color theme-test-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-test' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'build' +
			'</span>' +
		'</button>'
	);

	$(".evelution-floating-actions.extra-actions .theme-test-button").click( function(e) { e.preventDefault; TestTheme(true);  });


	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-pause-color theme-clear-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-clear' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'undo' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-clear-button").click( function(e) { e.preventDefault; ClearTheme();  }).prop('disabled', true);


	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-unaccented theme-sbt-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="Backdrop Types">' +
			'<span class="cpe-icon material-icons">' +
				'wallpaper' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-sbt-button").click( function(e) { e.preventDefault; InitSBT();  });


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
				'<option value="-15" label="-15deg">' +
				'<option value="0" label="0deg">' +
				'<option value="15" label="15deg">' +
			'</datalist>' +
			'<datalist id="td_gcs">' + // Image Opacity
				'<option value="20" label="20%">' +
				'<option value="40" label="40%">' +
				'<option value="60" label="60%">' +
				'<option value="80" label="80%">' +
				'<option value="100" label="100%">' +
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
				'<th colspan="3">' + mw.msg( 'evelution-designer-body' ) + '</th>' +
			'</tr>' +
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

		// TR
			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto14" id="auto14">' + '<label for="auto14">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +

					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffcba4" id="bodybg" list="td_colors" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="checkbox" name="auto1" id="auto1">' + '<label for="auto1">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="bodybg2" list="td_colors" />' + // Body Background 
				'</td>' +

			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">image</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan="2">' +
					'<input type="text" id="bodyimage" class="cpe-input designer-text" style="width:300px; min-width:300px;" placeholder="URL" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-filter' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">photo_filter</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
					'<input type="text" id="bodyimagefilter" class="cpe-input designer-text" style="width:300px; min-width:300px;" placeholder="Filter" value="opacity(1)" list="td_imagefilter" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-blend-mode' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">gradient</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input blend_mode cpe-dropdown__toggle" style="width:300px; min-width:300px;">' +
							'<span class="cpe-select__value" value="normal">'+mw.msg ('evelution-designer-setting-normal')+'</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="normal"><a>'+mw.msg ('evelution-designer-setting-normal')+'</a></li>' +
								'<li value="multiply"><a>'+mw.msg ('evelution-designer-setting-multiply')+'</a></li>' +
								'<li value="screen"><a>'+mw.msg ('evelution-designer-setting-screen')+'</a></li>' +
								'<li value="overlay"><a>'+mw.msg ('evelution-designer-setting-overlay')+'</a></li>' +
								'<li value="darken"><a>'+mw.msg ('evelution-designer-setting-darken')+'</a></li>' +
								'<li value="lighten"><a>'+mw.msg ('evelution-designer-setting-lighten')+'</a></li>' +
								'<li value="color-dodge"><a>'+mw.msg ('evelution-designer-setting-colordodge')+'</a></li>' +
								'<li value="color-burn"><a>'+mw.msg ('evelution-designer-setting-colorburn')+'</a></li>' +
								'<li value="hard-light"><a>'+mw.msg ('evelution-designer-setting-hardlight')+'</a></li>' +
								'<li value="soft-light"><a>'+mw.msg ('evelution-designer-setting-softlight')+'</a></li>' +
								'<li value="difference"><a>'+mw.msg ('evelution-designer-setting-difference')+'</a></li>' +
								'<li value="exclusion"><a>'+mw.msg ('evelution-designer-setting-exclusion')+'</a></li>' +
								'<li value="hue"><a>'+mw.msg ('evelution-designer-setting-hue')+'</a></li>' +
								'<li value="saturation"><a>'+mw.msg ('evelution-designer-setting-saturation')+'</a></li>' +
								'<li value="color"><a>'+mw.msg ('evelution-designer-setting-color')+'</a></li>' +
								'<li value="luminosity"><a>'+mw.msg ('evelution-designer-setting-luminosity')+'</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-alignment' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">align_horizontal_center</span></th>' +
				'<th><span class="cpe-icon material-icons">align_vertical_center</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align2 cpe-dropdown__toggle" style="width:150px; min-width:150px;">' +
							'<span class="cpe-select__value" value="center">'+mw.msg ('evelution-designer-setting-middle')+'</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="left"><a>'+mw.msg ('evelution-designer-setting-left')+'</a></li>' +
								'<li value="center"><a>'+mw.msg ('evelution-designer-setting-middle')+'</a></li>' +
								'<li value="right"><a>'+mw.msg ('evelution-designer-setting-right')+'</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +

				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align cpe-dropdown__toggle" style="width:150px; min-width:150px;">' +
							'<span class="cpe-select__value" value="center">'+mw.msg ('evelution-designer-setting-middle')+'</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="top"><a>'+mw.msg ('evelution-designer-setting-top')+'</a></li>' +
								'<li value="center"><a>'+mw.msg ('evelution-designer-setting-middle')+'</a></li>' +
								'<li value="bottom"><a>'+mw.msg ('evelution-designer-setting-bottom')+'</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +


			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-size' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">aspect_ratio</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_size cpe-dropdown__toggle" style="width:300px; min-width:300px;">' +
							'<span class="cpe-select__value" value="cover">'+mw.msg ('evelution-designer-setting-cover')+'</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="cover"><a>'+mw.msg ('evelution-designer-setting-cover')+'</a></li>' +
								'<li value="contain"><a>'+mw.msg ('evelution-designer-setting-contain')+'</a></li>' +
								'<li value="stretched"><a>'+mw.msg ('evelution-designer-setting-stretched')+'</a></li>' +
								'<li value="full"><a>'+mw.msg ('evelution-designer-setting-full')+'</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +

		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image-tiling' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">align_horizontal_center</span></th>' +
				'<th><span class="cpe-icon material-icons">align_vertical_center</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<div style="display:inline-block"><span styke="vertical-align:middle">X:</span> <input type="checkbox" name="tiling" id="tilingH" checked></div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<div style="display:inline-block"><span styke="vertical-align:middle">Y:</span> <input type="checkbox" name="tiling" id="tilingV" checked></div>' +
				'</td>' +

			'</tr>' +


			'<tr>' +
				'<th colspan="3">' + mw.msg( 'nstab-main' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-page' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto15" id="auto15">' + '<label for="auto15">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg" list="td_colors" />' + // Page BG
					'<hr>' +
					'<input type="checkbox" name="auto7" id="auto7" checked>' + '<label for="auto7">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg_s" list="td_colors" disabled />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto3" id="auto3">' + '<label for="auto3">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3" list="td_colors" />' + // Page BG
					'<hr>' +
					'<input type="checkbox" name="auto8" id="auto8" checked>' + '<label for="auto8">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3_s" list="td_colors" disabled />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-border' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">font_download_off</span></th>' +
				'<th><span class="cpe-icon material-icons">font_download</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto2" id="auto2">' + '<label for="auto2">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color"  class="cpe-button is-square" style="width:68px;" value="#c8c8cd" id="pagebg2" list="td_colors" />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<span><input type="checkbox" name="auto13" id="auto13">' + '<label for="auto13">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#c62d42" id="saaccentcolor" list="td_colors" />' + // Page BG
				'</td>' +

			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-saccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">link_off</span></th>' +
				'<th><span class="cpe-icon material-icons">link</span></th>' +
			'</tr>' +
			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<span style="visibility:hidden; pointer-events:none;"><input type="checkbox" name="autoDDR" id="autoDDR">' + '<label for="autoDDR">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1e5aa8" id="saccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<span><input type="checkbox" name="auto12" id="auto12">' + '<label for="auto12">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#733380" id="svaccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto6" id="auto6">' + '<label for="auto6">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#93cceA" id="accentcolor" list="td_colors" />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto9" id="auto9" checked>' + '<label for="auto9">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#000000" id="accenttextcolor" list="td_colors" disabled />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-taccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto5" id="auto5">' + '<label for="auto5">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#00755e" id="taccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto10" id="auto10" checked>' + '<label for="auto10">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="taccenttextcolor" list="td_colors" disabled />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-qaccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto4" id="auto4">' + '<label for="auto4">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#01786f" id="qaccentcolor" list="td_colors" />' + // Page BG
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto11" id="auto11" checked>' + '<label for="auto11">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="qaccenttextcolor" list="td_colors" disabled />' + // Page BG
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<th colspan="3">' + mw.msg( 'evelution-designer-other' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-border-radius' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">rounded_corner</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
					'<input type="range" class="big" style="min-width:300px; min-width:300px;" id="border-radius" value="5" min="0" max="15" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-font' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">title</span></th>' +
				'<th><span class="cpe-icon material-icons">text_fields</span></th>' +
			'</tr>' +


			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="firstfont" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Font" autocomplete="off" />' + // Body Background 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="secondfont" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Font" list="td_fonts" autocomplete="off" />' + // Body Background 
				'</td>' +


			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="4" style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">invert_colors_off</span></th>' +
				'<th><span class="cpe-icon material-icons">invert_colors</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Filter" value="opacity(1)" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter2" class="cpe-input designer-text" style="width:150px; min-width:150px;" placeholder="Filter" value="opacity(0.8)" />' + // Body Background 
				'</td>' +
			'</tr>' +

			'<tr>' +
				'<th><span class="cpe-icon material-icons">timer</span></th>' +
				'<th><span class="cpe-icon material-icons">snooze</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px;" id="filter3" value="300" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px;" id="filter4" value="0" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off"  />' + // Body Background 
				'</td>' +
			'</tr>' +


		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-acryllic-opacity' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">opacity</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan="2">' +
					'<input type="range" class="big" style="min-width:300px; min-width:300px;" id="aopacity" value="0.6" min="0.4" max="0.8" step="0.01" list="td_aopacity" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:150px;">' + 
					mw.msg( 'evelution-designer-gchs' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">palette</span></th>' +
				'<th><span class="cpe-icon material-icons">tonality</span></th>' +
			'</tr>' +


			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px;" id="gchs" value="0" min="-15" max="15" step="1" list="td_gchs" autocomplete="off" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:150px;" id="gcs" value="100" min="20" max="100" step="5" list="td_gcs" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +

		'</table>' +
		'<hr>' +
		'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
			'<block class="td-block" title="Desktop" style="background-color:var(--desktop-background-color); color:var(--desktop-text-background-color);">A</block>' +
			'<block class="td-block" title="Canvas" style="background-color:var(--canvas-background-color); color:var(--canvas-text-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Canvas" style="background-color:var(--canvas-secondary-background-color); color:var(--canvas-text-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Inactive Text" style="background-color:var(--canvas-background-color); color:var(--inactive-text-background-color);">A</block>' +
			'<block class="td-block" title="Hyperlink" style="background-color:var(--canvas-background-color); color:var(--hyperlink-background-color);">A</block>' +
			'<block class="td-block" title="Visited Hyperlink" style="background-color:var(--canvas-background-color); color:var(--visited-hyperlink-background-color);">A</block>' +
			'<block class="td-block" title="Active Text" style="background-color:var(--canvas-background-color); color:var(--active-text-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Hyperlink" style="background-color:var(--canvas-secondary-background-color); color:var(--hyperlink-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Visited Hyperlink" style="background-color:var(--canvas-secondary-background-color); color:var(--visited-hyperlink-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Active Text" style="background-color:var(--canvas-secondary-background-color); color:var(--active-text-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Highlight" style="background-color:var(--highlight-background-color); color:var(--highlight-text-background-color);">A</block>' +
			'<block class="td-block" title="Active Caption" style="background-color:var(--active-title-background-color); color:var(--active-title-text-background-color);">A</block>' +
			'<block class="td-block" title="Inactive Caption" style="background-color:var(--inactive-title-background-color); color:var(--inactive-title-text-background-color);">A</block>' +
			'<block class="td-block" title="Alert" style="background-color:var(--canvas-background-color); color:var(--alert-background-color);">A</block>' +
			'<block class="td-block" title="Pause" style="background-color:var(--canvas-background-color); color:var(--pause-background-color);">A</block>' +
			'<block class="td-block" title="Warning" style="background-color:var(--canvas-background-color); color:var(--warning-background-color);">A</block>' +
			'<block class="td-block" title="Success" style="background-color:var(--canvas-background-color); color:var(--success-background-color);">A</block>' +
			'<block class="td-block" title="Progress" style="background-color:var(--canvas-background-color); color:var(--progress-background-color);">A</block>' +
			'<block class="td-block" title="Message" style="background-color:var(--canvas-background-color); color:var(--message-background-color);">A</block>' +

			'<block class="td-block" title="Secondary Alert" style="background-color:var(--canvas-secondary-background-color); color:var(--alert-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Pause" style="background-color:var(--canvas-secondary-background-color); color:var(--pause-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Warning" style="background-color:var(--canvas-secondary-background-color); color:var(--warning-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Success" style="background-color:var(--canvas-secondary-background-color); color:var(--success-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Progress" style="background-color:var(--canvas-secondary-background-color); color:var(--progress-secondary-background-color);">A</block>' +
			'<block class="td-block" title="Secondary Message" style="background-color:var(--canvas-secondary-background-color); color:var(--message-secondary-background-color);">A</block>' +


		'</div>' +
/**/
		'<hr>' +

/**/
'<div class="qortex-updater">' +
	'<div id="LunaLevit" style=" pointer-events: none; position: absolute; z-index: -2; width: 100%; height: 100%;">' +
		'<div class="invertion-on" style=" pointer-events: none; position: absolute; z-index: -2; width: 100%; height: 100%;">' +
			'<div id="LunaLevit3" class="desktop-background fandom-community-header__background" style="position:absolute; pointer-events:none;" id="desktop-background">' +
			'</div>' +
		'</div>' +
	'</div>' +
	'<div class="container">' +
		'<div class="evelution-floating-actions page-side-tools__wrapper">' +
			'<div class="evelution-floating-actions-container cpe-floating-button-group is-vertical page-side-tools">' +
				'<button class="cpe-floating-button check-for-updates page-side-tool"  cpe-tooltip="Check for updates">' +
					'<span class="cpe-icon material-icons">' +
							'update' +
					'</span>' +
				'</button>' +
				'<button class="cpe-floating-button is-pause-color pause-automatic-updates page-side-tool"  cpe-tooltip="Pause automatic updates">' +
					'<span class="cpe-icon material-icons">' +
							'pause' +
					'</span>' +
				'</button>' +
				'<button class="cpe-floating-button is-success-color install-all-updates page-side-tool"  cpe-tooltip="Install all updates">' +
					'<span class="cpe-icon material-icons">' +
							'system_update_alt' +
					'</span>' +
				'</button>' +
				'<button class="cpe-floating-button is-unaccented qora-qore-overview page-side-tool"  cpe-tooltip="Qora Qore Overview">' +
					'<span class="cpe-icon material-icons">' +
							'stadia_controller' +
					'</span>' +
				'</button>' +
				'<button class="cpe-floating-button is-unaccented qora-qore-overview page-side-tool"  cpe-tooltip="Updater Settings">' +
					'<span class="cpe-icon material-icons">' +
							'settings' +
					'</span>' +
				'</button>' +
				'<button class="cpe-floating-button is-unaccented about-updater page-side-tool"  cpe-tooltip="About Updater">' +
					'<span class="cpe-icon material-icons">' +
							'info' +
					'</span>' +
				'</button>' +
			'</div>' +
		'</div>' +
		'<section class="scroll">' +
		/**/
			'<div class="update-card">' +
				'<div class="logo">' +
					'<svg xmlns="http://www.w3.org/2000/svg">' +
						'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qoreLogo_dev" />' +
					'</svg>' +		
				'</div>' +
				'<div class="info">' +
					'<h3> Cumulative Update to Fifth Developer Preview of Q.Qore, season ΙΨ </h3>' +
					'<div class="actions">' +
						'<button class="cpe-button">' +
							'<span class="cpe-icon cpe-icon-small material-icons">' +
								'system_update_alt' +
							'</span>' +
							'<span> Install Update </span>' +
						'</button>' +
					'</div>' +
				'</div>' +
			'</div>' +
		/**/
			'<div class="update-card">' +
				'<div class="logo">' +
					'<svg xmlns="http://www.w3.org/2000/svg">' +
						'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qoreLogo_stable" />' +
					'</svg>' +		
				'</div>' +
				'<div class="info">' +
					'<h3> Feature Update to Q.Qore, version 22H1 </h3>' +
					'<div class="actions">' +
						'<div class="progress">' +
							'<span>Installing...  (40%)</span>' +
							'<progress max="100" value="40" ></progress>' +
						'</div>' +
						'<div class="cpe-button-group">' +
							'<button class="cpe-button is-pause-color is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'pause' +
								'</span>' +
							'</button>' +
							'<button class="cpe-button is-alert-color is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'stop' +
								'</span>' +
							'</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		/**/
			'<div class="update-card">' +
				'<div class="logo">' +
					'<svg xmlns="http://www.w3.org/2000/svg">' +
						'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qoreLogo_canary" />' +
					'</svg>' +		
				'</div>' +
				'<div class="info">' +
					'<h3> Early Preview to Qora Qore of 21/5/2022, season ΙΨ </h3>' +
					'<div class="actions">' +
						'<div class="progress">' +
							'<span>Paused...  (77%)</span>' +
							'<progress class="is-halted" max="100" value="77" ></progress>' +
						'</div>' +
						'<div class="cpe-button-group">' +
							'<button class="cpe-button is-pause-color is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'play_arrow' +
								'</span>' +
							'</button>' +
							'<button class="cpe-button is-alert-color is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'stop' +
								'</span>' +
							'</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		/**/
		/**/
			'<div class="update-card">' +
				'<div class="logo">' +
					'<svg xmlns="http://www.w3.org/2000/svg">' +
						'<use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qoreLogo_beta" />' +
					'</svg>' +		
				'</div>' +
				'<div class="info">' +
					'<h3>  Cumulative Update of Qora Qore, season ΙΨ </h3>' +
					'<div class="actions">' +
						'<div class="progress">' +
							'<span>Failed...  (27%)</span>' +
							'<progress class="is-failed" max="100" value="27" ></progress>' +
						'</div>' +
						'<div class="cpe-button-group">' +
							'<button class="cpe-button is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'refresh' +
								'</span>' +
							'</button>' +
							'<button class="cpe-button is-alert-color is-square">' +
								'<span class="cpe-icon cpe-icon-small material-icons">' +
									'stop' +
								'</span>' +
							'</button>' +
						'</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
		/**/

		'</section>' +
	'</div>' +
'</div>' +
/**/
'<hr>' +
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
				'<span class="material-icons cpe-icon cpe-icon-tiny cpe-icon-medium close">' +
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
	if (document.querySelector('.wikitable #auto9').checked) {
		var autocolor9 = 'auto';
	} else {
		var autocolor9 = $('#accenttextcolor').val();
	}
	if (document.querySelector('.wikitable #auto10').checked) {
		var autocolor10 = 'auto';
	} else {
		var autocolor10 = $('#taccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto11').checked) {
		var autocolor11 = 'auto';
	} else {
		var autocolor11 = $('#qaccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto12').checked) {
		var autocolor12 = 'auto';
	} else {
		var autocolor12 = $('#svaccentcolor').val();
	}

	if (document.querySelector('.wikitable #auto13').checked) {
		var autocolor13 = 'auto';
	} else {
		var autocolor13 = $('#saaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto14').checked) {
		var autocolor14 = 'auto';
	} else {
		var autocolor14 = $('#bodybg').val();
	}
	if (document.querySelector('.wikitable #auto15').checked) {
		var autocolor15 = 'auto';
	} else {
		var autocolor15 = $('#pagebg').val();
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
				 '--desktop-background-image-blend-mode:' + $('.blend_mode .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-color:' + autocolor14  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + autocolor15 + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--active-text-background-color:' + autocolor13  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--highlight-background-color:' + autocolor6 + ';\n' +
				 '--highlight-text-background-color:' + autocolor9 + ';\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + ';\n' +
				 '--visited-hyperlink-background-color:' + autocolor12 + ';\n' +
				 '--active-title-background-color:' + autocolor5  + ';\n' +
				 '--active-title-text-background-color:' + autocolor10  + ';\n' +
				 '--inactive-title-background-color:' + autocolor4  + ';\n' +
				 '--inactive-title-text-background-color:' + autocolor11  + ';\n' +
				 '--custom-font:' + customfont2 + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + ';\n' +
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
	if (document.querySelector('.wikitable #auto9').checked) {
		var autocolor9 = 'auto';
	} else {
		var autocolor9 = $('#accenttextcolor').val();
	}
	if (document.querySelector('.wikitable #auto10').checked) {
		var autocolor10 = 'auto';
	} else {
		var autocolor10 = $('#taccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto11').checked) {
		var autocolor11 = 'auto';
	} else {
		var autocolor11 = $('#qaccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto12').checked) {
		var autocolor12 = 'auto';
	} else {
		var autocolor12 = $('#svaccentcolor').val();
	}

	if (document.querySelector('.wikitable #auto13').checked) {
		var autocolor13 = 'auto';
	} else {
		var autocolor13 = $('#saaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto14').checked) {
		var autocolor14 = 'auto';
	} else {
		var autocolor14 = $('#bodybg').val();
	}
	if (document.querySelector('.wikitable #auto15').checked) {
		var autocolor15 = 'auto';
	} else {
		var autocolor15 = $('#pagebg').val();
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
				 '--desktop-background-image-blend-mode:' + $('.blend_mode .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-color:' + autocolor14  + ';\n' +
				 '--desktop-text-background-color:' + autocolor1  + ';\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + ';\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + ';\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + ';\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + ';\n' +
				 '--canvas-background-color:' + autocolor15 + ';\n' +
				 '--canvas-secondary-background-color:' + autocolor7  + ';\n' +
				 '--inactive-text-background-color:' + autocolor2  + ';\n' +
				 '--active-text-background-color:' + autocolor13  + ';\n' +
				 '--canvas-text-background-color:' + autocolor3  + ';\n' +
				 '--canvas-text-secondary-background-color:' + autocolor8  + ';\n' +
				 '--highlight-background-color:' + autocolor6 + ';\n' +
				 '--highlight-text-background-color:' + autocolor9 + ';\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + ';\n' +
				 '--visited-hyperlink-background-color:' + autocolor12 + ';\n' +
				 '--active-title-background-color:' + autocolor5  + ';\n' +
				 '--active-title-text-background-color:' + autocolor10  + ';\n' +
				 '--inactive-title-background-color:' + autocolor4  + ';\n' +
				 '--inactive-title-text-background-color:' + autocolor11  + ';\n' +
				 '--custom-font:' + customfont2 + ';\n' +
				 '--custom-secondary-font:' + customfont + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + ';\n' +
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
	if (document.querySelector('.wikitable #auto9').checked) {
		var autocolor9 = 'auto';
	} else {
		var autocolor9 = $('#accenttextcolor').val();
	}
	if (document.querySelector('.wikitable #auto10').checked) {
		var autocolor10 = 'auto';
	} else {
		var autocolor10 = $('#taccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto11').checked) {
		var autocolor11 = 'auto';
	} else {
		var autocolor11 = $('#qaccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto12').checked) {
		var autocolor12 = 'auto';
	} else {
		var autocolor12 = $('#svaccentcolor').val();
	}

	if (document.querySelector('.wikitable #auto13').checked) {
		var autocolor13 = 'auto';
	} else {
		var autocolor13 = $('#saaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto14').checked) {
		var autocolor14 = 'auto';
	} else {
		var autocolor14 = $('#bodybg').val();
	}
	if (document.querySelector('.wikitable #auto15').checked) {
		var autocolor15 = 'auto';
	} else {
		var autocolor15 = $('#pagebg').val();
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
				 "'desktop-background-image-blend-mode' => '" + $('.blend_mode .cpe-select__value').attr('value') + "',\n" +
				 "'desktop-background-color' => '" + autocolor14  + "',\n" +
				 "'desktop-text-background-color' => '" + autocolor1  + "',\n" +
				 "'desktop-background-horizontal-alignment' => '" + $(".bg_align2 .cpe-select__value").attr("value") + "',\n" +
				 "'desktop-background-vertical-alignment' => '" + $(".bg_align .cpe-select__value").attr("value") + "',\n" +
				 "'desktop-background-size' => '" + $(".bg_size .cpe-select__value").attr("value")  + "',\n" +
				 "'desktop-background-no-horizontal-tiling' => '" + (!( document.querySelector("input#tilingH").checked ))  + "',\n" +
				 "'desktop-background-no-vertical-tiling' => '" + (!( document.querySelector("input#tilingV").checked ))  + "',\n" +
				 "'canvas-background-color' => '" + autocolor15 + "',\n" +
				 "'canvas-secondary-background-color' => '" + autocolor7  + "',\n" +
				 "'inactive-text-background-color' => '" + autocolor2  + "',\n" +
				 "'active-text-background-color' => '" + autocolor13  + "',\n" +
				 "'canvas-text-background-color' => '" + autocolor3  + "',\n" +
				 "'canvas-text-secondary-background-color' => '" + autocolor8  + "',\n" +
				 "'highlight-background-color' => '" + autocolor6 + "',\n" +
				 "'highlight-text-background-color' => '" + autocolor9 + "',\n" +
				 "'hyperlink-background-color' => '" + $("#saccentcolor").val() + "',\n" +
				 "'visited-hyperlink-background-color' => '" + autocolor12 + "',\n" +
				 "'active-title-background-color' => '" + autocolor5  + "',\n" +
				 "'active-title-text-background-color' => '" + autocolor10  + "',\n" +
				 "'inactive-title-background-color' => '" + autocolor4  + "',\n" +
				 "'inactive-title-text-background-color' => '" + autocolor11  + "',\n" +
				 "'custom-font' => '" + customfont2 + "',\n" +
				 "'custom-secondary-font' => '" + customfont + "',\n" +
				 "'border-radius' => '" + $("#border-radius").val() + 'px'  + "',\n" +
				 "'icon-filter' => '" + $("#filter").val() + "',\n" +
				 "'icon-filter-hover' => '" + $("#filter2").val()  + "',\n" +
				 "'icon-filter-duration' => '" + $("#filter3").val() + 'ms' + "',\n" +
				 "'icon-filter-delay' => '" + $("#filter4").val() + 'ms' + "',\n" +
				 "'system-acryllic-opacity' => '" + $("#aopacity").val() + "',\n" +
				 "'system-generic-color-hue-shift' => '" + $("#gchs").val() + "',\n" +
				 "'system-generic-color-saturation' => '" + $("#gcs").val() + '%' + "',\n" +
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
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto14').checked = true;
	} else {
		document.querySelector('.wikitable #auto14').checked = false;
		$('#bodybg').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-color") );
	}
	$('.wikitable #bodybg').prop('disabled',(document.querySelector('.wikitable #auto14').checked) );
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
	// Body Image Filter
	$('#bodyimagefilter').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-filter") );

	// Body Image Blend Mode
	blend_mode = [mw.msg ('evelution-designer-setting-normal'), mw.msg ('evelution-designer-setting-multiply'), mw.msg ('evelution-designer-setting-screen'), mw.msg ('evelution-designer-setting-overlay'), mw.msg ('evelution-designer-setting-darken'), mw.msg ('evelution-designer-setting-lighten'), mw.msg ('evelution-designer-setting-colordodge'), mw.msg ('evelution-designer-setting-colorburn'), mw.msg ('evelution-designer-setting-hardlight'), mw.msg ('evelution-designer-setting-softlight'), mw.msg ('evelution-designer-setting-difference'), mw.msg ('evelution-designer-setting-exclusion'), mw.msg ('evelution-designer-setting-hue'), mw.msg ('evelution-designer-setting-saturation'), mw.msg ('evelution-designer-setting-color'), mw.msg ('evelution-designer-setting-luminosity')][['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-blend-mode") ) ]
	$('.blend_mode .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-image-blend-mode") );
	$('.blend_mode .cpe-select__value').html( blend_mode );


	// Body Image Alignment V
	bg_align = [mw.msg ('evelution-designer-setting-top'), mw.msg ('evelution-designer-setting-middle'), mw.msg ('evelution-designer-setting-bottom')][["top", "center", "bottom"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment") ) ]
	$('.bg_align .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-vertical-alignment") );
	$('.bg_align .cpe-select__value').html( bg_align );
	// Body Image Alignment H
	bg_align2 = [mw.msg ('evelution-designer-setting-left'), mw.msg ('evelution-designer-setting-middle'), mw.msg ('evelution-designer-setting-right')][["left", "center", "right"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment") ) ]
	$('.bg_align2 .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-horizontal-alignment") );
	$('.bg_align2 .cpe-select__value').html( bg_align2 );
	// Body Image Size
	bg_size = [mw.msg ('evelution-designer-setting-cover'), mw.msg ('evelution-designer-setting-contain'), mw.msg ('evelution-designer-setting-stretched'), mw.msg ('evelution-designer-setting-full')][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") ) ]
	$('.bg_size .cpe-select__value').attr('value', getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-size") )
	$('.bg_size .cpe-select__value').html( bg_size );
	// Body Image Tiling
	document.querySelector('input#tilingH').checked = (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-horizontal-tiling") === 'false');
	document.querySelector('input#tilingV').checked = (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--desktop-background-no-vertical-tiling") === 'false');
	// Page BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto15').checked = true;
	} else {
		document.querySelector('.wikitable #auto15').checked = false;
		$('#pagebg').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--canvas-background-color") );
	}
	$('.wikitable #pagebg').prop('disabled',(document.querySelector('.wikitable #auto15').checked) );
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

	// Visited BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto13').checked = true;
	} else {
		document.querySelector('.wikitable #auto13').checked = false;
		$('#saaccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-text-background-color") );
	}
	$('.wikitable #saaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto13').checked) );


	// Anchor BG
	$('#saccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--hyperlink-background-color") );
	// Visited BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--visited-hyperlink-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto12').checked = true;
	} else {
		document.querySelector('.wikitable #auto12').checked = false;
		$('#svaccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--visited-hyperlink-background-color") );
	}
	$('.wikitable #svaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto12').checked) );


	// Accent BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto6').checked = true;
	} else {
		document.querySelector('.wikitable #auto6').checked = false;
		$('#accentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-background-color") );
	}
	$('.wikitable #accentcolor').prop('disabled',(document.querySelector('.wikitable #auto6').checked) );

	// Accent Text BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto9').checked = true;
	} else {
		document.querySelector('.wikitable #auto9').checked = false;
		$('#accenttextcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--highlight-text-background-color") );
	}
	$('.wikitable #accenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto9').checked) );


	// Caret Color
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto5').checked = true;
	} else {
		document.querySelector('.wikitable #auto5').checked = false;
		$('#taccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-background-color") );
	}
	$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );

	// Active Title BG
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto10').checked = true;
	} else {
		document.querySelector('.wikitable #auto10').checked = false;
		$('#taccenttextcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--active-title-text-background-color") );
	}
	$('.wikitable #taccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto10').checked) );


	// Quaternary Accent Color
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto4').checked = true;
	} else {
		document.querySelector('.wikitable #auto4').checked = false;
		$('#qaccentcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-background-color") );
	}
	$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );

	// Quaternary Accent Text
	if (getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto11').checked = true;
	} else {
		document.querySelector('.wikitable #auto11').checked = false;
		$('#qaccenttextcolor').val( getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--inactive-title-text-background-color") );
	}
	$('.wikitable #qaccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto11').checked) );


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
	$('#gcs').val( parseInt(getComputedStyle(document.querySelector('.cpe-theming.visualcolors-' + window.MW18ActiveColors + '.theme-' + window.MW18ActiveTheme)).getPropertyValue("--system-generic-color-saturation")) );

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
	if (document.querySelector('.wikitable #auto9').checked) {
		var autocolor9 = 'auto';
	} else {
		var autocolor9 = $('#accenttextcolor').val();
	}
	if (document.querySelector('.wikitable #auto10').checked) {
		var autocolor10 = 'auto';
	} else {
		var autocolor10 = $('#taccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto11').checked) {
		var autocolor11 = 'auto';
	} else {
		var autocolor11 = $('#qaccenttextcolor').val();
	}

	if (document.querySelector('.wikitable #auto12').checked) {
		var autocolor12 = 'auto';
	} else {
		var autocolor12 = $('#svaccentcolor').val();
	}

	if (document.querySelector('.wikitable #auto13').checked) {
		var autocolor13 = 'auto';
	} else {
		var autocolor13 = $('#saaccentcolor').val();
	}
	if (document.querySelector('.wikitable #auto14').checked) {
		var autocolor14 = 'auto';
	} else {
		var autocolor14 = $('#bodybg').val();
	}
	if (document.querySelector('.wikitable #auto15').checked) {
		var autocolor15 = 'auto';
	} else {
		var autocolor15 = $('#pagebg').val();
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
				 '--desktop-background-image-blend-mode:' + $('.blend_mode .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-color:' + autocolor14  + '!important;\n' +
				 '--desktop-text-background-color:' + autocolor1  + '!important;\n' +
				 '--desktop-background-horizontal-alignment:' + $('.bg_align2 .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-vertical-alignment:' + $('.bg_align .cpe-select__value').attr('value') + '!important;\n' +
				 '--desktop-background-size:' + $('.bg_size .cpe-select__value').attr('value')  + '!important;\n' +
				 '--desktop-background-no-horizontal-tiling:' + (!( document.querySelector('input#tilingH').checked ))  + '!important;\n' +
				 '--desktop-background-no-vertical-tiling:' + (!( document.querySelector('input#tilingV').checked ))  + '!important;\n' +
				 '--canvas-background-color:' + autocolor15 + '!important;\n' +
				 '--canvas-secondary-background-color:' + autocolor7  + '!important;\n' +
				 '--inactive-text-background-color:' + autocolor2  + '!important;\n' +
				 '--active-text-background-color:' + autocolor13  + '!important;\n' +
				 '--canvas-text-background-color:' + autocolor3  + '!important;\n' +
				 '--canvas-text-secondary-background-color:' + autocolor8  + '!important;\n' +
				 '--highlight-background-color:' + autocolor6 + '!important;\n' +
				 '--highlight-text-background-color:' + autocolor9 + '!important;\n' +
				 '--hyperlink-background-color:' + $('#saccentcolor').val() + '!important;\n' +
				 '--visited-hyperlink-background-color:' + autocolor12 + '!important;\n' +
				 '--active-title-background-color:' + autocolor5  + '!important;\n' +
				 '--active-title-text-background-color:' + autocolor10  + '!important;\n' +
				 '--inactive-title-background-color:' + autocolor4  + '!important;\n' +
				 '--inactive-title-text-background-color:' + autocolor11  + '!important;\n' +
				 '--custom-font:' + customfont2 + '!important;\n' +
				 '--custom-secondary-font:' + customfont + '!important;\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + '!important;\n' +
				 '--icon-filter:' + $('#filter').val() + '!important;\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + '!important;\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + '!important;\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + '!important;\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + '!important;\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + '!important;\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + '!important;\n' +
				 '}' // Ending
			document.querySelector("#mw-content-text .theme-designer-css").innerHTML = result;
			try {
				CompileThemingEngine(true,true)
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
						CompileThemingEngine(true,true);
					}
				}
			}

	if (!window.MW18TDTest) {
		window.MW18TDTest = true;
	}
}


function TestDynamicTheme() {
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
	CompileThemingEngine(true,true);

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
$('.wikitable #auto9').click(
							function(e) {
								e.preventDefault
								$('.wikitable #accenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto9').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto10').click(
							function(e) {
								e.preventDefault
								$('.wikitable #taccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto10').checked) );
								TestDynamicTheme();
							}   
						);

$('.wikitable #auto11').click(
							function(e) {
								e.preventDefault
								$('.wikitable #qaccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto11').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto12').click(
							function(e) {
								e.preventDefault
								$('.wikitable #svaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto12').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto13').click(
							function(e) {
								e.preventDefault
								$('.wikitable #saaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto13').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto14').click(
							function(e) {
								e.preventDefault
								$('.wikitable #bodybg').prop('disabled',(document.querySelector('.wikitable #auto14').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto15').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg').prop('disabled',(document.querySelector('.wikitable #auto15').checked) );
								TestDynamicTheme();
							}   
						);
// UpdateRangeInputs();
	var ranges = document.querySelectorAll('.cpe-theme-designer input[type="range"]');
	ranges.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.value) - x.getAttribute('min') ) * 100) / (x.getAttribute('max') - x.getAttribute('min')) ) + '%'  );
	});

	var progresses = document.querySelectorAll('progress');
	progresses.forEach(function(x) {
		x.style.setProperty("--range-percent",  (( ((x.getAttribute('value')) - 0 ) * 100) / (x.getAttribute('max') - 0) ) + '%'  );
	});

	
	var ranges2 = document.querySelectorAll('.cpe-theme-designer input[type="range"]');
	ranges2.forEach(function(x) {
		x.addEventListener("input", function(e) { UpdateRange(); });
	});

// Misc
	$("input[type='color']").change( function(e) { TestDynamicTheme(); } ); // Change
	$("input.designer-text").change( function(e) { TestDynamicTheme(); } ); // Change


/* Select Inputs */
	$(' .cpe-dropdown.cpe-select').blur(function() { TestDynamicTheme() })
	$(' .cpe-theme-designer input[type="range"]').change(function() { TestDynamicTheme() })
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
									if (selected != undefined) {
										var content = selected.innerText;
										document.querySelector('.cpe-select:focus-within .cpe-select__value').setAttribute("value", value);
										document.querySelector('.cpe-select:focus-within .cpe-select__value').innerHTML= content;
										selected = undefined;
									}
								}));
        }) );
	});
					
					


}

function InitSBT() {
	// Change Title
	$("container").append(
		'<div style="--backdrop-opacity:var(--dropdown-opacity); position:fixed; display:flex; top:0; left:0; width:100%; height:100%; align-items:center; gap:2px; justify-content:center; background-color:rgba(var(--canvas-secondary-background-color-rgb),var(--backdrop-opacity)); color:var(--canvas-text-secondary-background-color); -webkit-backdrop-filter:var(--acryllic-filter); backdrop-filter:var(--acryllic-filter); z-index:999999999;" class="SBT">' +
		'<div class="lunalevit sbtll hidden"></div>' +
		'<section>' +
		'<input type="checkbox" name="SBT2" id="none"></input>' +
		'<label for="none">Disable</label>' +
		'</section>' +
		'<section>' +
		'<input type="radio" name="SBT" checked id="AC"></input>' +
		'<label for="AC">Luna Lovit</label>' +
		'</section>' +
		'<section>' +
		'<input type="radio" name="SBT" id="MI"></input>' +
		'<label for="MI">Luna Levit</label>' +
		'</section>' +
		'</div>'
	);
	
$('#AC[name="SBT"]').click(
							function(e) {
								e.preventDefault
								$('div.sbtll').addClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","var(--dropdown-opacity)");
								$('div.SBT').css("background-color","rgba(var(--canvas-secondary-background-color-rgb),var(--dropdown-opacity))");
							}   
);

$('#MI[name="SBT"]').click(
							function(e) {
								e.preventDefault
								$('div.sbtll').removeClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","1");
								$('div.SBT').css("background-color","var(--mica-background-color)");
							}   
);

$('#TA[name="SBT"]').click(
							function(e) {
								e.preventDefault
								$('div.sbtll').removeClass("hidden").addClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","1");
								$('div.SBT').css("background-color","var(--tabbed-background-color)");
							}   
);


$('#none[name="SBT2"]').click(
							function(e) {
								e.preventDefault
								$('div.SBT').remove();
							}   
);


}

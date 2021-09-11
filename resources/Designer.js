(function () {

if ($("body.page-CPE_ThemeDesigner").length) {
	InitDesigner()
}

})();

function InitDesigner() {
	// Change Title
	$(".evelution-page-header .evelution-title").html( mw.msg( 'evelution-designer-title' ) );
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
		'<div class="cpe-is-hidden" style="display:non;">' +
		// Body Background Color
			'<datalist id="bodybg_colors">' +
				'<option value="#1d1d1d">' +
				'<option value="#8d0017">' +
				'<option value="#ac0000">' +
				'<option value="#d34500">' +
				'<option value="#eb9900">' +
				'<option value="#ffb317">' +
				'<option value="#7d9b34">' +
				'<option value="#5ea200">' +
				'<option value="#417800">' +
				'<option value="#1d5100">' +
				'<option value="#003c00">' +
				'<option value="#44a177">' +
				'<option value="#008d8f">' +
				'<option value="#00a8a9">' +
				'<option value="#009bf0">' +
				'<option value="#0068b7">' +
				'<option value="#009381">' +
				'<option value="#091a45">' +
				'<option value="#180052">' +
				'<option value="#490090">' +
				'<option value="#711993">' +
				'<option value="#8d37af">' +
				'<option value="#8c005a">' +
				'<option value="#ab0064">' +
				'<option value="#ea0098">' +
				'<option value="#5e5e5e">' +
				'<option value="#be0021">' +
				'<option value="#f73400">' +
				'<option value="#ff892b">' +
				'<option value="#ffc12c">' +
				'<option value="#ffc91a">' +
				'<option value="#8acb00">' +
				'<option value="#6db000">' +
				'<option value="#169900">' +
				'<option value="#58cc7d">' +
				'<option value="#00d1d2">' +
				'<option value="#41c3ff">' +
				'<option value="#008ee1">' +
				'<option value="#00baff">' +
				'<option value="#0075c6">' +
				'<option value="#4617b4">' +
				'<option value="#6800b3">' +
				'<option value="#a13bc9">' +
				'<option value="#bd56e5">' +
				'<option value="#c02883">' +
				'<option value="#f900a5">' +
				'<option value="#ff5fdc">' +
				'<option value="#e2e2e2">' +
			'</datalist>' +
			'<datalist id="headercolor_colors">' +
				'<option value="#ffb900">' +
				'<option value="#ff8c00">' +
				'<option value="#f7630c">' +
				'<option value="#ca5010">' +
				'<option value="#da3b01">' +
				'<option value="#ef6950">' +
				'<option value="#d13438">' +
				'<option value="#ff4343">' +
				'<option value="#e74856">' +
				'<option value="#e81023">' +
				'<option value="#ea005e">' +
				'<option value="#c30052">' +
				'<option value="#bf0077">' +
				'<option value="#c239b3">' +
				'<option value="#9a0089">' +
				'<option value="#0078d7">' +
				'<option value="#0063b1">' +
				'<option value="#8e8cd8">' +
				'<option value="#6b69d6">' +
				'<option value="#8764b8">' +
				'<option value="#744da9">' +
				'<option value="#b146c2">' +
				'<option value="#881798">' +
				'<option value="#0099bc">' +
				'<option value="#2d7d9a">' +
				'<option value="#00b7c3">' +
				'<option value="#028387">' +
				'<option value="#00b294">' +
				'<option value="#018574">' +
				'<option value="#00cc6a">' +
				'<option value="#10893e">' +
				'<option value="#7a7574">' +
				'<option value="#5d5a58">' +
				'<option value="#86768a">' +
				'<option value="#515c6b">' +
				'<option value="#567c73">' +
				'<option value="#486860">' +
				'<option value="#498205">' +
				'<option value="#107c10">' +
				'<option value="#767676">' +
				'<option value="#4c4a48">' +
				'<option value="#69797e">' +
				'<option value="#4a5459">' +
				'<option value="#647c64">' +
				'<option value="#525e54">' +
				'<option value="#847545">' +
				'<option value="#7e735f">' +
			'</datalist>' +
			'<datalist id="toolbarcolor_colors">' +
				'<option value="#ababab">' +
				'<option value="#8acfff">' +
				'<option value="#f598d6">' +
				'<option value="#f3d240">' +
				'<option value="#add85f">' +
				'<option value="#78d9d9">' +
				'<option value="#ffaf51">' +
				'<option value="#ff6f6f">' +
				'<option value="#f359a8">' +
				'<option value="#47cf74">' +
				'<option value="#c48aff">' +
				'<option value="#58b1fc">' +
				'<option value="#9898ff">' +
				'<option value="#c3b5a8">' +
				'<option value="#ffffff">' +
				'<option value="#576dcd">' +
				'<option value="#4074ff">' +
				'<option value="#4099e1">' +
				'<option value="#40b2cc">' +
				'<option value="#40c5ae">' +
				'<option value="#40c280">' +
				'<option value="#9bcc3f">' +
				'<option value="#fce840">' +
				'<option value="#f98a48">' +
				'<option value="#e1676a">' +
				'<option value="#ed4c5a">' +
				'<option value="#ef4086">' +
				'<option value="#bc3b8c">' +
				'<option value="#7e73a5">' +
				'<option value="#879289">' +
			'</datalist>' +
			'<datalist id="pagebg_colors">' +
				'<option value="#000000">' +
				'<option value="#ffffff">' +
				'<option value="#dcdcdc">' +
				'<option value="#787878">' +
				'<option value="#464646">' +
				'<option value="#0a3b76">' +
				'<option value="#4395d1">' +
				'<option value="#99d9ea">' +
				'<option value="#0076a3">' +
				'<option value="#0d686b">' +
				'<option value="#00a99d">' +
				'<option value="#7accc8">' +
				'<option value="#82ca9c">' +
				'<option value="#74a402">' +
				'<option value="#c4df9b">' +
				'<option value="#84871c">' +
				'<option value="#d9d56f">' +
				'<option value="#fff468">' +
				'<option value="#fff799">' +
				'<option value="#ffc20e">' +
				'<option value="#eb6119">' +
				'<option value="#fbaf5d">' +
				'<option value="#e57300">' +
				'<option value="#c14000">' +
				'<option value="#9e6b52">' +
				'<option value="#8c6239">' +
				'<option value="#c7b299">' +
				'<option value="#b82832">' +
				'<option value="#d85171">' +
				'<option value="#fedfec">' +
				'<option value="#563f7f">' +
				'<option value="#a186be">' +
				'<option value="#d9cfe5">' +
			'</datalist>' +
			'<datalist id="pagebg3_colors">' +
				'<option value="#ffffff">' +
				'<option value="#e2e2e2">' +
				'<option value="#bfbfbf">' +
				'<option value="#2b2b2b">' +
				'<option value="#000000">' +
				'<option value="#ff0000">' +
				'<option value="#00ff00">' +
				'<option value="#0000ff">' +
				'<option value="#ffff00">' +
				'<option value="#ff00ff">' +
				'<option value="#00ffff">' +
			'</datalist>' +
			'<datalist id="pagebg2_colors">' +
				'<option value="#a3a3a3">' +
				'<option value="#3c3c3c">' +
				'<option value="#6e6e6e">' +
				'<option value="#cccccc">' +
				'<option value="#808080">' +
				'<option value="#800000">' +
				'<option value="#008000">' +
				'<option value="#000080">' +
				'<option value="#808000">' +
				'<option value="#800080">' +
				'<option value="#008080">' +
			'</datalist>' +
			'<datalist id="anchorcolor_colors">' +
				'<option value="#00ff00">' +
				'<option value="#8080ff">' +
				'<option value="#c0c0c0">' +
				'<option value="#000000">' +
				'<option value="#ffffff">' +
				'<option value="#ffff00">' +
				'<option value="#77ffff">' +
				'<option value="#00007f">' +
				'<option value="#600000">' +
				'<option value="#ff0000">' +
				'<option value="#952aab">' +
				'<option value="#ff0066">' +
				'<option value="#fa6d6d">' +
				'<option value="#00ffff">' +
				'<option value="#ccffff">' +
				'<option value="#c056a2">' +
				'<option value="#ff6ec7">' +
				'<option value="#ff7f00">' +
				'<option value="#8e236b">' +
				'<option value="#7f500d">' +
				'<option value="#0366cc">' +
				'<option value="#fbf305">' +
				'<option value="#ff6403">' +
				'<option value="#dd0907">' +
				'<option value="#f20884">' +
				'<option value="#4700a5">' +
				'<option value="#0000d3">' +
				'<option value="#02abe2">' +
				'<option value="#1fb714">' +
				'<option value="#006412">' +
				'<option value="#562c05">' +
				'<option value="#90713a">' +
				'<option value="#404040">' +
				'<option value="#117dbb">' +
				'<option value="#8b12ae">' +
				'<option value="#4da60c">' +
				'<option value="#a74f01">' +
			'</datalist>' +
			'<datalist id="accentcolor_colors">' +
				'<option value="#ff8c00">' +
				'<option value="#e81123">' +
				'<option value="#d13438">' +
				'<option value="#c30052">' +
				'<option value="#bf0077">' +
				'<option value="#9a0089">' +
				'<option value="#881798">' +
				'<option value="#744da9">' +
				'<option value="#10893e">' +
				'<option value="#107c10">' +
				'<option value="#018574">' +
				'<option value="#2d7d9a">' +
				'<option value="#0063b1">' +
				'<option value="#6b69d6">' +
				'<option value="#8e8cd8">' +
				'<option value="#8764b8">' +
				'<option value="#038387">' +
				'<option value="#486860">' +
				'<option value="#525e54">' +
				'<option value="#7e735f">' +
				'<option value="#4c4a48">' +
				'<option value="#515c6b">' +
				'<option value="#4a5459">' +
				'<option value="#000000">' +
				'<option value="#ffffff">' +
			'</datalist>' +
			'<datalist id="caretcolor_colors">' +
				'<option value="#bfff00">' +
				'<option value="#fafa00">' +
				'<option value="#ffbf00">' +
				'<option value="#ff00bf">' +
				'<option value="#00bfff">' +
				'<option value="#00ffbf">' +
				'<option value="#bf00ff">' +
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
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1d1d1d" id="bodybg" list="bodybg_colors" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-text-color' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="checkbox" name="auto1" id="auto1">' + '<label for="auto1">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#8d0017" id="bodybg2" list="bodybg_colors" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-community-image' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="url" id="bodyimage" class="cpe-input" style="width:130px; min-width:130px;" placeholder="URL" />' + // Body Background 
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
				   '<div class="cpe-dropdown cpe-select">' +
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
				   '<div class="cpe-dropdown cpe-select">' +
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
				   '<div class="cpe-dropdown cpe-select">' +
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
				   '<div class="cpe-dropdown cpe-select">' +
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
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#000000" id="pagebg" list="pagebg_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-text' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto3" id="auto3">' + '<label for="auto3">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg3" list="pagebg3_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-page-border' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto2" id="auto2">' + '<label for="auto2">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color"  class="cpe-button is-square" style="width:68px;" value="#808080" id="pagebg2" list="pagebg2_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-anchor' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#00ff00" id="anchorcolor" list="anchorcolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ff8c00" id="accentcolor" list="accentcolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-sticky-header' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffb900" id="headercolor" list="headercolor_colors" />' + // Page BG
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-toolbar' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto4" id="auto4">' + '<label for="auto4">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ababab" id="toolbarcolor" list="toolbarcolor_colors" />' + // Page BG
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
					'<input type="color" class="cpe-button is-square" style="width:68px;" value="#bfff00" id="caretcolor" list="caretcolor_colors" />' + // Page BG
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
					'<input type="text" id="secondfont" class="cpe-input" style="width:130px; min-width:130px;" placeholder="Font" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter" class="cpe-input" style="width:130px; min-width:130px;" placeholder="Filter" value="opacity(1)" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th style="width:150px;">' + 
					mw.msg( 'evelution-designer-filter-hover' ) + 
				'</td>' +

				'<td style="text-align:center; width:150px">' +
					'<input type="text" id="filter2" class="cpe-input" style="width:130px; min-width:130px;" placeholder="Filter" value="opacity(0.8)" />' + // Body Background 
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
		'</table>'
	);
	SelectInputs();
	$("html").attr("visualcolors", "standard"); // Unset Visual Colors mode
	ColorUpdate();
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
		var autocolor4 = $('#toolbarcolor').val();
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
		result = '[theme="' + $('html').attr('theme') + '"][visualcolors="standard"] {\n' + // Beginning
				 '--community-background-image:' + image + ';\n' +
				 '--community-background-image-opacity:' + $('#bodyimageopacity').val() + "%" + ';\n' +
				 '--community-background-color:' + $('#bodybg').val()  + ';\n' +
				 '--community-header-text-color:' + autocolor1  + ';\n' +
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
				 '--toolbar-background-color:' + autocolor4  + ';\n' +
				 '--caret-color:' + autocolor5  + ';\n' +
				 '--custom-secondary-font:' + $('#secondfont').val() + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--logo-filter:' + $('#filter').val() + ';\n' +
				 '--logo-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--logo-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--logo-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '}' // Ending
		 navigator.clipboard.writeText(result);
		 alert('Successfully copied CPE Framework theme to Clipboard')
}

function PasteTheme() {
	// Pastes theme
	// Body BG
	$('#bodybg').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-background-color") );
	// Body Header Text
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-color") === 'auto' ) {
		document.querySelector('.wikitable #auto1').checked = true;
	} else {
		document.querySelector('.wikitable #auto1').checked = false;
		$('#bodybg2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--community-header-text-color") );
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
	// Toolbar BG
	if (getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto4').checked = true;
	} else {
		document.querySelector('.wikitable #auto4').checked = false;
		$('#toolbarcolor').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--toolbar-background-color") );
	}
	$('.wikitable #toolbarcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
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
	$('#filter2').val( getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter2") );
	// Filter Duration
	$('#filter3').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter-duration")) );
	// Filter Delay
	$('#filter4').val( parseInt(getComputedStyle(document.querySelector('html')).getPropertyValue("--logo-filter-delay")) );
	UpdateRangeInputs();
}

function TestTheme() {
	// Tests theme
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', false);
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
		var autocolor4 = $('#toolbarcolor').val();
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
	document.querySelector('html').style.setProperty("--community-header-text-color", autocolor1 );
	document.querySelector('html').style.setProperty("--page-background-color", $('#pagebg').val() );
	document.querySelector('html').style.setProperty("--page-border-background-color", autocolor2 );
	document.querySelector('html').style.setProperty("--page-text-background-color", autocolor3 );
	document.querySelector('html').style.setProperty("--anchor-background-color", $('#anchorcolor').val() );
	document.querySelector('html').style.setProperty("--accent-background-color", $('#accentcolor').val() );
	document.querySelector('html').style.setProperty("--sticky-header-background-color", $('#headercolor').val() );
	document.querySelector('html').style.setProperty("--toolbar-background-color", autocolor4 );
	document.querySelector('html').style.setProperty("--caret-color", autocolor5 );
	document.querySelector('html').style.setProperty("--border-radius", $('#border-radius').val() + "px" );
	document.querySelector('html').style.setProperty("--custom-secondary-font", $('#secondfont').val() );
	document.querySelector('html').style.setProperty("--logo-filter", $('#filter').val() );
	document.querySelector('html').style.setProperty("--logo-filter-hover", $('#filter2').val() );
	document.querySelector('html').style.setProperty("--logo-filter-duration", $('#filter3').val() + "ms" );
	document.querySelector('html').style.setProperty("--logo-filter-delay", $('#filter4').val() + "ms" );
	ColorUpdate(true,true);
}


function ClearTheme() {
	// Tests theme
	$(".evelution-page-header-contribution-buttons .designer-buttons2 .theme-clear-button").prop('disabled', true);
	document.querySelector('html').style.removeProperty("--community-background-color");
	document.querySelector('html').style.removeProperty("--community-background-image");
	document.querySelector('html').style.removeProperty("--community-background-image-opacity");
	document.querySelector('html').style.removeProperty("--community-background-mode");
	document.querySelector('html').style.removeProperty("--community-background-vertical-alignment");
	document.querySelector('html').style.removeProperty("--community-background-horizontal-alignment");
	document.querySelector('html').style.removeProperty("--community-background-size");
	document.querySelector('html').style.removeProperty("--community-background-no-horizontal-tiling");
	document.querySelector('html').style.removeProperty("--community-background-no-vertical-tiling");
	document.querySelector('html').style.removeProperty("--community-header-text-color");
	document.querySelector('html').style.removeProperty("--page-background-color");
	document.querySelector('html').style.removeProperty("--page-border-background-color");
	document.querySelector('html').style.removeProperty("--page-text-background-color");
	document.querySelector('html').style.removeProperty("--anchor-background-color");
	document.querySelector('html').style.removeProperty("--accent-background-color");
	document.querySelector('html').style.removeProperty("--sticky-header-background-color");
	document.querySelector('html').style.removeProperty("--toolbar-background-color");
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
UpdateRangeInputs();
DropDownUpdate();
/* Select Inputs */
$('.wikitable #auto1').click(
							function(e) {
								e.preventDefault
								$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
							}   
						);
$('.wikitable #auto2').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
							}   
						);
$('.wikitable #auto3').click(
							function(e) {
								e.preventDefault
								$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
							}   
						);
$('.wikitable #auto4').click(
							function(e) {
								e.preventDefault
								$('.wikitable #toolbarcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
							}   
						);
$('.wikitable #auto5').click(
							function(e) {
								e.preventDefault
								$('.wikitable #caretcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
							}   
						);

}
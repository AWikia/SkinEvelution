window.ThemingEngine_TDTest = false;

function getParams() {	//	In case it is missing
	if (window.location.search != "") {
		var params = window.location.search.split("?")[1].split("&");
    } else {
		var params = []
    }
	return params
}

(function () {

    allow_td = false;
    getParams().forEach(function (param) {
        var key = param.split("=")[0];
        var value = param.split("=")[1];

        switch (key) {
            case 'allowthemedesigner':
				allow_td = (value==0) ? false : true;
                break;
        }
    });

    if ( ($("#footer-icons img[alt='Miraheze Wiki Hosting']").length) || ($("#footer-icons img[alt='Hosted by Miraheze']").length) || ($("#footer-icons img[alt='7 years of Miraheze!']").length) ) { // Don't run with disabled designer or on Miraheze Wikis
		$(".link.theme-designer").remove();
		if (allow_td) {
			LoadThemeDesigner();
		}
		return
    } else {
		const mwConfig2 = mw.config.get([
			"wgNamespaceNumber",
			"wgTitle",
			"wgCanonicalSpecialPageName",
			"wgArticlePath"
		]);

		if (mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgCanonicalSpecialPageName === "Specialpages") {
			$("#mw-specialpagesgroup-other + .mw-specialpages-list ul").append('<li><a href="' + mwConfig2.wgArticlePath.replace("$1", 'Special:CPEThemeDesigner') + '" title="CPE Theme Designer">' + mw.msg( 'evelution-designer-title' ) + '</a></li>')
		}
		LoadThemeDesigner();
}


})();

function LoadThemeDesigner() {

  const mwConfig2 = mw.config.get([
    "wgNamespaceNumber",
    "wgTitle",
  ]);


if (mwConfig2.wgNamespaceNumber === -1 && mwConfig2.wgTitle === "CPEThemeDesigner") {

	$.when( mw.loader.using( [ 'mediawiki.jqueryMsg' ] ), $.ready ).then( function() {
	InitDesigner();
    } );
}


}

function InitDesigner() {
	// Change Title
	$(".evelution-page-header .evelution-title > span, .evelution-header .namespace-with-title .title > a > .firstHeading").html( mw.msg( 'evelution-designer-title' ) );

	$(".link[designer-on]").addClass( 'active' );
	document.querySelector("body").classList.replace("mw-invalidspecialpage","mw-special-cpethemedesigner");
	// Remove the following things
	$(".evelution-article #catlinks, .td-off, .evelution-floating-actions .cpe-floating-button.edit, .evelution-floating-actions .cpe-floating-button.history").remove();
	// Put new buttons
	// Copy theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<div class="cpe-dropdown has-reversed-nested-menus is-flipped theme-copy" cpe-orient="land" tabindex="-1">' +
			'<button class="cpe-floating-button theme-copy page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-copy' ) + ' ">' +
				'<span class="cpe-icon material-icons">' +
					'content_copy' +
				'</span>' +
			'</button>' +
			'<div class="cpe-dropdown__content is-not-scrollable is-left-aligned">' +
				'<ul class="cpe-list is-linked">' +
					'<li>' +
						'<a class="theme-copy-button action-link">' +
							'<span>CSS</span>' +
						'</a>' +
					'</li>' +
					'<li>' +
						'<a class="theme-copy-button-2 action-link">' +
							'<span>PHP</span>' +
						'</a>' +
					'</li>' +
				'</ul>' +
			'</div>' +
		'</div>'
	);
	$(".evelution-floating-actions.extra-actions .theme-copy-button").click( function(e) { CopyTheme();  });
	$(".evelution-floating-actions.extra-actions .theme-copy-button-2").click( function(e) { CopyTheme2();  });

	// Paste theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<div class="cpe-dropdown has-reversed-nested-menus is-flipped theme-paste" cpe-orient="land" tabindex="-1">' +
			'<button class="cpe-floating-button is-alternate theme-paste page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-paste' ) + '">' +
				'<span class="cpe-icon material-icons">' +
					'content_paste' +
				'</span>' +
			'</button>' +
			'<div class="cpe-dropdown__content is-not-scrollable">' +
				'<ul class="cpe-list is-linked">' +
					'<li>' +
						'<a class="theme-paste-button action-link">' +
							'<span>'+ mw.msg( 'evelution-designer-current' ) +' ('+  mw.msg( 'evelution-color-dynamic' ) +')</span>' +
						'</a>' +
					'</li>' +
					'<li>' +
						'<a class="theme-paste-button-4 action-link">' +
							'<span>'+ mw.msg( 'evelution-designer-current' ) +' ('+  mw.msg( 'evelution-designer-static' ) +')</span>' +
						'</a>' +
					'</li>' +
					'<li>' +
						'<a class="theme-paste-button-2 action-link">' +
							'<span>'+ mw.msg( 'evelution-designer-random' ) +' ('+  mw.msg( 'evelution-color-colors' ) +')</span>' +
						'</a>' +
					'</li>' +
					'<li>' +
						'<a class="theme-paste-button-3 action-link">' +
							'<span>'+ mw.msg( 'evelution-designer-random' ) +' ('+  mw.msg( 'evelution-designer-setting-full' ) +')</span>' +
						'</a>' +
					'</li>' +
				'</ul>' +
			'</div>' +
		'</div>'
	);

	$(".evelution-floating-actions.extra-actions .theme-paste-button").click( function(e) { PasteTheme();  });
	$(".evelution-floating-actions.extra-actions .theme-paste-button-4").click( function(e) { PasteTheme(false);  });
	$(".evelution-floating-actions.extra-actions .theme-paste-button-2").click( function(e) { RandomTheme();  });
	$(".evelution-floating-actions.extra-actions .theme-paste-button-3").click( function(e) { RandomTheme(true);  });
	// Apply theme
	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-alert-color theme-apply-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-apply' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'verified' +
			'</span>' +
		'</button>'
	);


	$(".evelution-floating-actions.extra-actions .theme-apply-button").click( function(e) { ApplyTheme();  });
	

	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-success-color theme-test-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-test' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'build' +
			'</span>' +
		'</button>'
	);

	$(".evelution-floating-actions.extra-actions .theme-test-button").click( function(e) { TestTheme(true);  });


	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-pause-color theme-clear-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="' + mw.msg( 'evelution-designer-clear' ) + '">' +
			'<span class="cpe-icon material-icons">' +
				'undo' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-clear-button").click( function(e) { ClearTheme();  }).prop('disabled', true);


	$(".evelution-floating-actions.extra-actions .evelution-floating-actions-container").append(
		'<button class="cpe-floating-button is-unaccented theme-sbt-button page-side-tool" cpe-tooltip-position="reverse" cpe-tooltip="Backdrop Types">' +
			'<span class="cpe-icon material-icons">' +
				'wallpaper' +
			'</span>' +
		'</button>'
	);
	$(".evelution-floating-actions.extra-actions .theme-sbt-button").click( function(e) { InitSBT();  });


	// Clear out content area
	$("#mw-content-text").empty().addClass('cpe-theme-designer').attr('style','overflow:visible');
	$("#mw-content-text").append(
		'<style class="theme-designer-css"></style>' +
		'<div style="margin-bottom:10px;">' + mw.message( 'evelution-designer-notice' ).text() + '</div>' +
		'<div class="is-hidden" style="display:none;">' +
		// Body Background Color
			'<datalist id="td_colors">' +
			// Default Crayola Colors (169)
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
				// Qora Qore Accent Colors (69)
				'<option value="#ffd84c">' +
				'<option value="#fdb826">' +
				'<option value="#cc9600">' +
				'<option value="#ffb259">' +
				'<option value="#f8811a">' +
				'<option value="#af5417">' +
				'<option value="#ff5b44">' +
				'<option value="#e0373e">' +
				'<option value="#c50009">' +
				'<option value="#ff99df">' +
				'<option value="#f6509e">' +
				'<option value="#990043">' +
				'<option value="#ca66cc">' +
				'<option value="#953c96">' +
				'<option value="#4b1f6f">' +
				'<option value="#83caff">' +
				'<option value="#007aff">' +
				'<option value="#1f3cbd">' +
				'<option value="#62ba45">' +
				'<option value="#579d1a">' +
				'<option value="#688606">' +
				'<option value="#b7b7b7">' +
				'<option value="#989898">' +
				'<option value="#696969">' +
				'<option value="#ff4500">' +
				'<option value="#aa55ff">' +
				'<option value="#d4d4d4">' +
				'<option value="#ecb421">' +
				'<option value="#3f3f3f">' +
				'<option value="#3a3a3a">' +
				'<option value="#e6e6e6">' +
				'<option value="#ff0000">' +
				'<option value="#00ff00">' +
				'<option value="#0000ff">' +
				'<option value="#ffff00">' +
				'<option value="#ef5350">' +
				'<option value="#c7c7c7">' +
				'<option value="#ffa726">' +
				'<option value="#78909c">' +
				'<option value="#e3ced0">' +
				'<option value="#424b50">' +
				'<option value="#025da6">' +
				'<option value="#ea1a3e">' +
				'<option value="#f1912b">' +
				'<option value="#5599ca">' +
				'<option value="#e95b2b">' +
				'<option value="#226db5">' +
				'<option value="#f5da26">' +
				'<option value="#d4924b">' +
				'<option value="#00a1e9">' +
				'<option value="#bf004f">' +
				'<option value="#f34134">' +
				'<option value="#8234b6">' +
				'<option value="#44bae5">' +
				'<option value="#da7d99">' +
				'<option value="#ab2813">' +
				'<option value="#26649c">' +
				'<option value="#b69e00">' +
				'<option value="#c0c0e1">' +
				'<option value="#eecd31">' +
				'<option value="#39bd62">' +
				'<option value="#ff7327">' +
				'<option value="#00dd00">' +
				'<option value="#dba751">' +
				'<option value="#ffdb53">' +
				'<option value="#4fd9ff">' +
				'<option value="#00a000">' +
				'<option value="#36597b">' +
				// Microsoft Accent Colors (48)
				'<option value="#ffb900">' +
				'<option value="#ff8c00">' +
				'<option value="#f8730c">' +
				'<option value="#ce530a">' +
				'<option value="#da3b01">' +
				'<option value="#ef6950">' +
				'<option value="#d13438">' +
				'<option value="#ff4343">' +
				'<option value="#e74856">' +
				'<option value="#e81123">' +
				'<option value="#ea005e">' +
				'<option value="#c30052">' +
				'<option value="#e3008c">' +
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
				'<option value="#038387">' +
				'<option value="#00b294">' +
				'<option value="#018574">' +
				'<option value="#00cc6a">' +
				'<option value="#10893e">' +
				'<option value="#7a7574">' +
				'<option value="#5d5a58">' +
				'<option value="#68768a">' +
				'<option value="#515c6b">' +
				'<option value="#567c73">' +
				'<option value="#486860">' +
				'<option value="#498205">' +
				'<option value="#107c10">' +
				'<option value="#767676">' +
				'<option value="#4c4a48">' +
				'<option value="#69797e">' +
				'<option value="#4a5459">' +
				'<option value="#648c64">' +
				'<option value="#525e54">' +
				'<option value="#847545">' +
				'<option value="#7e735f">' +
				// Microsoft Cursor Colros (7)
				'<option value="#bf00ff">' +
				'<option value="#bfff00">' +
				'<option value="#fafa00">' +
				'<option value="#ffbf00">' +
				'<option value="#ff00bf">' +
				'<option value="#00bfff">' +
				'<option value="#00ffbf">' +
				// Fandom Colors (90)
				'<option value="#f9ebc3">' + 
				'<option value="#ede5dd">' + 
				'<option value="#f7e1d3">' + 
				'<option value="#dfdbc3">' + 
				'<option value="#fbe300">' + 
				'<option value="#ffbf99">' + 
				'<option value="#fdc355">' + 
				'<option value="#cdbd89">' + 
				'<option value="#d5a593">' + 
				'<option value="#a37719">' + 
				'<option value="#836d35">' + 
				'<option value="#776b41">' + 
				'<option value="#f14700">' + 
				'<option value="#dd3509">' + 
				'<option value="#a34111">' + 
				'<option value="#7b3b09">' + 
				'<option value="#4f4341">' + 
				'<option value="#454545">' + 
				'<option value="#611d03">' + 
				'<option value="#891100">' + 
				'<option value="#71130f">' + 
				'<option value="#ebfffb">' + 
				'<option value="#ebf1f5">' + 
				'<option value="#f5ebf5">' + 
				'<option value="#e7f3d1">' + 
				'<option value="#bde9fd">' + 
				'<option value="#dfbddd">' + 
				'<option value="#c3d167">' + 
				'<option value="#a5b5c5">' + 
				'<option value="#6599ff">' + 
				'<option value="#6b93b1">' + 
				'<option value="#978f33">' + 
				'<option value="#53835d">' + 
				'<option value="#7f6f9f">' + 
				'<option value="#d335f7">' + 
				'<option value="#337700">' + 
				'<option value="#006baf">' + 
				'<option value="#2b53b5">' + 
				'<option value="#2d2b17">' + 
				'<option value="#003715">' + 
				'<option value="#012d59">' + 
				'<option value="#6f017b">' + 
				'<option value="#790145">' + 
				'<option value="#f1f1f1">' + 
				'<option value="#ebebeb">' + 
				'<option value="#fec356">' + 
				'<option value="#6699ff">' + 
				'<option value="#6c93b1">' + 
				'<option value="#a47719">' + 
				'<option value="#846d35">' + 
				'<option value="#786c42">' + 
				'<option value="#f14800">' + 
				'<option value="#337800">' + 
				'<option value="#006cb0">' + 
				'<option value="#dd360a">' + 
				'<option value="#a34112">' + 
				'<option value="#474646">' + 
				'<option value="#7b3b0a">' + 
				'<option value="#0038d8">' + 
				'<option value="#2d2c18">' + 
				'<option value="#611e03">' + 
				'<option value="#003816">' + 
				'<option value="#012e59">' + 
				'<option value="#721410">' + 
				'<option value="#6f027c">' + 
				'<option value="#7a0146">' + 
				'<option value="#ebf2f5">' + 
				'<option value="#e7f4d2">' + 
				'<option value="#f9ecc3">' + 
				'<option value="#eee5de">' + 
				'<option value="#f7e1d4">' + 
				'<option value="#d4e6f7">' + 
				'<option value="#cebe8a">' + 
				'<option value="#a5b5c6">' + 
				'<option value="#f2f2f2">' + 
				'<option value="#fce300">' + 
				'<option value="#c4d167">' + 
				'<option value="#54845e">' + 
				'<option value="#0148c2">' + 
				'<option value="#d09632">' + 
				'<option value="#dd4702">' + 
				'<option value="#3a5766">' + 
				'<option value="#285f00">' + 
				'<option value="#4a4612">' + 
				'<option value="#8f3000">' + 
				'<option value="#a301b4">' + 
				'<option value="#6d0d00">' + 
				'<option value="#002266">' + 
				'<option value="#580062">' + 
				'<option value="#808080">' +
				// Graph Colors (24)
				'<option value="#117dbb">' + 
				'<option value="#9528b4">' + 
				'<option value="#4da60c">' + 
				'<option value="#a74f01">' + 
				'<option value="#0078d4">' + 
				'<option value="#4f6bed">' + 
				'<option value="#0e7878">' + 
				'<option value="#e43ba6">' + 
				'<option value="#8764b8">' + 
				'<option value="#31b0cd">' + 
				'<option value="#768df1">' + 
				'<option value="#218b8b">' + 
				'<option value="#ef8ccb">' + 
				'<option value="#a083c9">' + 
				'<option value="#006f91">' + 
				'<option value="#095bde">' + 
				'<option value="#4a7500">' + 
				'<option value="#bf174f">' + 
				'<option value="#7e13f0">' + 
				'<option value="#39b8e3">' + 
				'<option value="#5c9efa">' + 
				'<option value="#84c718">' + 
				'<option value="#f5628e">' + 
				'<option value="#de68f2">' + 
				// Special Colors (1)
				'<option value="#18bbc5">' +
				'<option value="#0c0c0c">' +
			'</datalist>' +
			'<datalist id="td_fonts2">' + // Sans Serif Fonts (13)
				'<option value=\'"Alegreya Sans"\'>' +	// NEW
				'<option value=\'"Arimo"\'>' + 
				'<option value=\'"Commissioner"\'>' +
				'<option value=\'"Didact Gothic"\'>' +
				'<option value=\'"Inter"\'>' +
				'<option value=\'"Nanum Gothic"\'>' + // NEW
				'<option value=\'"Noto Sans"\'>' +
				'<option value=\'"Questrial"\'>' + // NEW
				'<option value=\'"Roboto"\'>' +
				'<option value=\'"Roboto Condensed"\'>' + // NEW
				'<option value=\'"Roboto Flex"\'>' + // NEW
				'<option value=\'"Ubuntu"\'>' +
				'<option value=\'"Ubuntu Condensed"\'>' + // NEW
			'</datalist>' +
			'<datalist id="td_fonts4">' + // Serif Fonts (12)
				'<option value=\'"Alegreya"\'>' +	// NEW
				'<option value=\'"Aleo"\'>' +	// NEW
				'<option value=\'"BioRhyme"\'>' +
				'<option value=\'"BioRhyme Expanded"\'>' + // NEW
				'<option value=\'"Inknut Antiqua"\'>' +
				'<option value=\'"Lora"\'>' +
				'<option value=\'"Nanum Myeongjo"\'>' + // NEW
				'<option value=\'"Noto Serif"\'>' + // NEW
				'<option value=\'"Roboto Serif"\'>' + // NEW
				'<option value=\'"Roboto Slab"\'>' +
				'<option value=\'"Tinos"\'>' + // NEW
				'<option value=\'"Vollkorn"\'>' +	// NEW
			'</datalist>' +
			'<datalist id="td_fonts">' + // Rounded Fonts (27)
				'<option value=\'"Chango"\'>' + // NEW
				'<option value=\'"Comic Neue"\'>' +
				'<option value=\'"Coming Soon"\'>' + // NEW
				'<option value=\'"Exo 2"\'>' +
				'<option value=\'"Nunito"\'>' + // NEW
				'<option value=\'"Rubik"\'>' +
				'<option value=\'"Rubik 80s Fade"\'>' + // NEW
				'<option value=\'"Rubik Beastly"\'>' + // NEW
				'<option value=\'"Rubik Bubbles"\'>' + // NEW
				'<option value=\'"Rubik Burned"\'>' + // NEW
				'<option value=\'"Rubik Dirt"\'>' + // NEW
				'<option value=\'"Rubik Distressed"\'>' + // NEW
				'<option value=\'"Rubik Gemstones"\'>' + // NEW
				'<option value=\'"Rubik Glitch"\'>' + // NEW
				'<option value=\'"Rubik Iso"\'>' + // NEW
				'<option value=\'"Rubik Marker Hatch"\'>' + // NEW
				'<option value=\'"Rubik Maze"\'>' + // NEW
				'<option value=\'"Rubik Microbe"\'>' + // NEW
				'<option value=\'"Rubik Moonrocks"\'>' + // NEW
				'<option value=\'"Rubik Puddles"\'>' + // NEW
				'<option value=\'"Rubik Spray Paint"\'>' + // NEW
				'<option value=\'"Rubik Storm"\'>' + // NEW
				'<option value=\'"Rubik Vinyl"\'>' + // NEW
				'<option value=\'"Rubik Wet Paint"\'>' + // NEW
				'<option value=\'"Style Script"\'>' + // NEW
				'<option value=\'"Varela Round"\'>' + // NEW
				'<option value=\'"Work Sans"\'>' +
			'</datalist>' +
			'<datalist id="td_fonts3">' + // Monospace Fonts (9)
				'<option value=\'"Anonymous Pro"\'>' + 
				'<option value=\'"Courier Prime"\'>' +
				'<option value=\'"Cousine"\'>' +
				'<option value=\'"Cutive Mono"\'>' +
				'<option value=\'"Inconsolata"\'>' +
				'<option value=\'"Nanum Gothic Coding"\'>' + // NEW
				'<option value=\'"Noto Sans Mono"\'>' + // NEW
				'<option value=\'"Roboto Mono"\'>' +
				'<option value=\'"Ubuntu Mono"\'>' + // NEW
			'</datalist>' +
			'<datalist id="td_imagefilter">' + // Fonts
				'<option value="opacity(100%)">' +
				'<option value="opacity(80%)">' +
				'<option value="opacity(75%)">' +
				'<option value="opacity(50%)">' +
				'<option value="opacity(25%)">' +
				'<option value="opacity(0%)">' +
				'<option value="hue-rotate(45deg)">' +
				'<option value="hue-rotate(90deg)">' +
				'<option value="hue-rotate(135deg)">' +
				'<option value="hue-rotate(180deg)">' +
				'<option value="hue-rotate(180deg) opacity(50%)">' +
				'<option value="hue-rotate(225deg)">' +
				'<option value="hue-rotate(270deg)">' +
				'<option value="hue-rotate(315deg)">' +
				'<option value="grayscale(25%)">' +
				'<option value="grayscale(50%)">' +
				'<option value="grayscale(75%)">' +
				'<option value="grayscale(100%)">' +
				'<option value="grayscale(100%) opacity(50%)">' +
				'<option value="sepia(25%)">' +
				'<option value="sepia(50%)">' +
				'<option value="sepia(75%)">' +
				'<option value="sepia(100%)">' +
				'<option value="sepia(100%) opacity(50%)">' +
				'<option value="blur(3px)">' +
				'<option value="blur(3px) opacity(50%)">' +
				'<option value="blur(6px)">' +
				'<option value="invert(100%)">' +
				'<option value="invert(100%) hue-rotate(180deg)">' +
				'<option value="invert(100%) grayscale(100%)">' +
				'<option value="invert(100%) sepia(100%)">' +
				'<option value="invert(100%) blur(3px)">' +
				'<option value="invert(100%) opacity(50%)">' +
				'<option value="invert(100%) hue-rotate(180deg) opacity(50%)">' +
				'<option value="invert(100%) grayscale(100%) opacity(50%)">' +
				'<option value="invert(100%) sepia(100%) opacity(50%)">' +
				'<option value="invert(100%) blur(3px) opacity(50%)">' +
			'</datalist>' +
			'<datalist id="td_aopacity">' + // Image Opacity
				'<option value="0.6" label="60%">' +
				'<option value="0.7" label="70%">' +
				'<option value="0.8" label="80%">' +
				'<option value="0.9" label="80%">' +
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
		'<h2>' + mw.msg( 'evelution-designer-theme-configuration' ) +'</h2>' +
		'<table class="wikitable" style="max-width:var(--breakpoint-size); font-size:14px; margin:0 auto;">' +
			'<tr>' +
				'<th colspan="3">' + mw.msg( 'evelution-designer-body' ) + '</th>' +
			'</tr>' +
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

		// TR
			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto14" id="auto14">' + '<label for="auto14">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffcba4" id="bodybg" list="td_colors" />' + // Body Background 
						'<button class="cpe-button is-square" id="bodybg_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="bodybg_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="checkbox" name="auto1" id="auto1">' + '<label for="auto1">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="bodybg2" list="td_colors" />' + // Body Background 
						'<button class="cpe-button is-square" id="bodybg2_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' + 
						'<button class="cpe-button is-square" id="bodybg2_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +

			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community-image' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">image</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan="2">' +
					'<input type="text" id="bodyimage" class="cpe-input designer-text" style="width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);" placeholder="URL" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community-image-filter' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">photo_filter</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="bodyimagefilter" class="cpe-input designer-text" style="width:calc(calc(var(--td-size) * 2) - 40px); min-width:calc(calc(var(--td-size) * 2) - 40px);" placeholder="Filter" value="opacity(1)" list="td_imagefilter" />' + // Body Background 
						'<button class="cpe-button is-square" id="bodyimagefilter_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' + 
					'</div>' +

				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community-image-blend-mode' ) + 
				'</th>' +
				'<th colspan=2><span class="cpe-icon material-icons">gradient</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input blend_mode cpe-dropdown__toggle" style="width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);">' +
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
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community-image-alignment' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">align_horizontal_center</span></th>' +
				'<th><span class="cpe-icon material-icons">align_vertical_center</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_align2 cpe-dropdown__toggle" style="width:var(--td-size); min-width:var(--td-size);">' +
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
						'<div class="cpe-input bg_align cpe-dropdown__toggle" style="width:var(--td-size); min-width:var(--td-size);">' +
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
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-community-image-size' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">aspect_ratio</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input bg_size cpe-dropdown__toggle" style="width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);">' +
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
				'<th rowspan="2" style="width:var(--td-size);">' + 
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
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-page' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto15" id="auto15">' + '<label for="auto15">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="pagebg_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="pagebg_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
					'<hr>' +
					'<input type="checkbox" name="auto7" id="auto7" checked>' + '<label for="auto7">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="pagebg_s" list="td_colors" disabled />' + // Page BG
						'<button class="cpe-button is-square" id="pagebg_s_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="pagebg_s_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +

				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto3" id="auto3">' + '<label for="auto3">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="pagebg3_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="pagebg3_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +

					'<hr>' +
					'<input type="checkbox" name="auto8" id="auto8" checked>' + '<label for="auto8">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#2d383a" id="pagebg3_s" list="td_colors" disabled />' + // Page BG
						'<button class="cpe-button is-square" id="pagebg3_s_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="pagebg3_s_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-page-border' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">font_download_off</span></th>' +
				'<th><span class="cpe-icon material-icons">font_download</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto2" id="auto2">' + '<label for="auto2">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color"  class="cpe-button is-square" style="width:68px;" value="#c8c8cd" id="pagebg2" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="pagebg2_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="pagebg2_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<span><input type="checkbox" name="auto13" id="auto13">' + '<label for="auto13">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#c62d42" id="saaccentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="saaccentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="saaccentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +

			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-saccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">link_off</span></th>' +
				'<th><span class="cpe-icon material-icons">link</span></th>' +
			'</tr>' +
			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<span style="visibility:hidden; pointer-events:none;"><input type="checkbox" name="autoDDR" id="autoDDR">' + '<label for="autoDDR">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#1560bd" id="saccentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="saccentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="saccentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<span><input type="checkbox" name="auto12" id="auto12">' + '<label for="auto12">' + mw.msg( 'evelution-designer-auto' ) + '</label></span> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#733380" id="svaccentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="svaccentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="svaccentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-accent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto6" id="auto6">' + '<label for="auto6">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#93cceA" id="accentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="accentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="accentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto9" id="auto9" checked>' + '<label for="auto9">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#000000" id="accenttextcolor" list="td_colors" disabled />' + // Page BG
						'<button class="cpe-button is-square" id="accenttextcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="accenttextcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-taccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto5" id="auto5">' + '<label for="auto5">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#00755e" id="taccentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="taccentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="taccentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto10" id="auto10" checked>' + '<label for="auto10">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="taccenttextcolor" list="td_colors" disabled />' + // Page BG
						'<button class="cpe-button is-square" id="taccenttextcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="taccenttextcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-qaccent' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">format_color_fill</span></th>' +
				'<th><span class="cpe-icon material-icons">format_color_text</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto4" id="auto4">' + '<label for="auto4">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#01786f" id="qaccentcolor" list="td_colors" />' + // Page BG
						'<button class="cpe-button is-square" id="qaccentcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="qaccentcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropper' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' + 
					'<input type="checkbox" name="auto11" id="auto11" checked>' + '<label for="auto11">' + mw.msg( 'evelution-designer-auto' ) + '</label> <br>' +
					'<div class="cpe-button-group color-value">' +
						'<input type="color" class="cpe-button is-square" style="width:68px;" value="#ffffff" id="qaccenttextcolor" list="td_colors" disabled />' + // Page BG
						'<button class="cpe-button is-square" id="qaccenttextcolor_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
						'<button class="cpe-button is-square" id="qaccenttextcolor_e" title="'+  mw.msg( 'evelution-designer-eyedropepr' ) +'"><span class="cpe-icon material-icons">colorize</span></button>' +
					'</div>' +
				'</td>' +
			'</tr>' +
			'<tr>' +
				'<th colspan="3">' + mw.msg( 'evelution-designer-other' ) + '</th>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-border-radius' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">rounded_corner</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
					'<input type="range" class="big" style="min-width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);" id="border-radius" value="5" min="0" max="15" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="4" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-font' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">title</span></th>' +
				'<th><span class="cpe-icon material-icons">format_italics</span></th>' +
			'</tr>' +


			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="firstfont" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Font" list="td_fonts2" autocomplete="off" />' + // Body Background 
						'<button class="cpe-button is-square" id="firstfont_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
					'</div>' +


				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="fourthfont" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Font" list="td_fonts4" autocomplete="off" />' + // Body Background 
						'<button class="cpe-button is-square" id="fourthfont_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
					'</div>' +
				'</td>' +


			'</tr>' +

			'<tr>' +
				'<th><span class="cpe-icon material-icons">text_fields</span></th>' +
				'<th><span class="cpe-icon material-icons">code</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="secondfont" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Font" list="td_fonts" autocomplete="off" />' + // Body Background 
						'<button class="cpe-button is-square" id="secondfont_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="thirdfont" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Font" list="td_fonts3" autocomplete="off" />' + // Body Background 
						'<button class="cpe-button is-square" id="thirdfont_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' +
					'</div>' +
				'</td>' +


			'</tr>' +

		// TR
			'<tr>' +
				'<th rowspan="4" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-filter' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">invert_colors_off</span></th>' +
				'<th><span class="cpe-icon material-icons">invert_colors</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="filter" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Filter" value="opacity(1)" list="td_imagefilter" />' + // Body Background 
						'<button class="cpe-button is-square" id="filter_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' + 
					'</div>' +
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<div class="cpe-button-group color-value">' +
						'<input type="text" id="filter2" class="cpe-input designer-text" style="width:calc(var(--td-size) - 40px) ; min-width:calc(var(--td-size) - 40px) ;" placeholder="Filter" value="opacity(0.8)" list="td_imagefilter" />' + // Body Background 
						'<button class="cpe-button is-square" id="filter2_r" title="'+  mw.msg( 'evelution-designer-random' ) +'"><span class="cpe-icon material-icons">shuffle</span></button>' + 
					'</div>' +

				'</td>' +
			'</tr>' +

			'<tr>' +
				'<th><span class="cpe-icon material-icons">timer</span></th>' +
				'<th><span class="cpe-icon material-icons">snooze</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:var(--td-size);" id="filter3" value="300" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:var(--td-size);" id="filter4" value="0" min="0" max="1000" step="20" list="td_filterdur" autocomplete="off"  />' + // Body Background 
				'</td>' +
			'</tr>' +


		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-acrylic-opacity' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">opacity</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan="2">' +
					'<input type="range" class="big" style="min-width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);" id="aopacity" value="0.6" min="0.6" max="0.9" step="0.01" list="td_aopacity" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +
		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-gchs' ) + 
				'</th>' +
				'<th><span class="cpe-icon material-icons">palette</span></th>' +
				'<th><span class="cpe-icon material-icons">tonality</span></th>' +
			'</tr>' +


			'<tr>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:var(--td-size);" id="gchs" value="0" min="-15" max="15" step="1" list="td_gchs" autocomplete="off" />' + // Body Background 
				'</td>' +
				'<td style="text-align:center; width:150px">' +
					'<input type="range" class="big" style="min-width:var(--td-size);" id="gcs" value="100" min="20" max="100" step="5" list="td_gcs" autocomplete="off" />' + // Body Background 
				'</td>' +
			'</tr>' +

		// TR
			'<tr>' +
				'<th rowspan="2" style="width:var(--td-size);">' + 
					mw.msg( 'evelution-designer-icon-style' ) + 
				'</th>' +
				'<th colspan="2"><span class="cpe-icon material-icons">settings</span></th>' +
			'</tr>' +

			'<tr>' +
				'<td style="text-align:center; width:300px" colspan=2>' +
				   '<div class="cpe-dropdown cpe-select" tabindex="-1">' +
						'<div class="cpe-input icon_style cpe-dropdown__toggle" style="width:calc(var(--td-size) * 2); min-width:calc(var(--td-size) * 2);">' +
							'<span class="cpe-select__value" value="round">'+ mw.msg( 'evelution-designer-setting-round' ) +'</span>' +
							'<span class="cpe-icon cpe-icon-tiny cpe-icon-large cpe-dropdown__toggle-chevron material-icons">' +
								'arrow_drop_down' +
							'</span>' +
						'</div>' +
						'<div class="cpe-dropdown__content">' +
							'<ul class="cpe-list is-linked">' +
								'<li value="round"><a>'+mw.msg( 'evelution-designer-setting-round' )+'</a></li>' +
								'<li value="outlined"><a>'+mw.msg( 'evelution-designer-setting-outlined' )+'</a></li>' +
								'<li value="sharp"><a>'+mw.msg( 'evelution-designer-setting-sharp' )+'</a></li>' +
							'</ul>' +
						'</div>' +
					'</div>' +
				'</td>' +
			'</tr>' +


		'</table>' +
		'<h2>Previews</h2>' +
		'<div style="line-height:0.5;">' +
			'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
	/// Desktop
				'<block class="td-block" title="Desktop" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Desktop Text\')" style="background-color:var(--desktop-background-color); color:var(--desktop-text-background-color);">A</block>' +
	// Others
				'<block class="td-block" title="Quaternary Inactive Text" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Inactive Text\')" style="background-color:var(--desktop-background-color); color:var(--inactive-text-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Hyperlink" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Hyperlink\')" style="background-color:var(--desktop-background-color); color:var(--hyperlink-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Visited Hyperlink" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Visited Hyperlink\')" style="background-color:var(--desktop-background-color); color:var(--visited-hyperlink-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Active Text" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Active Text\')" style="background-color:var(--desktop-background-color); color:var(--active-text-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Highlight" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Highlight\')" style="background-color:var(--desktop-background-color); color:var(--highlight-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Active Caption" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Active Caption\')" style="background-color:var(--desktop-background-color); color:var(--active-title-quaternary-background-color);">A</block>' +

	// Generic Colors
				'<block class="td-block" title="Quaternary Alert" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Alert\')" style="background-color:var(--desktop-background-color); color:var(--alert-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Pause" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Pause\')" style="background-color:var(--desktop-background-color); color:var(--pause-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Warning" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Warning\')" style="background-color:var(--desktop-background-color); color:var(--warning-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Success" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Success\')" style="background-color:var(--desktop-background-color); color:var(--success-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Progress" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Progress\')" style="background-color:var(--desktop-background-color); color:var(--progress-quaternary-background-color);">A</block>' +
				'<block class="td-block" title="Quaternary Message" onclick="getColorContrastOfAnElement(this,\'Desktop\',\'Quaternary Message\')" style="background-color:var(--desktop-background-color); color:var(--message-quaternary-background-color);">A</block>' +
			'</div><br>' +

			'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
	/// Canvas
				'<block class="td-block" title="Canvas" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Canvas Text\')" style="background-color:var(--canvas-background-color); color:var(--canvas-text-background-color);">A</block>' +
	// Others
				'<block class="td-block" title="Inactive Text" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Inactive Text\')" style="background-color:var(--canvas-background-color); color:var(--inactive-text-background-color);">A</block>' +
				'<block class="td-block" title="Hyperlink" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Hyperlink\')" style="background-color:var(--canvas-background-color); color:var(--hyperlink-background-color);">A</block>' +
				'<block class="td-block" title="Visited Hyperlink" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Visited Hyperlink\')" style="background-color:var(--canvas-background-color); color:var(--visited-hyperlink-background-color);">A</block>' +
				'<block class="td-block" title="Active Text" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Active Text\')" style="background-color:var(--canvas-background-color); color:var(--active-text-background-color);">A</block>' +
				'<block class="td-block" title="Highlight" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Highlight\')" style="background-color:var(--canvas-background-color); color:var(--highlight-background-color);">A</block>' +
				'<block class="td-block" title="Active Caption" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Active Caption\')" style="background-color:var(--canvas-background-color); color:var(--active-title-background-color);">A</block>' +

	// Generic Colors
				'<block class="td-block" title="Alert" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Alert\')" style="background-color:var(--canvas-background-color); color:var(--alert-background-color);">A</block>' +
				'<block class="td-block" title="Pause" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Pause\')" style="background-color:var(--canvas-background-color); color:var(--pause-background-color);">A</block>' +
				'<block class="td-block" title="Warning" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Warning\')" style="background-color:var(--canvas-background-color); color:var(--warning-background-color);">A</block>' +
				'<block class="td-block" title="Success" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Success\')" style="background-color:var(--canvas-background-color); color:var(--success-background-color);">A</block>' +
				'<block class="td-block" title="Progress" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Progress\')" style="background-color:var(--canvas-background-color); color:var(--progress-background-color);">A</block>' +
				'<block class="td-block" title="Message" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Message\')" style="background-color:var(--canvas-background-color); color:var(--message-background-color);">A</block>' +
			'</div><br>' +
			'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
	/// Secondary Canvas
				'<block class="td-block" title="Secondary Canvas" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Canvas Text\')" style="background-color:var(--canvas-secondary-background-color); color:var(--canvas-text-secondary-background-color);">A</block>' +
	// Others
				'<block class="td-block" title="Secondary Inactive Text" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Inactive Text\')" style="background-color:var(--canvas-secondary-background-color); color:var(--inactive-text-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Hyperlink" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Hyperlink\')" style="background-color:var(--canvas-secondary-background-color); color:var(--hyperlink-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Visited Hyperlink" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Visited Hyperlink\')" style="background-color:var(--canvas-secondary-background-color); color:var(--visited-hyperlink-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Active Text" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Active Text\')" style="background-color:var(--canvas-secondary-background-color); color:var(--active-text-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Highlight" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Highlight\')" style="background-color:var(--canvas-secondary-background-color); color:var(--highlight-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Active Title" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Active Title\')" style="background-color:var(--canvas-secondary-background-color); color:var(--active-title-secondary-background-color);">A</block>' +
	// Generic Colors
				'<block class="td-block" title="Secondary Alert" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Alert\')" style="background-color:var(--canvas-secondary-background-color); color:var(--alert-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Pause" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Pause\')" style="background-color:var(--canvas-secondary-background-color); color:var(--pause-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Warning" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Warning\')" style="background-color:var(--canvas-secondary-background-color); color:var(--warning-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Success" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Success\')" style="background-color:var(--canvas-secondary-background-color); color:var(--success-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Progress" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Progress\')" style="background-color:var(--canvas-secondary-background-color); color:var(--progress-secondary-background-color);">A</block>' +
				'<block class="td-block" title="Secondary Message" onclick="getColorContrastOfAnElement(this,\'Secondary Canvas\',\'Secondary Message\')" style="background-color:var(--canvas-secondary-background-color); color:var(--message-secondary-background-color);">A</block>' +
			'</div><br>' +
			'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
	/// Active Caption
				'<block class="td-block" title="Active Caption" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Active Caption Text\')" style="background-color:var(--active-title-background-color); color:var(--active-title-text-background-color);">A</block>' +
	// Others
				'<block class="td-block" title="Tertiary Inactive Text" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Inactive Text\')" style="background-color:var(--active-title-background-color); color:var(--inactive-text-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Hyperlink" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Hyperlink\')" style="background-color:var(--active-title-background-color); color:var(--hyperlink-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Visited Hyperlink" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Visited Hyperlink\')" style="background-color:var(--active-title-background-color); color:var(--visited-hyperlink-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Active Text" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Active Text\')" style="background-color:var(--active-title-background-color); color:var(--active-text-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Highlight" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Highlight\')" style="background-color:var(--active-title-background-color); color:var(--highlight-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Active Caption" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Active Caption\')" style="background-color:var(--active-title-background-color); color:var(--active-title-tertiary-background-color);">A</block>' +
	// Generic Colors
				'<block class="td-block" title="Tertiary Alert" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Alert\')" style="background-color:var(--active-title-background-color); color:var(--alert-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Pause" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Pause\')" style="background-color:var(--active-title-background-color); color:var(--pause-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Warning" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Warning\')" style="background-color:var(--active-title-background-color); color:var(--warning-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Success" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Success\')" style="background-color:var(--active-title-background-color); color:var(--success-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Progress" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Progress\')" style="background-color:var(--active-title-background-color); color:var(--progress-tertiary-background-color);">A</block>' +
				'<block class="td-block" title="Tertiary Message" onclick="getColorContrastOfAnElement(this,\'Active Caption\',\'Tertiary Message\')" style="background-color:var(--active-title-background-color); color:var(--message-tertiary-background-color);">A</block>' +
			'</div><br>' +
			'<div style="display:flex; gap:5px; align-items:center; align-content:center; justify-content:center; flex-wrap:wrap;">' +
	/// Highlight
				'<block class="td-block" title="Highlight" onclick="getColorContrastOfAnElement(this,\'Highlight\',\'Highlight Text\')" style="background-color:var(--highlight-background-color); color:var(--highlight-text-background-color);">A</block>' +
	/// Inactive Caption
				'<block class="td-block" title="Inactive Caption" onclick="getColorContrastOfAnElement(this,\'Inactive Caption\',\'Inactive Caption Text\')" style="background-color:var(--inactive-title-background-color); color:var(--inactive-title-text-background-color);">A</block>' +
	/// Screensaver
				'<block class="td-block" title="Screensaver Highlight" onclick="getColorContrastOfAnElement(this,\'Screensaver Color\',\'Screensaver Highlight\')" style="background-color:#0c0c0c; color:var(--screensaver-highlight-color);">A</block>' +
	/// Graphs
				'<block class="td-block" title="CPU Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'CPU Graph\')" style="background-color:var(--canvas-background-color); color:var(--cpu-graph-background-color);">A</block>' +
				'<block class="td-block" title="RAM Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'RAM Graph\')" style="background-color:var(--canvas-background-color); color:var(--ram-graph-background-color);">A</block>' +
				'<block class="td-block" title="Disk Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Disk Graph\')" style="background-color:var(--canvas-background-color); color:var(--disk-graph-background-color);">A</block>' +
				'<block class="td-block" title="Network Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'Network Graph\')" style="background-color:var(--canvas-background-color); color:var(--network-graph-background-color);">A</block>' +
				'<block class="td-block" title="GPU Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'GPU Graph\')" style="background-color:var(--canvas-background-color); color:var(--gpu-graph-background-color);">A</block>' +
				'<block class="td-block" title="NPU Graph" onclick="getColorContrastOfAnElement(this,\'Canvas\',\'NPU Graph\')" style="background-color:var(--canvas-background-color); color:var(--npu-graph-background-color);">A</block>' +


			'</div>' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
					'minimize' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'web_asset' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
					'minimize' +
                '</span>' +
			'</button>' +
			'<button class="restore" title="Restore">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'select_window' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
					'minimize' +
                '</span>' +
			'</button>' +
			'<button class="fullscreen" title="Enter Fullscreen">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'open_in_full' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'web_asset' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
					'minimize' +
                '</span>' +
			'</button>' +
			'<button class="fullscreen" title="Exit Fullscreen">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'close_fullscreen' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
					'minimize' +
                '</span>' +
			'</button>' +
			'<button class="maximize" title="Maximize">' +
				'<span class="material-icons cpe-icon cpe-icon-small close">' +
					'web_asset' +
                '</span>' +
			'</button>' +
			'<button class="close" title="Close">' +
				'<span class="material-icons cpe-icon cpe-icon-small cpe-icon-medium close">' +
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
			'<div class="cpe-button is-alert-color">Alert Color</div>' +
			'<div class="cpe-button is-pause-color">Pause Color</div>' +
			'<div class="cpe-button is-warning-color">Warning Color</div>' +
			'<div class="cpe-button is-success-color">Success Color</div>' +
			'<div class="cpe-button is-progress-color">Progress Color</div>' +
			'<div class="cpe-button is-message-color">Message Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-secondary">Base Color</div>' +
			'<div class="cpe-button is-secondary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-secondary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-secondary is-alert-color">Alert Color</div>' +
			'<div class="cpe-button is-secondary is-pause-color">Pause Color</div>' +
			'<div class="cpe-button is-secondary is-warning-color">Warning Color</div>' +
			'<div class="cpe-button is-secondary is-success-color">Success Color</div>' +
			'<div class="cpe-button is-secondary is-progress-color">Progress Color</div>' +
			'<div class="cpe-button is-secondary is-message-color">Message Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-tertiary">Base Color</div>' +
			'<div class="cpe-button is-tertiary is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-tertiary is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-tertiary is-alert-color">Alert Color</div>' +
			'<div class="cpe-button is-tertiary is-pause-color">Pause Color</div>' +
			'<div class="cpe-button is-tertiary is-warning-color">Warning Color</div>' +
			'<div class="cpe-button is-tertiary is-success-color">Success Color</div>' +
			'<div class="cpe-button is-tertiary is-progress-color">Progress Color</div>' +
			'<div class="cpe-button is-tertiary is-message-color">Message Color</div>' +
			'<hr>' +
			'<div class="cpe-button is-text">Base Color</div>' +
			'<div class="cpe-button is-text is-unaccented">Unaccented Color</div>' +
			'<div class="cpe-button is-text is-alternate">Alternate Color</div>' +
			'<div class="cpe-button is-text is-alert-color">Alert Color</div>' +
			'<div class="cpe-button is-text is-pause-color">Pause Color</div>' +
			'<div class="cpe-button is-text is-warning-color">Warning Color</div>' +
			'<div class="cpe-button is-text is-success-color">Success Color</div>' +
			'<div class="cpe-button is-text is-progress-color">Progress Color</div>' +
			'<div class="cpe-button is-text is-message-color">Message Color</div>' +

		'</div>' +
		'<div class="theme-code"></div>'
	);
	$(".cpe-button#bodybg_e, .cpe-button#bodybg2_e, .cpe-button#pagebg_e, .cpe-button#pagebg_s_e, .cpe-button#pagebg3_e, .cpe-button#pagebg3_s_e, .cpe-button#pagebg2_e, .cpe-button#saaccentcolor_e, .cpe-button#saccentcolor_e, .cpe-button#svaccentcolor_e, .cpe-button#accentcolor_e, .cpe-button#accenttextcolor_e, .cpe-button#taccentcolor_e, .cpe-button#taccenttextcolor_e, .cpe-button#qaccentcolor_e, .cpe-button#qaccenttextcolor_e").prop('disabled', (!window.EyeDropper))
	SelectInputs();
    var pageTitle = $("#firstheading > span").html();
    var title = mw.message( 'pagetitle' ).text();
    document.title = title.replace("$1", pageTitle);
}

function ApplyTheme () {
	if (getColorScheme() === 'dark' ) {
		schemeN = 'Dark';
	} else {
		schemeN = 'Light';
	}
	// Copies theme to clipboard
	$(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', true);
	AddFloatingBanner('Applying ' + schemeN + ' Theme '  +  window.ThemingEngine_ActiveTheme + ' to MediaWiki:Evelution.css. Please wait...','progress','InProgressBanner')
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
		var customfont2 = 'Roboto Flex';
    } else {
		var customfont2 = $('#firstfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#fourthfont').val().length === 0) {
		var customfont4 = 'Roboto Serif';
    } else {
		var customfont4 = $('#fourthfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#thirdfont').val().length === 0) {
		var customfont3 = 'Inconsolata';
    } else {
		var customfont3 = $('#thirdfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }

		result = '\n/* Community Theme */\n' +
				 '.theme-' + window.ThemingEngine_ActiveTheme + '.colorscheme-' + getColorScheme() + '.visualcolors-standard {\n' + // Beginning
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
				 '--custom-sans-serif-font:' + customfont2 + ';\n' +
				 '--custom-serif-font:' + customfont4 + ';\n' +
				 '--custom-rounded-font:' + customfont + ';\n' +
				 '--custom-monospace-font:' + customfont3 + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + ';\n' +
				 '--system-icon-style:' + $('.icon_style .cpe-select__value').attr('value')  + ';\n' +
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
		summary: 'Inserting Evelution Theme ' +  window.ThemingEngine_ActiveTheme,
		recreate: 'true',
		format: 'json'
	},
	api = new mw.Api();

api.postWithToken( 'csrf', params ).done( function ( data ) { $(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', false); $("#InProgressBanner").remove(); /* Success */ AddFloatingBanner('Succesfully applied ' + schemeN + ' Theme '  +  window.ThemingEngine_ActiveTheme + ' to MediaWiki:Evelution.css.','success'); } ).fail( function (data) { $(".evelution-floating-actions.extra-actions .theme-apply-button").prop('disabled', false); $("#InProgressBanner").remove(); /* Fail */ AddFloatingBanner('Failed to apply ' + schemeN + ' Theme' +  window.ThemingEngine_ActiveTheme + ' to MediaWiki:Evelution.css as page couldn\'t be edited.','alert'); } );

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
		var customfont2 = 'Roboto Flex';
    } else {
		var customfont2 = $('#firstfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#fourthfont').val().length === 0) {
		var customfont4 = 'Roboto Serif';
    } else {
		var customfont4 = $('#fourthfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#thirdfont').val().length === 0) {
		var customfont3 = 'Inconsolata';
    } else {
		var customfont3 = $('#thirdfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }

		result = '.theme-' + window.ThemingEngine_ActiveTheme + '.colorscheme-' + getColorScheme() + '.visualcolors-standard {\n' + // Beginning
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
				 '--custom-sans-serif-font:' + customfont2 + ';\n' +
				 '--custom-serif-font:' + customfont4 + ';\n' +
				 '--custom-rounded-font:' + customfont + ';\n' +
				 '--custom-monospace-font:' + customfont3 + ';\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + ';\n' +
				 '--icon-filter:' + $('#filter').val() + ';\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + ';\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + ';\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + ';\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + ';\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + ';\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + ';\n' +
				 '--system-icon-style:' + $('.icon_style .cpe-select__value').attr('value')  + ';\n' +
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
		var customfont2 = 'Roboto Flex';
    } else {
		var customfont2 = $('#firstfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#fourthfont').val().length === 0) {
		var customfont4 = 'Roboto Serif';
    } else {
		var customfont4 = $('#fourthfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#thirdfont').val().length === 0) {
		var customfont3 = 'Inconsolata';
    } else {
		var customfont3 = $('#thirdfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
	var scheme = '';
    if (getColorScheme() === 'dark') {
		var scheme = 'Dark';
    }
		result = "$wgEvelutionTheme" + window.ThemingEngine_ActiveTheme + scheme +  " = [\n" + // Beginning
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
				 "'custom-sans-serif-font' => '" + customfont2 + "',\n" +
				 "'custom-serif-font' => '" + customfont4 + "',\n" +
				 "'custom-rounded-font' => '" + customfont + "',\n" +
				 "'custom-monospace-font' => '" + customfont3 + "',\n" +
				 "'border-radius' => '" + $("#border-radius").val() + 'px'  + "',\n" +
				 "'icon-filter' => '" + $("#filter").val() + "',\n" +
				 "'icon-filter-hover' => '" + $("#filter2").val()  + "',\n" +
				 "'icon-filter-duration' => '" + $("#filter3").val() + 'ms' + "',\n" +
				 "'icon-filter-delay' => '" + $("#filter4").val() + 'ms' + "',\n" +
				 "'system-acryllic-opacity' => '" + $("#aopacity").val() + "',\n" +
				 "'system-generic-color-hue-shift' => '" + $("#gchs").val() + "',\n" +
				 "'system-generic-color-saturation' => '" + $("#gcs").val() + '%' + "',\n" +
				 "'system-icon-style' => '" + $(".icon_style .cpe-select__value").attr("value")  + "',\n" +
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


function PasteTheme(dynamic=true) {
	// Pastes theme
	$(".evelution-floating-actions.extra-actions .theme-paste-button").prop('disabled', true);
	AddFloatingBanner('Pasting theme. Please wait...','progress','InProgressBanner2')
	document.querySelector('.focus-overlay').focus();
	if (dynamic) {
		themeconfig = GetActiveThemeConfiguration()
	} else {
		themeconfig = document.querySelector("body");
	}
	// Body BG
	if (getComputedStyle(themeconfig).getPropertyValue("--desktop-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto14').checked = true;
	} else {
		document.querySelector('.wikitable #auto14').checked = false;
		$('#bodybg').val( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-color") );
	}
	$('.wikitable #bodybg').prop('disabled',(document.querySelector('.wikitable #auto14').checked) );
	// Body Header Text
	if (getComputedStyle(themeconfig).getPropertyValue("--desktop-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto1').checked = true;
	} else {
		document.querySelector('.wikitable #auto1').checked = false;
		$('#bodybg2').val( getComputedStyle(themeconfig).getPropertyValue("--desktop-text-background-color") );
	}
	$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
	// Body Image
	$('#bodyimage').val( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-image").replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("") );
	// Body Image Filter
	$('#bodyimagefilter').val( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-image-filter") );

	// Body Image Blend Mode
	blend_mode = [mw.msg ('evelution-designer-setting-normal'), mw.msg ('evelution-designer-setting-multiply'), mw.msg ('evelution-designer-setting-screen'), mw.msg ('evelution-designer-setting-overlay'), mw.msg ('evelution-designer-setting-darken'), mw.msg ('evelution-designer-setting-lighten'), mw.msg ('evelution-designer-setting-colordodge'), mw.msg ('evelution-designer-setting-colorburn'), mw.msg ('evelution-designer-setting-hardlight'), mw.msg ('evelution-designer-setting-softlight'), mw.msg ('evelution-designer-setting-difference'), mw.msg ('evelution-designer-setting-exclusion'), mw.msg ('evelution-designer-setting-hue'), mw.msg ('evelution-designer-setting-saturation'), mw.msg ('evelution-designer-setting-color'), mw.msg ('evelution-designer-setting-luminosity')][['normal','multiply','screen','overlay','darken','lighten','color-dodge','color-burn','hard-light','soft-light','difference','exclusion','hue','saturation','color','luminosity'].indexOf( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-image-blend-mode") ) ]
	$('.blend_mode .cpe-select__value').attr('value', getComputedStyle(themeconfig).getPropertyValue("--desktop-background-image-blend-mode") );
	$('.blend_mode .cpe-select__value').html( blend_mode );


	// Body Image Alignment V
	bg_align = [mw.msg ('evelution-designer-setting-top'), mw.msg ('evelution-designer-setting-middle'), mw.msg ('evelution-designer-setting-bottom')][["top", "center", "bottom"].indexOf( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-vertical-alignment") ) ]
	$('.bg_align .cpe-select__value').attr('value', getComputedStyle(themeconfig).getPropertyValue("--desktop-background-vertical-alignment") );
	$('.bg_align .cpe-select__value').html( bg_align );
	// Body Image Alignment H
	bg_align2 = [mw.msg ('evelution-designer-setting-left'), mw.msg ('evelution-designer-setting-middle'), mw.msg ('evelution-designer-setting-right')][["left", "center", "right"].indexOf( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-horizontal-alignment") ) ]
	$('.bg_align2 .cpe-select__value').attr('value', getComputedStyle(themeconfig).getPropertyValue("--desktop-background-horizontal-alignment") );
	$('.bg_align2 .cpe-select__value').html( bg_align2 );
	// Body Image Size
	bg_size = [mw.msg ('evelution-designer-setting-cover'), mw.msg ('evelution-designer-setting-contain'), mw.msg ('evelution-designer-setting-stretched'), mw.msg ('evelution-designer-setting-full')][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(themeconfig).getPropertyValue("--desktop-background-size") ) ]
	$('.bg_size .cpe-select__value').attr('value', getComputedStyle(themeconfig).getPropertyValue("--desktop-background-size") )
	$('.bg_size .cpe-select__value').html( bg_size );
	// Body Image Tiling
	document.querySelector('input#tilingH').checked = (getComputedStyle(themeconfig).getPropertyValue("--desktop-background-no-horizontal-tiling") === 'false');
	document.querySelector('input#tilingV').checked = (getComputedStyle(themeconfig).getPropertyValue("--desktop-background-no-vertical-tiling") === 'false');
	// Page BG
	if (getComputedStyle(themeconfig).getPropertyValue("--canvas-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto15').checked = true;
	} else {
		document.querySelector('.wikitable #auto15').checked = false;
		$('#pagebg').val( getComputedStyle(themeconfig).getPropertyValue("--canvas-background-color") );
	}
	$('.wikitable #pagebg').prop('disabled',(document.querySelector('.wikitable #auto15').checked) );
	// 2nd Page BG
	if (getComputedStyle(themeconfig).getPropertyValue("--canvas-secondary-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto7').checked = true;
	} else {
		document.querySelector('.wikitable #auto7').checked = false;
		$('#pagebg_s').val( getComputedStyle(themeconfig).getPropertyValue("--canvas-secondary-background-color") );
	}
	$('.wikitable #pagebg_s').prop('disabled',(document.querySelector('.wikitable #auto7').checked) );
	// Page Text BG
	if (getComputedStyle(themeconfig).getPropertyValue("--canvas-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto3').checked = true;
	} else {
		document.querySelector('.wikitable #auto3').checked = false;
		$('#pagebg3').val( getComputedStyle(themeconfig).getPropertyValue("--canvas-text-background-color") );
	}
	$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
	// 2nd Page Text BG
	if (getComputedStyle(themeconfig).getPropertyValue("--canvas-text-secondary-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto8').checked = true;
	} else {
		document.querySelector('.wikitable #auto8').checked = false;
		$('#pagebg3_s').val( getComputedStyle(themeconfig).getPropertyValue("--canvas-text-secondary-background-color") );
	}
	$('.wikitable #pagebg3_s').prop('disabled',(document.querySelector('.wikitable #auto8').checked) );
	// Page Border BG
	if (getComputedStyle(themeconfig).getPropertyValue("--inactive-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto2').checked = true;
	} else {
		document.querySelector('.wikitable #auto2').checked = false;
		$('#pagebg2').val( getComputedStyle(themeconfig).getPropertyValue("--inactive-text-background-color") );
	}
	$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );

	// Visited BG
	if (getComputedStyle(themeconfig).getPropertyValue("--active-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto13').checked = true;
	} else {
		document.querySelector('.wikitable #auto13').checked = false;
		$('#saaccentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--active-text-background-color") );
	}
	$('.wikitable #saaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto13').checked) );


	// Anchor BG
	$('#saccentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--hyperlink-background-color") );
	// Visited BG
	if (getComputedStyle(themeconfig).getPropertyValue("--visited-hyperlink-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto12').checked = true;
	} else {
		document.querySelector('.wikitable #auto12').checked = false;
		$('#svaccentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--visited-hyperlink-background-color") );
	}
	$('.wikitable #svaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto12').checked) );


	// Accent BG
	if (getComputedStyle(themeconfig).getPropertyValue("--highlight-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto6').checked = true;
	} else {
		document.querySelector('.wikitable #auto6').checked = false;
		$('#accentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--highlight-background-color") );
	}
	$('.wikitable #accentcolor').prop('disabled',(document.querySelector('.wikitable #auto6').checked) );

	// Accent Text BG
	if (getComputedStyle(themeconfig).getPropertyValue("--highlight-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto9').checked = true;
	} else {
		document.querySelector('.wikitable #auto9').checked = false;
		$('#accenttextcolor').val( getComputedStyle(themeconfig).getPropertyValue("--highlight-text-background-color") );
	}
	$('.wikitable #accenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto9').checked) );


	// Caret Color
	if (getComputedStyle(themeconfig).getPropertyValue("--active-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto5').checked = true;
	} else {
		document.querySelector('.wikitable #auto5').checked = false;
		$('#taccentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--active-title-background-color") );
	}
	$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );

	// Active Title BG
	if (getComputedStyle(themeconfig).getPropertyValue("--active-title-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto10').checked = true;
	} else {
		document.querySelector('.wikitable #auto10').checked = false;
		$('#taccenttextcolor').val( getComputedStyle(themeconfig).getPropertyValue("--active-title-text-background-color") );
	}
	$('.wikitable #taccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto10').checked) );


	// Quaternary Accent Color
	if (getComputedStyle(themeconfig).getPropertyValue("--inactive-title-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto4').checked = true;
	} else {
		document.querySelector('.wikitable #auto4').checked = false;
		$('#qaccentcolor').val( getComputedStyle(themeconfig).getPropertyValue("--inactive-title-background-color") );
	}
	$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );

	// Quaternary Accent Text
	if (getComputedStyle(themeconfig).getPropertyValue("--inactive-title-text-background-color") === 'auto' ) {
		document.querySelector('.wikitable #auto11').checked = true;
	} else {
		document.querySelector('.wikitable #auto11').checked = false;
		$('#qaccenttextcolor').val( getComputedStyle(themeconfig).getPropertyValue("--inactive-title-text-background-color") );
	}
	$('.wikitable #qaccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto11').checked) );


	// Border Radius
	$('#border-radius').val( parseInt(getComputedStyle(themeconfig).getPropertyValue("--border-radius")) );
	// Sans Serif Font
	var pfont = getComputedStyle(themeconfig).getPropertyValue("--custom-sans-serif-font").replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (pfont == '""') {
		var pfont = '';
	}
	$('#firstfont').val( pfont );
	// Serif Font
	var qfont = getComputedStyle(themeconfig).getPropertyValue("--custom-serif-font").replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (qfont == '""') {
		var qfont = '';
	}
	$('#fourthfont').val( qfont );
	// Rounded Font
	var sfont = getComputedStyle(themeconfig).getPropertyValue("--custom-rounded-font").replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (sfont == '""') {
		var sfont = '';
	}
	$('#secondfont').val( sfont );
	// Monospace Font
	var tfont = getComputedStyle(themeconfig).getPropertyValue("--custom-monospace-font").replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
	if (tfont == '""') {
		var tfont = '';
	}
	$('#thirdfont').val( tfont );

	// Filter
	$('#filter').val( getComputedStyle(themeconfig).getPropertyValue("--icon-filter") );
	// Filter (Hover)
	$('#filter2').val( getComputedStyle(themeconfig).getPropertyValue("--icon-filter-hover") );
	// Filter Duration
	$('#filter3').val( parseInt(getComputedStyle(themeconfig).getPropertyValue("--icon-filter-duration")) );
	// Filter Delay
	$('#filter4').val( parseInt(getComputedStyle(themeconfig).getPropertyValue("--icon-filter-delay")) );
	// acrylic Opacity
	$('#aopacity').val( getComputedStyle(themeconfig).getPropertyValue("--system-acryllic-opacity") );
	// acrylic Opacity
	$('#gchs').val( getComputedStyle(themeconfig).getPropertyValue("--system-generic-color-hue-shift") );
	$('#gcs').val( parseInt(getComputedStyle(themeconfig).getPropertyValue("--system-generic-color-saturation")) );
	// Icon Style
	icon_style = [mw.msg( 'evelution-designer-setting-round' ), mw.msg( 'evelution-designer-setting-round' ), mw.msg( 'evelution-designer-setting-outlined' ), mw.msg( 'evelution-designer-setting-sharp' )][["round", "rounded", "outlined", "sharp"].indexOf( getComputedStyle(themeconfig).getPropertyValue("--system-icon-style") ) ]
	$('.icon_style .cpe-select__value').attr('value', getComputedStyle(themeconfig).getPropertyValue("--system-icon-style") );
	$('.icon_style .cpe-select__value').html( icon_style );
	
	UpdateRangeInputs();
	$(".evelution-floating-actions.extra-actions .theme-paste-button").prop('disabled', false);
	$("#InProgressBanner2").remove();
	AddFloatingBanner('Successfully pasted active theme to Theme Designer','success'); // alert('Successfully copied CPE Framework theme to Clipboard');


}

function TestTheme(banner=false) {
	// Tests theme
	if (!window.ThemingEngine_TDTest) {
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
		var customfont2 = 'Roboto Flex';
    } else {
		var customfont2 = $('#firstfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#fourthfont').val().length === 0) {
		var customfont4 = 'Roboto Serif';
    } else {
		var customfont4 = $('#fourthfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#secondfont').val().length === 0) {
		var customfont = 'Rubik';
    } else {
		var customfont = $('#secondfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
    }
    if ( $('#thirdfont').val().length === 0) {
		var customfont3 = 'Inconsolata';
    } else {
		var customfont3 = $('#thirdfont').val().replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
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
				 '--custom-sans-serif-font:' + customfont2 + '!important;\n' +
				 '--custom-serif-font:' + customfont4 + '!important;\n' +
				 '--custom-rounded-font:' + customfont + '!important;\n' +
				 '--custom-monospace-font:' + customfont3 + '!important;\n' +
				 '--border-radius:' + $('#border-radius').val() + "px"  + '!important;\n' +
				 '--icon-filter:' + $('#filter').val() + '!important;\n' +
				 '--icon-filter-hover:' + $('#filter2').val()  + '!important;\n' +
				 '--icon-filter-duration:' + $('#filter3').val() + "ms" + '!important;\n' +
				 '--icon-filter-delay:' + $('#filter4').val() + "ms" + '!important;\n' +
				 '--system-acryllic-opacity:' + $('#aopacity').val() + '!important;\n' +
				 '--system-generic-color-hue-shift:' + $('#gchs').val() + '!important;\n' +
				 '--system-generic-color-saturation:' + $('#gcs').val() + "%" + '!important;\n' +
				 '--system-icon-style:' + $('.icon_style .cpe-select__value').attr('value')  + '!important;\n' +
				 '}' // Ending
			document.querySelector("#mw-content-text .theme-designer-css").innerHTML = result;
			try {
				CompileThemingEngine(true,true)
				if (!window.ThemingEngine_TDTest) {
					if (banner) {
						$("#InProgressBanner4").remove();
						AddFloatingBanner('Successfully enabled theme preview','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
					}
				}
			}
			catch (err) {
				if (!window.ThemingEngine_TDTest) {
					if (banner) {
						$("#InProgressBanner4").remove();
						AddFloatingBanner('Failed to  enable theme preview as typographic errors have been found. The latest working version has been loaded instead.','alert'); // alert('Successfully copied CPE Framework theme to Clipboard');
						result = oldhtml;
						CompileThemingEngine(true,true);
					}
				}
			}

	if (!window.ThemingEngine_TDTest) {
		window.ThemingEngine_TDTest = true;
	}
}


function TestDynamicTheme() {
	if (window.ThemingEngine_TDTest) {
		TestTheme();
	}
}


function ClearTheme() {
	window.ThemingEngine_TDTest = false;
	// Tests theme
	$(".evelution-floating-actions.extra-actions .theme-clear-button").prop('disabled', true);
	$(".evelution-floating-actions.extra-actions .theme-test-button").prop('disabled', false);
	document.querySelector('.focus-overlay').focus();
	document.querySelector("#mw-content-text .theme-designer-css").innerHTML = '';
	CompileThemingEngine(true,true);

}

function HandleCheckboxes() {
$('.wikitable #tilingV').click(
							function(e) {
								TestDynamicTheme();
							}   
						);
$('.wikitable #tilingH').click(
							function(e) {
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto1').click(
							function(e) {
								$('.wikitable #bodybg2').prop('disabled',(document.querySelector('.wikitable #auto1').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto2').click(
							function(e) {
								$('.wikitable #pagebg2').prop('disabled',(document.querySelector('.wikitable #auto2').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto3').click(
							function(e) {
								$('.wikitable #pagebg3').prop('disabled',(document.querySelector('.wikitable #auto3').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto4').click(
							function(e) {
								$('.wikitable #qaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto4').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto5').click(
							function(e) {
								$('.wikitable #taccentcolor').prop('disabled',(document.querySelector('.wikitable #auto5').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto6').click(
							function(e) {
								$('.wikitable #accentcolor').prop('disabled',(document.querySelector('.wikitable #auto6').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto7').click(
							function(e) {
								$('.wikitable #pagebg_s').prop('disabled',(document.querySelector('.wikitable #auto7').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto8').click(
							function(e) {
								$('.wikitable #pagebg3_s').prop('disabled',(document.querySelector('.wikitable #auto8').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto9').click(
							function(e) {
								$('.wikitable #accenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto9').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto10').click(
							function(e) {
								$('.wikitable #taccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto10').checked) );
								TestDynamicTheme();
							}   
						);

$('.wikitable #auto11').click(
							function(e) {
								$('.wikitable #qaccenttextcolor').prop('disabled',(document.querySelector('.wikitable #auto11').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto12').click(
							function(e) {
								$('.wikitable #svaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto12').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto13').click(
							function(e) {
								$('.wikitable #saaccentcolor').prop('disabled',(document.querySelector('.wikitable #auto13').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto14').click(
							function(e) {
								$('.wikitable #bodybg').prop('disabled',(document.querySelector('.wikitable #auto14').checked) );
								TestDynamicTheme();
							}   
						);
$('.wikitable #auto15').click(
							function(e) {
								$('.wikitable #pagebg').prop('disabled',(document.querySelector('.wikitable #auto15').checked) );
								TestDynamicTheme();
							}   
						);
}

function HandleColorShuffling() {
// Color Shuffle
	$('.color-value #bodybg_r').click(
								function(e) {
									document.querySelector('.wikitable #auto14').checked = false
									$('.wikitable #bodybg').prop('disabled',(false) );
									$('#bodybg').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #bodybg2_r').click(
								function(e) {
									document.querySelector('.wikitable #auto1').checked = false
									$('.wikitable #bodybg2').prop('disabled',(false) );
									$('#bodybg2').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #pagebg_r').click(
								function(e) {
									document.querySelector('.wikitable #auto15').checked = false
									$('.wikitable #pagebg').prop('disabled',(false) );
									$('#pagebg').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #pagebg_s_r').click(
								function(e) {
									document.querySelector('.wikitable #auto7').checked = false
									$('.wikitable #pagebg_s').prop('disabled',(false) );
									$('#pagebg_s').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #pagebg3_r').click(
								function(e) {
									document.querySelector('.wikitable #auto3').checked = false
									$('.wikitable #pagebg3').prop('disabled',(false) );
									$('#pagebg3').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #pagebg3_s_r').click(
								function(e) {
									document.querySelector('.wikitable #auto8').checked = false
									$('.wikitable #pagebg3_s').prop('disabled',(false) );
									$('#pagebg3_s').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #pagebg2_r').click(
								function(e) {
									document.querySelector('.wikitable #auto2').checked = false
									$('.wikitable #pagebg2').prop('disabled',(false) );
									$('#pagebg2').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #saaccentcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto13').checked = false
									$('.wikitable #saaccentcolor').prop('disabled',(false) );
									$('#saaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
							
	$('.color-value #saccentcolor_r').click(
								function(e) {
									$('#saccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #svaccentcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto12').checked = false
									$('.wikitable #svaccentcolor').prop('disabled',(false) );
									$('#svaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #accentcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto6').checked = false
									$('.wikitable #accentcolor').prop('disabled',(false) );
									$('#accentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #accenttextcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto9').checked = false
									$('.wikitable #accenttextcolor').prop('disabled',(false) );
									$('#accenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #taccentcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto5').checked = false
									$('.wikitable #taccentcolor').prop('disabled',(false) );
									$('#taccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #taccenttextcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto10').checked = false
									$('.wikitable #taccenttextcolor').prop('disabled',(false) );
									$('#taccenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #qaccentcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto4').checked = false
									$('.wikitable #qaccentcolor').prop('disabled',(false) );
									$('#qaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #qaccenttextcolor_r').click(
								function(e) {
									document.querySelector('.wikitable #auto11').checked = false
									$('.wikitable #qaccenttextcolor').prop('disabled',(false) );
									$('#qaccenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();
								}   
							);

	$('.color-value #firstfont_r').click(
								function(e) {
									$('#firstfont').val( $('#td_fonts2 option:nth-child('+getRandomInt($('#td_fonts2 option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #secondfont_r').click(
								function(e) {
									$('#secondfont').val( $('#td_fonts option:nth-child('+getRandomInt($('#td_fonts option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #thirdfont_r').click(
								function(e) {
									$('#thirdfont').val( $('#td_fonts3 option:nth-child('+getRandomInt($('#td_fonts3 option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #fourthfont_r').click(
								function(e) {
									$('#fourthfont').val( $('#td_fonts4 option:nth-child('+getRandomInt($('#td_fonts4 option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #bodyimagefilter_r').click(
								function(e) {
									$('#bodyimagefilter').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #filter_r').click(
								function(e) {
									$('#filter').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
	$('.color-value #filter2_r').click(
								function(e) {
									$('#filter2').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
									TestDynamicTheme();
								}   
							);
}

function HandleColorPickers() {
// Color Pick
	$('.color-value #bodybg_e').click(
								function(e) {
								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto14').checked = false
										$('.wikitable #bodybg').prop('disabled',(false) );
										$('#bodybg').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
								}   
							);
	$('.color-value #bodybg2_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto1').checked = false
										$('.wikitable #bodybg2').prop('disabled',(false) );
										$('#bodybg2').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #pagebg_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto15').checked = false
										$('.wikitable #pagebg').prop('disabled',(false) );
										$('#pagebg').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #pagebg_s_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto7').checked = false
										$('.wikitable #pagebg_s').prop('disabled',(false) );
										$('#pagebg_s').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #pagebg3_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto3').checked = false
										$('.wikitable #pagebg3').prop('disabled',(false) );
										$('#pagebg3').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #pagebg3_s_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto8').checked = false
										$('.wikitable #pagebg3_s').prop('disabled',(false) );
										$('#pagebg3_s').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #pagebg2_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto2').checked = false
										$('.wikitable #pagebg2').prop('disabled',(false) );
										$('#pagebg2').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #saaccentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto13').checked = false
										$('.wikitable #saaccentcolor').prop('disabled',(false) );
										$('#saaccentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
							
	$('.color-value #saccentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										$('#saccentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #svaccentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto12').checked = false
										$('.wikitable #svaccentcolor').prop('disabled',(false) );
										$('#svaccentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #accentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto6').checked = false
										$('.wikitable #accentcolor').prop('disabled',(false) );
										$('#accentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #accenttextcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto9').checked = false
										$('.wikitable #accenttextcolor').prop('disabled',(false) );
										$('#accenttextcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #taccentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto5').checked = false
										$('.wikitable #taccentcolor').prop('disabled',(false) );
										$('#taccentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #taccenttextcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto10').checked = false
										$('.wikitable #taccenttextcolor').prop('disabled',(false) );
										$('#taccenttextcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #qaccentcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto4').checked = false
										$('.wikitable #qaccentcolor').prop('disabled',(false) );
										$('#qaccentcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
	$('.color-value #qaccenttextcolor_e').click(
								function(e) {

								  new EyeDropper()
									.open()
									.then((result) => {
									  color = result.sRGBHex;
										document.querySelector('.wikitable #auto11').checked = false
										$('.wikitable #qaccenttextcolor').prop('disabled',(false) );
										$('#qaccenttextcolor').val( color )
										TestDynamicTheme();
									})
									.catch((e2) => {
									  color = e2;
									});
									
								}   
							);
}

function SelectInputs() {
/* Select Inputs */
 HandleCheckboxes();
 UpdateRangeInputs();
 HandleColorShuffling();
 HandleColorPickers();
 DropDownUpdate();
// Misc
	$(".cpe-theme-designer input[type='color']").on( "change", function(e) { TestDynamicTheme(); } ); // Change
	$(".cpe-theme-designer input.designer-text").on( "change", function(e) { TestDynamicTheme(); } ); // Change
	$('.cpe-theme-designer .cpe-dropdown.cpe-select').on( "blur",function() { TestDynamicTheme() })
	$('.cpe-theme-designer input[type="range"]').on( "change",function(e) { TestDynamicTheme() })
					
}


/* Selects */




function RandomTheme(full=false) {
	$(".evelution-floating-actions.extra-actions .theme-paste-button").prop('disabled', true);
	AddFloatingBanner('Pasting theme. Please wait...','progress','InProgressBanner2')
	oldtest= window.ThemingEngine_TDTest;
	window.ThemingEngine_TDTest = false;

									document.querySelector('.wikitable #auto14').checked = false
									$('.wikitable #bodybg').prop('disabled',(false) );
									$('#bodybg').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto1').checked = false
									$('.wikitable #bodybg2').prop('disabled',(false) );
									$('#bodybg2').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto15').checked = false
									$('.wikitable #pagebg').prop('disabled',(false) );
									$('#pagebg').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto7').checked = false
									$('.wikitable #pagebg_s').prop('disabled',(false) );
									$('#pagebg_s').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto3').checked = false
									$('.wikitable #pagebg3').prop('disabled',(false) );
									$('#pagebg3').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto8').checked = false
									$('.wikitable #pagebg3_s').prop('disabled',(false) );
									$('#pagebg3_s').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
									TestDynamicTheme();

									document.querySelector('.wikitable #auto2').checked = false
									$('.wikitable #pagebg2').prop('disabled',(false) );
									$('#pagebg2').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto13').checked = false
									$('.wikitable #saaccentcolor').prop('disabled',(false) );
									$('#saaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									$('#saccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto12').checked = false
									$('.wikitable #svaccentcolor').prop('disabled',(false) );
									$('#svaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto6').checked = false
									$('.wikitable #accentcolor').prop('disabled',(false) );
									$('#accentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto9').checked = false
									$('.wikitable #accenttextcolor').prop('disabled',(false) );
									$('#accenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto5').checked = false
									$('.wikitable #taccentcolor').prop('disabled',(false) );
									$('#taccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto10').checked = false
									$('.wikitable #taccenttextcolor').prop('disabled',(false) );
									$('#taccenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto4').checked = false
									$('.wikitable #qaccentcolor').prop('disabled',(false) );
									$('#qaccentcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )

									document.querySelector('.wikitable #auto11').checked = false
									$('.wikitable #qaccenttextcolor').prop('disabled',(false) );
									$('#qaccenttextcolor').val( $('#td_colors option:nth-child('+getRandomInt($('#td_colors option').length)+')').val() )
								if (full) {
									$('#firstfont').val( $('#td_fonts2 option:nth-child('+getRandomInt($('#td_fonts2 option').length)+')').val() )
									$('#secondfont').val( $('#td_fonts option:nth-child('+getRandomInt($('#td_fonts option').length)+')').val() )
									$('#thirdfont').val( $('#td_fonts3 option:nth-child('+getRandomInt($('#td_fonts3 option').length)+')').val() )
									$('#fourthfont').val( $('#td_fonts4 option:nth-child('+getRandomInt($('#td_fonts4 option').length)+')').val() )
									$('#bodyimagefilter').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
									$('#filter').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
									$('#filter2').val( $('#td_imagefilter option:nth-child('+getRandomInt($('#td_imagefilter option').length)+')').val() )
								}

	window.ThemingEngine_TDTest = oldtest;
	TestDynamicTheme();
	$("#InProgressBanner2").remove();
	AddFloatingBanner('Successfully pasted random theme to Theme Designer','success'); // alert('Successfully copied CPE Framework theme to Clipboard');
}


function InitSBT() {
	// Change Title


	$("container").append(
		'<div style="--backdrop-opacity:var(--acrylic-opacity); position:fixed; display:flex; top:0; left:0; width:100%; height:100%; align-items:center; gap:2px; justify-content:center; background-color:rgba(var(--canvas-secondary-background-color-rgb),var(--acrylic-opacity)); color:var(--canvas-text-secondary-background-color); -webkit-backdrop-filter:var(--acrylic-filter); backdrop-filter:var(--acrylic-filter); z-index:999999999;" class="SBT">' +
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
								$('div.sbtll').addClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","var(--acrylic-opacity)");
								$('div.SBT').css("background-color","rgba(var(--canvas-secondary-background-color-rgb),var(--acrylic-opacity))");
							}   
);

$('#MI[name="SBT"]').click(
							function(e) {
								$('div.sbtll').removeClass("hidden").removeClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","1");
								$('div.SBT').css("background-color","var(--mica-background-color)");
							}   
);

$('#TA[name="SBT"]').click(
							function(e) {
								$('div.sbtll').removeClass("hidden").addClass("has-tabs")
								$('div.SBT').css("--backdrop-opacity","1");
								$('div.SBT').css("background-color","var(--tabbed-background-color)");
							}   
);


$('#none[name="SBT2"]').click(
							function(e) {
								$('div.SBT').remove();
							}   
);


}

/* Color Modes */
window.ThemingEngine_InvertColors = false; // false = light mode | true = light mode
window.ThemingEngine_ColorFilterMode = 0; // 0 = No special behavior  | 1 = Color Tint (ColorScale) | 2 = Temperature | 3 = Inverted Temperature
window.ThemingEngine_ColorFilterHueShift = 0; // From -180 to 180
window.ThemingEngine_ColorFilterSaturation = 0; // From 0 to 100 (100 is grayscale)
window.ThemingEngine_ActiveColorFilterTheme = 'light';
window.ThemingEngine_ActiveColorFilterBehavior = 'duo'; // solo means solo mode
window.ThemingEngine_ActiveColorFilter = 'standard';
/* Contrast Modes */
window.ThemingEngine_ContrastMode = 'auto';
/* Active Theme */
window.ThemingEngine_ActiveTheme = 'A';
window.ThemingEngine_ActiveThemeMode = 'none';
/* Visual Colors */
window.ThemingEngine_ActiveVisualColors = 'standard';
window.ThemingEngine_ActiveColorScheme = 'auto';
/* Visual Styles */
window.ThemingEngine_ActiveVisualStyle = '-';
window.ThemingEngine_ActiveVisualMode = '-';
window.ThemingEngine_ActiveVisualMode2 = '-'; // This is like ThemingEngine_ActiveVisualMode but different for High Contrast Mode (where it is contrast)
/* DCM Modes */
window.ThemingEngine_ActiveDCMMode = 'standard';
window.ThemingEngine_ActiveDCMType = 'standard';
/* Some Theming Colors */
window.ThemingEngine_PageColor = GetCanvas();
window.ThemingEngine_PageColorFG = '#000000';
window.ThemingEngine_DesktopColor = GetDesktop();
window.ThemingEngine_HighlightColor = GetHighlight();
window.ThemingEngine_ActiveTitleColor = GetActiveTitle();
window.ThemingEngine_InactiveTitleColor = GetInactiveTitle();
/* Contrast Values */
window.ThemingEngine_LargeTextContrast = 3.00;
window.ThemingEngine_SmallTextContrast = 4.50;

/*
**
** Visual Styles
** Each item is an array. 
** First item of a subarray should be the visualcolor class name to be used.
** Second item should be the narrative name done in Yorkbook Digital Professional (title) 
** Third item should be an arry of three items with material icons to be used
**** First item should be the icon for the 3D Visual Mode
**** Second item should be the icon for the Standard Visual Mode
**** Third item should be the icon for the Lite Visual Mode
**** Fourth item should be the icon for the Contrast Visual Mode
**
*/

var visualStyles = [
					['general', '{{msg-evelution-style-general}}', ['camera_enhance' ,'computer', 'smartphone','monochrome_photos']],
					['basic', '{{msg-evelution-style-basic}}', ['memory', 'home', 'inbox', 'invert_colors']],
					['simple', '{{msg-evelution-style-simple}}', ['speed', 'opacity', 'brush', 'filter_alt']],
				    ];

/*
**
** Visual Colors
** Each item is an array. 
** First item of a subarray should be the visualcolor class name to be used
** Second item should be the narrative name done in Yorkbook Digital Professional (title) 
** Third item should be the material icon to be used
** Fourth item should be the additional material icon to be used as a 1st badge (Not required)
** Fifth item should be the additional material icon to be used as a 2nd badge (Not required, requires the fourth item to be set)
**
*/

var visualColors = [
					['forced', '{{msg-evelution-color-forced}}', 'contrast'],
					['evelution', 'Evelution', 'evelution'],
					['colors', '{{msg-evelution-color-colors}}', 'format_paint'],
					['android', 'Android', 'android'],
					['qqore', 'Qora Qore', 'qqore'],
					['dynamic', '{{msg-evelution-color-dynamic}}', 'colorize'],
				    ];
var visualColorNames = ['standard', 'nocolormanagement'];

(function () {
	// Evelution Specific
	if (getKey('theme-selected') === '-1') {
		insertKey('theme-selected', 'A' );
	}
	if (getKey('visual-appearance-mode') === '-1') {
		insertKey('visual-appearance-mode', 'standard' );
	}
	if (getKey('visual-appearance-style') === '-1') {
		insertKey('visual-appearance-style', 'standard' );
	}
	if (getKey('color-scheme') === '-1') {
		insertKey('color-scheme', 'auto' );
	}
	if (getKey('visual-color') === '-1') {
		insertKey('visual-color', 'standard' );
	}
	if (getKey('device-theme') === '-1') {
		insertKey('device-theme', 'light' );
	}
	if (getKey('color-style') === '-1') {
		insertKey('color-style', 'standard' );
	}
	if (getKey('color-style-behavior') === '-1') {
		insertKey('color-style-behavior', 'duo' );
	}
	if (getKey('color-hue') === '-1') {
		insertKey('color-hue', 0 );
	}
	if (getKey('color-sat') === '-1') {
		insertKey('color-sat', 100 );
	}

	if (getKey('contrast-mode') === '-1') {
		insertKey('contrast-mode', 'auto' );
	}
	if (getKey('accent-active') === '-1') {
		insertKey('accent-active', 'false' );
	}
	if (getKey('serif-font') === '-1') {
		insertKey('serif-font', 'false' );
	}
	if (getKey('dcm-mode') === '-1') {
		insertKey('dcm-mode', 'standard' );
	}
	if (getKey('dcm-type') === '-1') {
		insertKey('dcm-type', 'standard' );
	}

	var theme_selected = getKey('theme-selected');
	var visual_mode = getKey('visual-appearance-mode');
	var visual_style = getKey('visual-appearance-style');
	var color_scheme = getKey('color-scheme');
	var visual_color = getKey('visual-color');
	var device_theme = getKey('device-theme');
	var color_style = getKey('color-style');
	var color_style_behavior = getKey('color-style-behavior');
	var color_hue = getKey('color-hue');
	var color_sat = getKey('color-sat');
	var contrast_mode = getKey('contrast-mode');
	var accent_active = getKey('accent-active');
	var serif_font = getKey('serif-font');
	var dcm_mode = getKey('dcm-mode');
	var dcm_type = getKey('dcm-type');
    getParams().forEach(function (param) {
        var key = param.split("=")[0];
        var value = param.split("=")[1];

        switch (key) {
            case 'usecpetheme':
				switch (value) {
					case 'theme-A':
					case 'A':
					case '0':
						theme_selected = 'A'
						break;
					case 'theme-B':
					case 'B':
					case '1':
						theme_selected = 'B'
						break;
					case 'theme-C':
					case 'C':
					case '2':
						theme_selected = 'C'
						break;
					case 'theme-D':
					case 'D':
					case '3':
						theme_selected = 'D'
						break;
					case 'theme-E':
					case 'E':
					case '4':
						theme_selected = 'E'
						break;
					case 'theme-F':
					case 'F':
					case '5':
						theme_selected = 'F'
						break;
					case 'theme-G':
					case 'G':
					case '6':
						theme_selected = 'G'
						break;
					case 'theme-H':
					case 'H':
					case '7':
						theme_selected = 'H'
						break;
					default:
						theme_selected = 'A'
						break;
				}
				console.info('Active theme settings overriden')
                break;
            case 'usevisualmode':
				visual_mode = value;
				console.info('Active visual mode settings overriden')
                break;
            case 'usevisualstyle':
				visual_style = value;
				console.info('Active visual style settings overriden')
                break;
            case 'usecolorscheme':
				color_scheme = value;
				console.info('Active color scheme settings overriden')
                break;
            case 'usevisualcolors':
				if (value === 'standard') {
					visual_color = 'standard';
				} else if (value === 'standard2') {
					visual_color = 'standard';
				} else {
					visual_color = value;
				}
				console.info('Active visual colors settings overriden')
                break;
            case 'usecolorstyle':
				color_style = value;
				console.info('Color style settings overriden');
                break;
            case 'usecolorstylebehavior':
				color_style_behavior = value;
				console.info('Color style behavior settings overriden');
                break;
            case 'usedevicetheme':
				device_theme = value;
				console.info('Device theme settings overriden');
                break;
            case 'usecolorhue':
				color_hue = parseInt( value );
				console.info('Color hue settings overriden');
                break;
            case 'usecolorsaturation':
				color_sat = parseInt( value );
				console.info('Color saturation settings overriden');
                break;
            case 'usecontrastmode':
				contrast_mode = value;
				console.info('Contrast mode settings overriden');
                break;
            case 'useaccent':
				accent_active = value;
				console.info('Accent mode settings overriden');
                break;
            case 'useseriffont':
				serif_font = value;
				console.info('Serif Font settings overriden');
                break;
            case 'usedcmmode':
				dcm_mode = value;
				console.info('DCM mode settings overriden');
                break;
            case 'usedcmtype':
				dcm_type = value;
				console.info('DCM type settings overriden');
                break;
        }
    });
    var themes = "";
	document.querySelector("head").insertAdjacentHTML('afterbegin','<meta name="theme-color" content="#ffffff"><style class="devicetheme"></style><style class="themes">' + themes + '</style><style class="theming"></style>');
	ToggleTheme(theme_selected,false,false);
	colortheme(color_style,device_theme,color_hue,color_sat,color_style_behavior,false,false);
	contrastmode(contrast_mode,false,false);
	SetDCM(dcm_type,dcm_mode,false,false);
	VisualColorCompile(); // Compiles the Contrast Options
	VisualColor(visual_color,false,false);
	ColorScheme(color_scheme,false);

/* The Following were prior to the Theme Compiling but were moved to improve performance */
	SetAccent(accent_active,false);
	SetSerifFont(serif_font,false);
	ManagerRows(); // For Task Manager Only
	VisualStyleCompile(); // Compiles the Contrast Options
	VisualMode(visual_mode,false,false);
	VisualStyle(visual_style,false);
	document.querySelector('body').setAttribute('tabindex',-1); // Add the CPE button class
	document.querySelector('body').focus();
	UpdateThemeColorMetaTag();

})();


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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function getColorContrastOfAnElement(elem,bg="Background Color",fg="Text Color") {
	if (elem) {
	elembg = getComputedStyle(elem).getPropertyValue("background-color");
	elemfg = getComputedStyle(elem).getPropertyValue("color");
	contrast = chroma.contrast(elemfg,elembg)
	alert("Color contrast of " + fg + " on " + bg + " is " + contrast);
	}
}

function SupportsColorMix() {
	return CSS.supports("color","color-mix(in srgb, #34c9eb 70%, white)") || CSS.supports("color:color-mix(in srgb, #34c9eb 70%, white)") 
}

function SupportsColorContrast() {
	return CSS.supports("color","color-contrast(wheat vs tan, sienna, #d2691e)") 
}

function DisabledColorManagement() {
	return ( (ForcedColors()) || (document.querySelector("body.no-color-management") ) ||  (window.ThemingEngine_ActiveVisualColors === 'nocolormanagement') )
}

function ForcedColors() {
	return ( window.matchMedia('(forced-colors: active)').matches )
}


function ForcedColorMode() {
	return window.ThemingEngine_ActiveDCMMode;
}

function ForcedColorType() {
	type = window.ThemingEngine_ActiveDCMType;
	if (type === 'auto') {
		return (ForcedColors()) ? 'standard' : ( window.matchMedia('(prefers-color-scheme: light)').matches ) ? 'standard' : 'reversi';
	} else if (type === 'auto-reversi') {
		return (ForcedColors()) ? 'reversi' : ( window.matchMedia('(prefers-color-scheme: dark)').matches ) ? 'standard' : 'reversi';
	} else if (type === 'reversi') {
		return 'reversi';
	} else if (type === 'standard') {
		return 'standard';
	} else {
		return 'standard';
	}
}


/* Copied from Base JS */
function HandleSelectInputBlurring() { // Handles Blurring
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



/* Visual Styles */
function getVisualMode() {
	if (ForcedColors()) {
		return 'contrast';
	} else {
		return window.ThemingEngine_ActiveVisualMode
	}
}

function VisualMode(mode,save=true,repaint=true) {
	if (save) {
		insertKey('visual-appearance-mode', mode );
	}
	vmode = mode;
    var x = document.querySelector('html');
		var oldmode = window.ThemingEngine_ActiveVisualMode2;
		window.ThemingEngine_ActiveVisualMode = vmode;
		window.ThemingEngine_ActiveVisualMode2 = getVisualMode();
		if (oldmode === '-') {
			document.querySelector('html').classList.add("visualmode-" +  window.ThemingEngine_ActiveVisualMode2);
		} else if (oldmode != getVisualMode() ) {
			document.querySelector('html').classList.replace("visualmode-" +  oldmode,"visualmode-" +  window.ThemingEngine_ActiveVisualMode2);
		}
		if (repaint) {
			UpdateThemeColorMetaTag();
		}
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-modes li.selected")
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-modes li[data-visual-mode='" + mode + "']");
	if (y) {
		y.classList.add("selected");
	}
}

function VisualStyle(style,save=true) {
	vstyle = style;
    var x = document.querySelector('html');
		var oldstyle = window.ThemingEngine_ActiveVisualStyle;
		window.ThemingEngine_ActiveVisualStyle = vstyle;
		if (oldstyle === '-') {
			document.querySelector('html').classList.add("visualstyle-" +  window.ThemingEngine_ActiveVisualStyle);
		} else if (oldstyle != window.ThemingEngine_ActiveVisualStyle ) {
			document.querySelector('html').classList.replace("visualstyle-" +  oldstyle,"visualstyle-" +  window.ThemingEngine_ActiveVisualStyle);
		}
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-styles li.selected")
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-styles li[data-visual-style='" + style + "']");
	if (y) {
		y.classList.add("selected");
	}
	if (save) {
		insertKey('visual-appearance-style', style );
	}
}


function getColorScheme() {
	type = window.ThemingEngine_ActiveColorScheme;
	if (type === 'auto') {
		return ( window.matchMedia('(prefers-color-scheme: light)').matches ) ? 'light' : 'dark';
	} else if (type === 'auto-dark') {
		return ( window.matchMedia('(prefers-color-scheme: dark)').matches ) ? 'light' : 'dark';
	} else if (type === 'dark') {
		return 'dark';
	} else if (type === 'light') {
		return 'light';
	} else {
		return 'light';
	}
}

function ColorScheme(style,save=true,repaint=true) {
    var x = document.querySelector('html');
		oldscheme = window.ThemingEngine_ActiveColorScheme;
	try {
		window.ThemingEngine_ActiveColorScheme = style;
		if (repaint) {
			CompileThemingEngine(true);
		}

		var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-color-schemes li.selected");
		if (x) {
			x.classList.remove("selected");
		}
		var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-color-schemes li[data-color-scheme='" + style + "']");
		if (y) {
			y.classList.add("selected")
		}
		if (save) {
		insertKey('color-scheme', style );
		}
	}

	catch (err) {
		window.ThemingEngine_ActiveColorScheme = oldscheme
		AddFloatingBanner('Failed to switch to this Color Scheme as theme ' + window.ThemingEngine_ActiveTheme + ' had typographical errors.','alert');
		console.error(err);
	}


}


function VisualColor(style,save=true,repaint=true) {
    var x = document.querySelector('html');
		if (!(visualColorNames.includes(style))) {
			console.log("CPE Language allows you to set the color scheme slot only to \"standard\", \"nocolormanagement\" and to any defined color scheme. \"standard\" is used as a fallback")
			var style='standard';
			var save = true;
		}
		oldcolors = window.ThemingEngine_ActiveVisualColors;
	try {
		window.ThemingEngine_ActiveVisualColors = style;
		if (repaint) {
			CompileThemingEngine(true);
		}

		var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-colors li.selected");
		if (x) {
			x.classList.remove("selected");
		}
		var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-colors li[data-visual-color='" + style + "']");
		if (y) {
			y.classList.add("selected")
		}
		if (save) {
		insertKey('visual-color', style );
		}
	}

	catch (err) {
		window.ThemingEngine_ActiveVisualColors = oldcolors
		AddFloatingBanner('Failed to switch to this Visual Color Pack as theme ' + window.ThemingEngine_ActiveTheme + ' had typographical errors.','alert');
		console.error(err);
	}


}


function VisualStyleCompile() {
// Puts new options
// In the Visual Styles Dropdown
/* Visual Styles */
	for (let i = 0; i < visualStyles.length; i++) {
		str = 	'<li data-visual-style="' + visualStyles[i][0] + '" title="' + visualStyles[i][1] + '">' +
					'<a onclick="VisualStyle(' + "'" + visualStyles[i][0]  + "'" + ')">' +
						'<span class="cpe-icon material-icons threeD-on">' + visualStyles[i][2][0] + '</span>' +
						'<span class="cpe-icon material-icons standard-on">' + visualStyles[i][2][1] + '</span>' +
						'<span class="cpe-icon material-icons lite-on">' + visualStyles[i][2][2] + '</span>' +
						'<span class="cpe-icon material-icons contrast-on">' + visualStyles[i][2][3] + '</span>' +
					'</a>' +
				'</li>'
		var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-styles > .base-visual-style");
		if (x) {
			x.insertAdjacentHTML('beforebegin',str);
		} else {
			var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-styles");
			if (x) {
				x.insertAdjacentHTML('beforeend',str);
			}
		}
	}
}

function VisualColorCompile() {
// Puts new options
/* Visual Colors */
		var length = visualColorNames.length
		for (let i = 0; i < visualColors.length; i++) {
			visualColorNames[i+length] =  visualColors[i][0];
			badge = '';
			badge2 = '';
			iconfinal = visualColors[i][2];
			if (iconfinal === 'evelution') {
				icon = '<svg xmlns="http://www.w3.org/2000/svg" class="cpe-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#evelution-logo" /> </svg>'
			} else 	if (iconfinal === 'qqore') {
				icon = '<svg xmlns="http://www.w3.org/2000/svg" class="cpe-icon"> <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#qoreLogo" /> </svg>'
			} else {
				icon = '<span class="cpe-icon material-icons">' + iconfinal + '</span>'
			}
			if (visualColors[i][3] != undefined) {
				badge ='<span class="cpe-icon cpe-icon-small material-icons cpe-icon-badge">'+ visualColors[i][3] +'</span>'
				if (visualColors[i][4] != undefined) {
					badge2 ='<span class="cpe-icon cpe-icon-small material-icons cpe-icon-badge">'+ visualColors[i][4] +'</span>'
				}
			}
			theme = "";
			themeD = "";
			for (let j = 0; j < 8; j++) {
				theme += '<div class="cpe-theming visualcolors-' + visualColors[i][0] + ' colorscheme-light theme-'+ ['A','B','C','D','E','F','G','H'][j] + '"></div>'
				themeD += '<div class="cpe-theming visualcolors-' + visualColors[i][0] + ' colorscheme-dark theme-'+ ['A','B','C','D','E','F','G','H'][j] + '"></div>'
			}
			str = 	'<li data-visual-color="' + visualColors[i][0] + '" title="' + visualColors[i][1] + '">' +
						'<a onclick="VisualColor(' + "'" + visualColors[i][0]  + "'" + ')">' +
							badge2 +
							badge +
							icon +
						'</a>' +
						'<div style="position:absolute; z-index:-1; pointer-events:none;">' +
							theme + themeD +
						'</div>' +
					'</li>'
			var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-visual-colors");
			if (x) {
				x.insertAdjacentHTML('beforeend',str);
			}
		}


// In the Visual Styles Options
}


/* Getting non-generic color values */

function GetActiveThemeConfiguration() { // Used for ECM (Enabled Color Management)
	if (DisabledColorManagement()) {
		return document.querySelector('.cpe-theming.visualcolors-nocolormanagement');
	} else {
		return document.querySelector('.cpe-theming.colorscheme-' + getColorScheme()  + '.visualcolors-' + window.ThemingEngine_ActiveVisualColors + '.theme-' + window.ThemingEngine_ActiveTheme);
	}
}

function GetActiveDCMConfiguration() { // Used for DCM (Disabled Color Management)
	return document.querySelector('.cpe-theming.visualcolors-nocolormanagement.dcmmode-' + ForcedColorMode());
}


function GetSystemColor(color='canvas') { // System Colors
	return getComputedStyle(document.querySelector('.dcm-' + ForcedColorType() + ' .fc-' + color)).getPropertyValue("color")
}

function GetSystemColor2(color='--desktop-background-color') { // Suppliment
	return GetSystemColor(  getComputedStyle(GetActiveDCMConfiguration()).getPropertyValue(color) );
}

function GetDesktop() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--desktop-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-color") === 'auto') {
		return GetCanvas();

	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-color").trim();
	}
}

function GetDesktopImage() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-image").trim();
	if ( (img === '') || (img === 'url()') || (img === "url('')") || (img === 'url("")') || (img === 'none') || (img === "'none'") || (img === '"none"')) {
		return '';
	} else {
		return 'url(' + img.replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("") + ')';
	}
}


function GetDesktopText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--desktop-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-text-background-color") === 'auto') {
		return ColorInvert(GetDesktop())
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-text-background-color").trim();
	}
}


function GetCanvas() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--canvas-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-background-color") === 'auto') {
		var color = GetHyperlink();
		return ColorMix(color,GetForegroundVariables(color)[0],1.6);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-background-color").trim();
	}
}


function GetCanvas2() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--canvas-secondary-background-color')
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-secondary-background-color").trim();
	}
}


function GetHyperlink() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--hyperlink-background-color')
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--hyperlink-background-color").trim();
	}
}


function GetVisitedHyperlink() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--visited-hyperlink-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--visited-hyperlink-background-color") === 'auto') {
		return GetHyperlink();
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--visited-hyperlink-background-color").trim();
	}
}


function GetInactiveText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--inactive-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-text-background-color") === 'auto') {
		return ColorMix(window.ThemingEngine_PageColor,window.ThemingEngine_PageColorFG,window.ThemingEngine_FinalContrast);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-text-background-color").trim();
	}
}

function GetActiveText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--active-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-text-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = GetForegroundVariables(GetCanvas())[0]
		return ColorMix(color2,color,1.2);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-text-background-color").trim();
	}
}


function GetCanvasText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--canvas-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-background-color") === 'auto') {
		return ColorInvert(GetCanvas())
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-background-color").trim();
	}
}


function GetCanvasText2() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--canvas-text-secondary-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-secondary-background-color") === 'auto') {
		return GetCanvasText();
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-secondary-background-color").trim();
	}
}


function GetHighlight() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--highlight-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = GetForegroundVariables(GetCanvas())[0]
		return ColorMix(color2,color,1.6);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-background-color").trim();
	}
}

function GetHighlightText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--highlight-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_HighlightColor);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-text-background-color").trim();
	}
}


function GetActiveTitle() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--active-title-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-background-color") === 'auto') {
		var color = GetHyperlink();
		var color2 = ColorInvert(GetForegroundVariables(GetCanvas())[0])
		return ColorMix(color2,color,1.6);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-background-color").trim();
	}
}

function GetActiveTitleText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--active-title-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_ActiveTitleColor);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-text-background-color").trim();
	}
}


function GetInactiveTitle() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--inactive-title-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-background-color") === 'auto') {
		return ColorMix(window.ThemingEngine_ActiveTitleColor,window.ThemingEngine_PageColor,1.5);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-background-color").trim();
	}
}

function GetInactiveTitleText() {
	if (DisabledColorManagement()) {
		return GetSystemColor2('--inactive-title-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_InactiveTitleColor);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-text-background-color").trim();
	}
}


function GetAlert() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[0];
}

function GetPause() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[1];
}

function GetWarning() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[2];
}

function GetSuccess() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[3];
}

function GetProgress() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[4];
}

function GetMessage() {
		return CompileGenericColors(window.ThemingEngine_PageColor)[5];
}


function GetCustomFont() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--custom-sans-serif-font").trim();
		return img.replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}

function GetCustomFont2() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--custom-rounded-font").trim();
		return img.replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}

function GetCustomFont3() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--custom-monospace-font").trim();
		return img.replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}

function GetCustomFont4() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--custom-serif-font").trim();
		return img.replace("'<", '').replace(">'", '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("\"");
}


function ContrastRatio() { // Used for Text

	if (ThemingEngine_ContrastMode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.55 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.275 : 1.0
	} else if (ThemingEngine_ContrastMode == 'low') { // 4.5
		return 1.00
	} else if (ThemingEngine_ContrastMode == 'custom1') { // Custom
		return 1.06875
	} else if (ThemingEngine_ContrastMode == 'med-low') {
		return 1.1375
	} else if (ThemingEngine_ContrastMode == 'custom2') { // Custom
		return 1.20625
	} else if (ThemingEngine_ContrastMode == 'med') {
		return 1.275
	} else if (ThemingEngine_ContrastMode == 'custom3') { // Custom
		return 1.34375
	} else if (ThemingEngine_ContrastMode == 'med-hi') {
		return 1.4125
	} else if (ThemingEngine_ContrastMode == 'custom4') { // Custom
		return 1.48125
	} else if (ThemingEngine_ContrastMode == 'hi') { // 7
		return 1.55
	} else if (ThemingEngine_ContrastMode == 'custom5') { // Custom
		return 1.61875
	} else if (ThemingEngine_ContrastMode == 'hi-vhi') {
		return 1.6875
	} else if (ThemingEngine_ContrastMode == 'custom6') { // Custom
		return 1.75625
	} else if (ThemingEngine_ContrastMode == 'vhi') {
		return 1.825
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.55 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.275 : 1.0
	}
}

function ContrastRatio2() { // Used For Dropdown

	if (ThemingEngine_ContrastMode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	} else if (ThemingEngine_ContrastMode == 'low') {
		return 0.25
	} else if (ThemingEngine_ContrastMode == 'custom1') { // Custom
		return 0.2625
	} else if (ThemingEngine_ContrastMode == 'med-low') {
		return 0.275
	} else if (ThemingEngine_ContrastMode == 'custom2') { // Custom
		return 0.2875
	} else if (ThemingEngine_ContrastMode == 'med') {
		return 0.3
	} else if (ThemingEngine_ContrastMode == 'custom3') { // Custom
		return 0.3125
	} else if (ThemingEngine_ContrastMode == 'med-hi') {
		return 0.325
	} else if (ThemingEngine_ContrastMode == 'custom4') { // Custom
		return 0.3375
	} else if (ThemingEngine_ContrastMode == 'hi') {
		return 0.35
	} else if (ThemingEngine_ContrastMode == 'custom5') { // Custom
		return 0.3625
	} else if (ThemingEngine_ContrastMode == 'hi-vhi') {
		return 0.375
	} else if (ThemingEngine_ContrastMode == 'custom6') { // Custom
		return 0.3875
	} else if (ThemingEngine_ContrastMode == 'vhi') {
		return 0.4
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.35 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.30 : 0.25
	}
}

function ContrastRatio3() { // Used for Form Controls

	if (ThemingEngine_ContrastMode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.5 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.25 : 1.0
	} else if (ThemingEngine_ContrastMode == 'low') { // 3
		return 1.00
	} else if (ThemingEngine_ContrastMode == 'custom1') { // Custom
		return 1.0625
	} else if (ThemingEngine_ContrastMode == 'med-low') {
		return 1.125
	} else if (ThemingEngine_ContrastMode == 'custom2') { // Custom
		return 1.1875
	} else if (ThemingEngine_ContrastMode == 'med') {
		return 1.25
	} else if (ThemingEngine_ContrastMode == 'custom3') { // Custom
		return 1.3125
	} else if (ThemingEngine_ContrastMode == 'med-hi') {
		return 1.375
	} else if (ThemingEngine_ContrastMode == 'custom4') { // Custom
		return 1.4375
	} else if (ThemingEngine_ContrastMode == 'hi') { // 4.5
		return 1.5
	} else if (ThemingEngine_ContrastMode == 'custom5') { // Custom
		return 1.5625
	} else if (ThemingEngine_ContrastMode == 'hi-vhi') {
		return 1.625
	} else if (ThemingEngine_ContrastMode == 'custom6') { // Custom
		return 1.6875
	} else if (ThemingEngine_ContrastMode == 'vhi') {
		return 1.75
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 1.5 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 1.25 : 1.0
	}
}

function ContrastRatio4() { // Used For Inactive Text

	if (ThemingEngine_ContrastMode == 'auto') {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.86 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.78 : 0.7
	} else if (ThemingEngine_ContrastMode == 'low') {
		return 0.7
	} else if (ThemingEngine_ContrastMode == 'custom1') { // Custom
		return 0.72
	} else if (ThemingEngine_ContrastMode == 'med-low') {
		return 0.74
	} else if (ThemingEngine_ContrastMode == 'custom2') { // Custom
		return 0.76
	} else if (ThemingEngine_ContrastMode == 'med') {
		return 0.78
	} else if (ThemingEngine_ContrastMode == 'custom3') { // Custom
		return 0.8
	} else if (ThemingEngine_ContrastMode == 'med-hi') {
		return 0.82
	} else if (ThemingEngine_ContrastMode == 'custom4') { // Custom
		return 0.84
	} else if (ThemingEngine_ContrastMode == 'hi') {
		return 0.86
	} else if (ThemingEngine_ContrastMode == 'custom5') { // Custom
		return 0.88
	} else if (ThemingEngine_ContrastMode == 'hi-vhi') {
		return 0.9
	} else if (ThemingEngine_ContrastMode == 'custom6') { // Custom
		return 0.92
	} else if (ThemingEngine_ContrastMode == 'vhi') {
		return 0.94
	} else {
		return (window.matchMedia('(prefers-contrast: more)').matches) ? 0.86 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 0.78 : 0.7
	}
}



function CompileGenericColors(color) {
var page = color;
var invpage = page;
hueshift =  parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-hue-shift"));
saturation =  parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")) + "%";
sat2 = ( parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")) / 1 )

if (isLightColor(page)) { // ( chroma(page).get('hsl.l') < 0.5)
// ['96%', '94%', '92%', '90%', '88%', '86%', '84%', '82%', '80%', '78%', '76%', '74%', '72%', '70%', '68%', '66%', '64%', '62%', '60%', '58%', '56%', '54%', '46%', '44%', '42%', '40%', '38%', '36%', '34%', '32%', '30%', '28%', '26%', '24%', '22%', '20%', '18%', '16%', '14%', '12%', '10%', '8%', '6%', '4%']
	var colors = ['46%', '44%', '42%', '40%', '38%', '36%', '34%', '32%', '30%', '28%', '26%', '24%', '22%', '20%', '18%', '16%', '14%', '12%', '10%', '8%', '6%', '4%']
} else {
// ['4%', '6%', '8%', '10%', '12%', '14%', '16%', '18%', '20%', '22%', '24%', '26%', '28%', '30%', '32%', '34%', '36%', '38%', '40%', '42%', '44%', '46%', '54%', '56%', '58%', '60%', '62%', '64%', '66%', '68%', '70%', '72%', '74%', '76%', '78%', '80%', '82%', '84%', '86%', '88%', '90%', '92%', '94%', '96%']
	var colors = ['54%', '56%', '58%', '60%', '62%', '64%', '66%', '68%', '70%', '72%', '74%', '76%', '78%', '80%', '82%', '84%', '86%', '88%', '90%', '92%', '94%', '96%']
}

		alerth = 355
		pauseh = 25
		warningh = 45
		successh = 140
		progressh = 225
//		messageh = -1
		
		contrast = window.ThemingEngine_SmallTextContrast*ContrastRatio()*1

	for (let i = 0; i < colors.length; i++) {
 		var color = chroma('hsl(0,' + saturation + ',' + colors[i] + ')').hex(); // Base Color
 		var alert = chroma(color).set('hsl.h',alerth+hueshift); // Alert
 		var pause = chroma(color).set('hsl.h',pauseh+hueshift);  // Pause
 		var warn = chroma(color).set('hsl.h',warningh+hueshift);  // Warning
 		var done = chroma(color).set('hsl.h',successh+hueshift); // Success
 		var progress = chroma(color).set('hsl.h',progressh+hueshift); // Progress
 		var info = chroma(color).set('hsl.s',0); // Message
 
		if ( ((chroma.contrast(page, alert)) >= contrast) && ((chroma.contrast(page, pause)) >= contrast) && ((chroma.contrast(page, warn)) >= contrast) && ((chroma.contrast(page, done)) >= contrast) && ((chroma.contrast(page, progress)) >= contrast) && ((chroma.contrast(page, info)) >= contrast) ) {
			return [alert, pause, warn, done, progress, info];
		}
	}
	return [alert, pause, warn, done, progress, info];

 
}

function CompileGenericGraphColors(color) {
var page = color;
var invpage = page;
hueshift =  parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-hue-shift"));
saturation =  parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")) + "%";
sat2 = ( parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")) / 1 )


if (isLightColor(page)) {
	var colors = ['46%', '44%', '42%', '40%', '38%', '36%', '34%', '32%', '30%', '28%', '26%', '24%', '22%', '20%', '18%', '16%', '14%', '12%', '10%', '8%', '6%', '4%']
		g1h = 195
		g2h = 215
		g3h = 80
		g4h = 340
		g5h = 270
} else {
	var colors = ['54%', '56%', '58%', '60%', '62%', '64%', '66%', '68%', '70%', '72%', '74%', '76%', '78%', '80%', '82%', '84%', '86%', '88%', '90%', '92%', '94%', '96%']
		g1h = 195
		g2h = 215
		g3h = 80
		g4h = 340
		g5h = 290

}
	
		contrast = window.ThemingEngine_SmallTextContrast*ContrastRatio()*1
		colors1 = [0,0,0,0,0];
		remcolors = 5;

	for (let i = 0; i < colors.length; i++) {
 		var color = chroma('hsl(0,' + saturation + ',' + colors[i] + ')').hex(); // Base Color
		var g1 = chroma(color).set('hsl.h',g1h+hueshift); // G1
		var g2 = chroma(color).set('hsl.h',g2h+hueshift); // G2
		var g3 = chroma(color).set('hsl.h',g3h+hueshift); // G3
		var g4 = chroma(color).set('hsl.h',g4h+hueshift); // G4
		var g5 = chroma(color).set('hsl.h',g5h+hueshift); // G5
///
		if ( ((chroma.contrast(page, g1)) >= contrast) && (colors1[0] === 0) ) {
			colors1[0] = g1;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((chroma.contrast(page, g2)) >= contrast) && (colors1[1] === 0) ) {
			colors1[1] = g2;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((chroma.contrast(page, g3)) >= contrast) && (colors1[2] === 0) ) {
			colors1[2] = g3;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((chroma.contrast(page, g4)) >= contrast) && (colors1[3] === 0) ) {
			colors1[3] = g4;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((chroma.contrast(page, g5)) >= contrast) && (colors1[4] === 0) ) {
			colors1[4] = g5;
			remcolors = (remcolors-1);
			i = 0;
		}
///
		if (remcolors==0) {
			return colors1;
		}
	}

	return [g1,g2,g3,g4,g5];

 
}


/* Get Foreground Variables */

function GetForegroundVariables(color) {
	var body = document.querySelector('body');
	if (isSemiLightColor(color)) {
		var fc1 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color");
		var fc2 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(body).getPropertyValue("--light-theme-text-background-color-hover-rgb");
	} else {
		var fc1 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color");
		var fc2 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-rgb");
		var fc3 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-hover");
		var fc4 =  getComputedStyle(body).getPropertyValue("--dark-theme-text-background-color-hover-rgb");
	}

	if (isLightColor(color)) {
		var f1 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-hover");
		var f3 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-rgb");
		var f4 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-hover-rgb");
	} else {
		var f1 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-hover");
		var f3 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-rgb");
		var f4 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-hover-rgb");
	}
	return [f1, f2, f3, f4, fc1, fc2, fc3, fc4]
}


/* Get Gradient Variables */
function GetGradientVariable(color,name="canvas") {
	if (isLightColor(color)) {
		return ['var(--' + name + '-background-color)', 'var(--' + name + '-background-color-hover)']
	} else {
		return ['var(--' + name + '-background-color-hover)', 'var(--' + name + '-background-color)']
	}
}

/* End of this work */


/* Used for some wiki theme modes 
	Also used for some notifications
	Called on body element only */
function CheckTheme() {
	/* Wiki theme */
	CompileThemingEngine(true);
ManagerRows();
}



/* Used only on Task Manager, ignored elsewhere */
function ManagerRows() {

/* For Task Manager */
	var x = document.querySelector("body.tskmngr")
	if (x) {
		var y = document.querySelectorAll("cpu");
		var y2 = document.querySelectorAll("aside.heatmap:first-child cpu");
		if ( (y.length) < 4) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", y.length);
		} else if ( (y2.length) < 6 ) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 2);
		} else if  ((y2.length) < 13 ) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 3);
		} else if ( (y2.length) < 30 ) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 4);
		} else if ( (y2.length) < 64 ) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 6);
		} else if ( (y2.length) < 99 ) {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 8);
		} else {
			document.querySelector('div.heatmaps').style.setProperty("--heatmap-rows", 10);
		}
	}
}





/* Changes Wiki theme style */

function GetHueShift() {
	if (DisabledColorManagement()) {
		return 0;
	} else {
		return window.ThemingEngine_ColorFilterHueShift;
	}
}

function GetSaturation() {
	if (DisabledColorManagement()) {
		return 100;
	} else {
		return window.ThemingEngine_ColorFilterSaturation;
	}
}



function SliderColorHue() {
	var range = document.querySelector('input[type="range"].colorhue');
	if (range) {
		colortheme('match-parent', 'match-parent', range.value, 'match-parent', 'match-parent', true, true, false);
	}
}
function SliderColorSaturation() {
	var range = document.querySelector('input[type="range"].colorsat');
	if (range) {
		colortheme('match-parent', 'match-parent', 'match-parent', range.value, 'match-parent', true, true, false);
	}
}


/* Supported Values 
** Style = standard, colorscale, hottemperature, coldtemperature
** Theme = auto, auto-dark, light, dark (The code that hides colorstyle icons and sets the color scheme only supports Light and Dark Mode)
** hue = 0 to 360
** saturation = 0 to 100
** Solo = duo, solo (Only two supported)
** All above = match-parent (Inherits the currently applied value)
*/
function colortheme(style='match-parent', theme='match-parent', hue='match-parent', saturation='match-parent', solo='match-parent', repaint=true, save=true, notfromrange=true) {
	if (style === 'match-parent') {
		style = window.ThemingEngine_ActiveColorFilter;
	}
	if (theme === 'match-parent') {
		theme = window.ThemingEngine_ActiveColorFilterTheme;
	}
	if (hue === 'match-parent') {
		hue = window.ThemingEngine_ColorFilterHueShift;
	}
	if (saturation === 'match-parent') {
		saturation = window.ThemingEngine_ColorFilterSaturation;
	}
	if (solo === 'match-parent') {
		solo = window.ThemingEngine_ActiveColorFilterBehavior;
	}


	selected_theme = theme;
	if (selected_theme === 'auto') {
		theme = ( window.matchMedia('(prefers-color-scheme: light)').matches ) ? 'light' : 'dark';
	} else if (selected_theme === 'auto-dark') {
		theme = ( window.matchMedia('(prefers-color-scheme: dark)').matches ) ? 'light' : 'dark';
	}
    var body_bg =	GetCanvas();
    var old_dark = window.ThemingEngine_InvertColors;
    var old_dark2 = window.ThemingEngine_ColorFilterMode;
    var oldhue = window.ThemingEngine_ColorFilterHueShift;
    var oldsat = window.ThemingEngine_ColorFilterSaturation;
    var muststay = false;
		document.querySelector('head .devicetheme').innerHTML = '' ;
    if (DisabledColorManagement()) {
		window.ThemingEngine_InvertColors = false;
		window.ThemingEngine_ColorFilterMode = 0;
	} else {
		if (style == 'standard') {
			if (solo == 'solo') {
				window.ThemingEngine_InvertColors = (isLightColor(body_bg)) ? (theme == 'dark') : (theme == 'light');
			} else {
				window.ThemingEngine_InvertColors = (theme == 'dark');
			}
			window.ThemingEngine_ColorFilterMode = 0;
		} else if (style == 'colorscale') {
			if (solo == 'solo') {
				window.ThemingEngine_InvertColors = (isLightColor(body_bg)) ? (theme == 'dark') : (theme == 'light');
			} else {
				window.ThemingEngine_InvertColors = (theme == 'dark');
			}
			window.ThemingEngine_ColorFilterMode = 1;
		} else if (style == 'hottemperature') {
			if (solo == 'solo') {
				window.ThemingEngine_InvertColors = (theme == 'dark');
			} else {
				window.ThemingEngine_InvertColors = (isLightColor(body_bg)) ? (theme == 'dark') : (theme == 'light');
			}
			window.ThemingEngine_ColorFilterMode = 2;
		} else if (style == 'coldtemperature') {
			if (solo == 'solo') {
				window.ThemingEngine_InvertColors = (theme == 'dark');
			} else {
				window.ThemingEngine_InvertColors = (isLightColor(body_bg)) ? (theme == 'dark') : (theme == 'light');
			}
			window.ThemingEngine_ColorFilterMode = 3;
		} else {
			if (solo == 'solo') {
				window.ThemingEngine_InvertColors = (isLightColor(body_bg)) ? (theme == 'dark') : (theme == 'light');
			} else {
				window.ThemingEngine_InvertColors = (theme == 'dark');
			}
			window.ThemingEngine_ColorFilterMode = 0;
		}
	}
	colorscheme = getColorScheme();
	document.querySelector('head .devicetheme').innerHTML += '.' + theme + 'device-off { display:none!important } .cpe-system-colors { color-scheme:' + getColorScheme() + '; color-scheme:only ' + getColorScheme() + '; }' ;
	window.ThemingEngine_ActiveColorFilterTheme = selected_theme
	window.ThemingEngine_ActiveColorFilter = style
	window.ThemingEngine_ColorFilterHueShift = parseInt( hue )
	window.ThemingEngine_ColorFilterSaturation = parseInt( saturation )
	window.ThemingEngine_ActiveColorFilterBehavior = solo
	if (save) {
		insertKey('device-theme', selected_theme );
		insertKey('color-style', style );
		insertKey('color-style-behavior', solo );
		insertKey('color-hue', hue );
		insertKey('color-sat', saturation );
	}

// Color Styles
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-color-styles li.selected");
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-color-styles li[data-color-style='" + style + "']");
	if (y) {
		y.classList.add("selected")
	}
// Device Themes
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-device-themes li.selected");
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-device-themes li[data-device-theme='" + selected_theme + "']");
	if (y) {
		y.classList.add("selected")
	}
// Color Style Behaviors
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-solo-modes li.selected");
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-solo-modes li[data-solo-mode='" + solo + "']");
	if (y) {
		y.classList.add("selected")
	}



	if ((old_dark == window.ThemingEngine_InvertColors) && (old_dark2 == window.ThemingEngine_ColorFilterMode) && (oldhue == window.ThemingEngine_ColorFilterHueShift) && (oldsat == window.ThemingEngine_ColorFilterSaturation) ) {
		var muststay = !(DisabledColorManagement());
	}

	var range = document.querySelector('input[type="range"].colorhue');
	var range2 = document.querySelector('input[type="range"].colorsat');
	if (range) {
		range.value = window.ThemingEngine_ColorFilterHueShift;
	}
	if (range2) {
		range2.value = window.ThemingEngine_ColorFilterSaturation;
	}
	if (notfromrange) {
		UpdateRangeInputs();
	}


	if ((repaint) && !(muststay)) {
		CompileThemingEngine(false);
	}
}

function SliderContrastMode() {
	var range = document.querySelector('input[type="range"].contrastratio');
	if (range) {
		range2 = ['auto','low','custom1','med-low','custom2','med','custom3','med-hi','custom4','hi','custom5','hi-vhi','custom6','vhi'][range.value]
		contrastmode(range2,true,true,false);
	}
}


function contrastmode(theme='auto', repaint=true, save=true,notfromrange=true) {
	window.ThemingEngine_ContrastMode = theme
	if (save) {
		insertKey('contrast-mode', theme );
	}
	var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-contrast-modes li.selected");
	if (x) {
		x.classList.remove("selected");
	}
	var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-contrast-modes li[data-contrast-mode='" + theme + "']");
	if (y) {
		y.classList.add("selected")
	}
	var range = document.querySelector('input[type="range"].contrastratio');
	if (range) {
		range2 = ['auto','low','custom1','med-low','custom2','med','custom3','med-hi','custom4','hi','custom5','hi-vhi','custom6','vhi'].indexOf(theme)
		range.value = range2;
		if (notfromrange) {
			UpdateRangeInputs();
		}
	}

	if (repaint) {
		CompileThemingEngine(false);
	}
}


function UpdateThemeColorMetaTag() {
	x = document.querySelector("head meta[name='theme-color'");
	if (x) {
		x.setAttribute("content", getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--luna-mica-background-color").trim() );
	}
}

function SetAccent(tick='false',save='true') {
		if (save) {
			insertKey('accent-active', tick );
		}
		if (tick === 'true') {
			document.querySelector('html').classList.add('has-accents');
		} else {
			document.querySelector('html').classList.remove('has-accents');
		}
		UpdateThemeColorMetaTag();
}


function ToggleAccent() {
	if (document.querySelector('html.has-accents')) {
		SetAccent( 'false' )
	} else {
		SetAccent ( 'true' )
	}
}



function SetSerifFont(tick='false',save='true') {
		if (save) {
			insertKey('serif-font', tick );
		}
		if (tick === 'true') {
			document.querySelector('html').classList.add('has-serif-font');
		} else {
			document.querySelector('html').classList.remove('has-serif-font');
		}
}


function ToggleSerifFont() {
	if (document.querySelector('html.has-serif-font')) {
		SetSerifFont( 'false' )
	} else {
		SetSerifFont( 'true' )
	}
}


function SetDCM(type='match-parent',tick='match-parent',save='true',repaint='true') {
	if (type === 'match-parent') {
		type = window.ThemingEngine_ActiveDCMType;
	}
	if (tick === 'match-parent') {
		tick = window.ThemingEngine_ActiveDCMMode;
	}

		if (save) {
			insertKey('dcm-mode', tick );
			insertKey('dcm-type', type );
		}
		window.ThemingEngine_ActiveDCMMode = tick;
		var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-dcm-modes li.selected");
		if (x) {
			x.classList.remove("selected");
		}
		var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-dcm-modes li[data-dcm-mode='" + tick + "']");
		if (y) {
			y.classList.add("selected")
		}
		window.ThemingEngine_ActiveDCMType = type;
		var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-dcm-types li.selected");
		if (x) {
			x.classList.remove("selected");
		}
		var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-dcm-types li[data-dcm-type='" + type + "']");
		if (y) {
			y.classList.add("selected")
		}

		if (repaint) {
			CompileThemingEngine(false);
		}

}

/* Downloads all modificative values of the current selected theme to a file */
/**
*** Moved to Debug.js 
**/

/* Begin Color Parsers */
function ColorMix(color1,color2,intensity=1,hue='nil') {
	var alpha = 0.5*intensity;
	if (hue === 'nil') {
		return chroma.mix(color1, color2, alpha, 'rgb');
	} else if (hue === -1) {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.s', 0).set('hsl.h', 0);
	} else {
		return chroma.mix(color1, color2, alpha, 'rgb').set('hsl.h', hue);
	}
}


function ColorHover(color,color2) { // Regular Colors
	var dledlen = (color2 != undefined) ? true : false; // Disable Doulgido Dledlen
	if (dledlen === false) {
		var color2 = color;
	}
	var func = (isLightColor(color2));
	var light = chroma(color).get('hsl.l')
	if (func) {
		return chroma(color).set('hsl.l', light-0.2);
	} else {
		return chroma(color).set('hsl.l', light+0.2);
	}
}


function ColorAdjust(color,color2,dark=false) { // Regular Colors
	var func = dark ? (isDarkColor(color2)) : (isLightColor(color2));
	var light = chroma(color).get('hsl.l');
	var hue = chroma(color).get('hsl.h');
	if (func) {
		return chroma(color).set('hsl.l', light-0.01).set('hsl.h', hue).hex();
	} else {
		return chroma(color).set('hsl.l', light+0.01).set('hsl.h', hue).hex();
	}
}


function ColorInvert(color) {
	var r = 255 - chroma(color).get('rgb.r');
	var g = 255 - chroma(color).get('rgb.g');
	var b = 255 - chroma(color).get('rgb.b');
	var h = chroma(color).get('oklch.h');
	var h2 = chroma(color).get('hsl.h');
	return 	chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('oklch.h', h).set('hsl.h', h2)
}

/* 
** Adjust the Color based on the current active Device Theme, Color Hue and Color Style
** r  = Red
** g  = Green
** b  = Blue
** h  = LCH Hue
** h2 = HSL Hue
*/
function ColorStyleAdjust(color) {
	if (window.ThemingEngine_ColorFilterMode === 2) { // Special Case
		var color2 = color;
		var color = chroma( chroma.temperature(chroma(color2).temperature()) ).hex();
	}
	if (window.ThemingEngine_ColorFilterMode === 3) { // Special Case
		var color2 = color;
		var color = chroma( chroma.temperature(40000 - chroma(color2).temperature()) ).hex();
	}
	if ( (window.ThemingEngine_InvertColors === true) ) {
		var color = ColorInvert(color);
	}
		var r = chroma(color).get('rgb.r');
		var g = chroma(color).get('rgb.g');
		var b = chroma(color).get('rgb.b');

	var h = chroma(color).get('oklch.h');
	var h2 = chroma(color).get('hsl.h');
	var huea = GetHueShift();
	var adjusth = (h + huea) % 360
	var adjusth2 = (h2 + huea) % 360
	color3 = chroma(color).set('rgb.r', r).set('rgb.g', g).set('rgb.b', b).set('oklch.h', adjusth).set('hsl.h', adjusth2)	

	var s = chroma(color3).get('oklch.c');
	var s2 = chroma(color3).get('hsl.s');
	var sata = (GetSaturation() / 100);


	var page = [
				chroma(color3).set('oklch.c', s * sata).set('hsl.s', s2 * sata).set('hsl.h', adjusth2),	// Sp Dark Mode 0 (Normal)
				chroma(color3).set('oklch.c', s * sata).set('hsl.s', s2 * sata).set('hsl.h', huea),		// Sp Dark Mode 1 (Colorscale)
				chroma(color3).set('oklch.c', s * sata).set('hsl.s', s2 * sata).set('hsl.h', adjusth2),	// Sp Dark Mode 2 (Hot Temperature)
				chroma(color3).set('oklch.c', s * sata).set('hsl.s', s2 * sata).set('hsl.h', adjusth2),	// Sp Dark Mode 3 (Cold Temperature)
			   ][window.ThemingEngine_ColorFilterMode];
	return page

}




// Only used for link and header colors
function ColorHover2(color,color2) {
	return ColorRGB(ColorHover(color,color2));
}

// Conversion for R,G,B syntax
function ColorRGB(color) {
	return chroma(color).get('rgb.r') + ',' + chroma(color).get('rgb.g') + ',' + chroma(color).get('rgb.b');
}

function isLightColor(color) {
	var c1 = (chroma.contrast('#000000',  chroma(color)))
	var c2 = (chroma.contrast('#ffffff',  chroma(color)))
	return (c1 > c2);

/*
 return chroma(color).lch()[0] >= 50
 return chroma.deltaE('#000000', color) >= 50;
*/

}

function isSemiLightColor(color) {
	var c1 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--light-theme-text-background-color"),  chroma(color)))
	var c2 = (chroma.contrast(getComputedStyle(document.querySelector('body')).getPropertyValue("--dark-theme-text-background-color"),  chroma(color)))
	return (c1 > c2);
/*
	return chroma.deltaE('#e6e6e6', color) >= chroma.deltaE('#3a3a3a', color);
*/
}


function isDarkColor(color) {
	return !isLightColor(color)
}

function isSuitableColorText(color,color2) {
var contrast = window.ThemingEngine_SmallTextContrast*ContrastRatio()
return ((chroma.contrast(color, color2)) >= contrast)
}

function isSuitableColorFormControls(color,color2) {
var contrast = window.ThemingEngine_LargeTextContrast*ContrastRatio3()
return ((chroma.contrast(color, color2)) >= contrast) // For Border Color
}

function getDefaultHyperlinkTextDecoration(color,color2) {
var contrast = window.ThemingEngine_LargeTextContrast / 2.0
return ((chroma.contrast(color, color2)) >= contrast) ? 'none' : 'underline' // For Border Color
}



/* End Color Parsers */

/* Used to udpate all dynamical variables */
function CompileThemingEngine(refresh=true) {
if (refresh === true) {
	colortheme('match-parent', 'match-parent', 'match-parent', 'match-parent', 'match-parent', false,false);
	var cmode = window.ThemingEngine_ContrastMode;
	contrastmode(cmode, false,false);
	/** Foreground Colors 
	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover", ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover", ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-rgb", ColorRGB(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color")) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-rgb", ColorRGB(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color")) );

	document.querySelector('html').style.setProperty("--light-theme-foreground-color-hover-rgb", ColorRGB(ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--light-theme-foreground-color"))) );
	document.querySelector('html').style.setProperty("--dark-theme-foreground-color-hover-rgb", ColorRGB(ColorHover(getComputedStyle(document.querySelector('html')).getPropertyValue("--dark-theme-foreground-color"))) );
	**/
}

//	ToggleTheme(window.ThemingEngine_ActiveTheme,false,false);
//	VisualColor(window.ThemingEngine_ActiveVisualColors,false,false);
	if (DisabledColorManagement()) {
		var colorstyle =".color-management-on { display:none!important;} @supports (not (color-scheme:normal)) { .color-modes { display:none!important } }\n"
	} else {
		var colorstyle= ".color-management-off { display:none!important;}\n"
	}

/** Page BG **/
/* Set Vars */
// content_text is Content Color
// content2_text is Dropdown Color
// content_text4 is Text color of Content Color
// content_text5 is Dark text color of Content Color
// content_color is Content Bg
// dropdowncolor is Dropdown Bg
// dropdowncolor2 is Content Border

var content_color =  GetCanvas();

/* This goes before compiling Generic Colors or else they will think the theme is light */

// Liatch Quirk
	var content_color = ColorStyleAdjust(content_color)

	window.ThemingEngine_PageColor = content_color;
	var lightPage = isLightColor(content_color);


var content_color2 = ColorHover(content_color);

var adjustment = ContrastRatio2();
window.ThemingEngine_FinalContrast = ContrastRatio4();

	if (lightPage) {
		var lightness = '#000000';
		var lightnessR = '#ffffff';
		var fadeouto = 0.2;
	} else {
		var lightness = '#ffffff';
		var lightnessR = '#000000';
		var fadeouto = 0.3;
	}

		var disabledo = 0.7;
		window.ThemingEngine_PageColorFG = lightness

if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-secondary-background-color") == 'auto') ) {
	if (lightPage) {
		var dropdowncolor = ColorMix(content_color,"#000000",adjustment);
	} else {
		var dropdowncolor = ColorMix(content_color,"#ffffff",adjustment);
	}
} else {
	var dropdowncolor = GetCanvas2();
	var dropdowncolor = ColorStyleAdjust(dropdowncolor);

	while ( ( isSuitableColorFormControls(dropdowncolor, content_color) ) && (dropdowncolor !== lightnessR)  ) {
		var dropdowncolor= ColorAdjust(dropdowncolor,window.ThemingEngine_PageColor,true);
	}


}
	var lightDropdown = isLightColor(dropdowncolor);
	if (lightDropdown) {
		var lightnessDropdown = '#000000';
		var tabscPage = '255,255,255';
		var tabsoPage = 0.1 + (chroma(dropdowncolor).luminance() * 0.4 );
	} else {
		var lightnessDropdown = '#ffffff';
		var tabscPage = '58,58,58';
		var tabsoPage = 0.1 + ((1 - chroma(dropdowncolor).luminance()) * 0.4 );
	}

var dropdowncolor2 = GetInactiveText();
var dropdowncolorH = ColorHover(dropdowncolor,content_color);

/** Page text color **/
var content_text= GetCanvasText();

	// Liatch Quirk
		var content_text = ColorStyleAdjust(content_text);
	
		while ( ( !(isSuitableColorText(content_text, content_color)) ) && (content_text !== lightness) ) {
			var content_text= ColorAdjust(content_text,window.ThemingEngine_PageColor);
		}

var content_text1 = ColorHover(content_text);

/** 2nd Page text color **/
var content2_text= GetCanvasText2();


// Liatch Quirk
var content2_text = ColorStyleAdjust(content2_text);

	
while ( ( !(isSuitableColorText(content2_text, dropdowncolor)) ) && (content2_text !== lightnessDropdown) ) {
	var content2_text= ColorAdjust(content2_text,dropdowncolor);
}


var content2_text1 = ColorHover(content2_text,content_text);

/** Body Bg **/
/* Set Vars */

var head_color =	GetDesktop();



// Liatch Quirk
		var head_color = ColorStyleAdjust(head_color);
	var lightHead = isLightColor(head_color);
	if (lightHead) {
		var lightnessHead = '#000000';
	} else {
		var lightnessHead = '#ffffff';
	}

window.ThemingEngine_DesktopColor = head_color


var headcolor1 = ColorHover(head_color,content_color);

/** Community Header text color **/

var img = GetDesktopImage();

if (img == '') {
	var deskfilter = 'none'
} else {
	var deskfilter = 'drop-shadow(0 0 6.5px rgba(var(--desktop-text-foreground-color-rgb),0.75))'
}

var headertext_color= GetDesktopText();

	// Liatch Quirk
		var headertext_color = ColorStyleAdjust(headertext_color);
	
		while ( ( !(isSuitableColorText(headertext_color, head_color)) ) && (headertext_color !== lightnessHead)  ) {
			var headertext_color= ColorAdjust(headertext_color,window.ThemingEngine_DesktopColor);
		}



var headertextcolor1 = ColorHover(headertext_color,content_text);


/** Caret Color **/
/* Set Vars */
var caret_color = GetActiveTitle();
// Liatch Quirk
		var caret_color = ColorStyleAdjust(caret_color);
		var caret2_color = caret_color
		var caret3_color = caret_color
		var caret4_color = caret_color



		while ( ( !(isSuitableColorFormControls(caret_color, content_color)) ) && (caret_color !== lightness)  ) {
			var caret_color= ColorAdjust(caret_color,window.ThemingEngine_PageColor);
		}

		var lightCaret = isLightColor(caret_color);
		if (lightCaret) {
			var lightnessCaret = '#000000';
			var tabscCaret = '255,255,255';
			var tabsoCaret = 0.1 + (chroma(caret_color).luminance() * 0.4 );
		} else {
			var lightnessCaret = '#ffffff';
			var tabscCaret = '58,58,58';
			var tabsoCaret = 0.1 + ((1 - chroma(caret_color).luminance()) * 0.4 );
		}



		while ( ( !(isSuitableColorFormControls(caret2_color, dropdowncolor)) ) && (caret2_color !== lightnessDropdown) ) {
			var caret2_color= ColorAdjust(caret2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(caret3_color, caret_color)) ) && (caret3_color !== lightnessCaret) ) {
			var caret3_color= ColorAdjust(caret3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(caret4_color, head_color)) ) && (caret4_color !== lightnessHead)  ) {
			var caret4_color= ColorAdjust(caret4_color,window.ThemingEngine_DesktopColor);
		}



window.ThemingEngine_ActiveTitleColor = caret_color


var caretcolor1 = ColorHover(caret_color);
var caret2color1 = ColorHover(caret2_color);
var caret3color1 = ColorHover(caret3_color,caret_color); // Ensure Legibility
var caret4color1 = ColorHover(caret4_color);

/** Caret text color **/


var carettext_color= GetActiveTitleText();

	// Liatch Quirk
if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var carettext_color = ColorStyleAdjust(carettext_color);
}
			while ( ( !(isSuitableColorText(carettext_color, caret_color)) ) && (carettext_color !== lightnessCaret)  ) {
				var carettext_color= ColorAdjust(carettext_color,caret_color);
			}


var carettextcolor1 = ColorHover(carettext_color);


/** Caret 2 Color **/
/* Set Vars */
var caretIT_color = GetInactiveTitle();
// Liatch Quirk
if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var caretIT_color = ColorStyleAdjust(caretIT_color);
}
			while ( ( isSuitableColorFormControls(caretIT_color, content_color) ) && (caretIT_color !== lightnessR)  ) {
			var caretIT_color= ColorAdjust(caretIT_color,window.ThemingEngine_PageColor,true);
		}


	var lightCaretIT = isLightColor(caretIT_color);
	if (lightCaretIT) {
		var lightnessCaretIT = '#000000';
		var tabscCaretIT = '255,255,255';
		var tabsoCaretIT = 0.1 + (chroma(caretIT_color).luminance() * 0.4 );
	} else {
		var lightnessCaretIT = '#ffffff';
		var tabscCaretIT = '58,58,58';
		var tabsoCaretIT = 0.1 + ((1 - chroma(caretIT_color).luminance()) * 0.4 );
	}

window.ThemingEngine_InactiveTitleColor = caretIT_color



var caretITcolor1 = ColorHover(caretIT_color);


/** Caret 2 text color **/


var caretITtext_color= GetInactiveTitleText();

	// Liatch Quirk
if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var caretITtext_color = ColorStyleAdjust(caretITtext_color);
}

			while ( ( !(isSuitableColorFormControls(caretITtext_color, caretIT_color)) ) && (caretITtext_color !== lightnessCaretIT)  ) {
				var caretITtext_color= ColorAdjust(caretITtext_color,caretIT_color);
			}


var caretITtextcolor1 = ColorHover(caretITtext_color);


/** Button Color **/
/* Set Vars */

var button_color = GetHighlight();

// Liatch Quirk
	var button_color = ColorStyleAdjust(button_color);
	var button2_color = button_color;
	var button3_color = button_color;
	var button4_color = button_color;
		while ( ( !(isSuitableColorFormControls(button_color, content_color)) ) && (button_color !== lightness)  ) {
			var button_color= ColorAdjust(button_color,window.ThemingEngine_PageColor);
		}
		while ( ( !(isSuitableColorFormControls(button2_color, dropdowncolor)) ) && (button2_color !== lightnessDropdown) ) {
			var button2_color= ColorAdjust(button2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(button3_color, caret_color)) ) && (button3_color !== lightnessCaret) ) {
			var button3_color= ColorAdjust(button3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(button4_color, head_color)) ) && (button4_color !== lightnessHead)  ) {
			var button4_color= ColorAdjust(button4_color,window.ThemingEngine_DesktopColor);
		}

	var lightbutton = isLightColor(button_color);
	if (lightbutton) {
		var lightnessBTN = '#000000';
	} else {
		var lightnessBTN = '#ffffff';
	}

window.ThemingEngine_HighlightColor = button_color



var buttoncolor1 = ColorHover(button_color);
var button2color1 = ColorHover(button2_color);
var button3color1 = ColorHover(button3_color,caret_color); // Ensure Legibility
var button4color1 = ColorHover(button4_color);


/** Button text color **/


var buttontext_color= GetHighlightText();

	// Liatch Quirk
if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
		var buttontext_color = ColorStyleAdjust(buttontext_color);
}
			while ( ( !(isSuitableColorText(buttontext_color, button_color)) ) && (buttontext_color !== lightnessBTN)  ) {
				var buttontext_color= ColorAdjust(buttontext_color,button_color);
			}


var buttontextcolor1 = ColorHover(buttontext_color);



/** Link Color **/
/* Set Vars */
var link_color = GetHyperlink();

// Liatch Quirk
	var link_color = ColorStyleAdjust(link_color);
	var link2_color = link_color;
	var link3_color = link_color;
	var link4_color = link_color;
	
		while ( ( !(isSuitableColorText(link_color, content_color)) ) && (link_color !== lightness) ) {
			var link_color= ColorAdjust(link_color,window.ThemingEngine_PageColor);
		}
		while ( ( !(isSuitableColorText(link2_color, dropdowncolor)) ) && (link2_color !== lightnessDropdown) ) {
			var link2_color= ColorAdjust(link2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(link3_color, caret_color)) ) && (link3_color !== lightnessCaret) ) {
			var link3_color= ColorAdjust(link3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(link4_color, head_color)) ) && (link4_color !== lightnessHead)  ) {
			var link4_color= ColorAdjust(link4_color,window.ThemingEngine_DesktopColor);
		}


var linkcolor1 = ColorHover(link_color,content_color);
var link2color1 = ColorHover(link2_color,content_color);
var link3color1 = ColorHover(link3_color,caret_color);
var link4color1 = ColorHover(link4_color,content_color);


	var lightLink = isLightColor(link_color);
	if (lightLink) {
		var tabscLink = '255,255,255';
		var tabsoLink = 0.1 + (chroma(link_color).luminance() * 0.4 );
	} else {
		var tabscLink = '58,58,58';
		var tabsoLink = 0.1 + ((1 - chroma(link_color).luminance()) * 0.4 );
	}




/** Visited Link Color **/
/* Set Vars */
var vlink_color = GetVisitedHyperlink();

// Liatch Quirk
	var vlink_color = ColorStyleAdjust(vlink_color);
	var vlink2_color = vlink_color;
	var vlink3_color = vlink_color;
	var vlink4_color = vlink_color;
	
		while ( ( !(isSuitableColorText(vlink_color, content_color)) ) && (vlink_color !== lightness) ) {
			var vlink_color= ColorAdjust(vlink_color,window.ThemingEngine_PageColor);
		}
		while ( ( !(isSuitableColorText(vlink2_color, dropdowncolor)) ) && (vlink2_color !== lightnessDropdown) ) {
			var vlink2_color= ColorAdjust(vlink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(vlink3_color, caret_color)) ) && (vlink3_color !== lightnessCaret) ) {
			var vlink3_color= ColorAdjust(vlink3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(vlink4_color, head_color)) ) && (vlink4_color !== lightnessHead)  ) {
			var vlink4_color= ColorAdjust(vlink4_color,window.ThemingEngine_DesktopColor);
		}


var vlinkcolor1 = ColorHover(vlink_color,content_color);
var vlink2color1 = ColorHover(vlink2_color,content_color);
var vlink3color1 = ColorHover(vlink3_color,caret_color);
var vlink4color1 = ColorHover(vlink4_color,caret_color);


/** Active Text/Link Color **/
/* Set Vars */
var alink_color = GetActiveText();

// Liatch Quirk
	var alink_color = ColorStyleAdjust(alink_color);
	var alink2_color = alink_color;
	var alink3_color = alink_color;
	var alink4_color = alink_color;
	
		while ( ( !(isSuitableColorText(alink_color, content_color)) ) && (alink_color !== lightness) ) {
			var alink_color= ColorAdjust(alink_color,window.ThemingEngine_PageColor);
		}
		while ( ( !(isSuitableColorText(alink2_color, dropdowncolor)) ) && (alink2_color !== lightnessDropdown) ) {
			var alink2_color= ColorAdjust(alink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(alink3_color, caret_color)) ) && (alink3_color !== lightnessCaret) ) {
			var alink3_color= ColorAdjust(alink3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(alink4_color, head_color)) ) && (alink4_color !== lightnessHead)  ) {
			var alink4_color= ColorAdjust(alink4_color,window.ThemingEngine_DesktopColor);
		}


var alinkcolor1 = ColorHover(alink_color,content_color);
var alink2color1 = ColorHover(alink2_color,content_color);
var alink3color1 = ColorHover(alink3_color,caret_color);
var alink4color1 = ColorHover(alink4_color,caret_color);


/** Content Border **/
/* Set Vars */

var border_color =	dropdowncolor2;

if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-text-background-color") != 'auto') ) { // Only run Liatch quirk if not in autocolorization
	// Liatch Quirk

		var border_color = ColorStyleAdjust(border_color);
}
	var border2_color =	border_color;
	var border3_color =	border_color;
	var border4_color =	border_color;

		while ( ( !(isSuitableColorFormControls(border_color, content_color)) ) && (border_color !== lightness)  ) {
			var border_color= ColorAdjust(border_color,window.ThemingEngine_PageColor);
		}
		while ( ( !(isSuitableColorFormControls(border2_color, dropdowncolor)) ) && (border2_color !== lightnessDropdown) ) {
			var border2_color= ColorAdjust(border2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(border3_color, caret_color)) ) && (border3_color !== lightnessCaret) ) {
			var border3_color= ColorAdjust(border3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(border4_color, head_color)) ) && (border4_color !== lightnessHead)  ) {
			var border4_color= ColorAdjust(border4_color,window.ThemingEngine_DesktopColor);
		}



var bordercolor1 = ColorHover(border_color);
var border2color1 = ColorHover(border2_color);
var border3color1 = ColorHover(border3_color,caret_color); // Ensure Legibility
var border4color1 = ColorHover(border4_color);



/* Generic Colors */
var generic = CompileGenericColors(window.ThemingEngine_PageColor);
var generic2 = CompileGenericColors(dropdowncolor);
var generic3 = CompileGenericColors(caret_color);
var generic4 = CompileGenericColors(window.ThemingEngine_DesktopColor);
var graphs = CompileGenericGraphColors(window.ThemingEngine_PageColor);

/** Alert Color **/
/* Set Vars */
var alert_color = generic[0];
var alert2_color = generic2[0];
var alert3_color = generic3[0];
var alert4_color = generic4[0];
var alertcolor1 = ColorHover(alert_color,content_color);
var alert2color1 = ColorHover(alert2_color,content_color);
var alert3color1 = ColorHover(alert3_color,caret_color);
var alert4color1 = ColorHover(alert4_color,content_color);
var alertcolor2 = ColorHover(alert_color);


/** Pause Color **/
/* Set Vars */
var pause_color = generic[1];
var pause2_color = generic2[1];
var pause3_color = generic3[1];
var pause4_color = generic4[1];
var pausecolor1 = ColorHover(pause_color,content_color);
var pause2color1 = ColorHover(pause2_color,content_color);
var pause3color1 = ColorHover(pause3_color,caret_color);
var pause4color1 = ColorHover(pause4_color,content_color);
var pausecolor2 = ColorHover(pause_color);

/** Warning Color **/
/* Set Vars */
var warning_color = generic[2];
var warning2_color = generic2[2];
var warning3_color = generic3[2];
var warning4_color = generic4[2];
var warningcolor1 = ColorHover(warning_color,content_color);
var warning2color1 = ColorHover(warning2_color,content_color);
var warning3color1 = ColorHover(warning3_color,caret_color);
var warning4color1 = ColorHover(warning4_color,content_color);
var warningcolor2 = ColorHover(warning_color);

/** Success Color **/
/* Set Vars */
var success_color = generic[3];
var success2_color = generic2[3];
var success3_color = generic3[3];
var success4_color = generic4[3];
var successcolor1 = ColorHover(success_color,content_color);
var success2color1 = ColorHover(success2_color,content_color);
var success3color1 = ColorHover(success3_color,caret_color);
var success4color1 = ColorHover(success4_color,content_color);
var successcolor2 = ColorHover(success_color);

/** Progress Color **/
/* Set Vars */
var progress_color = generic[4];
var progress2_color = generic2[4];
var progress3_color = generic3[4];
var progress4_color = generic4[4];
var progresscolor1 = ColorHover(progress_color,content_color);
var progress2color1 = ColorHover(progress2_color,content_color);
var progress3color1 = ColorHover(progress3_color,caret_color);
var progress4color1 = ColorHover(progress4_color,content_color);
var progresscolor2 = ColorHover(progress_color);

/** Message Color **/
/* Set Vars */
var message_color = generic[5];
var message2_color = generic2[5];
var message3_color = generic3[5];
var message4_color = generic4[5];
var messagecolor1 = ColorHover(message_color,content_color);
var message2color1 = ColorHover(message2_color,content_color);
var message3color1 = ColorHover(message3_color,caret_color);
var message4color1 = ColorHover(message4_color,content_color);
var messagecolor2 = ColorHover(message_color);

/* Graphs */
var g1_color = graphs[0];
var g2_color = graphs[1];
var g3_color = graphs[2];
var g4_color = graphs[3];
var g5_color = graphs[4];

var imgfilter = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-image-filter");

if (imgfilter == 'none') {
	var imgfilter = 'opacity(1)';
}

aopacity = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-acryllic-opacity");

// Gradient Sets
		// Dledlen
		var alert_gradient= GetGradientVariable(content_color,'alert');
		var pause_gradient= GetGradientVariable(content_color,'pause');
		var warning_gradient = GetGradientVariable(content_color,'warning');
		var success_gradient = GetGradientVariable(content_color,'success');
		var progress_gradient = GetGradientVariable(content_color,'progress');
		var message_gradient = GetGradientVariable(content_color,'message');
		var dropdowncolor_gradient = GetGradientVariable(content_color,'canvas-secondary');
		var head_gradient = GetGradientVariable(content_color,'desktop');
		var link_gradient = GetGradientVariable(content_color,'hyperlink');
		var vlink_gradient = GetGradientVariable(content_color,'visited-hyperlink');
		var alink_gradient = GetGradientVariable(content_color,'active-text');

		// Inverted Dledlen
		var content2_text_gradient = GetGradientVariable(content_text,'canvas-text-secondary');
		var headertext_gradient = GetGradientVariable(content_text,'desktop-text')
var content_color_gradient = GetGradientVariable(content_color,'canvas');
var content_text_gradient = GetGradientVariable(content_text,'canvas-text');
var button_gradient = GetGradientVariable(button_color,'highlight');
var buttontext_gradient = GetGradientVariable(buttontext_color,'highlight-text');
var border_gradient = GetGradientVariable(border_color,'inactive-text');
var caret_gradient = GetGradientVariable(caret_color,'active-title');
var carettext_gradient = GetGradientVariable(caret_color,'active-title-text');
var caretIT_gradient = GetGradientVariable(caretIT_color,'inactive-title');
var caretITtext_gradient = GetGradientVariable(caretITtext_color,'inactive-title-text');

// Foreground texts
var alert_fg = GetForegroundVariables(alert_color);
var pause_fg = GetForegroundVariables(pause_color);
var warning_fg = GetForegroundVariables(warning_color);
var success_fg = GetForegroundVariables(success_color);
var progress_fg = GetForegroundVariables(progress_color);
var message_fg = GetForegroundVariables(message_color);
var content_color_fg = GetForegroundVariables(content_color);
var dropdowncolor_fg = GetForegroundVariables(dropdowncolor);
var content_text_fg = GetForegroundVariables(content_text);
var content2_text_fg = GetForegroundVariables(content2_text);
var button_fg = GetForegroundVariables(button_color);
var buttontext_fg = GetForegroundVariables(buttontext_color);
var link_fg = GetForegroundVariables(link_color);
var vlink_fg = GetForegroundVariables(vlink_color);
var alink_fg = GetForegroundVariables(alink_color);
var border_fg = GetForegroundVariables(border_color);
var head_fg = GetForegroundVariables(head_color);
var headertext_fg = GetForegroundVariables(headertext_color);
var caret_fg = GetForegroundVariables(caret_color);
var carettext_fg = GetForegroundVariables(carettext_color);
var caretIT_fg = GetForegroundVariables(caretIT_color);
var caretITtext_fg = GetForegroundVariables(caretITtext_color);

// Inverted Foreground texts
var alert_2fg = GetForegroundVariables(alertcolor1);
var pause_2fg = GetForegroundVariables(pausecolor1);
var warning_2fg = GetForegroundVariables(warningcolor1);
var success_2fg = GetForegroundVariables(successcolor1);
var progress_2fg = GetForegroundVariables(progresscolor1);
var message_2fg = GetForegroundVariables(messagecolor1);
var content_color_2fg = GetForegroundVariables(content_color2)
var dropdowncolor_2fg = GetForegroundVariables(dropdowncolorH)
var content_text_2fg = GetForegroundVariables(content_text1)
var content2_text_2fg = GetForegroundVariables(content2_text1)
var button_2fg = GetForegroundVariables(buttoncolor1)
var buttontext_2fg = GetForegroundVariables(buttontextcolor1)
var link_2fg = GetForegroundVariables(linkcolor1)
var vlink_2fg = GetForegroundVariables(vlinkcolor1)
var alink_2fg = GetForegroundVariables(alinkcolor1)
var border_2fg = GetForegroundVariables(bordercolor1)
var head_2fg = GetForegroundVariables(headcolor1)
var headertext_2fg = GetForegroundVariables(headertextcolor1);
var caret_2fg = GetForegroundVariables(caretcolor1);
var carettext_2fg = GetForegroundVariables(carettextcolor1);
var caretIT_2fg = GetForegroundVariables(caretITcolor1);
var caretITtext_2fg = GetForegroundVariables(caretITtextcolor1);


	wordfilter2 = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-hover")
	if ( wordfilter2 == "" ) {
		wordfilter2 == 'initial'
	}


	if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style") === 'outlined') {
		var iconstyle= 'Material Icons'
 	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style") === 'sharp') {
		var iconstyle=  'Material Icons Sharp'
 	} else {
		var iconstyle=  'Material Icons Round'
 	}


	micabg = [ColorMix(dropdowncolor,content_color,0.5),'color'];
	
	var saturation = (1 - (GetSaturation() / 100));
	var hue = GetHueShift();	
	brad = parseInt(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--border-radius"));

	var fon1 = GetCustomFont();
	var fon2 = GetCustomFont4();
	var fon3 = GetCustomFont2();
	var fon4 = GetCustomFont3();


var invfilters = [
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ')',			  					'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')'],						// Sp Dark Mode 0 (Normal)
					['sepia(1) hue-rotate(' + (320+hue) + 'deg)  grayscale(' + saturation + ')', 	  			'invert(1) sepia(1) hue-rotate(' + (320+hue) + 'deg)  grayscale(' + saturation + ')'],				// Sp Dark Mode 1 (Colorscale)
					['sepia(1) hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') opacity(0.5)',			'invert(1) sepia(1) hue-rotate(' + hue + 'deg) opacity(0.5) grayscale(' + saturation + ')'], 		// Sp Dark Mode 2 (Hot Temperature)
					['sepia(1) hue-rotate(' + (180 + hue) + 'deg) grayscale(' + saturation + ') opacity(0.5)',	'invert(1) sepia(1) hue-rotate(' + (180+hue) + 'deg) opacity(0.5) grayscale(' + saturation + ')'],	// Sp Dark Mode 3 (Cold Temperature)
				 ];
/* Set Values for dynamical variables */
	var result = 		  colorstyle +
						  ":root {" +
						  "--fadeout-opacity:" + fadeouto + ";\n" + 
						  "--disabled-elements-opacity:" + disabledo + ";\n" + 
						  "--desktop-alternative-foreground-color:" + head_fg[4] + ";\n" + 
						  "--desktop-alternative-foreground-color-hover:" + head_fg[6] + ";\n" + 
						  "--desktop-alternative-foreground-color-rgb:" + head_fg[5] + ";\n" +
						  "--desktop-alternative-foreground-color-hover-rgb:" + head_fg[7] + ";\n" + 
						  "--desktop-text-alternative-foreground-color:" + headertext_fg[4] + ";\n" + 
						  "--desktop-text-alternative-foreground-color-hover:" + headertext_fg[6] + ";\n" + 
						  "--desktop-text-alternative-foreground-color-rgb:" + headertext_fg[5] + ";\n" +
						  "--desktop-text-alternative-foreground-color-hover-rgb:" + headertext_fg[7] + ";\n" +
						  "--hyperlink-alternative-foreground-color:" + link_fg[4] + ";\n" + 
						  "--hyperlink-alternative-foreground-color-hover:" + link_fg[6] + ";\n" + 
						  "--hyperlink-alternative-foreground-color-rgb:" + link_fg[5] + ";\n" +
						  "--hyperlink-alternative-foreground-color-hover-rgb:" + link_fg[7] + ";\n" +
						  "--visited-hyperlink-alternative-foreground-color:" + vlink_fg[4] + ";\n" + 
						  "--visited-hyperlink-alternative-foreground-color-hover:" + vlink_fg[6] + ";\n" + 
						  "--visited-hyperlink-alternative-foreground-color-rgb:" + vlink_fg[5] + ";\n" +
						  "--visited-hyperlink-alternative-foreground-color-hover-rgb:" + vlink_fg[7] + ";\n" +
						  "--canvas-alternative-foreground-color:" + content_color_fg[4] + ";\n" + 
						  "--canvas-alternative-foreground-color-hover:" + content_color_fg[6] + ";\n" + 
						  "--canvas-alternative-foreground-color-rgb:" + content_color_fg[5] + ";\n" +
						  "--canvas-alternative-foreground-color-hover-rgb:" + content_color_fg[7] + ";\n" +
						  "--canvas-secondary-alternative-foreground-color:" + dropdowncolor_fg[4] + ";\n" + 
						  "--canvas-secondary-alternative-foreground-color-hover:" + dropdowncolor_fg[6] + ";\n" + 
						  "--canvas-secondary-alternative-foreground-color-rgb:" + dropdowncolor_fg[5] + ";\n" +
						  "--canvas-secondary-alternative-foreground-color-hover-rgb:" + dropdowncolor_fg[7] + ";\n" +
						  "--inactive-text-alternative-foreground-color:" + border_fg[4] + ";\n" + 
						  "--inactive-text-alternative-foreground-color-hover:" + border_fg[6] + ";\n" + 
						  "--inactive-text-alternative-foreground-color-rgb:" + border_fg[5] + ";\n" +
						  "--inactive-text-alternative-foreground-color-hover-rgb:" + border_fg[7] + ";\n" +
						  "--active-text-alternative-foreground-color:" + alink_fg[4] + ";\n" + 
						  "--active-text-alternative-foreground-color-hover:" + alink_fg[6] + ";\n" + 
						  "--active-text-alternative-foreground-color-rgb:" + alink_fg[5] + ";\n" +
						  "--active-text-alternative-foreground-color-hover-rgb:" + alink_fg[7] + ";\n" +
						  "--canvas-text-alternative-foreground-color:" + content_text_fg[4] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-hover:" + content_text_fg[6] + ";\n" + 
						  "--canvas-text-alternative-foreground-color-rgb:" + content_text_fg[5] + ";\n" +
						  "--canvas-text-alternative-foreground-color-hover-rgb:" + content_text_fg[7] + ";\n" +
						  "--highlight-alternative-foreground-color:" + button_fg[4] + ";\n" + 
						  "--highlight-alternative-foreground-color-hover:" + button_fg[6] + ";\n" + 
						  "--highlight-alternative-foreground-color-rgb:" + button_fg[5] + ";\n" +
						  "--highlight-alternative-foreground-color-hover-rgb:" + button_fg[7] + ";\n" +
						  "--highlight-text-alternative-foreground-color:" + buttontext_fg[4] + ";\n" + 
						  "--highlight-text-alternative-foreground-color-hover:" + buttontext_fg[6] + ";\n" + 
						  "--highlight-text-alternative-foreground-color-rgb:" + buttontext_fg[5] + ";\n" +
						  "--highlight-text-alternative-foreground-color-hover-rgb:" + buttontext_fg[7] + ";\n" +
						  "--active-title-alternative-foreground-color:" + caret_fg[4] + ";\n" + 
						  "--active-title-alternative-foreground-color-hover:" + caret_fg[6] + ";\n" + 
						  "--active-title-alternative-foreground-color-rgb:" + caret_fg[5] + ";\n" +
						  "--active-title-alternative-foreground-color-hover-rgb:" + caret_fg[7] + ";\n" +
						  "--active-title-text-alternative-foreground-color:" + carettext_fg[4] + ";\n" + 
						  "--active-title-text-alternative-foreground-color-hover:" + carettext_fg[6] + ";\n" + 
						  "--active-title-text-alternative-foreground-color-rgb:" + carettext_fg[5] + ";\n" +
						  "--active-title-text-alternative-foreground-color-hover-rgb:" + carettext_fg[7] + ";\n" +
						  "--inactive-title-alternative-foreground-color:" + caretIT_fg[4] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-hover:" + caretIT_fg[6] + ";\n" + 
						  "--inactive-title-alternative-foreground-color-rgb:" + caretIT_fg[5] + ";\n" +
						  "--inactive-title-alternative-foreground-color-hover-rgb:" + caretIT_fg[7] + ";\n" +
						  "--inactive-title-text-alternative-foreground-color:" + caretITtext_fg[4] + ";\n" + 
						  "--inactive-title-text-alternative-foreground-color-hover:" + caretITtext_fg[6] + ";\n" + 
						  "--inactive-title-text-alternative-foreground-color-rgb:" + caretITtext_fg[5] + ";\n" +
						  "--inactive-title-text-alternative-foreground-color-hover-rgb:" + caretITtext_fg[7] + ";\n" +
						  "--alert-alternative-foreground-color:" + alert_fg[4] + "!important;\n" + 
						  "--alert-alternative-foreground-color-hover:" + alert_fg[6] + "!important;\n" + 
						  "--alert-alternative-foreground-color-rgb:" + alert_fg[5] + "!important;\n" +
						  "--alert-alternative-foreground-color-hover-rgb:" + alert_fg[7] + "!important;\n" +
						  "--pause-alternative-foreground-color:" + pause_fg[4] + "!important;\n" + 
						  "--pause-alternative-foreground-color-hover:" + pause_fg[6] + "!important;\n" + 
						  "--pause-alternative-foreground-color-rgb:" + pause_fg[5] + "!important;\n" +
						  "--pause-alternative-foreground-color-hover-rgb:" + pause_fg[7] + "!important;\n" +
						  "--warning-alternative-foreground-color:" + warning_fg[4] + "!important;\n" + 
						  "--warning-alternative-foreground-color-hover:" + warning_fg[6] + "!important;\n" + 
						  "--warning-alternative-foreground-color-rgb:" + warning_fg[5] + "!important;\n" +
						  "--warning-alternative-foreground-color-hover-rgb:" + warning_fg[7] + "!important;\n" +
						  "--success-alternative-foreground-color:" + success_fg[4] + "!important;\n" + 
						  "--success-alternative-foreground-color-hover:" + success_fg[6] + "!important;\n" + 
						  "--success-alternative-foreground-color-rgb:" + success_fg[5] + "!important;\n" +
						  "--success-alternative-foreground-color-hover-rgb:" + success_fg[7] + "!important;\n" +
						  "--progress-alternative-foreground-color:" + progress_fg[4] + "!important;\n" + 
						  "--progress-alternative-foreground-color-hover:" + progress_fg[6] + "!important;\n" + 
						  "--progress-alternative-foreground-color-rgb:" + progress_fg[5] + "!important;\n" +
						  "--progress-alternative-foreground-color-hover-rgb:" + progress_fg[7] + "!important;\n" +
						  "--message-alternative-foreground-color:" + message_fg[4] + "!important;\n" + 
						  "--message-alternative-foreground-color-hover:" + message_fg[6] + "!important;\n" + 
						  "--message-alternative-foreground-color-rgb:" + message_fg[5] + "!important;\n" +
						  "--message-alternative-foreground-color-hover-rgb:" + message_fg[7] + "!important;\n" +
						  "--desktop-fadeout-color:rgba(var(--desktop-background-color-rgb),var(--fadeout-opacity));" +
						  "--desktop-text-fadeout-color:rgba(var(--desktop-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--hyperlink-fadeout-color:rgba(var(--hyperlink-background-color-rgb),var(--fadeout-opacity));" +
						  "--hyperlink-secondary-fadeout-color:rgba(var(--hyperlink-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--hyperlink-tertiary-fadeout-color:rgba(var(--hyperlink-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--hyperlink-quaternary-fadeout-color:rgba(var(--hyperlink-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--visited-hyperlink-fadeout-color:rgba(var(--visited-hyperlink-background-color-rgb),var(--fadeout-opacity));" +
						  "--visited-hyperlink-secondary-fadeout-color:rgba(var(--visited-hyperlink-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--visited-hyperlink-tertiary-fadeout-color:rgba(var(--visited-hyperlink-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--visited-hyperlink-quaternary-fadeout-color:rgba(var(--visited-hyperlink-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--canvas-fadeout-color:rgba(var(--canvas-background-color-rgb),var(--fadeout-opacity));" +
						  "--canvas-secondary-fadeout-color:rgba(var(--canvas-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-text-fadeout-color:rgba(var(--inactive-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-text-secondary-fadeout-color:rgba(var(--inactive-text-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-text-tertiary-fadeout-color:rgba(var(--inactive-text-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-text-quaternary-fadeout-color:rgba(var(--inactive-text-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-text-fadeout-color:rgba(var(--active-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-text-secondary-fadeout-color:rgba(var(--active-text-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-text-tertiary-fadeout-color:rgba(var(--active-text-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-text-quaternary-fadeout-color:rgba(var(--active-text-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--canvas-text-fadeout-color:rgba(var(--canvas-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--canvas-text-secondary-fadeout-color:rgba(var(--canvas-text-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--highlight-fadeout-color:rgba(var(--highlight-background-color-rgb),var(--fadeout-opacity));" +
						  "--highlight-text-fadeout-color:rgba(var(--highlight-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--highlight-secondary-fadeout-color:rgba(var(--highlight-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--highlight-tertiary-fadeout-color:rgba(var(--highlight-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--highlight-quaternary-fadeout-color:rgba(var(--highlight-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-title-fadeout-color:rgba(var(--active-title-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-title-text-fadeout-color:rgba(var(--active-title-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-title-secondary-fadeout-color:rgba(var(--active-title-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-title-tertiary-fadeout-color:rgba(var(--active-title-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--active-title-quaternary-fadeout-color:rgba(var(--active-title-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-title-fadeout-color:rgba(var(--inactive-title-background-color-rgb),var(--fadeout-opacity));" +
						  "--inactive-title-text-fadeout-color:rgba(var(--inactive-title-text-background-color-rgb),var(--fadeout-opacity));" +
						  "--alert-fadeout-color:rgba(var(--alert-background-color-rgb),var(--fadeout-opacity));" +
						  "--alert-secondary-fadeout-color:rgba(var(--alert-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--alert-tertiary-fadeout-color:rgba(var(--alert-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--alert-quaternary-fadeout-color:rgba(var(--alert-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--pause-fadeout-color:rgba(var(--pause-background-color-rgb),var(--fadeout-opacity));" +
						  "--pause-secondary-fadeout-color:rgba(var(--pause-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--pause-tertiary-fadeout-color:rgba(var(--pause-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--pause-quaternary-fadeout-color:rgba(var(--pause-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--warning-fadeout-color:rgba(var(--warning-background-color-rgb),var(--fadeout-opacity));" +
						  "--warning-secondary-fadeout-color:rgba(var(--warning-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--warning-tertiary-fadeout-color:rgba(var(--warning-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--warning-quaternary-fadeout-color:rgba(var(--warning-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--success-fadeout-color:rgba(var(--success-background-color-rgb),var(--fadeout-opacity));" +
						  "--success-secondary-fadeout-color:rgba(var(--success-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--success-tertiary-fadeout-color:rgba(var(--success-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--success-quaternary-fadeout-color:rgba(var(--success-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--progress-fadeout-color:rgba(var(--progress-background-color-rgb),var(--fadeout-opacity));" +
						  "--progress-secondary-fadeout-color:rgba(var(--progress-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--progress-tertiary-fadeout-color:rgba(var(--progress-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--progress-quaternary-fadeout-color:rgba(var(--progress-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--message-fadeout-color:rgba(var(--message-background-color-rgb),var(--fadeout-opacity));" +
						  "--message-secondary-fadeout-color:rgba(var(--message-secondary-background-color-rgb),var(--fadeout-opacity));" +
						  "--message-tertiary-fadeout-color:rgba(var(--message-tertiary-background-color-rgb),var(--fadeout-opacity));" +
						  "--message-quaternary-fadeout-color:rgba(var(--message-quaternary-background-color-rgb),var(--fadeout-opacity));" +
						  "--canvas-secondary-background-color:" + dropdowncolor + ";\n" + 
						  "--canvas-secondary-background-color-hover:" + dropdowncolorH + ";\n" + 
						  "--canvas-secondary-gradient-color:" + dropdowncolor_gradient[0] + ";\n" +
						  "--canvas-secondary-gradient-color-hover:" + dropdowncolor_gradient[1] + ";\n" +
						  "--canvas-secondary-foreground-color:" + dropdowncolor_fg[0] + ";\n" +
						  "--canvas-secondary-foreground-color-hover:" +  dropdowncolor_fg[1] + ";\n" + 
						  "--canvas-secondary-foreground-color-inverted:" + dropdowncolor_2fg[0] + ";\n" +
						  "--canvas-background-color:" + content_color + ";\n" +
						  "--canvas-background-color-hover:" + content_color2 + ";\n" +
						  "--canvas-gradient-color:" + content_color_gradient[0] + ";\n" +
						  "--canvas-gradient-color-hover:" + content_color_gradient[1] + ";\n" +
						  "--canvas-foreground-color:" + content_color_fg[0] + ";\n" +
						  "--canvas-foreground-color-hover:" +  content_color_fg[1] + ";\n" + 
						  "--canvas-foreground-color-inverted:" + content_color_2fg[0] + ";\n" +
						  "--canvas-secondary-background-color-rgb:" + ColorRGB(dropdowncolor) + ";\n" + 
						  "--canvas-secondary-background-color-hover-rgb:" + ColorRGB(dropdowncolorH) + ";\n" +
						  "--canvas-secondary-foreground-color-rgb:" + dropdowncolor_fg[2] + ";\n" +
						  "--canvas-secondary-foreground-color-hover-rgb:" +  dropdowncolor_fg[3] + ";\n" + 
						  "--canvas-secondary-foreground-color-inverted-rgb:" + dropdowncolor_2fg[2] + ";\n" +
						  "--canvas-tabs-background-color:" + tabscPage  + ";\n" +
						  "--canvas-tabs-opacity:" + (tabsoPage * 0.5)  + ";\n" +
						  "--canvas-active-tabs-opacity:" + tabsoPage  + ";\n" +
						  "--canvas-background-color-rgb:" + ColorRGB( content_color ) + ";\n" +
						  "--canvas-background-color-hover-rgb:" + ColorRGB(content_color2) + ";\n" +
						  "--canvas-foreground-color-rgb:" +  content_color_fg[2] + ";\n" +
						  "--canvas-foreground-color-hover-rgb:" +  content_color_fg[3] + ";\n" + 
						  "--canvas-foreground-color-inverted-rgb:" + content_color_2fg[2] + ";\n" +
						  "--canvas-text-background-color:" + content_text + ";\n" +
						  "--canvas-text-background-color-hover:" + content_text1 + ";\n" +
						  "--canvas-text-gradient-color:" + content_text_gradient[0] + ";\n" +
						  "--canvas-text-gradient-color-hover:" + content_text_gradient[1] + ";\n" +
						  "--canvas-text-foreground-color:" + content_text_fg[0] + ";\n" +
						  "--canvas-text-foreground-color-hover:" + content_text_fg[1] + ";\n" +
						  "--canvas-text-foreground-color-inverted:" + content_text_2fg[0] + ";\n" +
						  "--canvas-text-background-color-rgb:" + ColorRGB( content_text ) + ";\n" +
						  "--canvas-text-background-color-hover-rgb:" + ColorRGB(content_text1) + ";\n" +
						  "--canvas-text-foreground-color-rgb:" + content_text_fg[2] + ";\n" +
						  "--canvas-text-foreground-color-hover-rgb:" + content_text_fg[3] + ";\n" +
						  "--canvas-text-foreground-color-inverted-rgb:" + content_text_2fg[2] + ";\n" +
						  "--canvas-text-secondary-background-color:" + content2_text + ";\n" +
						  "--canvas-text-secondary-background-color-hover:" + content2_text1 + ";\n" +
						  "--canvas-text-secondary-gradient-color:" + content2_text_gradient[0] + ";\n" +
						  "--canvas-text-secondary-gradient-color-hover:" + content2_text_gradient[1] + ";\n" +
						  "--canvas-text-secondary-gradient-color:" + content2_text_gradient[0] + ";\n" +
						  "--canvas-text-secondary-gradient-color-hover:" + content2_text_gradient[1] + ";\n" +
						  "--canvas-text-secondary-foreground-color:" + content2_text_fg[0] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover:" + content2_text_fg[1] + ";\n" +
						  "--canvas-text-secondary-foreground-color-inverted:" + content2_text_2fg[0] + ";\n" +
						  "--canvas-text-secondary-background-color-rgb:" + ColorRGB( content2_text ) + ";\n" +
						  "--canvas-text-secondary-background-color-hover-rgb:" + ColorRGB(content2_text1) + ";\n" +
						  "--canvas-text-secondary-foreground-color-rgb:" + content2_text_fg[2] + ";\n" +
						  "--canvas-text-secondary-foreground-color-hover-rgb:" + content2_text_fg[3] + ";\n" +
						  "--canvas-text-secondary-foreground-color-inverted-rgb:" + content2_text_2fg[2] + ";\n" +
						  "--highlight-background-color:" + button_color + ";\n" +
						  "--highlight-background-color-hover:" + buttoncolor1 + ";\n" +
						  "--highlight-gradient-color:" + button_gradient[0] + ";\n" +
						  "--highlight-gradient-color-hover:" + button_gradient[1] + ";\n" +
						  "--highlight-foreground-color:" + button_fg[0] + ";\n" +
						  "--highlight-foreground-color-hover:" + button_fg[1] + ";\n" +
						  "--highlight-foreground-color-inverted:" + button_2fg[0] + ";\n" +
						  "--highlight-background-color-rgb:" + ColorRGB(button_color) + ";\n" +
						  "--highlight-background-color-hover-rgb:" + ColorRGB(buttoncolor1) + ";\n" +
						  "--highlight-foreground-color-rgb:" + button_fg[2] + ";\n" +
						  "--highlight-foreground-color-hover-rgb:" + button_fg[3] + ";\n" +
						  "--highlight-foreground-color-inverted-rgb:" + button_2fg[2] + ";\n" +
						  "--highlight-text-background-color:" + buttontext_color + ";\n" +
						  "--highlight-text-background-color-hover:" + buttontextcolor1 + ";\n" +
						  "--highlight-text-gradient-color:" + buttontext_gradient[0] + ";\n" +
						  "--highlight-text-gradient-color-hover:" + buttontext_gradient[1] + ";\n" +
						  "--highlight-text-foreground-color:" + buttontext_fg[0] + ";\n" +
						  "--highlight-text-foreground-color-hover:" + buttontext_fg[1] + ";\n" +
						  "--highlight-text-foreground-color-inverted:" + buttontext_2fg[0] + ";\n" +
						  "--highlight-text-background-color-rgb:" + ColorRGB(buttontext_color) + ";\n" +
						  "--highlight-text-background-color-hover-rgb:" + ColorRGB(buttontextcolor1) + ";\n" +
						  "--highlight-text-foreground-color-rgb:" + buttontext_fg[2] + ";\n" +
						  "--highlight-text-foreground-color-hover-rgb:" + buttontext_fg[3] + ";\n" +
						  "--highlight-text-foreground-color-inverted-rgb:" + buttontext_2fg[2] + ";\n" +
						  "--highlight-secondary-background-color:" + button2_color + ";\n" +
						  "--highlight-secondary-background-color-hover:" + button2color1 + ";\n" +
						  "--highlight-secondary-background-color-rgb:" + ColorRGB(button2_color) + ";\n" +
						  "--highlight-tertiary-background-color:" + button3_color + ";\n" +
						  "--highlight-tertiary-background-color-hover:" + button3color1 + ";\n" +
						  "--highlight-tertiary-background-color-rgb:" + ColorRGB(button3_color) + ";\n" +
						  "--highlight-quaternary-background-color:" + button4_color + ";\n" +
						  "--highlight-quaternary-background-color-hover:" + button4color1 + ";\n" +
						  "--highlight-quaternary-background-color-rgb:" + ColorRGB(button4_color) + ";\n" +
						  "--hyperlink-background-color:" + link_color + ";\n" +
						  "--hyperlink-background-color-hover:" + linkcolor1 + ";\n" +
						  "--hyperlink-gradient-color:" + link_gradient[0] + ";\n" +
						  "--hyperlink-gradient-color-hover:" + link_gradient[1] + ";\n" +
						  "--hyperlink-foreground-color:" + link_fg[0] + ";\n" +
						  "--hyperlink-foreground-color-hover:" + link_fg[1] + ";\n" +
						  "--hyperlink-foreground-color-inverted:" + link_2fg[0] + ";\n" +
						  "--hyperlink-background-color-rgb:" + ColorRGB(link_color) + ";\n" +
						  "--hyperlink-background-color-hover-rgb:" + ColorRGB(linkcolor1) + ";\n" +
						  "--hyperlink-foreground-color-rgb:" + link_fg[2] + ";\n" +
						  "--hyperlink-foreground-color-hover-rgb:" + link_fg[3] + ";\n" +
						  "--hyperlink-foreground-color-inverted-rgb:" + link_2fg[2] + ";\n" +
						  "--hyperlink-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link_color,content_text) + ";\n" +
						  "--hyperlink-tabs-background-color:" + tabscLink  + ";\n" +
						  "--hyperlink-tabs-opacity:" + (tabsoLink * 0.5)  + ";\n" +
						  "--hyperlink-active-tabs-opacity:" + tabsoLink  + ";\n" +
						  "--hyperlink-secondary-background-color:" + link2_color + ";\n" +
						  "--hyperlink-secondary-background-color-hover:" + link2color1 + ";\n" +
						  "--hyperlink-secondary-background-color-rgb:" + ColorRGB(link2_color) + ";\n" +
						  "--hyperlink-secondary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link2_color,content2_text) + ";\n" +
						  "--hyperlink-tertiary-background-color:" + link3_color + ";\n" +
						  "--hyperlink-tertiary-background-color-hover:" + link3color1 + ";\n" +
						  "--hyperlink-tertiary-background-color-rgb:" + ColorRGB(link3_color) + ";\n" +
						  "--hyperlink-tertiary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link3_color,carettext_color) + ";\n" +
						  "--hyperlink-quaternary-background-color:" + link4_color + ";\n" +
						  "--hyperlink-quaternary-background-color-hover:" + link4color1 + ";\n" +
						  "--hyperlink-quaternary-background-color-rgb:" + ColorRGB(link4_color) + ";\n" +
						  "--hyperlink-quaternary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link4_color,headertext_color) + ";\n" +
						  "--visited-hyperlink-background-color:" + vlink_color + ";\n" +
						  "--visited-hyperlink-background-color-hover:" + vlinkcolor1 + ";\n" +
						  "--visited-hyperlink-gradient-color:" + vlink_gradient[0] + ";\n" +
						  "--visited-hyperlink-gradient-color-hover:" + vlink_gradient[1] + ";\n" +
						  "--visited-hyperlink-foreground-color:" + vlink_fg[0] + ";\n" +
						  "--visited-hyperlink-foreground-color-hover:" + vlink_fg[1] + ";\n" +
						  "--visited-hyperlink-foreground-color-inverted:" + vlink_2fg[0] + ";\n" +
						  "--visited-hyperlink-background-color-rgb:" + ColorRGB(vlink_color) + ";\n" +
						  "--visited-hyperlink-background-color-hover-rgb:" + ColorRGB(vlinkcolor1) + ";\n" +
						  "--visited-hyperlink-foreground-color-rgb:" + vlink_fg[2] + ";\n" +
						  "--visited-hyperlink-foreground-color-hover-rgb:" + vlink_fg[3] + ";\n" +
						  "--visited-hyperlink-foreground-color-inverted-rgb:" + vlink_2fg[2] + ";\n" +
						  "--visited-hyperlink-secondary-background-color:" + vlink2_color + ";\n" +
						  "--visited-hyperlink-secondary-background-color-hover:" + vlink2color1 + ";\n" +
						  "--visited-hyperlink-secondary-background-color-rgb:" + ColorRGB(vlink2_color) + ";\n" +
						  "--visited-hyperlink-tertiary-background-color:" + vlink3_color + ";\n" +
						  "--visited-hyperlink-tertiary-background-color-hover:" + vlink3color1 + ";\n" +
						  "--visited-hyperlink-tertiary-background-color-rgb:" + ColorRGB(vlink3_color) + ";\n" +
						  "--visited-hyperlink-quaternary-background-color:" + vlink4_color + ";\n" +
						  "--visited-hyperlink-quaternary-background-color-hover:" + vlink4color1 + ";\n" +
						  "--visited-hyperlink-quaternary-background-color-rgb:" + ColorRGB(vlink4_color) + ";\n" +
						  "--active-text-background-color:" + alink_color + ";\n" +
						  "--active-text-background-color-hover:" + alinkcolor1 + ";\n" +
						  "--active-text-gradient-color:" + alink_gradient[0] + ";\n" +
						  "--active-text-gradient-color-hover:" + alink_gradient[1] + ";\n" +
						  "--active-text-foreground-color:" + alink_fg[0] + ";\n" +
						  "--active-text-foreground-color-hover:" + alink_fg[1] + ";\n" +
						  "--active-text-foreground-color-inverted:" + alink_2fg[0] + ";\n" +
						  "--active-text-background-color-rgb:" + ColorRGB(alink_color) + ";\n" +
						  "--active-text-background-color-hover-rgb:" + ColorRGB(alinkcolor1) + ";\n" +
						  "--active-text-foreground-color-rgb:" + alink_fg[2] + ";\n" +
						  "--active-text-foreground-color-hover-rgb:" + alink_fg[3] + ";\n" +
						  "--active-text-foreground-color-inverted-rgb:" + alink_2fg[2] + ";\n" +
						  "--active-text-secondary-background-color:" + alink2_color + ";\n" +
						  "--active-text-secondary-background-color-hover:" + alink2color1 + ";\n" +
						  "--active-text-secondary-background-color-rgb:" + ColorRGB(alink2_color) + ";\n" +
						  "--active-text-tertiary-background-color:" + alink3_color + ";\n" +
						  "--active-text-tertiary-background-color-hover:" + alink3color1 + ";\n" +
						  "--active-text-tertiary-background-color-rgb:" + ColorRGB(alink3_color) + ";\n" +
						  "--active-text-quaternary-background-color:" + alink4_color + ";\n" +
						  "--active-text-quaternary-background-color-hover:" + alink4color1 + ";\n" +
						  "--active-text-quaternary-background-color-rgb:" + ColorRGB(alink4_color) + ";\n" +
						  "--inactive-text-background-color:" + border_color + ";\n" +
						  "--inactive-text-background-color-hover:" + bordercolor1 + ";\n" +
						  "--inactive-text-gradient-color:" + border_gradient[0] + ";\n" +
						  "--inactive-text-gradient-color-hover:" + border_gradient[1] + ";\n" +
						  "--inactive-text-foreground-color:" + border_fg[0] + ";\n" +
						  "--inactive-text-foreground-color-hover:" + border_fg[1] + ";\n" +
						  "--inactive-text-foreground-color-inverted:" + border_2fg[0] + ";\n" +
						  "--inactive-text-background-color-rgb:" + ColorRGB(border_color) + ";\n" +
						  "--inactive-text-background-color-hover-rgb:" + ColorRGB(bordercolor1) + ";\n" +
						  "--inactive-text-foreground-color-rgb:" + border_fg[2] + ";\n" +
						  "--inactive-text-foreground-color-hover-rgb:" + border_fg[3] + ";\n" +
						  "--inactive-text-foreground-color-inverted-rgb:" + border_2fg[2] + ";\n" +
						  "--inactive-text-secondary-background-color:" + border2_color + ";\n" +
						  "--inactive-text-secondary-background-color-hover:" + border2color1 + ";\n" +
						  "--inactive-text-secondary-background-color-rgb:" + ColorRGB(border2_color) + ";\n" +
						  "--inactive-text-tertiary-background-color:" + border3_color + ";\n" +
						  "--inactive-text-tertiary-background-color-hover:" + border3color1 + ";\n" +
						  "--inactive-text-tertiary-background-color-rgb:" + ColorRGB(border3_color) + ";\n" +
						  "--inactive-text-quaternary-background-color:" + border4_color + ";\n" +
						  "--inactive-text-quaternary-background-color-hover:" + border4color1 + ";\n" +
						  "--inactive-text-quaternary-background-color-rgb:" + ColorRGB(border4_color) + ";\n" +
						  "--desktop-background-color:" + head_color + ";\n" +
						  "--desktop-background-color-hover:" + headcolor1 + ";\n" +
						  "--desktop-gradient-color:" + head_gradient[0] + ";\n" +
						  "--desktop-gradient-color-hover:" + head_gradient[1] + ";\n" +
						  "--desktop-foreground-color:" + head_fg[0] + ";\n" +
						  "--desktop-foreground-color-hover:" + head_fg[1] + ";\n" +
						  "--desktop-foreground-color-inverted:" + head_2fg[0] + ";\n" +
						  "--desktop-background-color-rgb:" + ColorRGB(head_color) + ";\n" +
						  "--desktop-background-color-hover-rgb:" + ColorRGB(headcolor1) + ";\n" +
						  "--desktop-foreground-color-rgb:" + head_fg[2] + ";\n" +
						  "--desktop-foreground-color-hover-rgb:" + head_fg[3] + ";\n" +
						  "--desktop-foreground-color-inverted-rgb:" + head_2fg[2] + ";\n" +
						  "--desktop-text-background-color:" + headertext_color + ";\n" +
						  "--desktop-text-background-color-hover:" + headertextcolor1 + ";\n" +
						  "--desktop-text-gradient-color:" + headertext_gradient[0] + ";\n" +
						  "--desktop-text-gradient-color-hover:" + headertext_gradient[1] + ";\n" +
						  "--desktop-text-foreground-color:" + headertext_fg[0] + ";\n" +
						  "--desktop-text-foreground-color-hover:" + headertext_fg[1] + ";\n" +
						  "--desktop-text-foreground-color-inverted:" + headertext_2fg[0] + ";\n" +
						  "--desktop-text-background-color-rgb:" + ColorRGB( headertext_color ) + ";\n" +
						  "--desktop-text-background-color-hover-rgb:" + ColorRGB(headertextcolor1) + ";\n" +
						  "--desktop-text-foreground-color-rgb:" + headertext_fg[2] + ";\n" +
						  "--desktop-text-foreground-color-hover-rgb:" + headertext_fg[3] + ";\n" +
						  "--desktop-text-foreground-color-inverted-rgb:" + headertext_2fg[2] + ";\n" +
						  "--active-title-background-color:" + caret_color + ";\n" +
						  "--active-title-background-color-hover:" + caretcolor1 + ";\n" +
						  "--active-title-gradient-color:" + caret_gradient[0] + ";\n" +
						  "--active-title-gradient-color-hover:" + caret_gradient[1] + ";\n" +
						  "--active-title-foreground-color:" + caret_fg[0] + ";\n" +
						  "--active-title-foreground-color-hover:" + caret_fg[1] + ";\n" +
						  "--active-title-foreground-color-inverted:" + caret_2fg[0] + ";\n" +
						  "--active-title-background-color-rgb:" + ColorRGB( caret_color ) + ";\n" +
						  "--active-title-background-color-hover-rgb:" + ColorRGB(caretcolor1) + ";\n" +
						  "--active-title-foreground-color-rgb:" + caret_fg[2] + ";\n" +
						  "--active-title-foreground-color-hover-rgb:" + caret_fg[3] + ";\n" +
						  "--active-title-foreground-color-inverted-rgb:" + caret_2fg[2] + ";\n" +
						  "--active-title-tabs-background-color:" + tabscCaret  + ";\n" +
						  "--active-title-tabs-opacity:" + (tabsoCaret * 0.5)  + ";\n" +
						  "--active-title-active-tabs-opacity:" + tabsoCaret  + ";\n" +
						  "--active-title-text-background-color:" + carettext_color + ";\n" +
						  "--active-title-text-background-color-hover:" + carettextcolor1 + ";\n" +
						  "--active-title-text-gradient-color:" + carettext_gradient[0] + ";\n" +
						  "--active-title-text-gradient-color-hover:" + carettext_gradient[1] + ";\n" +
						  "--active-title-text-foreground-color:" + carettext_fg[0] + ";\n" +
						  "--active-title-text-foreground-color-hover:" + carettext_fg[1] + ";\n" +
						  "--active-title-text-foreground-color-inverted:" + carettext_2fg[0] + ";\n" +
						  "--active-title-text-background-color-rgb:" + ColorRGB( carettext_color ) + ";\n" +
						  "--active-title-text-background-color-hover-rgb:" + ColorRGB( carettextcolor1 ) + ";\n" +
						  "--active-title-text-foreground-color-rgb:" + carettext_fg[2] + ";\n" +
						  "--active-title-text-foreground-color-hover-rgb:" + carettext_fg[3] + ";\n" +
						  "--active-title-text-foreground-color-inverted-rgb:" + carettext_2fg[2] + ";\n" +
						  "--active-title-secondary-background-color:" + caret2_color + ";\n" +
						  "--active-title-secondary-background-color-hover:" + caret2color1 + ";\n" +
						  "--active-title-secondary-background-color-rgb:" + ColorRGB(caret2_color) + ";\n" +
						  "--active-title-tertiary-background-color:" + caret3_color + ";\n" +
						  "--active-title-tertiary-background-color-hover:" + caret3color1 + ";\n" +
						  "--active-title-tertiary-background-color-rgb:" + ColorRGB(caret3_color) + ";\n" +
						  "--active-title-quaternary-background-color:" + caret4_color + ";\n" +
						  "--active-title-quaternary-background-color-hover:" + caret4color1 + ";\n" +
						  "--active-title-quaternary-background-color-rgb:" + ColorRGB(caret4_color) + ";\n" +
						  "--inactive-title-background-color:" + caretIT_color + ";\n" +
						  "--inactive-title-background-color-hover:" + caretITcolor1 + ";\n" +
						  "--inactive-title-gradient-color:" + caretIT_gradient[0] + ";\n" +
						  "--inactive-title-gradient-color-hover:" + caretIT_gradient[1] + ";\n" +
						  "--inactive-title-foreground-color:" + caretIT_fg[0] + ";\n" +
						  "--inactive-title-foreground-color-hover:" + caretIT_fg[1] + ";\n" +
						  "--inactive-title-foreground-color-inverted:" + caretIT_fg[0] + ";\n" +
						  "--inactive-title-background-color-rgb:" + ColorRGB( caretIT_color ) + ";\n" +
						  "--inactive-title-background-color-hover-rgb:" + ColorRGB(caretITcolor1) + ";\n" +
						  "--inactive-title-foreground-color-rgb:" + caretIT_fg[2] + ";\n" +
						  "--inactive-title-foreground-color-hover-rgb:" + caretIT_fg[3] + ";\n" +
						  "--inactive-title-foreground-color-inverted-rgb:" + caretIT_fg[2] + ";\n" +
						  "--inactive-title-tabs-background-color:" + tabscCaretIT  + ";\n" +
						  "--inactive-title-tabs-opacity:" + (tabsoCaretIT * 0.5)  + ";\n" +
						  "--inactive-title-active-tabs-opacity:" + tabsoCaretIT  + ";\n" +
						  "--inactive-title-text-background-color:" + caretITtext_color + ";\n" +
						  "--inactive-title-text-background-color-hover:" + caretITtextcolor1 + ";\n" +
						  "--inactive-title-text-gradient-color:" + caretITtext_gradient[0] + ";\n" +
						  "--inactive-title-text-gradient-color-hover:" + caretITtext_gradient[1] + ";\n" +
						  "--inactive-title-text-foreground-color:" + caretITtext_fg[0] + ";\n" +
						  "--inactive-title-text-foreground-color-hover:" + caretITtext_fg[1] + ";\n" +
						  "--inactive-title-text-foreground-color-inverted:" + caretITtext_2fg[0] + ";\n" +
						  "--inactive-title-text-background-color-rgb:" + ColorRGB( caretITtext_color ) + ";\n" +
						  "--inactive-title-text-background-color-hover-rgb:" + ColorRGB( caretITtextcolor1 ) + ";\n" +
						  "--inactive-title-text-foreground-color-rgb:" + caretITtext_fg[2] + ";\n" +
						  "--inactive-title-text-foreground-color-hover-rgb:" + caretITtext_fg[3] + ";\n" +
						  "--inactive-title-text-foreground-color-inverted-rgb:" + caretITtext_2fg[2] + ";\n" +
						  "--alert-background-color:" + alert_color + "!important;\n" +
						  "--alert-background-color-hover:" + alertcolor1 + "!important;\n" +
						  "--alert-background-color-hover-2:" + alertcolor2 + "!important;\n" +
						  "--alert-gradient-color:" + alert_gradient[0] + "!important;\n" +
						  "--alert-gradient-color-hover:" + alert_gradient[1] + "!important;\n" +
						  "--alert-foreground-color:" + alert_fg[0] + "!important;\n" +
						  "--alert-foreground-color-hover:" + alert_fg[1] + "!important;\n" +
						  "--alert-foreground-color-inverted:" + alert_2fg[0] + "!important;\n" +
						  "--alert-background-color-rgb:" + ColorRGB(alert_color) + "!important;\n" +
						  "--alert-foreground-color-rgb:" + alert_fg[2] + "!important;\n" +
						  "--alert-foreground-color-hover-rgb:" + alert_fg[3] + "!important;\n" +
						  "--alert-foreground-color-inverted-rgb:" + alert_2fg[2] + "!important;\n" +
						  "--alert-secondary-background-color:" + alert2_color + "!important;\n" +
						  "--alert-secondary-background-color-hover:" + alert2color1 + "!important;\n" +
						  "--alert-secondary-background-color-rgb:" + ColorRGB(alert2_color) + "!important;\n" +
						  "--alert-tertiary-background-color:" + alert3_color + "!important;\n" +
						  "--alert-tertiary-background-color-hover:" + alert3color1 + "!important;\n" +
						  "--alert-tertiary-background-color-rgb:" + ColorRGB(alert3_color) + "!important;\n" +
						  "--alert-quaternary-background-color:" + alert4_color + "!important;\n" +
						  "--alert-quaternary-background-color-hover:" + alert4color1 + "!important;\n" +
						  "--alert-quaternary-background-color-rgb:" + ColorRGB(alert4_color) + "!important;\n" +
						  "--pause-background-color:" + pause_color + "!important;\n" +
						  "--pause-background-color-hover:" + pausecolor1 + "!important;\n" +
						  "--pause-background-color-hover-2:" + pausecolor2 + "!important;\n" +
						  "--pause-gradient-color:" + pause_gradient[0] + "!important;\n" +
						  "--pause-gradient-color-hover:" + pause_gradient[1] + "!important;\n" +
						  "--pause-foreground-color:" + pause_fg[0] + "!important;\n" +
						  "--pause-foreground-color-hover:" + pause_fg[1] + "!important;\n" +
						  "--pause-foreground-color-inverted:" + pause_2fg[0] + "!important;\n" +
						  "--pause-background-color-rgb:" + ColorRGB(pause_color) + "!important;\n" +
						  "--pause-foreground-color-rgb:" + pause_fg[2] + "!important;\n" +
						  "--pause-foreground-color-hover-rgb:" + pause_fg[3] + "!important;\n" +
						  "--pause-foreground-color-inverted-rgb:" + pause_2fg[2] + "!important;\n" +
						  "--pause-secondary-background-color:" + pause2_color + "!important;\n" +
						  "--pause-secondary-background-color-hover:" + pause2color1 + "!important;\n" +
						  "--pause-secondary-background-color-rgb:" + ColorRGB(pause2_color) + "!important;\n" +
						  "--pause-tertiary-background-color:" + pause3_color + "!important;\n" +
						  "--pause-tertiary-background-color-hover:" + pause3color1 + "!important;\n" +
						  "--pause-tertiary-background-color-rgb:" + ColorRGB(pause3_color) + "!important;\n" +
						  "--pause-quaternary-background-color:" + pause4_color + "!important;\n" +
						  "--pause-quaternary-background-color-hover:" + pause4color1 + "!important;\n" +
						  "--pause-quaternary-background-color-rgb:" + ColorRGB(pause4_color) + "!important;\n" +
						  "--warning-background-color:" + warning_color + "!important;\n" +
						  "--warning-background-color-hover:" + warningcolor1 + "!important;\n" +
						  "--warning-background-color-hover-2:" + warningcolor2 + "!important;\n" +
						  "--warning-gradient-color:" + warning_gradient[0] + "!important;\n" +
						  "--warning-gradient-color-hover:" + warning_gradient[1] + "!important;\n" +
						  "--warning-foreground-color:" + warning_fg[0] + "!important;\n" +
						  "--warning-foreground-color-hover:" + warning_fg[1] + "!important;\n" +
						  "--warning-foreground-color-inverted:" + warning_2fg[0] + "!important;\n" +
						  "--warning-background-color-rgb:" + ColorRGB(warning_color) + "!important;\n" +
						  "--warning-foreground-color-rgb:" + warning_fg[2] + "!important;\n" +
						  "--warning-foreground-color-hover-rgb:" + warning_fg[3] + "!important;\n" +
						  "--warning-foreground-color-inverted-rgb:" + warning_2fg[2] + "!important;\n" +
						  "--warning-secondary-background-color:" + warning2_color + "!important;\n" +
						  "--warning-secondary-background-color-hover:" + warning2color1 + "!important;\n" +
						  "--warning-secondary-background-color-rgb:" + ColorRGB(warning2_color) + "!important;\n" +
						  "--warning-tertiary-background-color:" + warning3_color + "!important;\n" +
						  "--warning-tertiary-background-color-hover:" + warning3color1 + "!important;\n" +
						  "--warning-tertiary-background-color-rgb:" + ColorRGB(warning3_color) + "!important;\n" +
						  "--warning-quaternary-background-color:" + warning4_color + "!important;\n" +
						  "--warning-quaternary-background-color-hover:" + warning4color1 + "!important;\n" +
						  "--warning-quaternary-background-color-rgb:" + ColorRGB(warning4_color) + "!important;\n" +
						  "--success-background-color:" + success_color + "!important;\n" +
						  "--success-background-color-hover:" + successcolor1 + "!important;\n" +
						  "--success-background-color-hover-2:" + successcolor2 + "!important;\n" +
						  "--success-gradient-color:" + success_gradient[0] + "!important;\n" +
						  "--success-gradient-color-hover:" + success_gradient[1] + "!important;\n" +
						  "--success-foreground-color:" + success_fg[0] + "!important;\n" +
						  "--success-foreground-color-hover:" + success_fg[1] + "!important;\n" +
						  "--success-foreground-color-inverted:" + success_2fg[0] + "!important;\n" +
						  "--success-background-color-rgb:" + ColorRGB(success_color) + "!important;\n" +
						  "--success-foreground-color-rgb:" + success_fg[2] + "!important;\n" +
						  "--success-foreground-color-hover-rgb:" + success_fg[3] + "!important;\n" +
						  "--success-foreground-color-inverted-rgb:" + success_2fg[2] + "!important;\n" +
						  "--success-secondary-background-color:" + success2_color + "!important;\n" +
						  "--success-secondary-background-color-hover:" + success2color1 + "!important;\n" +
						  "--success-secondary-background-color-rgb:" + ColorRGB(success2_color) + "!important;\n" +
						  "--success-tertiary-background-color:" + success3_color + "!important;\n" +
						  "--success-tertiary-background-color-hover:" + success3color1 + "!important;\n" +
						  "--success-tertiary-background-color-rgb:" + ColorRGB(success3_color) + "!important;\n" +
						  "--success-quaternary-background-color:" + success4_color + "!important;\n" +
						  "--success-quaternary-background-color-hover:" + success4color1 + "!important;\n" +
						  "--success-quaternary-background-color-rgb:" + ColorRGB(success4_color) + "!important;\n" +
						  "--progress-background-color:" + progress_color + "!important;\n" +
						  "--progress-background-color-hover:" + progresscolor1 + "!important;\n" +
						  "--progress-background-color-hover-2:" + progresscolor2 + "!important;\n" +
						  "--progress-gradient-color:" + progress_gradient[0] + "!important;\n" +
						  "--progress-gradient-color-hover:" + progress_gradient[1] + "!important;\n" +
						  "--progress-foreground-color:" + progress_fg[0] + "!important;\n" +
						  "--progress-foreground-color-hover:" + progress_fg[1] + "!important;\n" +
						  "--progress-foreground-color-inverted:" + progress_2fg[0] + "!important;\n" +
						  "--progress-background-color-rgb:" + ColorRGB(progress_color) + "!important;\n" +
						  "--progress-foreground-color-rgb:" + progress_fg[2] + "!important;\n" +
						  "--progress-foreground-color-hover-rgb:" + progress_fg[3] + "!important;\n" +
						  "--progress-foreground-color-inverted-rgb:" + progress_2fg[2] + "!important;\n" +
						  "--progress-secondary-background-color:" + progress2_color + "!important;\n" +
						  "--progress-secondary-background-color-hover:" + progress2color1 + "!important;\n" +
						  "--progress-secondary-background-color-rgb:" + ColorRGB(progress2_color) + "!important;\n" +
						  "--progress-tertiary-background-color:" + progress3_color + "!important;\n" +
						  "--progress-tertiary-background-color-hover:" + progress3color1 + "!important;\n" +
						  "--progress-tertiary-background-color-rgb:" + ColorRGB(progress3_color) + "!important;\n" +
						  "--progress-quaternary-background-color:" + progress4_color + "!important;\n" +
						  "--progress-quaternary-background-color-hover:" + progress4color1 + "!important;\n" +
						  "--progress-quaternary-background-color-rgb:" + ColorRGB(progress4_color) + "!important;\n" +
						  "--message-background-color:" + message_color + "!important;\n" +
						  "--message-background-color-hover:" + messagecolor1 + "!important;\n" +
						  "--message-background-color-hover-2:" + messagecolor2 + "!important;\n" +
						  "--message-gradient-color:" + message_gradient[0] + "!important;\n" +
						  "--message-gradient-color-hover:" + message_gradient[1] + "!important;\n" +
						  "--message-foreground-color:" + message_fg[0] + "!important;\n" +
						  "--message-foreground-color-hover:" + message_fg[1] + "!important;\n" +
						  "--message-foreground-color-inverted:" + message_2fg[0] + "!important;\n" +
						  "--message-background-color-rgb:" + ColorRGB(message_color) + "!important;\n" +
						  "--message-foreground-color-rgb:" + message_fg[2] + "!important;\n" +
						  "--message-foreground-color-hover-rgb:" + message_fg[3] + "!important;\n" +
						  "--message-foreground-color-inverted-rgb:" + message_2fg[2] + "!important;\n" +
						  "--message-secondary-background-color:" + message2_color + "!important;\n" +
						  "--message-secondary-background-color-hover:" + message2color1 + "!important;\n" +
						  "--message-secondary-background-color-rgb:" + ColorRGB(message2_color) + "!important;\n" +
						  "--message-tertiary-background-color:" + message3_color + "!important;\n" +
						  "--message-tertiary-background-color-hover:" + message3color1 + "!important;\n" +
						  "--message-tertiary-background-color-rgb:" + ColorRGB(message3_color) + "!important;\n" +
						  "--message-quaternary-background-color:" + message4_color + "!important;\n" +
						  "--message-quaternary-background-color-hover:" + message4color1 + "!important;\n" +
						  "--message-quaternary-background-color-rgb:" + ColorRGB(message4_color) + "!important;\n" +
// Graphs
						  "--graph-1-background-color:" + g1_color + "!important;\n" +
						  "--graph-2-background-color:" + g2_color + "!important;\n" +
						  "--graph-3-background-color:" + g3_color + "!important;\n" +
						  "--graph-4-background-color:" + g4_color + "!important;\n" +
						  "--graph-5-background-color:" + g5_color + "!important;\n" +
// Luna Levit
						  "--mica-background-color:" + micabg[0] + ";\n" +
// Misc Variables
						'--desktop-background-image:' + img  + ';\n' +
						'--desktop-background-image-filter:' + imgfilter  + ';\n' +
						'--desktop-background-image-blend-mode:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-image-blend-mode")  + ';\n' +
						'--desktop-background-horizontal-alignment:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-horizontal-alignment")  + ';\n' +
						'--desktop-background-vertical-alignment:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-vertical-alignment")  + ';\n' +
						'--desktop-background-size:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-size")  + ';\n' +
						'--desktop-background-no-horizontal-tiling:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-no-horizontal-tiling")  + ';\n' +
						'--desktop-background-no-vertical-tiling:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-no-vertical-tiling")  + ';\n' +
						 '--custom-sans-serif-font:' + fon1  + ';\n' +
						 '--custom-serif-font:' + fon2  + ';\n' +
						 '--custom-rounded-font:' + fon3  + ';\n' +
						 '--custom-monospace-font:' + fon4  + ';\n' +
						 '--border-radius:' + brad  + 'px;\n' +
						 '--window-border-radius:' + (brad * 2)  + 'px;\n' +
						 '--menu-border-radius:' + (brad * 0.6)  + 'px;\n' +
						 '--icon-filter:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter")  + ';\n' +
						 '--icon-filter-hover:' + wordfilter2  + ';\n' +
						 '--icon-filter-duration:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-duration")  + ';\n' +
						 '--icon-filter-delay:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-delay")  + ';\n' +
						 '--system-acryllic-opacity:' + aopacity  + ';\n' +
						 '--system-mica-opacity:' + (1 - aopacity)  + ';\n' +
						 '--system-generic-color-hue-shift:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
						 '--system-generic-color-saturation:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")  + ';\n' +
						 '--system-icon-style:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style")  + ';\n' +
						 '--system-icon-font-family:' + iconstyle  + ';\n' +


// Misc Background Settings
						  "--bg-size:" + ['cover','contain','100% 100%','auto'][["cover", "contain", "stretched", "full"].indexOf( getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-size") ) ] + ";\n" +
						  "--bg-tile-x:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-no-horizontal-tiling") ) ] + ";\n" +
						  "--bg-tile-y:" + ['repeat','no-repeat'][["false", "true"].indexOf( getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-no-vertical-tiling") ) ] + ";\n" +
						  "--color-mode-filter:" + invfilters[window.ThemingEngine_ColorFilterMode][[false, true].indexOf(window.ThemingEngine_InvertColors) ] + ";\n" +
						  "--desktop-filter:" + deskfilter +
						  "}"
						  //


/* Write them to the stylesheet */
document.querySelector("head .theming").innerHTML = result;

		/* Theme Mode */
		var oldtheme = window.ThemingEngine_ActiveThemeMode;
		if (!(lightPage)) {
			 window.ThemingEngine_ActiveThemeMode = 'dark';
		} else {
			 window.ThemingEngine_ActiveThemeMode = 'light';
		}
		if (oldtheme === 'none') {
			document.querySelector('html').classList.add("theme-fandomdesktop-" +  window.ThemingEngine_ActiveThemeMode);
		} else if (oldtheme != window.ThemingEngine_ActiveThemeMode ) {
			document.querySelector('html').classList.replace("theme-fandomdesktop-" +  oldtheme,"theme-fandomdesktop-" +  window.ThemingEngine_ActiveThemeMode);
		}
		/* Forced Colors */
		if (window.ThemingEngine_ActiveVisualMode != '-') {
			VisualMode(window.ThemingEngine_ActiveVisualMode,false,false);
		}
		UpdateThemeColorMetaTag();

}

/* Toggles Theme */
function ToggleTheme(theme="A",repaint=true,save=true) {
	if (!(['A','B','C','D','E','F','G','H'].includes(theme))) {
		console.log("CPE Language allows you to set the theme slot only from A to H. Slot A is used as a fallback")
		var theme='A';
		var save = true;
	}
	try {
		var x = document.querySelector('html');
			window.ThemingEngine_ActiveTheme = theme;
			if (repaint) {
				CompileThemingEngine(true);
			}
			if (save) {
				insertKey('theme-selected', window.ThemingEngine_ActiveTheme );
			}
			var theme_selected = theme;
			var x = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-themes li.selected");
				if (x) {
					x.classList.remove("selected");
				}
			var y = document.querySelector(".cpe-dropdown .cpe-dropdown__content .cpe-list.cpe-themes li[data-theme-change='theme-" + theme_selected + "']")
				if (y) {
					y.classList.add("selected");
				}
	}
	catch (err) {
		AddFloatingBanner('Failed to switch to Theme ' + theme + ' as it had typographical errors.','alert');
		console.error(err);
	}
}


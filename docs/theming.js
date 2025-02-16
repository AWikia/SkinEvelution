/* Color Modes */
window.ThemingEngine_InvertColors = false; // false = light mode | true = light mode
window.ThemingEngine_ColorFilterMode = 0; // 0 = No special behavior  | 1 = Color Tint (ColorScale) | 2 = Temperature | 3 = Inverted Temperature
window.ThemingEngine_ColorFilterHueShift = 0; // From -180 to 180
window.ThemingEngine_ColorFilterSaturation = 0; // From 0 to 100 (100 is grayscale)
window.ThemingEngine_ActiveColorFilterTheme = 'light'; 	// auto | auto-dark | light | dark
window.ThemingEngine_ActiveColorFilter = 'standard';
/* Contrast Modes */
window.ThemingEngine_ContrastMode = 'auto';
/* Active Theme */
window.ThemingEngine_ActiveTheme = 'A';
window.ThemingEngine_ActiveThemeMode = 'none'; // none = Not yet loaded | light or dark = Loaded
/* Visual Colors */
window.ThemingEngine_ActiveVisualColors = 'standard';
window.ThemingEngine_ActiveColorScheme = 'auto'; // auto | auto-dark | light | dark
/* Visual Styles */
window.ThemingEngine_ActiveVisualStyle = '-';
window.ThemingEngine_ActiveVisualMode = '-';
window.ThemingEngine_ActiveVisualMode2 = '-'; // This is like ThemingEngine_ActiveVisualMode but different for High Contrast Mode (where it is contrast)
/* DCM Modes */
window.ThemingEngine_ActiveDCMMode = 'standard';
window.ThemingEngine_ActiveDCMType = 'standard';
/* Some Theming Colors */
window.ThemingEngine_HighlightColor = GetHighlight();
window.ThemingEngine_PageColor = GetCanvas();
window.ThemingEngine_PageColorFG = '#000000';
window.ThemingEngine_DesktopColor = GetDesktop();
window.ThemingEngine_HyperlinkColor = GetHyperlink();
window.ThemingEngine_ActiveTitleColor = GetActiveTitle();
window.ThemingEngine_InactiveTitleColor = GetInactiveTitle();
window.AutoColor = '#3366cc'; // Fallback Starting color

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
					['colors', '{{msg-evelution-color-colors}}', 'colors'],
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
	colortheme(color_style,device_theme,color_hue,color_sat,false,false);
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
	contrast = getContrast(elemfg,elembg)
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

function ShouldUseFallbackColor() {
	return ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-background-color") === 'auto') &&
			(getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-color") === 'auto') &&
			(GetDesktopImage2() === ''))
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

function GetSystemColorValue(color='--desktop-background-color') { // Suppliment
	return GetSystemColor(  getComputedStyle(GetActiveDCMConfiguration()).getPropertyValue(color) );
}

async function RecalcAutoColor() {
	var clr = GetDesktop();
	if (GetDesktopImage2() != '') {
		clr = await colorjs.prominent(GetDesktopImage2(), { format: 'hex', amount: 1  });
		/*colorjs.average(GetDesktopImage2(), { format: 'hex' }).then(color => {
		  clr= color; return clr; // [241, 221, 63]
		});*/
	}
	return clr;
}

function GetDesktop() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--desktop-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-color") === 'auto') {
		return window.ThemingEngine_PageColor;

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

function GetDesktopImage2() {
	var img = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-image").trim();
	if ( (img === '') || (img === 'url()') || (img === "url('')") || (img === 'url("")') || (img === 'none') || (img === "'none'") || (img === '"none"')) {
		return '';
	} else {
		return img.replace('url(', '').replace(')', '').split('\\').join('').split("&amp;").join("&").split("&quot;").join("").split("\"").join("");
	}
}


function GetDesktopText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--desktop-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_DesktopColor)
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-text-background-color").trim();
	}
}


function GetCanvas() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--canvas-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-background-color") === 'auto') {
		var color = GetHighlight();
		var fg = GetForegroundVariables(color);
		var h2 = chroma(color).get('hsl.h');
		var color = chroma(color).luminance(fg[2]).set('hsl.h',h2);
		return color;
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-background-color").trim();
	}
}


function GetCanvas2() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--canvas-secondary-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-secondary-background-color") === 'auto') {
		var color = window.ThemingEngine_PageColor;
		var color2 = window.ThemingEngine_PageColorFG;
		return ColorMix(color,color2,ContrastRatioDropdown());

	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-secondary-background-color").trim();
	}
}


function GetHyperlink() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--hyperlink-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--hyperlink-background-color") === 'auto') {
		var color = window.ThemingEngine_HighlightColor;
		var color2 = [0.7,-0.8][['#000000','#ffffff'].indexOf(window.ThemingEngine_PageColorFG)];
		return ColorLuminanceAdjust(color,color2)

	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--hyperlink-background-color").trim();
	}
}


function GetVisitedHyperlink() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--visited-hyperlink-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--visited-hyperlink-background-color") === 'auto') {
		return window.ThemingEngine_HyperlinkColor;
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--visited-hyperlink-background-color").trim();
	}
}


function GetInactiveText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--inactive-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-text-background-color") === 'auto') {
		return ColorMix(window.ThemingEngine_PageColor,window.ThemingEngine_PageColorFG,window.ThemingEngine_FinalContrast);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-text-background-color").trim();
	}
}

function GetActiveText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--active-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-text-background-color") === 'auto') {
		var color = window.ThemingEngine_HyperlinkColor;
		var color2 = [0.7,-0.8][['#000000','#ffffff'].indexOf(window.ThemingEngine_PageColorFG)];
		var h = chroma(color).get("hsl.h");
		return chroma(ColorLuminanceAdjust(color,color2)).set("hsl.h",(h + 60) % 360 )

	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-text-background-color").trim();
	}
}


function GetCanvasText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--canvas-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_PageColor)
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-background-color").trim();
	}
}


function GetCanvasText2() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--canvas-text-secondary-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-secondary-background-color") === 'auto') {
		return GetCanvasText();
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--canvas-text-secondary-background-color").trim();
	}
}


function GetHighlight() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--highlight-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-background-color") === 'auto') {
		if (ShouldUseFallbackColor()) {
			return chroma('#3366cc'); // Fallback method
		} else {
			return ColorInvert(window.AutoColor); // Fallback method
		}
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-background-color").trim();
	}
}

function GetHighlightText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--highlight-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_HighlightColor);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-text-background-color").trim();
	}
}


function GetActiveTitle() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--active-title-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-background-color") === 'auto') {
		var color = window.ThemingEngine_HighlightColor;
		var color2 = [-0.8,0.7][['#000000','#ffffff'].indexOf(window.ThemingEngine_PageColorFG)];
		var h = chroma(color).get("hsl.h");
		return chroma(ColorLuminanceAdjust(color,color2)).set("hsl.h",(h + 60) % 360 )
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-background-color").trim();
	}
}

function GetActiveTitleText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--active-title-text-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-text-background-color") === 'auto') {
		return ColorInvert(window.ThemingEngine_ActiveTitleColor);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--active-title-text-background-color").trim();
	}
}


function GetInactiveTitle() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--inactive-title-background-color')
	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-background-color") === 'auto') {
		return ColorMix(window.ThemingEngine_ActiveTitleColor,window.ThemingEngine_PageColor,1.5);
	} else {
		return getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--inactive-title-background-color").trim();
	}
}

function GetInactiveTitleText() {
	if (DisabledColorManagement()) {
		return GetSystemColorValue('--inactive-title-text-background-color')
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


function ContrastRatio() { // Used for Text and Form Controls
	var result = 0
	if (ThemingEngine_ContrastMode == 'auto') {
		result = (window.matchMedia('(prefers-contrast: more)').matches) ? 15 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 7.5 : 0.0
	} else if (ThemingEngine_ContrastMode == 'low') { // 3
		result = 0.00
	} else if (ThemingEngine_ContrastMode == 'custom1') { // Custom
		result = 1.875
	} else if (ThemingEngine_ContrastMode == 'med-low') {
		result = 3.75
	} else if (ThemingEngine_ContrastMode == 'custom2') { // Custom
		result = 5.625
	} else if (ThemingEngine_ContrastMode == 'med') {
		result = 7.5
	} else if (ThemingEngine_ContrastMode == 'custom3') { // Custom
		result = 9.375
	} else if (ThemingEngine_ContrastMode == 'med-hi') {
		result = 11.25
	} else if (ThemingEngine_ContrastMode == 'custom4') { // Custom
		result = 13.125
	} else if (ThemingEngine_ContrastMode == 'hi') { // 4.5
		result = 15
	} else if (ThemingEngine_ContrastMode == 'custom5') { // Custom
		result = 16.875
	} else if (ThemingEngine_ContrastMode == 'hi-vhi') {
		result = 18.75
	} else if (ThemingEngine_ContrastMode == 'custom6') { // Custom
		result = 20.625
	} else if (ThemingEngine_ContrastMode == 'vhi') {
		result = 22.5
	} else {
		result = (window.matchMedia('(prefers-contrast: more)').matches) ? 15 : (window.matchMedia('(prefers-contrast: custom)').matches) ? 7.5 : 0.0
	}
	return result
}

function ContrastRatioDropdown() { // Used For Dropdown

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

function ContrastRatioAutoInactiveText() { // Used For Inactive Text

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


function getLargeTextContrast() {
	return 45
}

function getSmallTextContrast() {
	return 60
}

function getContrast(color1,color2) {
	return Math.abs(chroma.contrastAPCA(color1,color2));

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

		alerth = 350
		pauseh = 30
		warningh = 50
		successh = 110
		progressh = 230
//		messageh = -1
		
		contrast = getSmallTextContrast()+ContrastRatio()

	for (let i = 0; i < colors.length; i++) {
 		var color = chroma('hsl(0,' + saturation + ',' + colors[i] + ')').hex(); // Base Color
 		var alert = chroma(color).set('hsl.h',alerth+hueshift); // Alert
 		var pause = chroma(color).set('hsl.h',pauseh+hueshift);  // Pause
 		var warn = chroma(color).set('hsl.h',warningh+hueshift);  // Warning
 		var done = chroma(color).set('hsl.h',successh+hueshift); // Success
 		var progress = chroma(color).set('hsl.h',progressh+hueshift); // Progress
 		var info = chroma(color).set('hsl.s',0); // Message
 
		if ( ((getContrast(page, alert)) >= contrast) && ((getContrast(page, pause)) >= contrast) && ((getContrast(page, warn)) >= contrast) && ((getContrast(page, done)) >= contrast) && ((getContrast(page, progress)) >= contrast) && ((getContrast(page, info)) >= contrast) ) {
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
} else {
	var colors = ['54%', '56%', '58%', '60%', '62%', '64%', '66%', '68%', '70%', '72%', '74%', '76%', '78%', '80%', '82%', '84%', '86%', '88%', '90%', '92%', '94%', '96%']

}
		g1h = 190
		g2h = 210
		g3h = 80
		g4h = 340
		g5h = 280
		g6h = 20

	
		contrast = getSmallTextContrast()+ContrastRatio()
		colors1 = [0,0,0,0,0,0];
		remcolors = 6;

	for (let i = 0; i < colors.length; i++) {
 		var color = chroma('hsl(0,' + saturation + ',' + colors[i] + ')').hex(); // Base Color
		var g1 = chroma(color).set('hsl.h',g1h+hueshift); // G1
		var g2 = chroma(color).set('hsl.h',g2h+hueshift); // G2
		var g3 = chroma(color).set('hsl.h',g3h+hueshift); // G3
		var g4 = chroma(color).set('hsl.h',g4h+hueshift); // G4
		var g5 = chroma(color).set('hsl.h',g5h+hueshift); // G5
		var g6 = chroma(color).set('hsl.h',g6h+hueshift); // G5
		
///
		if ( ((getContrast(page, g1)) >= contrast) && (colors1[0] === 0) ) {
			colors1[0] = g1;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((getContrast(page, g2)) >= contrast) && (colors1[1] === 0) ) {
			colors1[1] = g2;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((getContrast(page, g3)) >= contrast) && (colors1[2] === 0) ) {
			colors1[2] = g3;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((getContrast(page, g4)) >= contrast) && (colors1[3] === 0) ) {
			colors1[3] = g4;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((getContrast(page, g5)) >= contrast) && (colors1[4] === 0) ) {
			colors1[4] = g5;
			remcolors = (remcolors-1);
			i = 0;
		}
		if ( ((getContrast(page, g6)) >= contrast) && (colors1[5] === 0) ) {
			colors1[5] = g6;
			remcolors = (remcolors-1);
			i = 0;
		}
///
		if (remcolors==0) {
			return colors1;
		}
	}

	return [g1,g2,g3,g4,g5,g6];

 
}


/* Get Foreground Variables */

function GetForegroundVariables(color) {
	var body = document.querySelector('body');
	// Foreground Color
	if (isLightColor(color)) {
		var f1 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--light-theme-foreground-color-hover");
		var lt = 0.0075;
	} else {
		var f1 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color");
		var f2 =  getComputedStyle(body).getPropertyValue("--dark-theme-foreground-color-hover");
		var lt = 0.85;
	}
	return [f1, f2, lt]
}


/* Get Gradient Variables */
function GetGradientVariable(color,name="canvas", invert=false) {
	var func = invert ? (isDarkColor(color)) : (isLightColor(color));
	if (func) {
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
	return window.ThemingEngine_ColorFilterHueShift;
}

function GetSaturation() {
	return window.ThemingEngine_ColorFilterSaturation;
}



function SliderColorHue() {
	var range = document.querySelector('input[type="range"].colorhue');
	if (range) {
		colortheme('match-parent', 'match-parent', range.value, 'match-parent', true, true, false);
	}
}
function SliderColorSaturation() {
	var range = document.querySelector('input[type="range"].colorsat');
	if (range) {
		colortheme('match-parent', 'match-parent', 'match-parent', range.value, true, true, false);
	}
}


/* Supported Values 
** Style = standard, colorscale, hottemperature, coldtemperature
** Theme = auto, auto-dark, light, dark (The code that hides colorstyle icons and sets the color scheme only supports Light and Dark Mode)
** hue = 0 to 360
** saturation = 0 to 100
** All above = match-parent (Inherits the currently applied value)
*/
function colortheme(style='match-parent', theme='match-parent', hue='match-parent', saturation='match-parent', repaint=true, save=true, notfromrange=true,updateinput=true) {
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



	selected_theme = theme;
	if (selected_theme === 'auto') {
		theme = 'light';
	} else if (selected_theme === 'auto-dark') {
		theme = 'dark';
	}
    var body_bg =	GetCanvas();
    var old_dark = window.ThemingEngine_InvertColors;
    var old_dark2 = window.ThemingEngine_ColorFilterMode;
    var oldhue = window.ThemingEngine_ColorFilterHueShift;
    var oldsat = window.ThemingEngine_ColorFilterSaturation;
    var muststay = false;
		document.querySelector('head .devicetheme').innerHTML = '' ;
		window.ThemingEngine_InvertColors = (theme == 'dark');
		if (style == 'standard') {
			window.ThemingEngine_ColorFilterMode = 0;
		} else if (style == 'protanopia') {
			window.ThemingEngine_ColorFilterMode = 1;
		} else if (style == 'deuteranopia') {
			window.ThemingEngine_ColorFilterMode = 2;
		} else if (style == 'tritanopia') {
			window.ThemingEngine_ColorFilterMode = 3;
		} else if (style == 'protanomaly') {
			window.ThemingEngine_ColorFilterMode = 4;
		} else if (style == 'deuteranomaly') {
			window.ThemingEngine_ColorFilterMode = 5;
		} else if (style == 'tritanomaly') {
			window.ThemingEngine_ColorFilterMode = 6;
		} else if (style == 'achromatomaly') {
			window.ThemingEngine_ColorFilterMode = 7;
		} else {
			window.ThemingEngine_ColorFilterMode = 0;
		}
	colorscheme = getColorScheme();
	document.querySelector('head .devicetheme').innerHTML += '.' + theme + 'device-off { display:none!important } .cpe-system-colors { color-scheme:' + getColorScheme() + '; color-scheme:only ' + getColorScheme() + '; }' ;
	window.ThemingEngine_ActiveColorFilterTheme = selected_theme
	window.ThemingEngine_ActiveColorFilter = style
	window.ThemingEngine_ColorFilterHueShift = parseInt( hue )
	window.ThemingEngine_ColorFilterSaturation = parseInt( saturation )
	if (save) {
		insertKey('device-theme', selected_theme );
		insertKey('color-style', style );
		insertKey('color-hue', hue );
		insertKey('color-sat', saturation );
	}

	if (updateinput) {
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
	}



	if ((old_dark == window.ThemingEngine_InvertColors) && (old_dark2 == window.ThemingEngine_ColorFilterMode) && (oldhue == window.ThemingEngine_ColorFilterHueShift) && (oldsat == window.ThemingEngine_ColorFilterSaturation) ) {
		var muststay = !(DisabledColorManagement());
	}

	if (updateinput) {
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


function contrastmode(theme='auto', repaint=true, save=true,notfromrange=true,updateinput=true) {
	window.ThemingEngine_ContrastMode = theme
	if (save) {
		insertKey('contrast-mode', theme );
	}
	if (updateinput) {
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
function ColorMix(color1,color2,intensity=1,hue='nil',int='rgb') {
	var alpha = 0.5*intensity;
	if (hue === 'nil') {
		return chroma.mix(color1, color2, alpha, int);
	} else if (hue === -1) {
		return chroma.mix(color1, color2, alpha, int).set('hsl.s', 0).set('hsl.h', 0);
	} else {
		return chroma.mix(color1, color2, alpha, int).set('hsl.h', hue);
	}
}

function ColorLuminanceAdjust(color,ratio) {
	if (ratio < 0) {
		var lum = 1 - chroma(color).luminance();
		return chroma(color).luminance(1 - (lum * (ratio * -1)));
	} else {
		var lum = chroma(color).luminance();
		return chroma(color).luminance(lum * ratio);
	}
}

function ColorHoverRatio(color) { // Regular Colors
	if (isLightColor(color)) {
		return -20;
	} else {
		return 20;
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


function isLightColor(color) {
	var c1 = (getContrast('#000000',  chroma(color)))
	var c2 = (getContrast('#ffffff',  chroma(color)))
	return (c1 > c2);

/*
 return chroma(color).lch()[0] >= 50
 return chroma.deltaE('#000000', color) >= 50;
*/

}


function isDarkColor(color) {
	return !isLightColor(color)
}

function isSuitableColorText(color,color2) {
var contrast = getSmallTextContrast()+ContrastRatio()
return ((getContrast(color, color2)) >= contrast)
}

function isSuitableColorFormControls(color,color2) {
var contrast = getLargeTextContrast()+ContrastRatio()
return ((getContrast(color, color2)) >= contrast) // For Border Color
}

function getDefaultHyperlinkTextDecoration(color,color2) {
var contrast = getLargeTextContrast() / 2.0
return (((getContrast(color, color2)) >= contrast) && (window.ThemingEngine_ColorFilterSaturation > 50)) ? 'none' : 'underline' // For Border Color
}



/* End Color Parsers */

/* Used to udpate all dynamical variables */
function CompileThemingEngine(refresh=true) {

if (refresh === true) {
	colortheme('match-parent', 'match-parent', 'match-parent', 'match-parent', false,false,true,false);

	var cmode = window.ThemingEngine_ContrastMode;
	contrastmode(cmode, false,false,true,false);

}


//	ToggleTheme(window.ThemingEngine_ActiveTheme,false,false);
//	VisualColor(window.ThemingEngine_ActiveVisualColors,false,false);
	if (DisabledColorManagement()) {
		var colorstyle =".color-management-on { display:none!important;} @supports (not (color-scheme:normal)) { .color-modes { display:none!important } }\n"
	} else {
		var colorstyle= ".color-management-off { display:none!important;}\n"
	}

if ((getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--highlight-background-color") === 'auto') && (GetDesktopImage2() != '')) {

RecalcAutoColor().then( (v) => {
    window.AutoColor=v; // "fulfilled!"
	CompileThemingEngine2(colorstyle);
  });
} else {
    window.AutoColor=GetDesktop(); // "fulfilled!"
	CompileThemingEngine2(colorstyle);
}
}



function CompileThemingEngine2(colorstyle='') {

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


	window.ThemingEngine_PageColor = content_color;
	var lightPage = isLightColor(content_color);


var content_colorR = ColorHoverRatio(content_color);

var adjustment = ContrastRatioDropdown();
window.ThemingEngine_FinalContrast = ContrastRatioAutoInactiveText();

	if (lightPage) {
		var lightness = '#000000';
		var lightnessR = '#ffffff';
	} else {
		var lightness = '#ffffff';
		var lightnessR = '#000000';
	}

		window.ThemingEngine_PageColorFG = lightness


	var dropdowncolor = GetCanvas2();

	while ( ( isSuitableColorFormControls(dropdowncolor, content_color) ) && (dropdowncolor !== lightnessR)  ) {
		var dropdowncolor= ColorAdjust(dropdowncolor,window.ThemingEngine_PageColor,true);
	}


	var lightDropdown = isLightColor(dropdowncolor);
	if (lightDropdown) {
		var lightnessDropdown = '#000000';
		var tabscPage = '255 255 255';
		var tabsoPage = 0.1 + (chroma(dropdowncolor).luminance() * 0.4 );
	} else {
		var lightnessDropdown = '#ffffff';
		var tabscPage = '58 58 58';
		var tabsoPage = 0.1 + ((1 - chroma(dropdowncolor).luminance()) * 0.4 );
	}

var dropdowncolor2 = GetInactiveText();

/** Page text color **/
var content_text= GetCanvasText();


		while ( ( !(isSuitableColorText(content_text, content_color)) ) && (content_text !== lightness) ) {
			var content_text= ColorAdjust(content_text,window.ThemingEngine_PageColor);
		}

/** 2nd Page text color **/
var content2_text= GetCanvasText2();




while ( ( !(isSuitableColorText(content2_text, dropdowncolor)) ) && (content2_text !== lightnessDropdown) ) {
	var content2_text= ColorAdjust(content2_text,dropdowncolor);
}



/** Body Bg **/
/* Set Vars */

var head_color =	GetDesktop();




	var lightHead = isLightColor(head_color);
	if (lightHead) {
		var lightnessHead = '#000000';
	} else {
		var lightnessHead = '#ffffff';
	}

window.ThemingEngine_DesktopColor = head_color


/** Community Header text color **/

var img = GetDesktopImage();

if (img == '') {
	var deskfilter = 'none'
} else {
	var deskfilter = 'drop-shadow(0 0 6.5px rgb(from var(--desktop-text-foreground-color) r g b / 0.75))'
}

var headertext_color= GetDesktopText();


		while ( ( !(isSuitableColorText(headertext_color, head_color)) ) && (headertext_color !== lightnessHead)  ) {
			var headertext_color= ColorAdjust(headertext_color,window.ThemingEngine_DesktopColor);
		}

/** Button Color **/
/* Set Vars */

var button_color = GetHighlight();



	var button2_color = button_color;
	var button3_color = button_color;
	var button4_color = button_color;
	var sshighlight	  = button_color;

		while ( ( !(isSuitableColorFormControls(button_color, content_color)) ) && (button_color !== lightness)  ) {
			var button_color= ColorAdjust(button_color,window.ThemingEngine_PageColor);
		}


/* Screensaver */
		while ( ( isSuitableColorText(sshighlight, '#0c0c0c') ) && (sshighlight !== '#000000')  ) {
			var sshighlight= ColorAdjust(sshighlight,'#0c0c0c',true);
		}
		while ( ( !(isSuitableColorFormControls(sshighlight, '#0c0c0c')) ) && (sshighlight !== '#ffffff')  ) {
			var sshighlight= ColorAdjust(sshighlight,'#0c0c0c');
		}
/* Screensaver */
	var lightbutton = isLightColor(button_color);
	if (lightbutton) {
		var lightnessBTN = '#000000';
	} else {
		var lightnessBTN = '#ffffff';
	}

window.ThemingEngine_HighlightColor = button_color



var buttoncolorR = ColorHoverRatio(button_color);



/** Button text color **/


var buttontext_color= GetHighlightText();


			while ( ( !(isSuitableColorText(buttontext_color, button_color)) ) && (buttontext_color !== lightnessBTN)  ) {
				var buttontext_color= ColorAdjust(buttontext_color,button_color);
			}




/** Caret Color **/
/* Set Vars */
var caret_color = GetActiveTitle();


		while ( ( !(isSuitableColorFormControls(caret_color, content_color)) ) && (caret_color !== lightness)  ) {
			var caret_color= ColorAdjust(caret_color,window.ThemingEngine_PageColor);
		}
		
		var caret2_color = caret_color
		var caret3_color = caret_color
		var caret4_color = caret_color
		

		var lightCaret = isLightColor(caret_color);
		if (lightCaret) {
			var lightnessCaret = '#000000';
			var tabscCaret = '255 255 255';
			var tabsoCaret = 0.1 + (chroma(caret_color).luminance() * 0.4 );
		} else {
			var lightnessCaret = '#ffffff';
			var tabscCaret = '58 58 58';
			var tabsoCaret = 0.1 + ((1 - chroma(caret_color).luminance()) * 0.4 );
		}




window.ThemingEngine_ActiveTitleColor = caret_color

var caretcolorR = ColorHoverRatio(caret_color);

/** Caret text color **/


var carettext_color= GetActiveTitleText();


			while ( ( !(isSuitableColorText(carettext_color, caret_color)) ) && (carettext_color !== lightnessCaret)  ) {
				var carettext_color= ColorAdjust(carettext_color,caret_color);
			}



/** Caret 2 Color **/
/* Set Vars */
var caretIT_color = GetInactiveTitle();

			while ( ( isSuitableColorFormControls(caretIT_color, content_color) ) && (caretIT_color !== lightnessR)  ) {
			var caretIT_color= ColorAdjust(caretIT_color,window.ThemingEngine_PageColor,true);
		}


	var lightCaretIT = isLightColor(caretIT_color);
	if (lightCaretIT) {
		var lightnessCaretIT = '#000000';
		var tabscCaretIT = '255 255 255';
		var tabsoCaretIT = 0.1 + (chroma(caretIT_color).luminance() * 0.4 );
	} else {
		var lightnessCaretIT = '#ffffff';
		var tabscCaretIT = '58 58 58';
		var tabsoCaretIT = 0.1 + ((1 - chroma(caretIT_color).luminance()) * 0.4 );
	}

window.ThemingEngine_InactiveTitleColor = caretIT_color




/** Caret 2 text color **/


var caretITtext_color= GetInactiveTitleText();



			while ( ( !(isSuitableColorFormControls(caretITtext_color, caretIT_color)) ) && (caretITtext_color !== lightnessCaretIT)  ) {
				var caretITtext_color= ColorAdjust(caretITtext_color,caretIT_color);
			}


/** Link Color **/
/* Set Vars */
var link_color = GetHyperlink();

// Liatch Quirk
	
		while ( ( !(isSuitableColorText(link_color, content_color)) ) && (link_color !== lightness) ) {
			var link_color= ColorAdjust(link_color,window.ThemingEngine_PageColor);
		}

	var link2_color = link_color;
	var link3_color = link_color;
	var link4_color = link_color;


window.ThemingEngine_HyperlinkColor = link_color;

	var lightLink = isLightColor(link_color);
	if (lightLink) {
		var tabscLink = '255 255 255';
		var tabsoLink = 0.1 + (chroma(link_color).luminance() * 0.4 );
	} else {
		var tabscLink = '58 58 58';
		var tabsoLink = 0.1 + ((1 - chroma(link_color).luminance()) * 0.4 );
	}




/** Visited Link Color **/
/* Set Vars */
var vlink_color = GetVisitedHyperlink();



	var vlink2_color = vlink_color;
	var vlink3_color = vlink_color;
	var vlink4_color = vlink_color;
	
		while ( ( !(isSuitableColorText(vlink_color, content_color)) ) && (vlink_color !== lightness) ) {
			var vlink_color= ColorAdjust(vlink_color,window.ThemingEngine_PageColor);
		}



/** Active Text/Link Color **/
/* Set Vars */
var alink_color = GetActiveText();


	
		while ( ( !(isSuitableColorText(alink_color, content_color)) ) && (alink_color !== lightness) ) {
			var alink_color= ColorAdjust(alink_color,window.ThemingEngine_PageColor);
		}
	var alink2_color = alink_color;
	var alink3_color = alink_color;
	var alink4_color = alink_color;



/** Content Border **/
/* Set Vars */

var border_color =	dropdowncolor2;



		while ( ( !(isSuitableColorFormControls(border_color, content_color)) ) && (border_color !== lightness)  ) {
			var border_color= ColorAdjust(border_color,window.ThemingEngine_PageColor);
		}

	var border2_color =	border_color;
	var border3_color =	border_color;
	var border4_color =	border_color;



var bordercolorR = ColorHoverRatio(border_color);


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


/** Pause Color **/
/* Set Vars */
var pause_color = generic[1];
var pause2_color = generic2[1];
var pause3_color = generic3[1];
var pause4_color = generic4[1];

/** Warning Color **/
/* Set Vars */
var warning_color = generic[2];
var warning2_color = generic2[2];
var warning3_color = generic3[2];
var warning4_color = generic4[2];

/** Success Color **/
/* Set Vars */
var success_color = generic[3];
var success2_color = generic2[3];
var success3_color = generic3[3];
var success4_color = generic4[3];

/** Progress Color **/
/* Set Vars */
var progress_color = generic[4];
var progress2_color = generic2[4];
var progress3_color = generic3[4];
var progress4_color = generic4[4];

/** Message Color **/
/* Set Vars */
var message_color = generic[5];
var message2_color = generic2[5];
var message3_color = generic3[5];
var message4_color = generic4[5];

/** Secondary, Tertiary and Quaternary Colors **/
/* Active Title */

		while ( ( !(isSuitableColorFormControls(caret2_color, dropdowncolor)) ) && (caret2_color !== lightnessDropdown) ) {
			var caret2_color= ColorAdjust(caret2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(caret3_color, caret_color)) ) && (caret3_color !== lightnessCaret) ) {
			var caret3_color= ColorAdjust(caret3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(caret4_color, head_color)) ) && (caret4_color !== lightnessHead)  ) {
			var caret4_color= ColorAdjust(caret4_color,window.ThemingEngine_DesktopColor);
		}

/* Highlight */

		while ( ( !(isSuitableColorFormControls(button2_color, dropdowncolor)) ) && (button2_color !== lightnessDropdown) ) {
			var button2_color= ColorAdjust(button2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(button3_color, caret_color)) ) && (button3_color !== lightnessCaret) ) {
			var button3_color= ColorAdjust(button3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(button4_color, head_color)) ) && (button4_color !== lightnessHead)  ) {
			var button4_color= ColorAdjust(button4_color,window.ThemingEngine_DesktopColor);
		}
		
/* Hyperlink */

		while ( ( !(isSuitableColorText(link2_color, dropdowncolor)) ) && (link2_color !== lightnessDropdown) ) {
			var link2_color= ColorAdjust(link2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(link3_color, caret_color)) ) && (link3_color !== lightnessCaret) ) {
			var link3_color= ColorAdjust(link3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(link4_color, head_color)) ) && (link4_color !== lightnessHead)  ) {
			var link4_color= ColorAdjust(link4_color,window.ThemingEngine_DesktopColor);
		}
		

/* Visited Hyperlink */

		while ( ( !(isSuitableColorText(vlink2_color, dropdowncolor)) ) && (vlink2_color !== lightnessDropdown) ) {
			var vlink2_color= ColorAdjust(vlink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(vlink3_color, caret_color)) ) && (vlink3_color !== lightnessCaret) ) {
			var vlink3_color= ColorAdjust(vlink3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(vlink4_color, head_color)) ) && (vlink4_color !== lightnessHead)  ) {
			var vlink4_color= ColorAdjust(vlink4_color,window.ThemingEngine_DesktopColor);
		}

/* Active Text */
		while ( ( !(isSuitableColorText(alink2_color, dropdowncolor)) ) && (alink2_color !== lightnessDropdown) ) {
			var alink2_color= ColorAdjust(alink2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorText(alink3_color, caret_color)) ) && (alink3_color !== lightnessCaret) ) {
			var alink3_color= ColorAdjust(alink3_color,caret_color);
		}
		while ( ( !(isSuitableColorText(alink4_color, head_color)) ) && (alink4_color !== lightnessHead)  ) {
			var alink4_color= ColorAdjust(alink4_color,window.ThemingEngine_DesktopColor);
		}
		
/* Inactive Text */
		while ( ( !(isSuitableColorFormControls(border2_color, dropdowncolor)) ) && (border2_color !== lightnessDropdown) ) {
			var border2_color= ColorAdjust(border2_color,dropdowncolor);
		}
		while ( ( !(isSuitableColorFormControls(border3_color, caret_color)) ) && (border3_color !== lightnessCaret) ) {
			var border3_color= ColorAdjust(border3_color,caret_color);
		}
		while ( ( !(isSuitableColorFormControls(border4_color, head_color)) ) && (border4_color !== lightnessHead)  ) {
			var border4_color= ColorAdjust(border4_color,window.ThemingEngine_DesktopColor);
		}
			
		
/* Graphs */
var g1_color = graphs[0];
var g2_color = graphs[1];
var g3_color = graphs[2];
var g4_color = graphs[3];
var g5_color = graphs[4];
var g6_color = graphs[5];

var imgfilter = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--desktop-background-image-filter");

if (imgfilter == 'none') {
	var imgfilter = 'opacity(1)';
}


// Gradient Sets
var button_gradient = GetGradientVariable(button_color,'highlight');
var buttontext_gradient = GetGradientVariable(button_color,'highlight-text',true);
var border_gradient = GetGradientVariable(border_color,'inactive-text');
var caret_gradient = GetGradientVariable(caret_color,'active-title');
var carettext_gradient = GetGradientVariable(caret_color,'active-title-text',true);

// Foreground texts
var dropdowncolor_fg = GetForegroundVariables(dropdowncolor); // Still required, as one can have a light canvas but a dark secondary canvas color under certain circumstances
var button_fg = GetForegroundVariables(button_color);
var border_fg = GetForegroundVariables(border_color);
var head_fg = GetForegroundVariables(head_color);
var caret_fg = GetForegroundVariables(caret_color);
var caretIT_fg = GetForegroundVariables(caretIT_color); // Still required, as one can have a light canvas but a dark inactive title color under certain circumstances

// Inverted Foreground texts


	wordfilter2 = getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-hover")
	if ( wordfilter2 == "" ) {
		wordfilter2 == 'initial'
	}


	if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style") === 'outlined') {
		var iconstyle= 'Material Icons'
		var clockstyle= 'Evelution Clock'
 	} else if (getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style") === 'sharp') {
		var iconstyle=  'Material Icons Sharp'
		var clockstyle= 'Evelution Clock Sharp'
 	} else {
		var iconstyle=  'Material Icons Round'
		var clockstyle= 'Evelution Clock Round'
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
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ')',			  					'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')'],								// Mode 0 (Normal)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--protanopia-filter) ',		'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--protanopia-filter)'],		// Mode 1 (Protanopia)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--deuteranopia-filter)',		'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--deuteranopia-filter)'],	// Mode 2 (Deuteranopia)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--tritanopia-filter)',		'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--tritanopia-filter)'],		// Mode 3 (Tritanopia)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--protanomaly-filter) ',		'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--protanomaly-filter)'],	// Mode 4 (Protanomaly)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--deuteranomaly-filter)',	'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--deuteranomaly-filter)'],	// Mode 5 (Deuteranomaly)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--tritanomaly-filter)',		'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--tritanomaly-filter)'],	// Mode 6 (Tritanomaly)
					['hue-rotate(' + hue + 'deg) grayscale(' + saturation + ') var(--achromatomaly-filter)',	'invert(1) hue-rotate(' + (180+hue) + 'deg)  grayscale(' + saturation + ')  var(--achromatomaly-filter)'],	// Mode 7 (Achromatomaly)

				 ];
/* Set Values for dynamical variables */
	var result = 		  colorstyle +
						  ":root {" +
						  "--canvas-secondary-background-color:" + dropdowncolor + ";\n" + 
						  "--canvas-secondary-foreground-color:" + dropdowncolor_fg[0] + ";\n" +
						  "--canvas-secondary-foreground-color-hover:" +  dropdowncolor_fg[1] + ";\n" + 
						  "--canvas-background-color:" + content_color + ";\n" +
						  "--canvas-background-color-hover-ratio:" + content_colorR + ";\n" +
						  "--canvas-tabs-background-color:" + tabscPage  + ";\n" +
						  "--canvas-active-tabs-opacity:" + tabsoPage  + ";\n" +
						  "--canvas-text-background-color:" + content_text + ";\n" +
						  "--canvas-text-secondary-background-color:" + content2_text + ";\n" +
						  "--highlight-background-color:" + button_color + ";\n" +
						  "--highlight-background-color-hover-ratio:" + buttoncolorR + ";\n" +
						  "--highlight-gradient-color:" + button_gradient[0] + ";\n" +
						  "--highlight-gradient-color-hover:" + button_gradient[1] + ";\n" +
						  "--highlight-foreground-color:" + button_fg[0] + ";\n" +
						  "--highlight-foreground-color-hover:" + button_fg[1] + ";\n" +
						  "--highlight-text-background-color:" + buttontext_color + ";\n" +
						  "--highlight-text-gradient-color:" + buttontext_gradient[0] + ";\n" +
						  "--highlight-text-gradient-color-hover:" + buttontext_gradient[1] + ";\n" +
						  "--highlight-secondary-background-color:" + button2_color + ";\n" +
						  "--highlight-tertiary-background-color:" + button3_color + ";\n" +
						  "--highlight-quaternary-background-color:" + button4_color + ";\n" +
						  "--hyperlink-background-color:" + link_color + ";\n" +
						  "--hyperlink-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link_color,content_text) + ";\n" +
						  "--hyperlink-tabs-background-color:" + tabscLink  + ";\n" +
						  "--hyperlink-active-tabs-opacity:" + tabsoLink  + ";\n" +
						  "--hyperlink-secondary-background-color:" + link2_color + ";\n" +
						  "--hyperlink-secondary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link2_color,content2_text) + ";\n" +
						  "--hyperlink-tertiary-background-color:" + link3_color + ";\n" +
						  "--hyperlink-tertiary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link3_color,carettext_color) + ";\n" +
						  "--hyperlink-quaternary-background-color:" + link4_color + ";\n" +
						  "--hyperlink-quaternary-default-text-decoration:" + getDefaultHyperlinkTextDecoration(link4_color,headertext_color) + ";\n" +
						  "--visited-hyperlink-background-color:" + vlink_color + ";\n" +
						  "--visited-hyperlink-secondary-background-color:" + vlink2_color + ";\n" +
						  "--visited-hyperlink-tertiary-background-color:" + vlink3_color + ";\n" +
						  "--visited-hyperlink-quaternary-background-color:" + vlink4_color + ";\n" +
						  "--active-text-background-color:" + alink_color + ";\n" +
						  "--active-text-secondary-background-color:" + alink2_color + ";\n" +
						  "--active-text-tertiary-background-color:" + alink3_color + ";\n" +
						  "--active-text-quaternary-background-color:" + alink4_color + ";\n" +
						  "--inactive-text-background-color:" + border_color + ";\n" +
						  "--inactive-text-background-color-hover-ratio:" + bordercolorR + ";\n" +
						  "--inactive-text-gradient-color:" + border_gradient[0] + ";\n" +
						  "--inactive-text-gradient-color-hover:" + border_gradient[1] + ";\n" +
						  "--inactive-text-foreground-color:" + border_fg[0] + ";\n" +
						  "--inactive-text-foreground-color-hover:" + border_fg[1] + ";\n" +
						  "--inactive-text-secondary-background-color:" + border2_color + ";\n" +
						  "--inactive-text-tertiary-background-color:" + border3_color + ";\n" +
						  "--inactive-text-quaternary-background-color:" + border4_color + ";\n" +
						  "--desktop-background-color:" + head_color + ";\n" +
						  "--desktop-foreground-color:" + head_fg[0] + ";\n" +
						  "--desktop-foreground-color-hover:" + head_fg[1] + ";\n" +
						  "--desktop-text-background-color:" + headertext_color + ";\n" +
						  "--active-title-background-color:" + caret_color + ";\n" +
						  "--active-title-background-color-hover-ratio:" + caretcolorR + ";\n" +
						  "--active-title-gradient-color:" + caret_gradient[0] + ";\n" +
						  "--active-title-gradient-color-hover:" + caret_gradient[1] + ";\n" +
						  "--active-title-foreground-color:" + caret_fg[0] + ";\n" +
						  "--active-title-foreground-color-hover:" + caret_fg[1] + ";\n" +
						  "--active-title-tabs-background-color:" + tabscCaret  + ";\n" +
						  "--active-title-active-tabs-opacity:" + tabsoCaret  + ";\n" +
						  "--active-title-text-background-color:" + carettext_color + ";\n" +
						  "--active-title-text-gradient-color:" + carettext_gradient[0] + ";\n" +
						  "--active-title-text-gradient-color-hover:" + carettext_gradient[1] + ";\n" +
						  "--active-title-secondary-background-color:" + caret2_color + ";\n" +
						  "--active-title-tertiary-background-color:" + caret3_color + ";\n" +
						  "--active-title-quaternary-background-color:" + caret4_color + ";\n" +
						  "--inactive-title-background-color:" + caretIT_color + ";\n" +
						  "--inactive-title-foreground-color:" + caretIT_fg[0] + ";\n" +
						  "--inactive-title-foreground-color-hover:" + caretIT_fg[1] + ";\n" +
						  "--inactive-title-tabs-background-color:" + tabscCaretIT  + ";\n" +
						  "--inactive-title-active-tabs-opacity:" + tabsoCaretIT  + ";\n" +
						  "--inactive-title-text-background-color:" + caretITtext_color + ";\n" +
						  "--alert-background-color:" + alert_color + "!important;\n" +
						  "--alert-secondary-background-color:" + alert2_color + "!important;\n" +
						  "--alert-tertiary-background-color:" + alert3_color + "!important;\n" +
						  "--alert-quaternary-background-color:" + alert4_color + "!important;\n" +
						  "--pause-background-color:" + pause_color + "!important;\n" +
						  "--pause-secondary-background-color:" + pause2_color + "!important;\n" +
						  "--pause-tertiary-background-color:" + pause3_color + "!important;\n" +
						  "--pause-quaternary-background-color:" + pause4_color + "!important;\n" +
						  "--warning-background-color:" + warning_color + "!important;\n" +
						  "--warning-secondary-background-color:" + warning2_color + "!important;\n" +
						  "--warning-tertiary-background-color:" + warning3_color + "!important;\n" +
						  "--warning-quaternary-background-color:" + warning4_color + "!important;\n" +
						  "--success-background-color:" + success_color + "!important;\n" +
						  "--success-secondary-background-color:" + success2_color + "!important;\n" +
						  "--success-tertiary-background-color:" + success3_color + "!important;\n" +
						  "--success-quaternary-background-color:" + success4_color + "!important;\n" +
						  "--progress-background-color:" + progress_color + "!important;\n" +
						  "--progress-secondary-background-color:" + progress2_color + "!important;\n" +
						  "--progress-tertiary-background-color:" + progress3_color + "!important;\n" +
						  "--progress-quaternary-background-color:" + progress4_color + "!important;\n" +
						  "--message-background-color:" + message_color + "!important;\n" +
						  "--message-secondary-background-color:" + message2_color + "!important;\n" +
						  "--message-tertiary-background-color:" + message3_color + "!important;\n" +
						  "--message-quaternary-background-color:" + message4_color + "!important;\n" +
// Graphs
						  "--cpu-graph-background-color:" + g1_color + "!important;\n" +
						  "--ram-graph-background-color:" + g2_color + "!important;\n" +
						  "--disk-graph-background-color:" + g3_color + "!important;\n" +
						  "--network-graph-background-color:" + g4_color + "!important;\n" +
						  "--gpu-graph-background-color:" + g5_color + "!important;\n" +
						  "--npu-graph-background-color:" + g6_color + "!important;\n" +
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
						 '--icon-filter:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter")  + ';\n' +
						 '--icon-filter-hover:' + wordfilter2  + ';\n' +
						 '--icon-filter-duration:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-duration")  + ';\n' +
						 '--icon-filter-delay:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--icon-filter-delay")  + ';\n' +
						 '--system-generic-color-hue-shift:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-hue-shift")  + ';\n' +
						 '--system-generic-color-saturation:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-generic-color-saturation")  + ';\n' +
						 '--system-icon-style:' + getComputedStyle(GetActiveThemeConfiguration()).getPropertyValue("--system-icon-style")  + ';\n' +
						 '--system-icon-font-family:' + iconstyle  + ';\n' +
						 '--system-clock-font-family:' + clockstyle  + ';\n' +
						 '--screensaver-highlight-color:' + sshighlight  + ';\n' +

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


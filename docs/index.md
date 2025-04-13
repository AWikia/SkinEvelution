Evelution is a Next Gen Skin for MediaWiki, currently at 156.0.0. Designed to improve reading has four different thems that you can use them on a page-basis. With the inclusion of a Dark Mode, you can read pages with fewer eye stress.


With the inclusion of Sticky sidebars and Sticky Community Header, you can have many of the known tools MediaWiki following you.

Evelution Desktop Skin in three different main Breakpoint Sizes, 705px, 1280px & 1500px. It is maintained by Qora Qore Telecommunities, A Techno Services and all other CPE Evelution Developers

You can read more about the skin [here](Overview.md). For easy to use CSS snipsets, go [here](SimpleCSS.md). More topics can be found at the Explore Menu on the Navigation

Evelution uses the ``main`` branch that it is compatible with MediaWiki 1.39 to 1.42 and the ``REL1_37`` branch that it is compatible with MediaWiki 1.37 to 1.41, intended to be used with MediaWiki 1.37 and 1.38

# Version Release
- Evelution Family now follows [Semantic Versioning II](https://semver.org/). 
  - When changes that will break existing 3rd-party functionality (Such as variable renaming, changing syntax, renaming classes, altering something that will require users to pay extra attention (Such as the addition of the bottom footer) and anything that will break existing things) or a new Servelution Release  happen, it will result in a new season to emerge. 
  - When changes that will still offer compatibility with existing functionality (Such as adding new color schemes, new optional enchancemnts or changing the layout at a small degree) happen, it will result in a minor release of the existing season. 
  - When changes that will only have bug fixes (Such as layout tweaks to avoid issues or fixing a major or minor fix that will still not break existing functionality) happen, it will result in a patch release but patch releases will still not be registered as a release or be formally announced.

# Requirements
To Run Evelution on your wiki, you must have MediaWiki 1.37 or greater. Older versions are not supported. Note that running on 1.36 is not recommended and support will be dropped in a future release

## Browser Requirements
Evelution requires at least one of these browsers in order to run properly:

| Browser    | Supported Releases        | Notes																						   |
| ---------- | ------------------------- | ----------------------------------------------------------------------------------------------- |
| Chrome     | 131+                      | Has customized scrollbar styling.															   |
| Firefox    | 133+                      | Does not support the color picker function in Theme Designer.								   |
| Edge       | 131+                      | EdgeHTML version is not supported. Has customized scrollbar styling.							   |
| Safari     | 18+                       | Only on Apple Devices.					  													   |


Evelution skin will die if it is found to be running on unsupported browsers with the **Unsupported Configuration** error and will load up with a deprecated browswer warning if it is found to be running on not recommended but still supported browsers.

## Servelution Requirements
Evelution requires at least a Servelution Client with the CPE Language Recompiler (2.0.0+). Evelution will die if it is found to be running on a Servelution Client without the CPE Language Recompiler

## Hardware Requirements
If hardware acceleration is present, the GPU test must end with at least 5 FPS. Evelution skin will die if the GPU test ends with less than 5 FPS with the **Unsupported Configuration** error

If no hardware acceleration is present, then Evelution will load properly (But without Rounded corners or Transparency Effects)

## Version Lifecycle
List of MediaWiki versions and what Evelution version can be installed at most. Green tick means the latest one can be used:

| MediaWiki    | Supported Releases           |
| ------------ | ---------------------------- |
| 1.39.x+      | ~✅                           |
| 1.37.x-1.38x | ~155.1.0 (main), ✅ (REL1_37) |
| 1.36.x       | ~89.2.0, 91.0.0-119.1.0      |

# Installation
To Install Evelution, you must download the reposistory first. Make a folder called **Evelution** in **Skins** diractory where you have installed MediaWiki and extract the zipped file contents in **Evelution** folder.  Lastly, put this in **LocalSettings.php**:
```php
wfLoadSkin( 'Evelution' );
```

You don't have to make Evelution the default wiki skin in order to gain access to the Evelution Discord Server or requet for custom theming for your wiki.

# Translating Evelution
Fork this repo, add a new language code to the i18n folder (Such as fr.php). Copy all contents from en.php to xxx.php (Such as fr.php) and then translate them to the corresponding language (For fr.php should be in French). Then send up a PR and I will be happy to merge it. In the future, it will be possible from translatewiki.net as well

# Creating new themes
If you want to create a new theme without using CPE Theme Designer (i.e. Due to the wiki being on Miraheze), use this template:

## Enabled Color Management (Standard Color Scheme)

### CSS Way (Apply it to MediaWiki:Common.css or MediaWiki:Evelution.css)
```css
.theme-A.colorscheme-light.visualcolors-standard { /* Replace .theme-A with either .theme-B, .theme-C, .theme-D, .theme-E, .theme-F, .theme-G, .theme-H if you want to target the other 7 slots, otherwise don't replace .theme-A with anything. Replace .colorscheme-light with .colorscheme-dark if you want to target the dark color scheme, otherwise don't replace .colorscheme-light with anything */ 
--desktop-background-image:url("loadbg_dev.png"); /* <image> */
--desktop-background-image-filter:opacity(100%); /* <filter-function> */
--desktop-background-image-blend-mode:normal; /* <blend-mode> */
--desktop-background-color:#441177; /* auto | <color> */
--desktop-background-size:cover; /* cover | contain | stretched | full */
--desktop-background-horizontal-alignment:left; /* left | center | right */
--desktop-background-vertical-alignment:top; /* top | center | bottom */
--desktop-background-no-horizontal-tiling:false; /* <boolean> */
--desktop-background-no-vertical-tiling:false; /* <boolean> */
--desktop-text-background-color:auto; /* auto | <color> */
--canvas-background-color:#f1f2f3; /* auto | <color> */
--canvas-secondary-background-color:auto; /* auto | <color> */
--inactive-text-background-color:#aaabbb; /* auto | <color> */
--active-text-background-color:auto; /* auto | <color> */
--canvas-text-background-color:#222222; /* auto | <color> */
--canvas-text-secondary-background-color:auto; /* auto | <color> */
--highlight-background-color:#dd8300; /* <color> */
--highlight-text-background-color:auto; /* auto |<color> */
--hyperlink-background-color:#dd2300; /* <color> */
--visited-hyperlink-background-color:auto; /* auto | <color> */
--active-title-background-color:#b88300; /* auto | <color> */
--active-title-text-background-color:auto; /* auto |<color> */
--inactive-title-background-color:#b88300; /* auto | <color> */
--inactive-title-text-background-color:auto; /* auto |<color> */
--custom-sans-serif-font:""; /* <string> */
--custom-serif-font:""; /* <string> */
--custom-rounded-font:""; /* <string> */
--custom-monospace-font:""; /* <string> */
--border-radius:3px; /* <number> 0 to 15 */
--icon-filter:opacity(1); /* <filter-function> */
--icon-filter-hover:opacity(0.8); /* <filter-function> */
--icon-filter-duration:300ms; /* <duration> */
--icon-filter-delay:0; /* <duration> */
--system-acryllic-opacity:0.6; /* <number> 0.4 to 0.8 */
--system-generic-color-hue-shift:1; /* <number> -12 to 12 */
--system-generic-color-saturation:100%; /* <number> 20% to 100% */
--system-icon-style:rounded; /* rounded | outlined | sharp */
}
```

### PHP Way (Apply it to LocalSettings.php)
```php
$wgEvelutionThemeA = [/* Replace $wgEvelutionThemeA with either $wgEvelutionThemeB, $wgEvelutionThemeC, $wgEvelutionThemeD, $wgEvelutionThemeE, $wgEvelutionThemeF, $wgEvelutionThemeG, $wgEvelutionThemeH, $wgEvelutionThemeADark, $wgEvelutionThemeBDark, $wgEvelutionThemeCDark, $wgEvelutionThemeDDark, $wgEvelutionThemeEDark, $wgEvelutionThemeFDark, $wgEvelutionThemeGDark or $wgEvelutionThemeHDark if you want to target the other 7 slots or the dark color scheme, otherwise don't replace $wgEvelutionThemeA with anything */ 
'desktop-background-image' => 'url("loadbg_dev.png")', /* <image> */
'desktop-background-image-filter' => 'opacity(100%)', /* <filter-function> */
'desktop-background-image-blend-mode' => 'normal', /* <blend-mode> */
'desktop-background-color' => '#441177', /* auto | <color> */
'desktop-background-size' => 'cover', /* cover | contain | stretched | full */
'desktop-background-horizontal-alignment' => 'left', /* left | center | right */
'desktop-background-vertical-alignment' => 'top', /* top | center | bottom */
'desktop-background-no-horizontal-tiling' => 'false', /* <boolean> */
'desktop-background-no-vertical-tiling' => 'false', /* <boolean> */
'desktop-text-background-color' => 'auto', /* auto | <color> */
'canvas-background-color' => '#f1f2f3', /* auto | <color> */
'canvas-secondary-background-color' => 'auto', /* auto | <color> */
'inactive-text-background-color' => '#aaabbb', /* auto | <color> */
'active-text-background-color' => 'auto', /* auto | <color> */
'canvas-text-background-color' => '#222222', /* auto | <color> */
'canvas-text-secondary-background-color' => 'auto', /* auto | <color> */
'highlight-background-color' => '#dd8300', /* <color> */
'highlight-text-background-color' => 'auto', /* auto |<color> */
'hyperlink-background-color' => '#dd2300', /* <color> */
'visited-hyperlink-background-color' => 'auto', /* auto | <color> */
'active-title-background-color' => '#b88300', /* auto | <color> */
'active-title-text-background-color' => 'auto', /* auto |<color> */
'inactive-title-background-color' => '#b88300', /* auto | <color> */
'inactive-title-text-background-color' => 'auto', /* auto |<color> */
'custom-sans-serif-font' => '""', /* <string> */
'custom-serif-font' => '""', /* <string> */
'custom-rounded-font' => '""', /* <string> */
'custom-monospace-font' => '""', /* <string> */
'border-radius' => '3px', /* <number> 0 to 15 */
'icon-filter' => 'opacity(1)', /* <filter-function> */
'icon-filter-hover' => 'opacity(0.8)', /* <filter-function> */
'icon-filter-duration' => '300ms', /* <duration> */
'icon-filter-delay' => '0', /* <duration> */
'system-acryllic-opacity' => '0.6', /* <number> 0.4 to 0.8 */
'system-generic-color-hue-shift' => '1', /* <number> -12 to 12 */
'system-generic-color-saturation' => '100%', /* <number> 20% to 100% */
'system-icon-style' => 'rounded' /* rounded | outlined | sharp */
];

```

## Disabled Color Management (Custom DCM Modes)

### CSS Way (Apply it to MediaWiki:Common.css or MediaWiki:Evelution.css)
```css
.visualcolors-nocolormanagement.dcmmode-custom_1 { /* Replace .custom_1 with either .custom_2, .custom_3 or .custom_4 if you want to target the other 4 custom slots, otherwise don't replace .custom_1 with anything */ 
	--desktop-background-color:field; /* <system-color> */
	--desktop-text-background-color:fieldtext; /* <system-color> */
	--canvas-background-color:canvas; /* <system-color> */
	--canvas-secondary-background-color:buttonface; /* <system-color> */
	--hyperlink-background-color:linktext; /* <system-color> */
	--visited-hyperlink-background-color:visitedtext; /* <system-color> */
	--inactive-text-background-color:graytext; /* <system-color> */
	--active-text-background-color:activetext; /* <system-color> */
	--canvas-text-background-color:canvastext; /* <system-color> */
	--canvas-text-secondary-background-color:buttontext; /* <system-color> */
	--highlight-background-color:highlight; /* <system-color> */
	--highlight-text-background-color:highlighttext; /* <system-color> */
	--active-title-background-color:fieldtext; /* <system-color> */
	--active-title-text-background-color:field; /* <system-color> */
	--inactive-title-background-color:canvas; /* <system-color> */
	--inactive-title-text-background-color:graytext; /* <system-color> */
}
```

### PHP Way (Apply it to LocalSettings.php)
```php
$wgEvelutionCustomDCMMode1 = [ /* Replace $wgEvelutionCustomDCMMode1 with either $wgEvelutionCustomDCMMode2, $wgEvelutionCustomDCMMode3 or $wgEvelutionCustomDCMMode4 if you want to target the other 4 custom slots, otherwise don't replace $wgEvelutionCustomDCMMode1 with anything */ 
	'desktop-background-color' => 'field', /* <system-color> */
	'desktop-text-background-color' => 'fieldtext', /* <system-color> */
	'canvas-background-color' => 'canvas', /* <system-color> */
	'canvas-secondary-background-color' => 'buttonface', /* <system-color> */
	'hyperlink-background-color' => 'linktext', /* <system-color> */
	'visited-hyperlink-background-color' => 'visitedtext', /* <system-color> */
	'inactive-text-background-color' => 'graytext', /* <system-color> */
	'active-text-background-color' => 'activetext', /* <system-color> */
	'canvas-text-background-color' => 'canvastext', /* <system-color> */
	'canvas-text-secondary-background-color' => 'buttontext', /* <system-color> */
	'highlight-background-color' => 'highlight', /* <system-color> */
	'highlight-text-background-color' => 'highlighttext', /* <system-color> */
	'active-title-background-color' => 'fieldtext', /* <system-color> */
	'active-title-text-background-color' => 'field', /* <system-color> */
	'inactive-title-background-color' => 'canvas', /* <system-color> */
	'inactive-title-text-background-color' => 'graytext', /* <system-color> */
];
```

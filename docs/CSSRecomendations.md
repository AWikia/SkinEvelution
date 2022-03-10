# Evelution CSS Best Practices
This documents about how to style your Wiki using the Evelution Skin and making it working accross themes

## Putting code
All code related to the Evelution Skin should be placed inside ``MediaWiki:Evelution.css``. It is recommended to use the theming variables to make it work across themes like:
```css
.my-container {
  background-color:var(--canvas-secondary-background-color);
  color:var(--canvas-text-background-color);
}
```

You can also use ``MediaWiki:Common.css`` and scope the changes to this skin only like:
```css
body.skin-evelution .my-container {
  background-color:var(--canvas-secondary-background-color);
  color:var(--canvas-text-background-color);
}
```

If you decide that only your own color scheme/schemes should be used on your wiki, you can hide the visual colors dropdown by putting the above code to ``MediaWiki:Evelution.css``:
```css
.colors .cpe-floating-button.page-side-tool {
	display:none;
}
```

## Always check against contrast
When picking up custom colors, you should check them to have enough contrast (By Evelution's Definition, min contrast is 3 for low contrast, 3.75 for med-low contrast, 4.5 for medium contrast, 5.25 for med-high contrast, 6 for high contrast, 6.75 for hi-vhi contrast and 7.5 for very high contrast). 

Using theming variables like ``var(--hyperink-background-color)`` as background color and ``var(--hyperlink-foreground-color)`` as foreground color is one of the best choices you can do as you will have forced-colors support out of the box.

If you need to use your own colors for background and foreground color, always pick the best. For instance, if you want your box to have a Lime background, always choose a legible forerground color such as Black or Dark Blue. Never pick a color such as White or Wheat as those colors don't play nice against a Lime background.

On no account will you expect contrast issues when using the theming variables properly as Evelution automatically adjusts offending themes (Those with low contrast) to be as great as possible.

## Avoid destroying the layout
When styling the Evelution Skin with CSS, make sure that the layout will still be usable and will not cause any distorts. This is also the case for many other skins.

## Only hide the Global Nav links when required
By default, Global Nav upper links consist of Five (Six on Miraheze Wikis) links. While you can hide them using Sitewide CSS, it can result in important information being lost (Such as the Link to the Evelution Documentation). Those customizations are allowed, unlike in Fandom

## Never Customize other color schemes
Wikis should avoid customizing any color scheme beyond the ``standard`` ones as the rest of them contain color schemes for people who need accessible and different color schemes to suit their preference. Here's a theming template you can use for getting custom theme(s) for your wiki:
### CSS Way (Apply it to MediaWiki:Common.css or MediaWiki:Evelution.css)
```css
.theme-A.visualcolors-standard { /* Replace .theme-A with either .theme-B, .theme-C, .theme-D, .theme-E, .theme-F, .theme-G, .theme-H if you want to target the other 7 slots, otherwise don't replace .theme-A with anything */ 
--desktop-background-image:url("loadbg_dev.png"); /* <image> */
--desktop-background-image-filter:opacity(100%); /* <filter-function> */
--desktop-background-color:#441177; /* <color> */
--desktop-background-mode:header; /* header | one-quarter | two-quarters | three-quarters | four-quarters */
--desktop-background-size:cover; /* cover | contain | stretched | full */
--desktop-background-horizontal-alignment:top; /* left | center | right */
--desktop-background-vertical-alignment:top; /* top | center | bottom */
--desktop-background-no-horizontal-tiling:false; /* <boolean> */
--desktop-background-no-vertical-tiling:false; /* <boolean> */
--desktop-text-background-color:auto; /* auto | <color> */
--canvas-background-color:#f1f2f3; /* <color> */
--canvas-secondary-background-color:auto; /* auto | <color> */
--inactive-text-background-color:#aaabbb; /* auto | <color> */
--canvas-text-background-color:#222222; /* auto | <color> */
--canvas-text-secondary-background-color:auto; /* auto | <color> */
--highlight-background-color:#dd8300; /* <color> */
--hyperlink-background-color:#dd2300; /* <color> */
--active-title-background-color:#b88300; /* auto | <color> */
--inactive-title-background-color:#b88300; /* auto | <color> */
--custom-font:"Roboto"; /* <string> */
--custom-secondary-font:"Rubik"; /* <string> */
--border-radius:3px; /* <number> 0 to 15 */
--icon-filter:opacity(1); /* <filter-function> */
--icon-filter-hover:opacity(0.8); /* <filter-function> */
--icon-filter-duration:300ms; /* <duration> */
--icon-filter-delay:0; /* <duration> */
--system-acryllic-opacity:0.6; /* <number> 0.4 to 0.8 */
}
```

### PHP Way (Apply it to LocalSettings.php)
```php
$wgEvelutionThemeA = [/* Replace $wgEvelutionThemeA with either $wgEvelutionThemeB, $wgEvelutionThemeC, $wgEvelutionThemeD, $wgEvelutionThemeE, $wgEvelutionThemeF, $wgEvelutionThemeG, $wgEvelutionThemeH if you want to target the other 7 slots, otherwise don't replace $wgEvelutionThemeA with anything */ 
'desktop-background-image' => 'url("loadbg_dev.png")', /* <image> */
'desktop-background-image-filter' => 'opacity(100%)', /* <filter-function> */
'desktop-background-color' => '#441177', /* <color> */
'desktop-background-mode' => 'header', /* header | one-quarter | two-quarters | three-quarters | four-quarters */
'desktop-background-size' => 'cover', /* cover | contain | stretched | full */
'desktop-background-horizontal-alignment' => 'top', /* left | center | right */
'desktop-background-vertical-alignment' => 'top', /* top | center | bottom */
'desktop-background-no-horizontal-tiling' => 'false', /* <boolean> */
'desktop-background-no-vertical-tiling' => 'false', /* <boolean> */
'desktop-text-background-color' => 'auto', /* auto | <color> */
'canvas-background-color' => '#f1f2f3', /* <color> */
'canvas-secondary-background-color' => 'auto', /* auto | <color> */
'inactive-text-background-color' => '#aaabbb', /* auto | <color> */
'canvas-text-background-color' => '#222222', /* auto | <color> */
'canvas-text-secondary-background-color' => 'auto', /* auto | <color> */
'highlight-background-color' => '#dd8300', /* <color> */
'hyperlink-background-color' => '#dd2300', /* <color> */
'active-title-background-color' => '#b88300', /* auto | <color> */
'inactive-title-background-color' => '#b88300', /* auto | <color> */
'custom-font' => 'Roboto', /* <string> */
'custom-secondary-font' => 'Rubik', /* <string> */
'border-radius' => '3px', /* <number> 0 to 15 */
'icon-filter' => 'opacity(1)', /* <filter-function> */
'icon-filter-hover' => 'opacity(0.8)', /* <filter-function> */
'icon-filter-duration' => '300ms', /* <duration> */
'icon-filter-delay' => '0', /* <duration> */
'system-acryllic-opacity' => '0.6', /* <number> 0.4 to 0.8 */
];

```
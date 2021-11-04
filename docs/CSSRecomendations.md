# Evelution CSS Best Practices
This documents about how to style your Wiki using the Evelution Skin and making it working accross themes

## Putting code
All code related to the Evelution Skin should be placed inside ``MediaWiki:Evelution.css``. It is recommended to use the theming variables to make it work across themes like:
```css
.my-container {
  background-color:var(--page-secondary-background-color);
  color:var(--page-text-background-color);
}
```

You can also use ``MediaWiki:Common.css`` and scope the changes to this skin only like:
```css
body.skin-evelution .my-container {
  background-color:var(--page-secondary-background-color);
  color:var(--page-text-background-color);
}
```

If you decide that only your own color scheme/schemes should be used on your wiki, you can hide the visual colors dropdown by putting the above code to ``MediaWiki:Evelution.css``:
```css
.colors .cpe-floating-button.page-side-tool {
	display:none;
}
```

## Always check against contrast
When picking up custom colors, you should check them to have enough contrast (By Evelution's Definition, min contrast is 3 for low contrast and 4.5 for more contrast). 

Using theming variables like ``var(--secondary-accent-background-color)`` as background color and ``var(--secondary-accent-foreground-color)`` as foreground color is one of the best choices you can do as you will have forced-colors support out of the box.

If you need to use your own colors for background and foreground color, always pick the best. For instance, if you want your box to have a Lime background, always choose a legible forerground color such as Black or Dark Blue. Never pick a color such as White or Wheat as those colors don't play nice against a Lime background.

On no account will you expect contrast issues when using the theming variables properly as Evelution automatically adjusts offending themes (Those with low contrast) to be as great as possible.

## Avoid destroying the layout
When styling the Evelution Skin with CSS, make sure that the layout will still be usable and will not cause any distorts. This is also the case for many other skins.

## Only hide the Global Nav links when required
By default, Global Nav upper links consist of Five (Six on Miraheze Wikis) links. While you can hide them using Sitewide CSS, it can result in important information being lost (Such as the Link to the Evelution Documentation). Those customizations are allowed, unlike in Fandom

## Never Customize other color schemes
Wikis should avoid customizing any color scheme beyond the ``standard`` ones as the rest of them contain color schemes for people who need accessible and different color schemes to suit their preference. Here's a theming template you can use for getting custom theme(s) for your wiki:
```css
[theme="A"][visualcolors="standard"] { /* Replace [theme="A"] with either [theme="B"], [theme="C"] or [theme="D"] if you want to target the other 3 slots, otherwise don't replace [theme="A"] with anything */ 
--body-background-image:url("loadbg_dev.png"); /* <image> */
--body-background-image-opacity:100%; /* <percentage> */
--body-background-color:#441177; /* <color> */
--body-background-mode:standard; /* standard | full */
--body-background-horizontal-alignment:top; /* left | center | right */
--body-background-vertical-alignment:top; /* top | center | bottom */
--body-background-size:cover; /* cover | contain | stretched | full */
--body-background-no-horizontal-tiling:false; /* <boolean> */
--body-background-no-vertical-tiling:false; /* <boolean> */
--superbar-text-background-color:auto; /* auto | <color> */
--secondary-accent-background-color:#dd2300; /* <color> */
--page-background-color:#f1f2f3; /* <color> */
--page-border-background-color:#aaabbb; /* auto | <color> */
--page-text-background-color:#222222; /* auto | <color> */
--accent-background-color:#dd8300; /* <color> */
--caret-background-color:#b88300; /* auto | <color> */
--custom-secondary-font:""; /* <string> */
--border-radius:3px; /* <number> 0 to 15 */
--logo-filter:opacity(1); /* <filter-function> */
--logo-filter-hover:opacity(0.8); /* <filter-function> */
--logo-filter-duration:300ms; /* <duration> */
--logo-filter-delay:0; /* <duration> */
}
```

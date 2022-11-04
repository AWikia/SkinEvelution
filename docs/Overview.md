# Evelution Overview

## What is Evelution?
Evelution is a Skin built by Qora Qore Telecommunities and is distributed for general use on Github by A Techno Services. This skin is designed to bring an experience that it is as close as the ones from FandomDesktop.

Feel free to use it on your wiki and make it as the default skin, if you wish. Modifications to the code must be licensed under the GPL 3.0 license.

Evelution can be called whatever you want on your Wiki. It is the second fork of MpistoSkin2, the first being MpistoServerSkin2.

## How Evelution will look on my wiki when I insatall it for first time?
When Evelution gets installed, you'll start fresh with our default themes and settings. Only the following customizations from core MW settings will load on Evelution:
- Logo (If set, with its visibility on Sticky Header) (Fetched from ``$wgLogos[icon], $wgLogos[x1] or $wgLogo``)
- Wordmark (If set)  (Fetched from ``$wgLogos[wordmark]``)
- Any other non-evelution configuration (Such as System Messages or Configuration)
- Local Nav from MediaWiki:Sidebar and Sitenotice from MediaWiki:Sitenotice
- CSS through MediaWiki:Common.css
- JS through MediaWiki:Common.js

Themes can easily be made through the use of ThemeDesigner tool (Not available on Miraheze Wikis) or by contacting HM100 on Discord. Themes code must be put into Evelution.css (Or to Common.css if you also have Tunic installed) in order to load. Evelution-specific CSS can go to MediaWiki:Evelution.css (For changing parts of the layout or making your wiki's design themable) as well.

## Using the Different Color Modes, Visual Styles and Colors

### Color Schemes
Twelve Color Schemes exist, in both Light and Dark modes.

#### Disabled Color Management presets
Eight DCM Modes Exist along with two types (Standard and Reversi):
- Standard is the normal ones
- Lite uses only four Visual Color pairs (Canvas, Gray Text, Button and Highlight). Gray Text is used as desktop background color
- General has theming akin to Windows 10 and 11 aka use of Accent Color provided by the system in Desktop Text, Highlight, Hyperlink, Visited Hyperlink, Active Text and Active Title. Fall backs to Highlight or SelectedItem for browsers without such support. Uses Canvas color as desktop backgrouhnd color.
- Basic creates theming that excludes the use of Highlight color as well as any deprecated system color
- Simple has funner-theming (i.e. Accented Active Titlebars are displayed using ButtonText and ButtonFace as Background and Foreground colors respectively)
- Classic has theming akin to Windows 95 - 2000 albeit without any use of deprecated system colors
- High Contrast has unified Primary and Secondary Canvas Color, unified link stylings and use of ButtonFace as Active Title background color.
- Retro has some styling that it is akin to the ancient era of Windows


### Visual Modes
Four Visual Modes exist:
- 3D has neumorphism-like cues into various parts of the skin and replaces the former Retro Visual Style 
- Standard is the normal ones
- Lite has no transparency effects in it
- High Contrast has high emphasis on people with disabilities and disables certain effects such as blurred shadows and hover states of generated colors

### Visual Styles
Four Visual Styles exist:
- Standard is the normal ones
- General has styling more akin to Mobile Devices
- Basic has lesser blurred shadows and focuses on a less demanding layout
- Simple has funner-styled containers (i.e. Dropdowns are styled soley using Secondary Accent color when Accent Color is enabled)

### Visual Colors
Nine different Visual Colors exist:
- Standard Pack is the normal ones.
- No Color Management Pack disables all color-related settings (Themes and Color Modes) and forces System Colors, similar to the High Contrast Mode and having color management disabled.
- Forced Pack contains eight high contrast-optimized themes. Six are light and two are dark with the first four resembling the ones from Windows 10 while the last four resembling the ones from Windows 11.
- Evelution Packs contain eight light and eight dark themes. The first eight themes are standard and the other are dynamic versions of the afromentioned ones. All of them use Roboto Slab as the headings font.
- Colors Packs contain eight light and eight dark themes. Each theme use different background image. Those images are inverted in the dark themes. No rounded corners is applied into them and they use lower elements opacity.
- Pokémon Colors Pack contain eight different themes with the latter four being dark. The First and fifth themes contain colors from Let's Go Pikachu and Eevee, the Second and Sixth from Sword and Shield, the Third and Seventh from Isle of Armor and Crown Tundra and the Fourth and Eigth from Scarlet and Violet. This color pack is also considered a variant of the Colors Theme Pack.
- Android Pack contains eight dynamic themes based on the basic accent colors you can choose on an Android 12 device in both Light and Dark Mode. This theme pack focuses more on Rounded Corners and is using Roboto as Headings font in addition to as main font.
- Qora Qore Pack contains four light and four dark themes, each representing the Stable, Beta, Dev and Canary channel of the afromentioned game. Light and Dark themes use Light Gray and Dark Gray as Canvas color respectively. Didact Gothic is the main font.
- Dynamic Packs contain Eight Light and Eight Dark themes that are made by only setting the Hyperlink Color. The first theme of the light version is the same as the Factory CPE Language Theme. All of them use Ubuntu as both Primary and Secondary font.

## Differences of Evelution and MpistoSkin2
Evelution, despite being essentially similar to MpistoSkin2 from Q.Qore, there're several differences, to name a few:
- Evelution used to be a plain Desktop skin with official support of Screens between 705 to 1500 pixels whereas MpistoSkin2 was always a hybrid Mobile-Desktop-Desktop XL skin with support of screens between 360 to 2000 pixels. As such, no XS and XL breakpoints existed on Evelution. XL Breakpoint was added in version 3.4.0 while XS Breakpoint was added in version 3.6.0
- Evelution has 705 pixels on its small size instead of 760 pixels that MpistoSkin2 offers. Its large size offers the same size as MpistoSkin2, which is at 1280 pixels.
- Evelution used to lack a right rail that MpistoSkin2 has. However, evelution has support for Sitenotice. 4.8.0 added support for Right Rail but in a completely different style despite sharing the same classes from MpistoSkin2
- Evelution uses smaller typography on the Article compared to MpistoSkin2. Article text size for instance, is at 13 pixels.
- Evelution uses LocalStorage to store all skin-related settings (Theme Management, Article Width, Toolbar width and Sticky Nav width) so when page is reloaded, those settings are preserved. MpistoSkin2 does not rely on this and as such, all skin-related settings are reset when page is reloaded.
- Evelution used not to take care of System's native Dark Mode, unlike MpistoSkin2
- Evelution's Global Navigation consists of different items:
  - Top links include the GitHub link (Scoped to this repository), the Evelution Support Server Link and the MediaWik site link
  - The Explore Menu contains the list of links found in the footer the Vector skin has, instead of the official A Techno Links
  - Bottom Links are essentially identical, however, no wikis and flags menus exist
  - Bottom Links additionally contain the **In other Languages**, **Language Variants** and the **Notifications** links but they appear only if the page has interwiki links, the wiki's language has other versions such as Chinese  and the Echo Extension is installed respectively
  - Search in Global Navigation in Evelution is Local instead of Global compared to MpistoSkin2
  - Evelution has no user avatar support, unlike MpistoSkin2 and such an icon takes place. Also, instead of the user name being in the tooltip, the **Personal tools** message takes place
- Evelution uses icons from the Material Icons library instead of the DS Icons, and they're embedded as a font instead of an SVG compared to MpistoSkin2.
- Unlike MpistoSkin2, no Global Footer exists. However, a small article footer does exist
- In Evelution, only namespaces, views and actions reside by default on Page Header Actions. In MpistoSkoin2, Visual Appearance also redies there.
- MpistoSkin2 is a GMK skin that has many wrappers and is semi-dynamical. Evelution is however, a MediaWiki skin with reliance on Mustache and much more dynamical. Because of this, the custom appearance of Preferences Screen is unavailable on Evelutiion but the ones from core MW is at least themed.

## Differences of Evelution and FandomDesktop
Evelution, despite being as a close-off to Fandom's new FandomDesktop, there're several differences, to name a few:
- Evelution uses breakpoints to define its appearance, like Oasis but unlike FandomDesktop
- Unlike FandomDesktop where FandomMobile is the Mobile segment of FandomDesktop, Evelution has the mobile segment inside the skin. However, a more mobile optimized version with minimal formatting named Tunic is available.
- Evelution uses LocalStorage to store all skin-related settings (Theme Management, Article Width, Toolbar width and Sticky Nav width), unlike FandomDesktop which uses user preferences. As a result, those are tied to a specific browser for all users instead to a specific user for all browsers
- You have the ability to collapse the sticky nav, unlike FandomDesktop
- Toolbar appears as icon-only with tooltips and like Oasis but unlike FandomDesktop, it appears as a full-width container. It is uncustomizable as well but is loaded with many links
- Unlike FandomDesktop, no Global Footer exists. However, a small article footer does exist
- Evelution has no user avatar support, unlike FandomDesktop and such an icon takes place.
- Unlike FandomDesktop, no floating page actions exist. While server mode of Evelution gives something similar, it is completely unrelated.
- Unlike FandomDesktop, in Evelution you have double the amount of themes you can define in FandomDesktop and the light/dark mode toggle does not toggle between wiki themes but rather between Inverted Colors mode. Also, Evelution takes care of System's native dark mode, unlike FandomDesktop
- Page header on Evelution is completely different from the ones found in FandomDesktop but similar
- Global Nav is mostly unbranded, is smaller and is themed. Also, search is not opened as a modal but rather as dropdown in the global nav. In addition global nav links do not include text below the icon and instead have tooltips.
- Evelution, unlike FandomDesktop uses pure JS to control theming and theming variables can be changed with ease. All background-related options are accesed with CSS variables as well. Several attributes to the body element are put as well. Users can also force specific color scheme or use different premade visual styles.
  - Evelution is, however compatible with **ALL** Fandom theming CSS variables. However, they're aliased to existing CPE Language variables, so instead of having the behavior seen in FandomDesktop, they have essentially the same behavior from CPE Language System.

## What are the different sizes I can use?
Evelution gets powered up with six main sizes: 320 pixels for small phones, 375 pixels for medium phones, 425 pixels for large phones 705 pixels for small desktops, 1280 pixels for large desktops and 1500 pixels for extra large desktops. A middle breakpoint size also exists. Users are able to read articles in either fixed width or full width, whichever they want to use.

With the inclusion of a top Sticky Navigation and a Bottom Toolbar which both can be collapsed, things can become more fun

The local navigation on Evelution is fetched from ``MediaWiki:Sidebar``. It is placed as links on the ``.evelution-superbar__bottom`` container on the static navigation and as submenus of another menu on the sticky navigation called ``.evelultion-minibar``

## What are the differences between the Small and Large Sizes?
The small 705 breakpoint contains the following differences from the large 1280 ones:
  - Text Size on Community and Sticky headers is smaller
  - No wordmark appears on either header
  - Less content can be seen compared to the large ones

Other than these three changes, both sizes can be used for reading articles. For medium-sized devices, a breakpoint that mixes the small breakpoint with the large ones is present and has the following gimicks:
  - Wordmark appears on either header but on the static ones, it appears smaller
  - Text sizes are a bit smaller compared to the larger ones
  - 
When customizing the skin using CSS, please make sure that when you edit the body background image, don't use the ``body`` element. Use ``.body-community-background`` instead if you want to change the background even more.

## Is there a native dark mode?
Yes. Evelution not only offers many dark themes but also an Inverted Colors Mode. This is offered in Solo theme mode (Strictly light or dark themes) and Duo theme mode (Light/Dark themes). State of Inverted Colors is reversed when system's native dark mode is active. Color invertion is powered by **Liatch** With **Liacth** phenomenon running (Based on value of Inverted colors):
  - All static background colors (Except Caret Color) are getting a partial invertion to make them play nice under this mode
  - Anchor Background Color, Static Page Border Background Color and Accent Background Color are color edited versions of the original if them won't play nice under Page Text Background Color as the role of Page Background Color
  - Community Background Image gets inverted to improve legibility of Community Header

## Can I change the themes using CSS?
Of course. It has been tested and it works. For instance, if you want to modify the 2nd Light theme, paste this to ``MediaWiki:Common.css``:
```css
.theme-B.colorscheme-light.visualcolors-standard { 
--desktop-background-image:url("loadbg_dev.png"); /* <image> */
--desktop-background-image-filter:opacity(100%); /* <filter-function> */
--desktop-background-image-blend-mode:normal; /* <blend-mode> */
--desktop-background-color:#441177; /* auto | <color> */
--desktop-background-size:cover; /* cover | contain | stretched | full */
--desktop-background-horizontal-alignment:left; /* left | center | right */
--desktop-background-vertical-alignment:top; /* top | center | bottom */
--desktop-background-no-horizontal-tiling:false; /* <boolean> */
--desktop-background-no-vertical-tiling:false; /* <boolean> */
--desktop-text-background-color:auto; /* auto  <color> */
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
}
```
Per-page theming is also supported. If you want to use a different theme for the 1st Light theme on **Sample Test Page** article, paste this to ``MediaWiki:Common.css``:
```css
.rootpage-Sample_Test_Page .theme-A.colorscheme-light.visualcolors-standard {
--desktop-background-image:url("loadbg_dev.png"); /* <image> */
--desktop-background-image-filter:opacity(100%); /* <filter-function> */
--desktop-background-image-blend-mode:normal; /* <blend-mode> */
--desktop-background-color:#441177; /* auto | <color> */
--desktop-background-size:cover; /* cover | contain | stretched | full */
--desktop-background-horizontal-alignment:left; /* left | center | right */
--desktop-background-vertical-alignment:top; /* top | center | bottom */
--desktop-background-no-horizontal-tiling:false; /* <boolean> */
--desktop-background-no-vertical-tiling:false; /* <boolean> */
--desktop-text-background-color:auto; /* auto  <color> */
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
}
```

## Testing your themes against color contrast
When checking your themes, you must be in Duo theme mode without inverted colors on as Liatch (Such as Duo theme mode with Inverted Colors enabled) will modify the theme to avoid any color contrast issue

## Servelution Overview
Each release of Evelution comes with different Sevelution releases, to name a few:
- 1.0.0 = Codenamed RZG =  Introduced in Ryneeeel Grooze
- 1.1.0 = Codenamed MW18 =  Introduced in Mpisto War 2018
- 1.2.0 = Codenamed MWTD = Introduced in Mpisto War 2018 Build 63/ DBuild 1800 - Introduces the Custom Theming Engine
- 1.3.0 = Codenamed Scandium = Introduced in Q.Qore Build 98
- 1.4.0 = Codenamed Titanium = Introduced in Q.Qore Build 129 - Introduces Custom Scrollbars
- 2.0.0 = Codenamed Vanadium = Introduced in Q.Qore Build 147 - Introduces the CPE Language
- 2.1.0 = Codenamed Vibranium = Introduced in Q.Qore Build 200 (This is the Basis of Q.Qore)
- 2.2.0 = Codenamed Manganese = Introduced in Evelution 2.0.0 - Introduces new Iconography and Dual Foreground colors
- 2.3.0 = Codenamed Iron = Introduced in Evelution 7.9.0 - Introduces custom header foreground color and translucent backgrounds (This is the Basis of QoreTeleworks)
- 2.4.0 = Codenamed Cobalt = Introduced in Evelution 8.12.0 - Introduces Floating actions (Not to be confused with Server Actions which are similar but appear inside the content area)
- 2.5.0 = Codenamed Nickel = Introduced in Evelution 13.0.0 - Introduces dynamic Generic Colors and Semantic Versioning 2
- 2.6.0 = Codenamed Cooper = Introduced in Evelution 18.0.0 - Introduces the Accented state of Luna Theming
- 2.7.0 = Codenamed Zinc = Introduced in Evelution 33.0.0 - Introduces the Inactive state of Luna Theming for CPE Language and dedicated accent colors for Luna Theming
- 2.8.0 = Codenamed Yttrium = Introduced in Evelution 43.0.0 - Introduces custom acryllic transparency along with a new Luna Theming System (Compatible with earlier Servelution Clients)
- 3.0.0 = Codenamed Zirconium = Introduced in Evelution 46.0.0 - Introduces Custom Primary font for each theme and CPE Language 2.0
- 3.1.0 = Codenamed Niobium = Introduced in Evelution 51.0.0 - Introduces Background image filters
- 3.2.0 = Codenamed Molybdenum = Introduced in Evelution 53.0.0 - Introduces Mica (Low-Level Acryllic)
- 3.3.0 = Codenamed Technetium  = Introduced in Evelution 62.0.0 - Introduces Custom Secondary Canvas & Canvas Text Background Colors
- 4.0.0 = Codenamed Ruthenium  = Introduced in Evelution 81.0.0 - Introduces Generic Color Shift (Hue Shift & Saturation) and CPE Language 3.0
- 4.1.0 = Codenamed Rhodium = Introduced in Evelution 85.0.0 - Introduces Background Image Blend Modes
- 4.2.0 = Codenamed Palladium = Introduced in Evelution 99.0.0 - Introduces Dynamic Canvas Color
- 5.0.0 = Codenamed Silver = Introduced in Evelution 122.0.0 - Introduces CPE Language 4.0 and Evelution Spotlight


### The Luna Theming System
Evelution comes with its own theming system, the Luna theming. It consists of three elements, the Luna Lovit, the Luna Levit and the Luna Lavccent:
- Luna Lovit conists of elements below it blurred for legibility of text. 
- Luna Levit conists of an opaque material that includes the background container elements (Bg color, Gradient Overlay and Background Image) below the content blurred for legibility of text. 
- Luna Lavccent is an additional color that will replace the Neutral Color when enabled.

Luna Lovit will display as a fallback Solid Color when:
- Running a visual mode other than Standard or 3D
- System's Reduced transparcney is enabled
- GPUs level is lower than 3
- App workspace is not focused
- App runs on a low-end skin (i.e. Tunic) or under Ivilution
- App runs on a browser without support of ``backdrop-filter``

Luna Levit will display as a fallback Solid Color when:
- Running a visual mode other than Standard or 3D
- System's Reduced transparcney is enabled
- GPUs level is lower than 3
- App workspace is not focused or runs fullscreen
- App runs on a low-end skin (i.e. Tunic) or under Ivilution
- App runs on a Servelution version lower than 3.2.0

Luna Lavccent will display as a fallback neutral color (Canvas Secondary Color) when:
- App-wide Accented Mode is disabled (And is the default ones)
- App runs on a low-end skin (i.e. Tunic) or under Ivilution
- Luna is in its inactive state and has the Inactive Title color set to auto (This will produce different results under different Visual Styles)
- App runs on a Servelution version lower than 2.6.0

## Theming Variables
This section lists all static Theming Variables and where they're used:

### ``--desktop-background-image`` (Accepts: ``<image>``)
This is used as the background image of the body container. When the opposite version of that theme is being running, this will appear inverted. An empty value results in no background being shown.

### ``--desktop-background-image-filter`` (Accepts: ``<filter-function>``)
This is used as the filter of the body background image.

### ``--desktop-background-image-blend-mode`` (Accepts: ``<filter-function>``)
This is used as the bledning mode of the body background image.

### ``--desktop-background-color`` (Accepts: ``<color>``)
This is used as the background color of the body container and the gradient overlay shown on header backgrounds. This is also used on  ``is-headline`` inputs and ``is-alternate`` secondary buttons. When set to ``auto``, it picks the Canvas Color.

### ``--desktop-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of the Community Header. When set to ``auto``, it autopicks the inverted version of desktop background color.

### ``--desktop-background-horizontal-alignment`` (Accepts: ``left | center | right``)
Sets the horizontal alignment of the background image. Accepts all standard properties ``background-position-x`` supports.

### ``--desktop-background-vertical-alignment`` (Accepts: ``top | center | bottom``)
Sets the vertical alignment of the background image. Accepts all standard properties ``background-position-y`` supports.

### ``--desktop-background-size`` (Accepts: ``cover | contain | stretched | full``)
When set to ``cover``, it makes the background image display on the whole screen, clipping some parts of it. When set to ``contain``, it behaves like cover except that no clipping happens in which it can reveal the community background color. When set to ``stretched``, it behaves like contain except that the background image will be stretched to remove any bg color revealance. When set to ``full``, it dispalys the background image as it is (Without changing its size).

### ``--desktop-background-no-horizontal-tiling`` (Accepts: ``<boolean>``)
When set to ``true``, it removes background tiling on the horizontal axis

### ``--desktop-background-no-vertical-tiling`` (Accepts: ``<boolean>``)
When set to ``true``, it removes background tiling on the vertical axis

### ``--canvas-background-color`` (Accepts: ``<color>``)
This is used as the background color of the page container, rail modules and many more containers. When set to ``auto``, it autopicks a color based on a mix of 20% Hyperlink Color and 80% of either black or white .

### ``--canvas-secondary-background-color`` (Accepts: ``<color>``)
This is used as the background color of the dropdowns and neutral-colored containers.

### ``--inactive-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the border color of the various containers and the color of certain inactive elements.  When set to ``auto``, it autopicks a color based on page background color. This is also used on unaccented primary form controls (Mostly those with ``is-unaccented`` class). In High Contrast Mode, it substitutes the Pause Generic Color.

### ``--active-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the color of the active links in addition of being used as a color for the insertation caret. This is also used on alternate secondary form controls (Mostly those with ``is-alternate`` class). When set to ``auto``, it autopicks a color based on a mix of 60% Hyperlink Color and 40% of either black or white.

### ``--canvas-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of the page container, rail modules and many more containers.  When set to ``auto``, it autopicks the inverted version of page background color. This is also used on unaccented secondary form controls (Mostly those with ``is-unaccented`` class). In High Contrast Mode, it substitutes the Success Generic Color.

### ``--canvas-text-secondary-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of the dropdowns and neutral-colored containers.  When set to ``auto``, it autopicks either the light or dark text background color, whichever works best on the set secondary page background color.


### ``--highlight-background-color`` (Accepts: ``<color> | auto``)
This is used as the background color of selected text in High Contrast mode and primary form controls. When set to ``auto``, it autopicks a color based on a mix of 80% Hyperlink Color and 20% of either black or white. In High Contrast Mode, it substitutes the Warning Generic Color.

### ``--highlight-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of selected text in High Contrast mode and primary form controls.

### ``--hyperlink-background-color`` (Accepts: ``<color>``)
This is used as the color of the links and secondary form controls. In High Contrast Mode, it substitutes the Alert Generic Color.

### ``--visited-hyperlink-background-color`` (Accepts: ``<color> | auto``)
This is used as the color of the visited links. When set to ``auto``, it picks the hyperlink color.


### ``--active-title-background-color`` (Accepts: ``<color> | auto``)
This is used as the background color of accent-colored elements in active Luna state. This is also used on alternate primary form controls (Mostly those with ``is-alternate`` class). When set to ``auto``, it autopicks a color based on a mix of 80% Hyperlink Color and 20% of either black or white. In High Contrast Mode, it substitutes the Progress Generic Color.

### ``--active-title-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of accent-colored elements in active Luna state.

### ``--inactive-title-background-color`` (Accepts: ``<color> | auto``)
This is used as the background color of accent-colored elements in inactive Luna state. When set to ``auto``, it autopicks a color based on a mix of 25% Active Title Color and 75% Canvas Color. In High Contrast Mode, it substitutes the Message Generic Color.

### ``--inactive-title-text-background-color`` (Accepts: ``<color> | auto``)
This is used as the foreground color of accent-colored elements in inactive Luna state.

### ``--custom-sans-serif-font`` (Accepts: ``<family-name>``)
This is used as the extra sans serif font to be used other than the stock ones. When set to an empty quoted string, no special extra font is used. This is used as the main UI font.

### ``--custom-serif-font`` (Accepts: ``<family-name>``)
This is used as the extra serif font to be used other than the stock ones. When set to an empty quoted string, no special extra font is used. This is used as the blockquote and printing font

### ``--custom-rounded-font`` (Accepts: ``<family-name>``)
This is used as the extra rounded font to be used other than the stock ones. When set to an empty quoted string, no special extra font is used. This is used as the buttons, headings and caption tile font.

### ``--custom-monospace-font`` (Accepts: ``<family-name>``)
This is used as the extra monospace font to be used other than the stock ones. When set to an empty quoted string, no special extra font is used. This is used as the terminal and code font.

### ``--border-radius`` (Accepts: ``<length>``)
This is used to control the rounded corners of all supported elements. 0px removes the rounded corners entirely. Values between 0 to 15px are generally favored. When Hardware acceleration is missing or access to the GPU Benchmarks list site (Found at ``unpkg.com``) is denied, this property is completely ignored.

### ``--icon-filter`` (Accepts: ``<filter-function>``)
This is used as the base filter of the logo.

### ``--icon-filter-hover`` (Accepts: ``<filter-function>``)
This is used as the base filter of the logo when hovering on it. When set to empty, it fallbacks to the base logo filter.

### ``--icon-filter-duration`` (Accepts: ``<time>``)
This is used as the time needed to transition from the base filter to the hover filter and vice versa. 0ms removes the transition. Values between 0ms to 1000ms are generally favored.

### ``--icon-filter-delay`` (Accepts: ``<time>``)
This is used as the time needed to start the transition from the base filter to the hover filter and vice versa. 0ms removes the delay. Values between 0ms to 1000ms are generally favored.

### ``--system-acryllic-opacity`` (Accepts: ``<length>``)
This is used to control the transparency of all elements that use Luna Lovit or Luna Levit. Values between 0.4 to 0.8 are generally favored. When Hardware acceleration is missing, device's performance isn't strong enough or access to the GPU Benchmarks list site (Found at ``unpkg.com``) is denied, this property is completely ignored.

### ``--system-generic-color-hue-shift`` (Accepts: ``<length>``)
This is used to control the additional hue shift that will be applied to generic colors. Values between -15 to 15 are generally favored. Under High Contrast Mode, this property is completely ignored.

### ``--system-generic-color-saturation`` (Accepts: ``<percentage>``)
This is used to control the HSL Saturation that will be applied to generic colors. Values between 20% to 100% that are multiple of 5 are generally favored. Under High Contrast Mode, this property is completely ignored.

### Generic colors (Alert, Pause, Warning, Success, Progress Message)
Those six colors are user customizable using the ``--system-generic-color-hue-shift`` and ``--system-generic-color-saturation`` properties (Except for the Message Color) but the base colors are rather picked automatically based on contrast with Page Background Color. ``--alert-background-color`` is always a red color and is used on new links, destructive buttons and errorboxes. ``--pause-background-color`` is always an orange color and is used on halted elements.  ``--warning-background-color`` is always a yellow color and is used on warningboxes. ``--success-background-color`` is always an green color and is used on constructive buttons and successboxes. ``--progress-background-color`` is always a blue color and is used on progressive buttons and in-progress actions. ``--message-background-color`` is always a grayscale color and is used on neutral buttons and messageboxes. All six colors will share the same lightness so there'll be no inconsistancy between them and those are not matched for a specific color scheme aka the same color can be used in both light and dark themes.

## Configuring Evelution
Evelution, being a Mustache-powered MW skin, does support a few configurations, standard and non-standard, to name a few:

### Logo (Since 1.0.0)
Evelution uses ``$wgLogo`` to fetch the logo. If ``$wgLogos[icon]`` exists, then that setting will be used to fetch the logo. If none of them are found, no logo is shown. Note that any size works, and it can also be an SVG image in addition to a PNG ones. This logo appears on Desktop and Sticky community headers on the Large Size onwards

### Wordmark (Since 5.3.0)
By default, Evelution writes the sitename next to the wordmark. If you want to use your own mark instead of the default text ones, set the ``$wgLogos[wordmark]`` property on LocalSettings.php. Note that the wordmark set must be at most 40px in height for best results and it will appear monochrome so as it can adapt any text color. This wordmark appears on all places the default text-mark would appear otherwise so.

### Information Module (Since 4.7.0)
Content placed in ``MediaWiki:Evelution-about-module-info`` will appear on the information module

### Discord Server Widget (Since 14.0.0)
If a vaild server ID is placed into ``MediaWiki:Evelution-discord-module-server-id``, a discord widget of the server with the corresponding server ID will appear on the Discord Module. Likewise, it also shows a create account link in the module buttons so users without a discord account can join the conversation there. Note that the server must have its server widget enabled. See [here](https://dev.fandom.com/wiki/DiscordIntegrator/instructions#Step_2:_Enable_Discord_widget) for instructions how to enable the server widget of your server.

### ``$wgEvelutionLeftPersonalLinks`` (Since 4.3.0)
Defaults to false. When set to true, it allows you to align the taskbar links to the left.

### ``$wgEvelutionDisableColorManagement`` (Since 4.3.0)
Defaults to false meaning you have color management, When set to true, it:
- Hardcodes all color theming variables to System Colors
- Hardcodes all non-color theming variables to their stock settings
- Removes the ability to change themes, visual colors and color modes
This setting is useful for wikis that can't adapt to the many color schemes Evelution gives. This is also the case when Forced Colors mode is active
### ``$wgEvelutionDisableRightRail`` (Since 5.0.0)
Defaults to false meaning that a right rail will be shown where appropriate. When set to true, no right rail will appear. If the wiki heavily relies on layouts that might break with the Right Rail on, this setting is very useful to be turned on.

### ``$wgEvelutionServerMode`` (Since 5.1.0)
Defaults to false aka Home Mode. When set to true aka Server Mode, it changes the layout to be more server/development wikis-friendly: 
- No Desktop Local Navigation
- Addition of Left actions link before the content (Which has the local navigation menus)
- Smaller page header title
- Full width Small Breakpoint size 
- No right rail on Help and Project Namespaces

### ``$wgEvelutionStickyRail`` (Since 8.1.0)
Defaults to true aka right rail will be sticky. When set to false, right rail will not be sticky. In order for sticky behavior of right rail to appear, browser window size must be at least 960x600. Requires ``$wgEvelutionDisableRightRail`` set to false in order for this to work

### ``$wgEvelutionForceFullWidth`` (Since 26.1.0)
Defaults to false. When set to true, it will force Evelution to be in Full width, negating the breakpoint sizes. Use this if your wiki can't handle things in the standard size and will work exclusively with full width size.

### ``$wgEvelutionDisableRightRailFromSpecificPages`` (Since 27.2.0)
Defaults to an empty array aka no additional pages will be blacklisted from having a right rail. Set this to an array of pages you want to disable right rail. Does not stack with ``$wgEvelutionDisableRightRail`` config and that will take priority over this one.

### ``$wgEvelutionMonoLogo`` (Since 45.1.0)
Defaults to false. When set to true, the Logo that appears on Desktop Superbar and Minibar will appear masked, adapting any color scheme. Use this for Flat-style logos or for Logos that are colored in either Plain Black or White. This setting is not recommended to be set to ``true`` for multicolored logos and logos without transparency.
# Evelution Overview

## What is Evelution?
Evelution is a Skin built by Qora Qore Telecommunities and is distributed for general use on Github by A Techno Services. This skin is designed to bring an experience that it is as close as the ones from FandomDesktop.

Feel free to use it on your wiki and make it as the default skin, if you wish. Modifications to the code must be licensed under the GPL 3.0 license.

Evelution can be called whatever you want on your Wiki. It is the second fork of MpistoSkin2, the first being MpistoServerSkin2.

## Differences of Evelution and MpistoSkin2
Evelution, despite being essentially similar to MpistoSkin2 from Q.Qore, there're several differences, to name a few:
- Evelution used to be a plain Desktop skin with official support of Screens between 705 to 1500 pixels whereas MpistoSkin2 was always a hybrid Mobile-Desktop-Desktop XL skin with support of screens between 360 to 2000 pixels. As such, no XS and XL breakpoints existed on Evelution. XL Breakpoint was added in version 3.4.0 while XS Breakpoint was added in version 3.6.0
- Evelution has 705 pixels on its small size instead of 760 pixels that MpistoSkin2 offers. Its large size offers the same size as MpistoSkin2, which is at 1280 pixels.
- Evelution used to lack a right rail that MpistoSkin2 has. However, evelution has support for Sitenotice. 4.8.0 added support for Right Rail but in a completely different style despite sharing the same classes from MpistoSkin2
- Evelution uses smaller typography on the Article compared to MpistoSkin2. Article text size for instance, is at 13 pixels.
- Evelution uses LocalStorage to store all skin-related settings (Theme Management, Article Width, Toolbar width and Sticky Nav width) so when page is reloaded, those settings are preserved. MpistoSkin2 does not rely on this and as such, all skin-related settings are reset when page is reloaded.
- Evelution does not take care of System's native Dark Mode, unlike MpistoSkin2
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

## What are the different sizes I can use?
Evelution gets powered up with six main sizes: 320 pixels for small phones, 375 pixels for medium phones, 425 pixels for large phones 705 pixels for small desktops, 1280 pixels for large desktops and 1500 pixels for extra large desktops. A middle breakpoint size also exists. Users are able to read articles in either fixed width or full width, whichever they want to use.

With the inclusion of a top Sticky Navigation and a Bottom Toolbar which both can be collapsed, things can become more fun

The local navigation on Evelution is fetched from ``MediaWiki:Sidebar``. It is placed as links on the ``.color-nav`` container on the static navigation and as submenus of another menu on the sticky navigation called ``.mpisto-sticky-header-container``

### Tyography Sizes between MpistoSkin2 and Evelution
Between Evelution and MpistoSkin2, typography sizes also differ. Let's take a look at them:

#### Desktop

|  Kind                 | Evelution | MpistoSkin2 |
|  -------------------- | --------- | ----------- |
| Title (Large)         | 35px      | 38px        |
| Title (Small)         | 32px      | 35px        |
| Heading 1             | 26px      | 28px        |
| Heading 2             | 18px      | 20px        |
| Heading 3             | 16px      | 17px        |
| Heading 4 / Text      | 13px      | 14px        |
| Heading 5 / Subtitle  | 11px      | 12px        |
| Heading 6             | 9px       | 10px        |

#### Desktop XL

|  Kind                 | Evelution | MpistoSkin2 |
|  -------------------- | --------- | ----------- |
| Title                 | 44px      | 47px        |
| Heading 1             | 33px      | 36px        |
| Heading 2             | 24px      | 26px        |
| Heading 3             | 20px      | 21px        |
| Heading 4             | 17px      | 18px        |
| Text                  | 15px      | 16px        |
| Heading 5             | 14px      | 15px        |
| Subtitle              | 13px      | 14px        |
| Heading 6             | 11px      | 12px        |

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
  - Page Background Color and Page Text Background Color roles are switched
  - Anchor Background Color, Static Page Border Background Color and Accent Background Color are color edited versions of the original if them won't play nice under Page Text Background Color as the role of Page Background Color
  - Community Background Color, Sticky Header Background Color and Static Toolbar Background Color are getting a partial invertion to make them play nice under this mode
  - Community Background Image gets inverted to improve legibility of Community Header

## Can I change the themes using CSS?
Of course. It has been tested and it works. For instance, if you want to modify the 2nd theme, paste this to ``MediaWiki:Common.css``:
```css
.theme-B[visualcolors="standard"] {
--community-background-image:url("");
--community-background-color:#e995ca;
--anchor-background-color:#058892;
--page-background-color:#ffffff;
--page-border-background-color:#ccc;
--page-text-background-color:#000000;
--accent-background-color:#18BBC5;
--sticky-header-background-color:#0000ff;
--toolbar-background-color:auto;
}
```
Per-page theming is also supported. If you want to use a different theme for the 1st theme on **Sample Test Page** article, paste this to ``MediaWiki:Common.css``:
```css
.theme-A[visualcolors="standard"] .rootpage-Sample_Test_Page {
--community-background-image:url("");
--community-background-color:#e995ca;
--anchor-background-color:#058892;
--page-background-color:#ffffff;
--page-border-background-color:#ccc;
--page-text-background-color:#000000;
--accent-background-color:#18BBC5;
--sticky-header-background-color:#0000ff;
--toolbar-background-color:auto;
}
```

## Style Guide
When Styling OOUI elements, any container that it is outside the ``<container>`` element (Use the F12 tools to find out which) and scrollbars, use ``rgb(var(--community-background-color-rgb))``, ``rgb(var(--anchor-background-color-rgb))``, ``rgb(var(--page-background-color-rgb))``, ``rgb(var(--page-border-background-color-rgb))``, ``rgb(var(--page-text-background-color-rgb))``, ``rgb(var(--accent-background-color-rgb))``, ``rgb(var(--sticky-header-background-color-rgb))`` and ``rgb(var(--toolbar-background-color-rgb))`` in place of ``var(--community-background-color)``, ``var(--anchor-background-color)``, ``var(--page-background-color)``, ``var(--page-border-background-color)``, ``var(--page-text-background-color)``, ``var(--accent-background-color)``, ``var(--sticky-header-background-color)`` and ``var(--toolbar-background-color)`` so as to make those elements display properly when either some of the elements are in autocolorization or Inverted colors are active (Anchor and Accent Background color on ``<container>`` element only differ from the ones set in ``<body>`` under inverted colors)

## Configuring Evelution
Evelution, being a Mustache-powered MW skin, does support a few configurations, standard and non-standard, to name a few:

### Logo (Since 1.0.0)
Evelution uses ``$wgLogo`` to fetch the logo. If ``$wgLogos[icon]`` exists, then that setting will be used to fetch the logo. If none of them are found, no logo is shown. Note that any size works, and it can also be an SVG image in addition to a PNG ones. This logo appears on Desktop and Sticky community headers on the Large Size onwards

### Wordmark (Since 5.3.0)
By default, Evelution writes the sitename next to the wordmark. If you want to use your own mark instead of the default text ones, set the ``$wgLogos[wordmark]`` property on LocalSettings.php. Note that the wordmark set must be at most 40px in height for best results and it will appear monochrome so as it can adapt any text color. This wordmark appears on all places the default text-mark would appear otherwise so.

### ``$wgEvelutionLeftPersonalLinks`` (Since 4.3.0)
Defaults to false. When set to true, it allows you to align the toolbar links to the left.

### ``$wgEvelutionDisableColorManagement`` (Since 4.3.0)
Defaults to false meaning you have color management, When set to true, it hardcodes the color scheme used on Evelution to be similar to the ones used in Vector. This setting is useful for wikis that can't adapt to the many color schemes Evelution gives.

### ``$wgEvelutionForceOneHeader`` (Since 4.3.0)
Defaults to false. When set to true, it removes the Desktop Community Header and leaves the Desktop sticky header the only ones for Desktops. This setting does not affect Mobile Devices. This setting is useful for wikis who want a solo header layout. Sticky header is still able to be collapsed.

### ``$wgEvelutionDisableRightRail`` (Since 5.0.0)
Defaults to false meaning that a right rail will be shown where appropriate. When set to true, no right rail will appear. If the wiki heavily relies on layouts that might break with the Right Rail on, this setting is very useful to be turned on.

### ``$wgEvelutionServerMode`` (Since 5.1.0)
Defaults to false aka Home Mode. When set to true aka Server Mode, it changes the layout to be more server/development wikis-friendly: 
- No Desktop Local Navigation
- Addition of Left actions link before the content (Which has the local navigation menus)
- Smaller page header title
- Full width Small Breakpoint size 
- No right rail on Help and Project Namespaces

### ``$wgEvelutionCustomFont`` (Since 5.3.0)
Defaults to an empty string meaning Didact Gothic will be used. When set to another value, that font will be used instead

### ``$wgEvelutionIconStyle`` (Since 5.5.0, until 6.1.0)
Defaulted to outlined. When set to either filled, rounded, shart or two-tone, it changed the icon display to a style other than outlined. Values outside the allowed ones would result in outlined icons. It did not affected OOUI and Inline SVGs but did affected Material Icons inserted on articles.

### ``$wgEvelutionIconWireframe`` (Since 6.2.0)
Defaults to true aka outlined Icons. When set to false, icons will display filled aka without any wireframe

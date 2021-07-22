# What is Evelution?
Evelution is a Skin built by Qora Qore Telecommunities and is distributed for general use on Github by A Techno Services. This skin is designed to bring an experience that it is as close as the ones from FandomDesktop.

Feel free to use it on your wiki and make it as the default skin, if you wish. Modifications to the code must be licensed under the GPL 3.0 license.

Evelution can be called whatever you want on your Wiki. It is the second fork of MpistoSkin2, the first being MpistoServerSkin2.

# Differences of Evelution and MpistoSkin2
Evelution, despite being essentially similar to MpistoSkin2 from Q.Qore, there're several differences, to name a few:
- Evelution is a plain Desktop skin with official support of Screens between 705 to 1500 pixels whereas MpistoSkin2 is a hybrid Mobile-Desktop-Desktop XL skin with support of screens between 360 to 2000 pixels. As such, no XS and XL breakpoints exist on Evelution.
- Evelution has 705 pixels on its small size instead of 760 pixels that MpistoSkin2 offers. Its large size offers the same size as MpistoSkin2, which is at 1280 pixels.
- Evelution lacks a right rail that MpistoSkin2 has. However, evelution has support for Sitenotice.
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

# What are the different sizes I can use?
Evelution gets powered up with two main sizes: 705 pixels for small screens and 1280 pixels for large screens. A middle breakpoint size also exists. Users are able to read articles in either fixed width or full width, whichever they want to use.

With the inclusion of a top Sticky Navigation and a Bottom Toolbar which both can be collapsed, things can become more fun

The local navigation on Evelution is fetched from ``MediaWiki:Sidebar``. It is placed as links on the ``.color-nav`` container on the static navigation and as submenus of another menu on the sticky navigation called ``.mpisto-sticky-header-container``

# What are the differences between the Small and Large Sizes?
The small 705 breakpoint contains the following differences from the large 1280 ones:
  - Text Size on Community and Sticky headers is smaller
  - No wordmark appears on either header
  - Less content can be seen compared to the large ones
Other than these three changes, both sizes can be used for reading articles. For medium-sized devices, a breakpoint that mixes the small breakpoint with the large ones is present and has the following gimicks:
  - Wordmark appears on either header but on the static ones, it appears smaller
  - Text sizes are a bit smaller compared to the larger ones

# This skin hasn't been designed for Desktop XL devices. Will it work on those devices?
Absolutely it will as many Desktop Skins do work for Desktop XL devices. However, only 1500 pixels of width will be usable with the skin container being centered on those devices. To make it look even better, it is also decorated with a thick box shadow. 

When customizing the skin using CSS, please make sure that when you edit the body background image, don't use the ``body`` element. Use ``.body-community-background`` instead if you want to change the background even more.

# Can I change the themes using CSS?
Of course. It has been tested and it works. For instance, if you want to modify the 2nd theme, paste this to ``MediaWiki:Common.css``:
```css
.theme-B[visualcolors="standard"] {
--background-image:url("");
--background-color:#e995ca;
--link-color:#18bbc5;
--content-bg:#ffffff;
--content-border:#ccc;
--content-color:#000000;
--button-color:#18BBC5;
--community-header-bg:#0000ff;
--floating-header-bg:auto;
}
```
Note that per-page theming is not currently supported as it relies on the ``html`` element to get those color variables and the class for targeting specific page is however on the ``body`` element. This may change in the future

Evelution is a Next Gen Skin for MediaWiki. Designed to improve reading has four different thems that you can use them on a page-basis. With the inclusion of a Dark Mode, you can read pages with fewer eye stress.


With the inclusion of Sticky sidebars and Sticky Community Header, you can have many of the known tools MediaWiki following you.

Evelution Desktop Skin in three different main Breakpoint Sizes, 705px, 1280px & 1500px. It is maintained by Qora Qore Telecommunities, A Techno Services and all other CPE Evelution Developers

You can read more about the skin [here](Overview.md). For easy to use CSS snipsets, go [here](SimpleCSS.md)

Evelution uses the ``main`` branch that it is compatible with MediaWiki 1.36 to MediaWiki 1.38 so currently no separate branches for 1.36 (``REL_1.36``), 1.37 (``REL_1.37``) and 1.38 (``REL_1.38``)

# Requirements
To Run Evelution on your wiki, you must have MediaWiki 1.36 or greater. Older versions are not supported

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

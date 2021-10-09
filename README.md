_QQC is back on MediaWiki with the hybrid Mustache/JavaScript powered theme, Evelution, from the creators of CPE Blocks and Qora Qore_

# Description
Evelution is a Next Gen Skin for MediaWiki. Designed to improve reading, has four different themes that you can use on a per-page basis. With the inclusion of a dark mode, you can read pages with less eye stress.

With the inclusion of sticky sidebars and sticky community header, you can have many of the known tools MediaWiki following you.

Evelution Desktop Skin in six different main Breakpoint Sizes, 320px, 375px, 425px, 705px, 1280px & 1500px

# Requirements
To Run Evelution on your wiki, you must have MediaWiki 1.36 or later. Older versions are not supported. The ``main`` branch is used for 1.36, 1.37 and 1.38 releases of MediaWiki

# Installation
To Install Evelution, you must download the reposistory first. Make a folder called **Evelution** in **Skins** directory where you have installed MediaWiki,  and extract the archive contents in the **Evelution** folder. Lastly, put this in **LocalSettings.php**:
```php
wfLoadSkin( 'Evelution' );
```

# New Version release
- New releaes on Evelution will always come by HM100. However, users with **Triage** access can merge others PRs to Evelution. Once I got access to Evelution Skin in my personal MW instance, I will try to merge the changes from this repo to the **Evelution** folder in my MW instance and will release a new release, major or minor.

# More Help
Join our [Discord server](https://discord.gg/a6FbV6zWFs) for additional assistance with Evelution.

# Known Limitation
- Toolbar can cover the page action dropdowns if the content area is too small. If it does that, collapse it.

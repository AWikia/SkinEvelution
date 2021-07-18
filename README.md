_QQC is back on MediaWiki with the hybrid Mustache/JS powered theme Evelution, from the makers of CPE Blocks and Qora Qore_

# Description
Evelution is a Next Gen Skin for MediaWiki. Designed to improve reading has four different thems that you can use them on a page-basis. With the inclusion of a Dark Mode, you can read pages with fewer eye stress.

With the inclusion of Sticky sidebars and Sticky Community Header, you can have many of the known tools MediaWiki following you.

Evelution Desktop Skin in two different main Breakpoint Sizes, 705px & 1280px

# Requirements
To Run Evelution on your wiki, you must have MediaWiki 1.36 or greater. Older versions are not supported

# Installation
To Install Evelution, you must download the reposistory first. Make a folder called **Evelution** in **Skins** diractory where you have installed MediaWiki and extract the zipped file contents in **Evelution** folder.  Lastly, put this in **LocalSettings.php**:
```php
wfLoadSkin( 'Evelution' );
```

## BONUS: Modifying the Top link in the left sidebar
Find out the **FirstGnavLink.mustache** file in the **templates** folder of this skin. Open that file with any text editor. You should be presented with something like this:
```html
<!-- 
Replace the "cpe-tooltip" attribute with the name of your Company/Wiki Farm
Replace the "href" attribute with the link of your Company/Meta-Wiki Main Page
Optionally, replace the SVG with a monochrome version of your company logo
-->
		<a class="company link" cpe-tooltip="Qora Qore" href="https://awikia.github.io/Q.Qore">
			<!-- SVG Start -->
			<svg class="cpe-icon" version="1.0" xmlns="http://www.w3.org/2000/svg"
			 width="464.000000pt" height="464.000000pt" viewBox="0 0 464.000000 464.000000"
			 preserveAspectRatio="xMidYMid meet">
			<g transform="translate(0.000000,464.000000) scale(0.100000,-0.100000)"
			fill="currentColor" stroke="none">
			<path d="M2130 4414 c-546 -63 -945 -253 -1295 -615 -276 -285 -449 -612 -530
			-999 -33 -155 -45 -455 -26 -603 83 -620 435 -1126 979 -1405 306 -158 637
			-225 987 -201 152 11 337 44 455 83 41 13 75 23 76 23 0 -1 76 -96 169 -211
			176 -218 236 -275 344 -323 164 -73 356 -70 520 9 91 44 216 169 259 258 83
			171 84 358 2 525 -16 33 -99 147 -184 254 -94 116 -153 198 -148 205 4 6 32
			49 63 96 155 233 264 525 305 817 22 157 14 463 -15 603 -64 312 -186 579
			-364 795 -361 440 -839 673 -1415 689 -81 2 -163 2 -182 0z m283 -1349 c180
			-47 313 -188 352 -372 24 -111 22 -112 -67 -21 -64 64 -101 92 -159 121 -246
			121 -529 73 -710 -121 -102 -109 -157 -248 -160 -402 l-1 -75 -19 59 c-46 143
			-31 287 47 446 39 79 62 110 133 180 132 132 281 197 451 199 42 1 102 -6 133
			-14z"/>
			</g>
			</svg>
			<!-- SVG End -->
		</a>
```
Read the instructions found on the comment atop the file very carefully before editing that file. When replacing the SVG icon, please add the ``cpe-icon`` class

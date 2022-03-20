# Easy to use CSS on Evelution
Those CSS snipsets go to MediaWiki:Evelution.css (For Sitewide Use) or to Special:MyPage/evelution.css (For Personal Use)

## Custom Page Side Tool Customization
This snipset changes the floating actions to be themed according to a chosen color value, akin to the Simple Visual Style:

### Desktop
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--desktop-foreground-color);
    --floating-button-color-hover: var(--desktop-foreground-color);
    --floating-button-background-color: var(--desktop-background-color);
    --floating-button-background-color-hover: var(--desktop-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Desktop Text
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--desktop-text-foreground-color);
    --floating-button-color-hover: var(--desktop-text-foreground-color);
    --floating-button-background-color: var(--desktop-text-background-color);
    --floating-button-background-color-hover: var(--desktop-text-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Hyperlink
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--hyperlink-foreground-color);
    --floating-button-color-hover: var(--hyperlink-foreground-color);
    --floating-button-background-color: var(--hyperlink-background-color);
    --floating-button-background-color-hover: var(--hyperlink-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Canvas
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--canvas-foreground-color);
    --floating-button-color-hover: var(--canvas-foreground-color);
    --floating-button-background-color: var(--canvas-background-color);
    --floating-button-background-color-hover: var(--canvas-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Canvas Secondary
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--canvas-secondary-foreground-color);
    --floating-button-color-hover: var(--canvas-secondary-foreground-color);
    --floating-button-background-color: var(--canvas-secondary-background-color);
    --floating-button-background-color-hover: var(--canvas-secondary-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Inactive Text
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--inactive-text-foreground-color);
    --floating-button-color-hover: var(--inactive-text-foreground-color);
    --floating-button-background-color: var(--inactive-text-background-color);
    --floating-button-background-color-hover: var(--inactive-text-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Canvas Text
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--canvas-text-foreground-color);
    --floating-button-color-hover: var(--canvas-text-foreground-color);
    --floating-button-background-color: var(--canvas-text-background-color);
    --floating-button-background-color-hover: var(--canvas-text-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Canvas Text Secondary
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--canvas-text-secondary-foreground-color);
    --floating-button-color-hover: var(--canvas-text-secondary-foreground-color);
    --floating-button-background-color: var(--canvas-text-secondary-background-color);
    --floating-button-background-color-hover: var(--canvas-text-secondary-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Highlight
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--highlight-foreground-color);
    --floating-button-color-hover: var(--highlight-foreground-color);
    --floating-button-background-color: var(--highlight-background-color);
    --floating-button-background-color-hover: var(--highlight-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Active Title
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--active-title-foreground-color);
    --floating-button-color-hover: var(--active-title-foreground-color);
    --floating-button-background-color: var(--active-title-background-color);
    --floating-button-background-color-hover: var(--active-title-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```



### Inactive Title
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--inactive-title-foreground-color);
    --floating-button-color-hover: var(--inactive-title-foreground-color);
    --floating-button-background-color: var(--inactive-title-background-color);
    --floating-button-background-color-hover: var(--inactive-title-background-color-hover);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Alert
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--alert-foreground-color);
    --floating-button-color-hover: var(--alert-foreground-color);
    --floating-button-background-color: var(--alert-background-color);
    --floating-button-background-color-hover: var(--alert-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Pause
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--pause-foreground-color);
    --floating-button-color-hover: var(--pause-foreground-color);
    --floating-button-background-color: var(--pause-background-color);
    --floating-button-background-color-hover: var(--pause-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Warning
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--warning-foreground-color);
    --floating-button-color-hover: var(--warning-foreground-color);
    --floating-button-background-color: var(--warning-background-color);
    --floating-button-background-color-hover: var(--warning-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Success
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--success-foreground-color);
    --floating-button-color-hover: var(--success-foreground-color);
    --floating-button-background-color: var(--success-background-color);
    --floating-button-background-color-hover: var(--success-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Progress
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--progress-foreground-color);
    --floating-button-color-hover: var(--progress-foreground-color);
    --floating-button-background-color: var(--progress-background-color);
    --floating-button-background-color-hover: var(--progress-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Message
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--message-foreground-color);
    --floating-button-color-hover: var(--message-foreground-color);
    --floating-button-background-color: var(--message-background-color);
    --floating-button-background-color-hover: var(--message-background-color-hover-2);
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Color Fun
```css
.cpe-floating-button.page-side-tool {
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}

.cpe-floating-button.page-side-tool.toggle-size {
    --floating-button-color: var(--desktop-foreground-color);
    --floating-button-color-hover: var(--desktop-foreground-color);
    --floating-button-background-color: var(--desktop-background-color);
    --floating-button-background-color-hover: var(--desktop-background-color-hover);
}

.cpe-floating-button.page-side-tool.accent-toggle  {
    --floating-button-color: var(--desktop-text-foreground-color);
    --floating-button-color-hover: var(--desktop-text-foreground-color);
    --floating-button-background-color: var(--desktop-text-background-color);
    --floating-button-background-color-hover: var(--desktop-text-background-color-hover);
}

.ftoc .cpe-floating-button.page-side-tool  {
    --floating-button-color: var(--hyperlink-foreground-color);
    --floating-button-color-hover: var(--hyperlink-foreground-color);
    --floating-button-background-color: var(--hyperlink-background-color);
    --floating-button-background-color-hover: var(--hyperlink-background-color-hover);
}

.contrast-modes .cpe-floating-button.page-side-tool  {
    --floating-button-color: var(--inactive-text-foreground-color);
    --floating-button-color-hover: var(--inactive-text-foreground-color);
    --floating-button-background-color: var(--inactive-text-background-color);
    --floating-button-background-color-hover: var(--inactive-text-background-color-hover);
}

.color-modes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--canvas-text-foreground-color);
    --floating-button-color-hover: var(--canvas-text-foreground-color);
    --floating-button-background-color: var(--canvas-text-background-color);
    --floating-button-background-color-hover: var(--canvas-text-background-color-hover);
}

.styles .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--highlight-foreground-color);
    --floating-button-color-hover: var(--highlight-foreground-color);
    --floating-button-background-color: var(--highlight-background-color);
    --floating-button-background-color-hover: var(--highlight-background-color-hover);
}

.colors .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--active-title-foreground-color);
    --floating-button-color-hover: var(--active-title-foreground-color);
    --floating-button-background-color: var(--active-title-background-color);
    --floating-button-background-color-hover: var(--active-title-background-color-hover);
}

.themes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--inactive-title-foreground-color);
    --floating-button-color-hover: var(--inactive-title-foreground-color);
    --floating-button-background-color: var(--inactive-title-background-color);
    --floating-button-background-color-hover: var(--inactive-title-background-color-hover);
}
```

### Generic Color Fun
```css
.cpe-floating-button.page-side-tool {
	--floating-button-border-color-hover:var(--floating-button-background-color-hover);
	--floating-button-fadeout-opacity:0;
}

.cpe-floating-button.page-side-tool.toggle-size,
.cpe-floating-button.page-side-tool.accent-toggle {
    --floating-button-color: var(--alert-foreground-color);
    --floating-button-color-hover: var(--alert-foreground-color);
    --floating-button-background-color: var(--alert-background-color);
    --floating-button-background-color-hover: var(--alert-background-color-hover);
}

.ftoc .cpe-floating-button.page-side-tool,
.contrast-modes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--warning-foreground-color);
    --floating-button-color-hover: var(--warning-foreground-color);
    --floating-button-background-color: var(--warning-background-color);
    --floating-button-background-color-hover: var(--warning-background-color-hover);
}

.color-modes .cpe-floating-button.page-side-tool,
.styles .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--success-foreground-color);
    --floating-button-color-hover: var(--success-foreground-color);
    --floating-button-background-color: var(--success-background-color);
    --floating-button-background-color-hover: var(--success-background-color-hover);
}

.colors .cpe-floating-button.page-side-tool,
.themes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--message-foreground-color);
    --floating-button-color-hover: var(--message-foreground-color);
    --floating-button-background-color: var(--message-background-color);
    --floating-button-background-color-hover: var(--message-background-color-hover);
}
```

## Hide Visual Colors
This snipset hides the visual colors button from the floating actions. Useful if your wiki will not work with the alternate color schemes we give
```css
.colors .cpe-floating-button.page-side-tool {
	display:none
}
```

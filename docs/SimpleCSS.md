# Easy to use CSS on Evelution
Those CSS snipsets go to MediaWiki:Evelution.css (For Sitewide Use) or to Special:MyPage/evelution.css (For Personal Use)

## Custom Page Side Tool Customization
This snipset changes the floating actions to be themed according to a chosen color value, akin to the Simple Visual Style:

### Body/Community
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--body-foreground-color);
    --floating-button-color-hover: var(--body-foreground-color);
    --floating-button-background-color: var(--body-background-color);
    --floating-button-hover-background-color: var(--body-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Superbar Text/Community Header Text
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--superbar-text-foreground-color);
    --floating-button-color-hover: var(--superbar-text-foreground-color);
    --floating-button-background-color: var(--superbar-text-background-color);
    --floating-button-hover-background-color: var(--superbar-text-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Secondary Accent/Anchor
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--secondary-accent-foreground-color);
    --floating-button-color-hover: var(--secondary-accent-foreground-color);
    --floating-button-background-color: var(--secondary-accent-background-color);
    --floating-button-hover-background-color: var(--secondary-accent-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Page
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-foreground-color);
    --floating-button-color-hover: var(--page-foreground-color);
    --floating-button-background-color: var(--page-background-color);
    --floating-button-hover-background-color: var(--page-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Page Secondary
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-foreground-color);
    --floating-button-color-hover: var(--page-foreground-color);
    --floating-button-background-color: var(--page-secondary-background-color);
    --floating-button-hover-background-color: var(--page-secondary-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Page Border
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-border-foreground-color);
    --floating-button-color-hover: var(--page-border-foreground-color);
    --floating-button-background-color: var(--page-border-background-color);
    --floating-button-hover-background-color: var(--page-border-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Page Text
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-text-foreground-color);
    --floating-button-color-hover: var(--page-text-foreground-color);
    --floating-button-background-color: var(--page-text-background-color);
    --floating-button-hover-background-color: var(--page-text-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Accent
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--accent-foreground-color);
    --floating-button-color-hover: var(--accent-foreground-color);
    --floating-button-background-color: var(--accent-background-color);
    --floating-button-hover-background-color: var(--accent-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Caret
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--caret-foreground-color);
    --floating-button-color-hover: var(--caret-foreground-color);
    --floating-button-background-color: var(--caret-background-color);
    --floating-button-hover-background-color: var(--caret-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```


### Alert
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--alert-foreground-color);
    --floating-button-color-hover: var(--alert-foreground-color);
    --floating-button-background-color: var(--alert-background-color);
    --floating-button-hover-background-color: var(--alert-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Warning
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--warning-foreground-color);
    --floating-button-color-hover: var(--warning-foreground-color);
    --floating-button-background-color: var(--warning-background-color);
    --floating-button-hover-background-color: var(--warning-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Success
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--success-foreground-color);
    --floating-button-color-hover: var(--success-foreground-color);
    --floating-button-background-color: var(--success-background-color);
    --floating-button-hover-background-color: var(--success-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Message
```css
.cpe-floating-button.page-side-tool {
    --floating-button-color: var(--message-foreground-color);
    --floating-button-color-hover: var(--message-foreground-color);
    --floating-button-background-color: var(--message-background-color);
    --floating-button-hover-background-color: var(--message-background-color-hover);
	--floating-button-fadeout-opacity:0;
}
```

### Color Fun
```css
.cpe-floating-button.page-side-tool {
	--floating-button-fadeout-opacity:0;
}

.cpe-floating-button.page-side-tool.toggle-size {
    --floating-button-color: var(--body-foreground-color);
    --floating-button-color-hover: var(--body-foreground-color);
    --floating-button-background-color: var(--body-background-color);
    --floating-button-hover-background-color: var(--body-background-color-hover);
}

.cpe-floating-button.page-side-tool.edit {
    --floating-button-color: var(--superbar-text-foreground-color);
    --floating-button-color-hover: var(--superbar-text-foreground-color);
    --floating-button-background-color: var(--superbar-text-background-color);
    --floating-button-hover-background-color: var(--superbar-text-background-color-hover);
}

.cpe-floating-button.page-side-tool.history {
    --floating-button-color: var(--secondary-accent-foreground-color);
    --floating-button-color-hover: var(--secondary-accent-foreground-color);
    --floating-button-background-color: var(--secondary-accent-background-color);
    --floating-button-hover-background-color: var(--secondary-accent-background-color-hover);
}

.cpe-floating-button.page-side-tool.accent-toggle {
    --floating-button-color: var(--page-foreground-color);
    --floating-button-color-hover: var(--page-foreground-color);
    --floating-button-background-color: var(--page-secondary-background-color);
    --floating-button-hover-background-color: var(--page-secondary-background-color-hover);
}

.color-modes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-border-foreground-color);
    --floating-button-color-hover: var(--page-border-foreground-color);
    --floating-button-background-color: var(--page-border-background-color);
    --floating-button-hover-background-color: var(--page-border-background-color-hover);
}

.styles .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--page-text-foreground-color);
    --floating-button-color-hover: var(--page-text-foreground-color);
    --floating-button-background-color: var(--page-text-background-color);
    --floating-button-hover-background-color: var(--page-text-background-color-hover);
}

.colors .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--accent-foreground-color);
    --floating-button-color-hover: var(--accent-foreground-color);
    --floating-button-background-color: var(--accent-background-color);
    --floating-button-hover-background-color: var(--accent-background-color-hover);
}

.themes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--caret-foreground-color);
    --floating-button-color-hover: var(--caret-foreground-color);
    --floating-button-background-color: var(--caret-background-color);
    --floating-button-hover-background-color: var(--caret-background-color-hover);
}
```

### Generic Color Fun
```css
.cpe-floating-button.page-side-tool {
	--floating-button-fadeout-opacity:0;
}

.cpe-floating-button.page-side-tool.toggle-size,
.cpe-floating-button.page-side-tool.edit {
    --floating-button-color: var(--alert-foreground-color);
    --floating-button-color-hover: var(--alert-foreground-color);
    --floating-button-background-color: var(--alert-background-color);
    --floating-button-hover-background-color: var(--alert-background-color-hover);
}

.cpe-floating-button.page-side-tool.history,
.cpe-floating-button.page-side-tool.accent-toggle {
    --floating-button-color: var(--warning-foreground-color);
    --floating-button-color-hover: var(--warning-foreground-color);
    --floating-button-background-color: var(--warning-background-color);
    --floating-button-hover-background-color: var(--warning-background-color-hover);
}

.color-modes .cpe-floating-button.page-side-tool,
.styles .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--success-foreground-color);
    --floating-button-color-hover: var(--success-foreground-color);
    --floating-button-background-color: var(--success-background-color);
    --floating-button-hover-background-color: var(--success-background-color-hover);
}

.colors .cpe-floating-button.page-side-tool,
.themes .cpe-floating-button.page-side-tool {
    --floating-button-color: var(--message-foreground-color);
    --floating-button-color-hover: var(--message-foreground-color);
    --floating-button-background-color: var(--message-background-color);
    --floating-button-hover-background-color: var(--message-background-color-hover);
}
```

## Hide Visual Colors
This snipset hides the visual colors button from the floating actions. Useful if your wiki will not work with the alternate color schemes we give
```css
.colors .cpe-floating-button.page-side-tool {
	display:none
}
```

# Wilga

```javascript
var light = new Theme("Light");
light.add("--bodyColor", "black");
light.add("--bodyBackgroundColor", "white");
light.add("--panelColor", "black");
light.add("--panelBackgroundColor", "#ffffffcc");
light.add("--barColor", "black");
light.add("--barBackgroundColor", "#00000000");
light.add("--barIconColor", "black");
light.add("--barIconBackgroundColor", "#efefef");

var dimmed = new Theme("Dimmed");
dimmed.add("--bodyColor", "white");
dimmed.add("--bodyBackgroundColor", "#212121");
dimmed.add("--panelColor", "white");
dimmed.add("--panelBackgroundColor", "#212121cc");
dimmed.add("--barColor", "black");
dimmed.add("--barBackgroundColor", "#00000000");
dimmed.add("--barIconColor", "black");
dimmed.add("--barIconBackgroundColor", "#efefef");

var dark = new Theme("Dark");
dark.add("--bodyColor", "white");
dark.add("--bodyBackgroundColor", "black");
dark.add("--panelColor", "white");
dark.add("--panelBackgroundColor", "#000000cc");
dark.add("--barColor", "white");
dark.add("--barBackgroundColor", "#00000000");
dark.add("--barIconColor", "white");
dark.add("--barIconBackgroundColor", "#212121");

var themeController = new ThemeController("themeController");
themeController.addTheme(light);
themeController.addTheme(dimmed);
themeController.addTheme(dark);

themeController.addButton("themebutton");
// themeController.addButton("themebutton2");
themeController.addStatus("themebutton");

document.getElementById("defaultThemeSetter2").addEventListener('click',function () {themeController.synchronizeLocalTheme()});

themeController.run();
```

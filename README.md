# auto-mod
Automatically creates and imports CSS (or preprocessor) modules for React components.

A heavily modified fork of: https://github.com/Nasubikun/open-css-module

## Usage
Open the React component you want to make a module for, and then select one of auto-mod's commands from the VSCode command palette.

### Commands
- **Create Style Module Here**: Creates and imports a style module in the same folder as the currently component.
- **Create Style Module in Styles Folder**: Creates and imports style module in a predefined folder set in user / workspace settings.

### Config
- `stylesDirectory`: The directory that **Create Style Module in Styles Folder** will use to create modules.
- `language`: The language for the style modules created by auto-mod. CSS is set by default.
- `switchActiveWindow`: If enabled, will switch the VSCode editor window to the newly created style module.

## Future To-Dos (v1)
- Add tests.
- Automatically generate CSS module classes as they are referenced in React component `style` attributes.


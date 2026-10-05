# Reading Mode - RemNote Plugin

An Obsidian-style read-only reading view for RemNote that provides a distraction-free reading experience on desktop and web.

## Features

- **Toggle Reading Mode**: Press `Alt+Shift+R` (Mac: `Opt+Shift+R`) or use the command palette
- **Clean Reading Layout**: Hides editing chrome (bullets, drag handles, toolbars, placeholders)
- **True Read-Only Protection**: Prevents accidental edits while in reading mode
- **Smart Input Blocking**: Only blocks editor content; command palette, search, and flashcard inputs still work
- **Persistent State**: Your reading mode preference is saved across sessions
- **Navigation-Friendly**: Links, fold/expand arrows, scrolling, and keyboard navigation still work
- **Copy Support**: Copy text with `Cmd/Ctrl+C` while reading

## Installation & Setup

### Prerequisites

- Node.js (v16 or later)
- npm
- RemNote Desktop or Web (Mac)

### Development Setup

1. **Clone or download this plugin**
2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
   The dev server will start on `http://localhost:8080`

4. **Enable in RemNote**
   - Open RemNote
   - Go to Settings > Plugins > Build
   - Click "Develop from localhost"
   - Enter `http://localhost:8080`
   - The plugin should now be loaded

### Building the Plugin

To create a distributable plugin zip:

```bash
npm run build
```

This creates `PluginZip.zip` that can be manually installed in RemNote.

## Usage

### Toggle Reading Mode

- **Keyboard Shortcut**: `Alt+Shift+R` (Mac: `Opt+Shift+R`)
- **Command Palette**: Search for "Toggle Reading Mode"

**Why this shortcut?** 
- `Cmd/Ctrl+Shift+R` is hard-reload in Chrome/Electron, so we use `Alt+Shift+R` instead
- Doesn't conflict with browser or RemNote default shortcuts
- Mnemonic: **R** for Reading
- Easy to type with one hand

When reading mode is **ON**:- Clean, distraction-free layout with comfortable typography
- Editing chrome (bullets, drag handles, placeholders) is hidden
- Text input in the **editor** is blocked to prevent accidental edits
- **Command palette, search, and flashcard queue inputs still work normally**
- Navigation keys still work (arrows, page up/down, etc.)
- Copy (`Cmd/Ctrl+C`) and find (`Cmd/Ctrl+F`) still work
- Links and fold/expand arrows remain functional
- Flashcard queues and practice views stay fully usable

When reading mode is **OFF**:- All normal editing functionality returns

## Auto-Start on macOS (Optional)

To have the dev server start automatically at login:

1. **Install the LaunchAgent**
   ```bash
   cd scripts
   ./install-launchagent.sh
   ```

2. **To uninstall**
   ```bash
   cd scripts
   ./uninstall-launchagent.sh
   ```

Logs are written to `~/Library/Logs/reading-mode-plugin.log`

## Known Limitations

- This is a **private plugin** for local development, not intended for the RemNote marketplace
- The keyboard shortcut `Alt+Shift+R` may conflict with other apps (unlikely)
- Input blocking is scoped to editor content; command palette and flashcard inputs are explicitly allowed
- Some deeply nested UI elements may not be perfectly styled
- Mobile is explicitly disabled (iOS has RemNote's built-in read-only mode)
- If the plugin causes issues, disable all plugins by visiting: `remnote.com/notes?disablePlugins`

## Technical Details

- Built with RemNote's official React plugin template
- Uses `@remnote/plugin-sdk` for RemNote integration
- Requires `requestNative: true` for input event interception
- CSS registered dynamically via `app.registerCSS`
- State persisted via `plugin.storage.setSynced`

## Troubleshooting

**Plugin won't load:**
- Ensure dev server is running on port 8080
- Check RemNote Settings > Plugins > Build shows the plugin
- Look for errors in RemNote's developer console

**Reading mode doesn't prevent editing:**
- The plugin uses native event listeners which require `requestNative: true`
- Some input methods may bypass the protections

**Can't exit reading mode:**
- Use the keyboard shortcut again: `Alt+Shift+R` (Mac: `Opt+Shift+R`)
- Or use command palette: "Toggle Reading Mode"
- If stuck, disable plugins: `remnote.com/notes?disablePlugins`

**Dev server won't start:**
- Check if port 8080 is already in use
- Try `lsof -i :8080` to see what's using the port
- Kill the process or change the port in `webpack.config.js`

## License

MIT

# Reading Mode (⌥⇧R)

A RemNote desktop plugin that gives you an Obsidian-style read-only reading view so you can study notes without accidentally editing them.

**Toggle:** `Option+Shift+R` (⌥⇧R), or search **Toggle Reading Mode** in the command palette.

## What it does

When Reading Mode is **on**:
- Hides editing chrome (bullets, drag handles, toolbars, placeholders) for a clean, wide reading layout
- Blocks typing, paste, cut, and drop in the note editor so you don’t change text by mistake
- Still allows scrolling, links, fold/expand arrows, copy (`Cmd+C`), find (`Cmd+F`), and navigation keys
- Leaves the command palette, search, dialogs, and flashcard practice inputs fully usable
- Remembers on/off across RemNote restarts

When Reading Mode is **off**, RemNote behaves normally again.

## What it does **not** do

- It does **not** run on iOS/Android (`enableOnMobile: false`). Use RemNote’s built-in Read-Only Mode there.
- It is **not** a hard lock. Some unusual input methods (IME, dictation) might still get through.
- RemNote UI updates can occasionally break the styling until the plugin is updated.

## Install (zip — recommended)

1. Download or use `ReadingMode-PluginZip.zip` from `iCloud Drive/!GROKBOT/`
2. RemNote → **Settings → Plugins → Build → Upload plugin**
3. Pick the zip
4. Confirm it appears under **Manage** as **Reading Mode (⌥⇧R)**

Repo URL in the zip: https://github.com/Burbank/remnote-reading-mode (must be public for RemNote to accept the upload).

## Escape hatch

If a plugin ever blocks RemNote from loading: open  
https://remnote.com/notes?disablePlugins

## Source

Public GitHub: https://github.com/Burbank/remnote-reading-mode  
Local project: `CURSOR_PROJECT_REPOS/remnote-reading-mode`

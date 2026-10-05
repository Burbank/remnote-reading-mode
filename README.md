# Reading Mode (⌥⇧R)

A RemNote **desktop** plugin that gives you an Obsidian-style read-only reading view so you can study notes without accidentally editing them.

**Toggle:** `Option+Shift+R` (⌥⇧R), or search **Toggle Reading Mode** in the command palette.

## Compared with RemNote’s built-in iOS Read-Only Mode

| | **iOS Read-Only Mode** (built-in) | **This plugin (Mac / desktop)** |
|---|---|---|
| Where | RemNote iPhone / iPad | RemNote Mac desktop (and web) |
| Who makes it | RemNote itself | Private plugin (`Burbank/remnote-reading-mode`) |
| How you turn it on | RemNote’s own Read-Only setting | `⌥⇧R` or command palette |
| Goal | Stop accidental edits while reading on mobile | Same idea on the Mac, where RemNote has no built-in reading mode |
| Layout | RemNote’s native read-only UI | Extra clean / wide reading layout (hides bullets, handles, chrome) |
| Mobile | Yes — use this | **No** — plugin is `enableOnMobile: false` on purpose |
| Install | Nothing extra | Upload zip once; no server needed |

**Practical rule:** use RemNote’s built-in Read-Only on iOS/iPad; use this plugin on the Mac.

## What this plugin does (when on)

- Hides editing chrome for a clean, wide reading layout
- Blocks typing, paste, cut, and drop in the note editor
- Still allows scrolling, links, fold/expand, copy (`Cmd+C`), find (`Cmd+F`), and navigation keys
- Leaves command palette, search, dialogs, and flashcard practice inputs usable
- Remembers on/off across RemNote restarts

## What it does not do

- Does not replace iOS Read-Only Mode
- Not a hard lock (IME / dictation might still get through)
- RemNote UI updates can occasionally break styling until the plugin is updated

## Install (zip)

1. Open `iCloud Drive/!GROKBOT/ReadingMode-PluginZip.zip`
2. RemNote → **Settings → Plugins → Build → Upload plugin**
3. Confirm under **Manage**: **Reading Mode (⌥⇧R)**

Repo (must be public for RemNote): https://github.com/Burbank/remnote-reading-mode

## Escape hatch

https://remnote.com/notes?disablePlugins

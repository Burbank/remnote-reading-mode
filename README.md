# Reading Mode (⌥⇧R)

A RemNote **desktop** plugin that gives you a distraction-free reading view by hiding editing chrome and providing a clean, comfortable reading layout.

**Toggle:** `Option+Shift+R` (⌥⇧R), or search **Toggle Reading Mode** in the command palette.

## 🎯 What This Plugin Does

**Version 1.1.0** (sandboxed, marketplace-approved):
- **Creates a clean, distraction-free reading layout** by hiding bullets, drag handles, editing chrome, and properties
- **Shows a clear visual indicator** at the top when reading mode is active
- **Comfortable reading width and typography** optimized for extended reading
- **Remembers your preference** across RemNote restarts
- **Toggle easily** with ⌥⇧R or the command palette
- **Safe and sandboxed** — runs in RemNote's secure sandbox environment

## ⚠️ Important: Visual Layout vs. Input Blocking

**This sandboxed version focuses on visual presentation** to create a reading-friendly environment. However, due to RemNote's sandbox security restrictions:

- ✅ **The visual layout is perfect for reading** — clean, wide, distraction-free
- ⚠️ **Text editing is not blocked** — you can still type if you click into the editor
- 💡 **This is intentional** — RemNote's sandbox prevents plugins from intercepting keyboard events for security

**Think of it like:** Reading mode in other apps that hide toolbars and create a nice layout, but don't physically lock the keyboard.

If you need hard edit-blocking, you might prefer RemNote's built-in Read-Only Mode on iOS/iPad, which operates at the app level.

## Compared with RemNote's Built-in iOS Read-Only Mode

| | **iOS Read-Only Mode** (built-in) | **This plugin (Mac / desktop)** |
|---|---|---|
| Where | RemNote iPhone / iPad | RemNote Mac desktop (and web) |
| Who makes it | RemNote itself | Private plugin (`Burbank/remnote-reading-mode`) |
| How you turn it on | RemNote's own Read-Only setting | `⌥⇧R` or command palette |
| Goal | Blocks all edits on mobile | Clean reading layout on desktop |
| Layout | RemNote's native read-only UI | Extra clean / wide reading layout (hides bullets, handles, chrome) |
| Hard input blocking | Yes | No (sandboxed plugins can't block input) |
| Mobile | Yes — use this | **No** — plugin is `enableOnMobile: false` on purpose |
| Install | Nothing extra | Upload zip once from marketplace or repo |

**Practical rule:** use RemNote's built-in Read-Only on iOS/iPad for hard locking; use this plugin on desktop for a beautiful, distraction-free reading layout.

## Version History

**v1.1.0** (current, sandboxed):
- ✅ Runs in RemNote's secure sandbox (`requestNative: false`)
- ✅ Marketplace-approved architecture
- ✅ Visual reading layout with indicator banner
- ⚠️ Does not block text input (sandbox limitation)

**v1.0.0** (previous, native):
- ❌ Required native access (`requestNative: true`)
- ❌ Rejected by RemNote marketplace
- ✅ Blocked text input with global event listeners

## Install (from marketplace or zip)

### Option 1: RemNote Plugin Marketplace (recommended)
1. Open RemNote → **Settings → Plugins**
2. Search for **"Reading Mode"**
3. Click **Install**

### Option 2: Manual zip installation
1. Download `PluginZip.zip` from the [releases page](https://github.com/Burbank/remnote-reading-mode/releases)
2. RemNote → **Settings → Plugins → Build → Upload plugin**
3. Confirm under **Manage**: **Reading Mode (⌥⇧R)**

Repo (must be public for RemNote): https://github.com/Burbank/remnote-reading-mode

## Tips

- **Use the visual cue:** When the banner shows "📖 Reading Mode Active", you're in reading mode
- **Exercise self-discipline:** Since input isn't blocked, just avoid clicking into the editor
- **Combine with workflows:** Great for reviewing notes before studying, reading before editing, or focusing on content
- **Toggle anytime:** ⌥⇧R is quick — turn it on when reading, off when editing

## Escape hatch

https://remnote.com/notes?disablePlugins

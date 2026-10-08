# Reading Mode (⌥⇧R)

A RemNote **desktop** plugin that gives you a distraction-free reading view with CSS-based edit protection.

**Toggle:** `Option+Shift+R` (⌥⇧R), or search **Toggle Reading Mode** in the command palette.

## 🎯 What This Plugin Does

**Version 1.1.0** (sandboxed):
- **CSS-based edit protection** prevents typing in most cases by making contenteditable areas read-only
- **Clean, distraction-free reading layout** by hiding bullets, drag handles, editing chrome, and properties
- **Non-intrusive visual indicator** (pill in bottom-right corner) shows when reading mode is active
- **Comfortable reading width and typography** optimized for extended reading
- **Text selection and copying still work** (user-select: text)
- **Links and fold/expand remain clickable**
- **Remembers your preference** across RemNote restarts
- **Toggle easily** with ⌥⇧R or the command palette
- **Safe and sandboxed** — runs in RemNote's secure sandbox environment

## ⚠️ Edit Protection: CSS-Based (Mostly Effective)

**This version uses CSS-only protection** (`-webkit-user-modify: read-only`) which works well but has inherent limitations:

**What's protected:**
- ✅ **Regular typing is blocked** — clicking into notes and typing usually does nothing
- ✅ **Visual layout is distraction-free** — clean, wide, reading-optimized
- ✅ **Caret is invisible** — no blinking cursor to tempt you

**What still works (by design):**
- ✅ **Text selection** — you can still select and copy text (Cmd+C)
- ✅ **Links** — clickable and work normally
- ✅ **Fold/expand** — disclosure triangles remain functional
- ✅ **Scrolling and navigation** — arrow keys, Page Up/Down, etc.
- ✅ **Find** — Cmd+F works normally
- ✅ **Command palette** — Cmd+K remains accessible
- ✅ **Dialogs, search, flashcard inputs** — all functional

**Known gaps (CSS limitations):**
- ⚠️ **Some keyboard shortcuts** that modify content (e.g., Cmd+B for bold) might still work
- ⚠️ **Paste** might work in some contexts
- ⚠️ **Browser/RemNote edge cases** where contenteditable state changes might bypass CSS

**Bottom line:** This provides strong edit discouragement that will prevent accidental edits in most normal use. It's not a cryptographic lock, but it's quite effective for focused reading sessions.

## Compared with RemNote's Built-in iOS Read-Only Mode

| | **iOS Read-Only Mode** (built-in) | **This plugin (Mac / desktop)** |
|---|---|---|
| Where | RemNote iPhone / iPad | RemNote Mac desktop (and web) |
| Who makes it | RemNote itself | Private plugin (`Burbank/remnote-reading-mode`) |
| How you turn it on | RemNote's own Read-Only setting | `⌥⇧R` or command palette |
| Goal | Blocks all edits on mobile | CSS-based edit protection on desktop |
| Layout | RemNote's native read-only UI | Extra clean / wide reading layout (hides bullets, handles, chrome) |
| Edit blocking | Hard (app-level) | CSS-based (effective for typical use) |
| Mobile | Yes — use this | **No** — plugin is `enableOnMobile: false` on purpose |
| Install | Nothing extra | Upload zip once from repo |

**Practical rule:** use RemNote's built-in Read-Only on iOS/iPad for hard app-level locking; use this plugin on desktop for CSS-based protection with a beautiful reading layout.

## Version History

**v1.1.0** (current, sandboxed):
- ✅ Runs in RemNote's secure sandbox (`requestNative: false`)
- ✅ CSS-based edit protection (`-webkit-user-modify: read-only`)
- ✅ Non-intrusive corner indicator instead of layout-shifting banner
- ✅ Visual reading layout with clean typography
- ⚠️ Edit protection has CSS limitations (see above)

**v1.0.0** (previous, native):
- ❌ Required native access (`requestNative: true`)
- ❌ Rejected by RemNote marketplace
- ✅ JavaScript event listener-based input blocking (more comprehensive)

## Install

### Manual zip installation
1. Download `PluginZip.zip` from this repository
2. RemNote → **Settings → Plugins → Build → Upload plugin**
3. Confirm under **Manage**: **Reading Mode (⌥⇧R)**

### Building from source
```bash
npm install
npm run build
# Creates PluginZip.zip in root directory
```

Repo (public for RemNote submission): https://github.com/Burbank/remnote-reading-mode

## Tips

- **Look for the indicator:** When the corner pill shows "📖 Reading Mode", you're protected
- **CSS protection works well:** In typical use, you won't accidentally edit notes
- **Test it yourself:** Try typing with reading mode on — most input is blocked
- **Still have copy/select:** You can select text and copy it normally
- **Toggle anytime:** ⌥⇧R is quick — turn it on when reading, off when editing
- **For hard locking:** If you need guaranteed input blocking, use RemNote's built-in Read-Only Mode on iOS

## Escape hatch

https://remnote.com/notes?disablePlugins

## Marketplace Status

This version is being submitted to the RemNote Plugin Marketplace for approval. The plugin meets the technical requirements (`requestNative: false`, sandboxed operation), and is pending review.

import { declareIndexPlugin, type ReactRNPlugin } from '@remnote/plugin-sdk';
import '../style.css';
import '../index.css';

const READING_MODE_ID = 'reading-mode';
const STORAGE_KEY = 'reading-mode-enabled';

// CSS to hide editing chrome and create a distraction-free reading layout
// Plus edit protection and a non-intrusive visual indicator
const readingModeCSS = `
  /* Reading mode active indicator - small corner pill */
  body::after {
    content: "📖 Reading Mode";
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 500;
    border-radius: 20px;
    z-index: 999999;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    letter-spacing: 0.5px;
    pointer-events: none;
    opacity: 0.9;
  }

  /* CSS-based edit protection for contenteditable elements in the main editor */
  .rn-editor__document [contenteditable="true"],
  .rn-editor [contenteditable="true"],
  .rem-text [contenteditable="true"],
  [data-editor] [contenteditable="true"] {
    -webkit-user-modify: read-only !important;
    user-select: text !important;
    cursor: default !important;
  }

  /* Make caret invisible to discourage editing */
  .rn-editor__document,
  .rn-editor,
  .rem-text {
    caret-color: transparent !important;
  }

  /* Keep text selectable for copying */
  .rn-editor__document *,
  .rn-editor *,
  .rem-text * {
    user-select: text !important;
    -webkit-user-select: text !important;
  }

  /* Ensure links remain clickable */
  a, .rem-link, [data-rem-link] {
    pointer-events: auto !important;
    cursor: pointer !important;
  }

  /* Ensure fold/expand controls remain clickable */
  .rem-bullet__icon,
  .tree-node__expand-button,
  [data-collapse-button] {
    pointer-events: auto !important;
    cursor: pointer !important;
  }

  /* Hide editing chrome */
  .rem-bullet__ring,
  .six-dot,
  .rn-add-rem-button,
  .rn-editor__rem__backlink-indicator,
  .rn-editor__rem__tags,
  .rn-help-button,
  .rem-bullet__placeholder {
    display: none !important;
  }

  /* Hide document properties */
  .rn-doc-header__properties {
    display: none !important;
  }

  /* Clean up spacing and typography for reading */
  .rem-text {
    font-size: 17px;
    line-height: 1.6;
  }

  .rem {
    margin: 8px 0;
  }

  /* Comfortable reading width */
  .rn-editor__document {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 60px;
  }

  /* Hide scrollbar for cleaner look */
  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
  }

  /* Hide drag handles */
  .tree-node__drag-handle {
    opacity: 0 !important;
    pointer-events: none !important;
  }

  /* Subtle caret */
  body {
    caret-color: rgba(0, 0, 0, 0.3);
  }

  /* Keep fold/expand arrows visible but subtle */
  .rem-bullet__icon {
    opacity: 0.5;
  }

  .rem-bullet__icon:hover {
    opacity: 1;
  }
`;

let isReadingModeEnabled = false;

async function enableReadingMode(plugin: ReactRNPlugin) {
  if (isReadingModeEnabled) return;
  
  try {
    // Apply CSS styling for distraction-free reading layout
    await plugin.app.registerCSS(READING_MODE_ID, readingModeCSS);
    
    isReadingModeEnabled = true;
    
    // Persist state
    await plugin.storage.setSynced(STORAGE_KEY, true);
    
    await plugin.app.toast('📖 Reading Mode enabled — edit protection via CSS (⌥⇧R to toggle)');
  } catch (error) {
    console.error('Reading Mode: Failed to enable:', error);
    await plugin.app.toast('Failed to enable Reading Mode');
  }
}

async function disableReadingMode(plugin: ReactRNPlugin) {
  if (!isReadingModeEnabled) return;
  
  try {
    // Remove CSS
    await plugin.app.registerCSS(READING_MODE_ID, '');
    
    isReadingModeEnabled = false;
    
    // Persist state
    await plugin.storage.setSynced(STORAGE_KEY, false);
    
    await plugin.app.toast('Reading Mode disabled');
  } catch (error) {
    console.error('Reading Mode: Failed to disable:', error);
    await plugin.app.toast('Failed to disable Reading Mode');
  }
}

async function toggleReadingMode(plugin: ReactRNPlugin) {
  if (isReadingModeEnabled) {
    await disableReadingMode(plugin);
  } else {
    await enableReadingMode(plugin);
  }
}

async function onActivate(plugin: ReactRNPlugin) {
  try {
    // Restore saved state
    const savedState = await plugin.storage.getSynced<boolean>(STORAGE_KEY);
    
    // Register toggle command with keyboard shortcut
    // Using Alt+Shift+R (Opt+Shift+R on Mac)
    // This avoids conflicts with browser shortcuts (Cmd+Shift+R = hard reload)
    await plugin.app.registerCommand({
      id: 'toggle-reading-mode',
      name: 'Toggle Reading Mode',
      description: 'Toggle distraction-free reading view',
      keyboardShortcut: 'alt+shift+r',
      action: async () => {
        await toggleReadingMode(plugin);
      },
    });
    
    // Restore state if it was enabled
    if (savedState === true) {
      await enableReadingMode(plugin);
    }
  } catch (error) {
    console.error('Reading Mode: Failed to activate plugin:', error);
  }
}

async function onDeactivate(plugin: ReactRNPlugin) {
  // Clean up when plugin is deactivated
  if (isReadingModeEnabled) {
    await disableReadingMode(plugin);
  }
}

declareIndexPlugin(onActivate, onDeactivate);

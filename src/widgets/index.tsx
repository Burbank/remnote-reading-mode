import { declareIndexPlugin, type ReactRNPlugin } from '@remnote/plugin-sdk';
import '../style.css';
import '../index.css';

const READING_MODE_ID = 'reading-mode';
const STORAGE_KEY = 'reading-mode-enabled';

// CSS to hide editing chrome and create a distraction-free reading layout
// Plus a visual indicator banner that reading mode is active
const readingModeCSS = `
  /* Reading mode active indicator banner */
  body::before {
    content: "📖 Reading Mode Active (⌥⇧R to exit)";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 500;
    z-index: 999999;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    letter-spacing: 0.5px;
  }

  /* Offset content to account for banner */
  body {
    padding-top: 40px !important;
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
    
    await plugin.app.toast('📖 Reading Mode enabled — visual layout only (⌥⇧R to toggle)');
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

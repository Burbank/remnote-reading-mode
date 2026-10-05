import { declareIndexPlugin, type ReactRNPlugin } from '@remnote/plugin-sdk';
import '../style.css';
import '../index.css';

const READING_MODE_ID = 'reading-mode';
const STORAGE_KEY = 'reading-mode-enabled';

// CSS to hide editing chrome and create a distraction-free reading layout
const readingModeCSS = `
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
let eventListenersAttached = false;

// Event handlers to prevent editing
const preventEditing = (e: Event) => {
  const target = e.target as HTMLElement;
  
  // Don't block typing in specific UI contexts
  // Allow: command palette, search, flashcard queue inputs, plugin UI
  if (target) {
    const element = target as HTMLElement;
    
    // Check if we're in the omnibar/command palette
    if (element.closest('.omnibar') || element.closest('[data-command-palette]') || element.closest('[role="combobox"]')) {
      return;
    }
    
    // Check if we're in a flashcard/practice queue input
    if (element.closest('.queue') || element.closest('[data-practice-queue]') || element.closest('.practice-area') || 
        element.closest('input[type="text"]') || element.closest('textarea')) {
      // Allow if it's explicitly an input field (flashcard answer, etc.)
      const tagName = element.tagName?.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return;
      }
    }
    
    // Check if we're in a modal, dialog, or popup
    if (element.closest('[role="dialog"]') || element.closest('.modal') || element.closest('.popup')) {
      return;
    }
  }
  
  // Allow navigation, copy, and plugin shortcuts
  if (e instanceof KeyboardEvent) {
    const key = e.key;
    const isMod = e.metaKey || e.ctrlKey;
    const isAlt = e.altKey;
    
    // Allow: navigation keys, copy, find, and our toggle shortcut (Alt+Shift+R)
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'PageUp', 'PageDown', 'Home', 'End', 'Escape', 'Tab'];
    const isNavigation = allowedKeys.includes(key);
    const isCopy = isMod && key.toLowerCase() === 'c';
    const isFind = isMod && key.toLowerCase() === 'f';
    const isToggle = isAlt && e.shiftKey && key.toLowerCase() === 'r';
    
    if (isNavigation || isCopy || isFind || isToggle) {
      return; // Allow these
    }
  }
  
  // Prevent all other input events in the editor
  e.preventDefault();
  e.stopPropagation();
};

const blurEditor = () => {
  try {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement.blur) {
      activeElement.blur();
    }
  } catch (error) {
    console.warn('Reading Mode: Could not blur editor:', error);
  }
};

const attachEventListeners = () => {
  if (eventListenersAttached) return;
  
  try {
    // Prevent text input and editing
    document.addEventListener('beforeinput', preventEditing, { capture: true });
    document.addEventListener('keydown', preventEditing, { capture: true });
    document.addEventListener('paste', preventEditing, { capture: true });
    document.addEventListener('drop', preventEditing, { capture: true });
    document.addEventListener('cut', preventEditing, { capture: true });
    
    eventListenersAttached = true;
  } catch (error) {
    console.warn('Reading Mode: Could not attach event listeners:', error);
  }
};

const removeEventListeners = () => {
  if (!eventListenersAttached) return;
  
  try {
    document.removeEventListener('beforeinput', preventEditing, { capture: true });
    document.removeEventListener('keydown', preventEditing, { capture: true });
    document.removeEventListener('paste', preventEditing, { capture: true });
    document.removeEventListener('drop', preventEditing, { capture: true });
    document.removeEventListener('cut', preventEditing, { capture: true });
    
    eventListenersAttached = false;
  } catch (error) {
    console.warn('Reading Mode: Could not remove event listeners:', error);
  }
};

async function enableReadingMode(plugin: ReactRNPlugin) {
  if (isReadingModeEnabled) return;
  
  try {
    // Apply CSS
    await plugin.app.registerCSS(READING_MODE_ID, readingModeCSS);
    
    // Attach event listeners to prevent editing
    attachEventListeners();
    
    // Blur the editor to prevent immediate typing
    blurEditor();
    
    isReadingModeEnabled = true;
    
    // Persist state
    await plugin.storage.setSynced(STORAGE_KEY, true);
    
    await plugin.app.toast('Reading Mode enabled (Alt/Opt+Shift+R to toggle)');
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
    
    // Remove event listeners
    removeEventListeners();
    
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

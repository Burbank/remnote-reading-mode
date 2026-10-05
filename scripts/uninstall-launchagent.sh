#!/bin/bash
set -e

# Reading Mode Plugin - LaunchAgent Uninstaller
# This script removes the LaunchAgent that auto-starts the dev server

PLIST_NAME="com.reading-mode.plugin"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"

if [ ! -f "$PLIST_PATH" ]; then
    echo "LaunchAgent not found at: $PLIST_PATH"
    echo "Nothing to uninstall."
    exit 0
fi

echo "Unloading LaunchAgent..."
launchctl unload "$PLIST_PATH" 2>/dev/null || true

echo "Removing LaunchAgent plist..."
rm "$PLIST_PATH"

echo ""
echo "✅ Reading Mode Plugin LaunchAgent uninstalled successfully!"
echo ""
echo "The dev server will no longer start automatically at login."
echo "You can still start it manually with: npm run dev"

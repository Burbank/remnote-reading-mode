#!/bin/bash
set -e

# Reading Mode Plugin - LaunchAgent Installer
# This script installs a macOS LaunchAgent to auto-start the dev server at login

PLUGIN_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PLIST_NAME="com.reading-mode.plugin"
PLIST_PATH="$HOME/Library/LaunchAgents/${PLIST_NAME}.plist"
LOG_DIR="$HOME/Library/Logs"
LOG_FILE="$LOG_DIR/reading-mode-plugin.log"

# Detect Node.js path
if ! NODE_PATH=$(which node 2>/dev/null); then
    echo "Error: Node.js not found in PATH"
    echo "Please install Node.js or ensure it's in your PATH"
    exit 1
fi

# Detect npm path
if ! NPM_PATH=$(which npm 2>/dev/null); then
    echo "Error: npm not found in PATH"
    echo "Please install npm or ensure it's in your PATH"
    exit 1
fi

echo "Found Node.js at: $NODE_PATH"
echo "Found npm at: $NPM_PATH"
echo "Plugin directory: $PLUGIN_DIR"
echo "Log file: $LOG_FILE"

# Create LaunchAgents directory if it doesn't exist
mkdir -p "$HOME/Library/LaunchAgents"

# Create the plist file
cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>${PLIST_NAME}</string>
    
    <key>ProgramArguments</key>
    <array>
        <string>${NPM_PATH}</string>
        <string>run</string>
        <string>dev</string>
    </array>
    
    <key>WorkingDirectory</key>
    <string>${PLUGIN_DIR}</string>
    
    <key>RunAtLoad</key>
    <true/>
    
    <key>KeepAlive</key>
    <true/>
    
    <key>StandardOutPath</key>
    <string>${LOG_FILE}</string>
    
    <key>StandardErrorPath</key>
    <string>${LOG_FILE}</string>
    
    <key>EnvironmentVariables</key>
    <dict>
        <key>PATH</key>
        <string>/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:$(dirname ${NODE_PATH})</string>
    </dict>
</dict>
</plist>
EOF

echo "Created LaunchAgent plist at: $PLIST_PATH"

# Load the LaunchAgent
launchctl unload "$PLIST_PATH" 2>/dev/null || true
launchctl load "$PLIST_PATH"

echo ""
echo "✅ Reading Mode Plugin LaunchAgent installed successfully!"
echo ""
echo "The dev server will now:"
echo "  - Start automatically at login"
echo "  - Restart if it crashes"
echo "  - Run on http://localhost:8080"
echo ""
echo "Logs are written to: $LOG_FILE"
echo ""
echo "To view logs:"
echo "  tail -f $LOG_FILE"
echo ""
echo "To uninstall:"
echo "  cd scripts && ./uninstall-launchagent.sh"

# Run Script On Startup Extension for VS Code

This extension automatically runs user-defined shell commands when VS Code starts and displays their output as toast notifications.

## Features

- Automatically runs configured shell commands on VS Code startup
- Shows command output as native VS Code notifications
- Supports both success and error notifications
- Works with PowerShell on Windows and bash/sh/zsh on Mac/Linux
- Truncates long outputs for better readability

## Installation

1. Download the VSIX file from the releases page
2. Open VS Code
3. Go to the Extensions view (Ctrl+Shift+X)
4. Click on the "..." menu at the top of the Extensions view
5. Select "Install from VSIX..."
6. Choose the downloaded VSIX file

## Configuration

Add your startup commands to your VS Code settings.json file:

```json
{
  "startupScripts.commands": [
    {
      "label": "Check Git Status",
      "command": "git status"
    },
    {
      "label": "Update NPM",
      "command": "npm outdated"
    }
  ]
}
```

### Configuration Options

Each command in the `startupScripts.commands` array should have:

- `label`: The title that will appear in the notification
- `command`: The shell command to execute

## Notes on Shell Behavior

### Windows (PowerShell)
- Commands run using PowerShell
- Use PowerShell syntax for commands
- Multi-line commands should use backticks (\`) for line continuation

### Mac/Linux (bash/sh/zsh)
- Commands run using the default shell
- Use standard shell syntax
- Multi-line commands should use backslash (\\) for line continuation

## Limitations

- Output is truncated to 200 characters for readability
- Commands run sequentially
- No interactive command support

## Disclaimer

⚠️ **USE AT YOUR OWN RISK** ⚠️

This extension executes shell commands on your system. By using this extension, you acknowledge and agree that:

1. You are solely responsible for the commands you configure and their consequences
2. The author(s) accept no liability for any damage, data loss, or other issues that may arise from using this extension
3. You should review and understand any command before adding it to your configuration
4. Running untrusted or malicious commands could harm your system

It is strongly recommended to:
- Only use commands you understand and trust
- Be cautious with commands that modify system files or settings
- Keep backups of important data
- Test commands in a terminal first before adding them to startup

## License

GPL-3.0
import * as vscode from 'vscode';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as os from 'os';

const execAsync = promisify(exec);

interface Command {
    label: string;
    command: string;
}

// Get the appropriate shell command for the platform
function getShellCommand(command: string): { cmd: string; options: { shell: string } } {
    if (os.platform() === 'win32') {
        return {
            cmd: command,
            options: { shell: 'powershell.exe' }
        };
    } else {
        return {
            cmd: command,
            options: { shell: '/bin/bash' }
        };
    }
}

export function activate(context: vscode.ExtensionContext) {
    // Get configuration
    const config = vscode.workspace.getConfiguration('startupScripts');
    const scripts: Command[] = config.get('commands') || [];

    // Execute each script
    scripts.forEach(async (script) => {
        try {
            const { cmd, options } = getShellCommand(script.command);
            const { stdout, stderr } = await execAsync(cmd, options);

            // Handle successful execution
            if (stdout) {
                // Trim and truncate output if needed
                let output = stdout.trim();
                if (output.length > 200) {
                    output = output.substring(0, 197) + '...';
                }
                vscode.window.showInformationMessage(`${script.label}: ${output}`);
            }

            // Handle stderr (if any)
            if (stderr) {
                let error = stderr.trim();
                if (error.length > 200) {
                    error = error.substring(0, 197) + '...';
                }
                vscode.window.showWarningMessage(`${script.label} (Warning): ${error}`);
            }
        } catch (error: any) {
            // Handle execution errors
            let errorMessage = error.message || 'Unknown error';
            if (errorMessage.length > 200) {
                errorMessage = errorMessage.substring(0, 197) + '...';
            }
            vscode.window.showWarningMessage(`${script.label} (Error): ${errorMessage}`);
        }
    });
}

export function deactivate() { }
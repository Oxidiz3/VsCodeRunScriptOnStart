import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be present', () => {
        assert.ok(vscode.extensions.getExtension('vscode-extensions.startup-scripts'));
    });

    test('Configuration schema should be registered', async () => {
        const config = vscode.workspace.getConfiguration('startupScripts');
        const commands = config.get('commands');
        assert.ok(Array.isArray(commands));
    });
});
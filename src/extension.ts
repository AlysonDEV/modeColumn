// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
	statusBarItem.command = 'modeColumn.toggle';
	context.subscriptions.push(statusBarItem);

	const toggleCmd = vscode.commands.registerCommand('modeColumn.toggle', async () => {
		await vscode.commands.executeCommand('editor.action.toggleColumnSelection');
		atualizarStatus();
	});

	context.subscriptions.push(toggleCmd);

	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration((e: vscode.ConfigurationChangeEvent) => {
			if (e.affectsConfiguration('editor.columnSelection')) {
				atualizarStatus();
			}
		})
	);

	atualizarStatus();
	statusBarItem.show();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "modeColumn" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('modeColumn.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from mode column!');
	});

	context.subscriptions.push(disposable);
}

function atualizarStatus(): void {
	const ativo = vscode.workspace.getConfiguration('editor').get<boolean>('columnSelection');

	if (ativo) {
		statusBarItem.text = '$(symbol-column)';
		statusBarItem.tooltip = 'Modo Coluna: ATIVO (Ctrl+V colará em coluna)';
	} else {
		statusBarItem.text = '$(symbol-column)';
		statusBarItem.tooltip = 'Modo Coluna: INATIVO (Clique para ativar)';
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }

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

	/**
	 * Créditos (Credits):
	 * A funcionalidade de colar (Column Paste Auto-filled) utiliza a lógica desenvolvida 
	 * originalmente por john-guo.
	 * Repositório original: https://github.com/john-guo/columnpaste
	 */
	const disposablePaste = vscode.commands.registerCommand('modeColumn.columnpasteautofilled', async () => {
		let editor = vscode.window.activeTextEditor;
		if (editor === undefined) {
			return;
		}

		let e = editor as vscode.TextEditor;
		let selection = e.selections;
		
		let str = await vscode.env.clipboard.readText();
		let lines = str.match(/^.*((\r\n|\n|\r)|$)/gm);
		if (lines === null) {
			return;
		}

		if (!selection[0].isSingleLine) {
			let length = selection[0].end.line - selection[0].start.line + 1;
			let col = e.document.lineAt(selection[0].start.line).range.end.character;
			for (let index = 0; index < length; ++index) {
				let line_index = index % lines.length;
				let element = lines[line_index];

				let line = selection[0].start.line + index;
				let sel = new vscode.Position(line, e.document.lineAt(line).range.end.character);

				let lineEnd = 0;
				if (sel.line < e.document.lineCount) {
					if (sel.line < e.document.lineCount - 1) {
						element = element.trimRight();
					}
					lineEnd = e.document.lineAt(sel.line).range.end.character;
				} else {
					sel = new vscode.Position(sel.line, 0);
				}
	
				if (index > 0) {
					element = " ".repeat(Math.max(0, col - lineEnd)) + element;
				}

				element = element.replace(/\$/g, "\\$");
				await e.insertSnippet(new vscode.SnippetString(element), sel, {undoStopAfter:false, undoStopBefore:false});
			}
			return;
		}
	
		for (let index = 0; index < lines.length; ++index) {
			let element = lines[index];

			let sel = selection[0].start;
			let col = sel.character;
			if (index>=selection.length) {
				sel = selection[selection.length-1].start;
				sel = new vscode.Position(sel.line + index - selection.length + 1, col);
			} else {
				sel = selection[index].start;
			}

			let lineEnd = 0;
			if (sel.line < e.document.lineCount) {
				if (sel.line < e.document.lineCount - 1) {
					element = element.trimRight();
				}
				lineEnd = e.document.lineAt(sel.line).range.end.character;
			} else {
				sel = new vscode.Position(sel.line, 0);
			}

			if (index > 0) {
				element = " ".repeat(Math.max(0, col - lineEnd)) + element;
			}

			element = element.replace(/\$/g, "\\$");
			await e.insertSnippet(new vscode.SnippetString(element), sel, {undoStopAfter:false, undoStopBefore:false});
		}
	});

	context.subscriptions.push(disposablePaste);
}

function atualizarStatus(): void {
	const ativo = vscode.workspace.getConfiguration('editor').get<boolean>('columnSelection');

	if (ativo) {
		statusBarItem.text = '$(list-selection) Modo Coluna: ON';
		statusBarItem.tooltip = 'Modo Coluna: ATIVO (Ctrl+V colará em coluna)';
	} else {
		statusBarItem.text = '$(list-selection) Modo Coluna: OFF';
		statusBarItem.tooltip = 'Modo Coluna: INATIVO (Clique para ativar)';
	}
}

// This method is called when your extension is deactivated
export function deactivate() { }

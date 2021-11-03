// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "open-css-module" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('open-css-module.openCssModule', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
        const cssModulePath = getCssModulePath();
		if(cssModulePath === null) return;
        vscode.window.showInformationMessage(`opening... ${cssModulePath}`);
        openFileInVscode(cssModulePath)
	});

	let disposableBeside = vscode.commands.registerCommand('open-css-module.openCssModuleBeside', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
        const cssModulePath = getCssModulePath();
		if(cssModulePath === null) return;
        vscode.window.showInformationMessage(`opening... ${cssModulePath}`);
        openFileInVscodeBeside(cssModulePath)
	});

	context.subscriptions.push(disposable);
}

function openFileInVscode(filePath: string) {
    const relativePath = '../' + filePath
    const currentlyOpenTabfileUri = getActiveEditor()?.document.uri;
	if(currentlyOpenTabfileUri === undefined) return;
    const openPath = vscode.Uri.joinPath(currentlyOpenTabfileUri,relativePath)
    vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc);
    });
}

function openFileInVscodeBeside(filePath: string) {
    const relativePath = '../' + filePath
    const currentlyOpenTabfileUri = getActiveEditor()?.document.uri;
	if(currentlyOpenTabfileUri === undefined) return;
    const openPath = vscode.Uri.joinPath(currentlyOpenTabfileUri,relativePath)
    vscode.workspace.openTextDocument(openPath).then(doc => {
        vscode.window.showTextDocument(doc,{viewColumn: vscode.ViewColumn.Beside});
    });
}


function getActiveEditor(): vscode.TextEditor | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage("no active windows");
        return null;
    }
    return editor;
}


function getCssModulePath(): string | null {
	// アクティブエディタの取得 =========================================================
	const editor = getActiveEditor();
	if (editor === null) return null;

	// エディタ内の情報取得 ============================================================
    const doc = editor.document;
    const text = doc.getText();
    const pattern = 'import +styles +from +[\'\"](.+\.module\.(css|scss))[\'\"]';
    const res = text.match(pattern);
    if (res === null) {
        vscode.window.showInformationMessage('css module import statement not found.');
        return null;
    }
    const importStatement = res[0];
    vscode.window.showInformationMessage(`found: ${importStatement}`);
    return res[1]
}
// this method is called when your extension is deactivated
export function deactivate() {}

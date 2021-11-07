// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
// import * as fs from 'fs'

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json

    // import sentence and css module file exist
    // import sentence exists but css module file does not exist
    // import sentence and css module file do not exist
    let disposable = vscode.commands.registerCommand('open-css-module.openCssModule', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const beside = false;
        handleCssModuleOpen(beside);
    });

    let disposableBeside = vscode.commands.registerCommand('open-css-module.openCssModuleBeside', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        const beside = true;
        handleCssModuleOpen(beside);
    });
    context.subscriptions.push(disposable);
}


function handleCssModuleOpen(beside: boolean){
    const config = vscode.workspace.getConfiguration('openCssModule')
    var cssModulePath = getCssModulePath();
    // const importSentenceExists = cssModulePath?true:false;
    const cssModuleFileExists = checkCssModuleFileExists(cssModulePath);
    if (cssModulePath && !cssModuleFileExists){
        createAndOpenCssModuleWithImport(cssModulePath, beside)
    }else if(!cssModulePath && !cssModuleFileExists){
        createAndOpenCssModuleWithoutImport(config.stylesDirectory, beside)
    }else if(cssModulePath) openFileInVscode(cssModulePath,beside);
}


function createAndOpenCssModuleWithoutImport(stylesDirectory: string, beside: boolean){
    const path = require('path');
    const relativePath = path.join(stylesDirectory,getModuleName())+'.module.css'
    const cssModuleFilePath = relativePath2AbsolutePath(relativePath);
    insertToTop(generateImportSentence(relativePath))
    createAndOpenFile(cssModuleFilePath, beside);
    return cssModuleFilePath
}


function createAndOpenCssModuleWithImport(importFilePath:string, beside: boolean){
    vscode.window.showInformationMessage(`creating... ${importFilePath}`);
    return createAndOpenFile(importFilePath, beside);
}


function createAndOpenFile(filePath: string, beside: boolean){
    const wsedit = new vscode.WorkspaceEdit()
    const fileUri = vscode.Uri.file(filePath)
    wsedit.createFile(fileUri, { ignoreIfExists: false });
    vscode.workspace.applyEdit(wsedit).then(val =>{
        openFileInVscode(filePath,beside)
    });
    return filePath;
}


function openFileInVscode(filePath: string, beside: boolean) {
    // open css module file and return if it did
    
    const openUri = vscode.Uri.file(filePath)
    vscode.window.showInformationMessage(`opening... ${filePath}`);

    if (beside){
        vscode.workspace.openTextDocument(openUri).then(doc => {
            vscode.window.showTextDocument(doc,{viewColumn: vscode.ViewColumn.Beside});
        });
    }
        vscode.workspace.openTextDocument(openUri).then(doc => {
            vscode.window.showTextDocument(doc);
    });
    return true
}


function relativePath2AbsolutePath(filePath: string): string{
    const path = require('path');
    const relativePath = '../' + filePath
    const currentlyOpenTabfilePath = getActiveEditor()?.document.uri?.fsPath;
    return path.join(currentlyOpenTabfilePath,relativePath)
}


function checkCssModuleFileExists(filePath: string|null){
    if(filePath === null) return false;
    const fs = require('fs');
    return fs.existsSync(filePath);
}


function insertToTop(sentence: string){
    const activeTextEditor = getActiveEditor()
    let f = function(editBuilder: vscode.TextEditorEdit): void{
        editBuilder.insert(new vscode.Position(0,0), sentence);
    }
    vscode.window.showInformationMessage(`insert ${sentence} at (0,0)`);
    activeTextEditor?.edit(f)
}


function generateImportSentence(importPath: string) :string{
    return `import styles from "${importPath.replace(/\\/g, '/')}"\n`
}


function getActiveEditor(): vscode.TextEditor | null {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage("no active windows");
        return null;
    }
    return editor;
}


function getModuleName(): string|null {
    // アクティブエディタの取得 =========================================================
    const editor = getActiveEditor();
    if (editor === null) return null;

    // エディタ内の情報取得 ============================================================
    const doc = editor.document;
    const filePath = doc.fileName;
    const path = require('path');
    // const fileNameArr = filePath.split('/')
    // const fileName = fileNameArr[fileNameArr.length - 1]
    const moduleName = path.parse(filePath).name


    return moduleName

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
    return relativePath2AbsolutePath(res[1])
}
// this method is called when your extension is deactivated
export function deactivate() {}

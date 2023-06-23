import { existsSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { getActiveEditor } from "./extension";
import { generateImportSentence, getModuleName, insertToTop } from "./text";


export function createAndOpenCssModuleWithoutImport(stylesDirectory: string, beside: boolean) {
	let relativePath = path.join(stylesDirectory, getModuleName()?? "Unimplemented") + ".module.css";
	const cssModuleFilePath = relativePath2AbsolutePath(relativePath);

	if (stylesDirectory == "./" || stylesDirectory == ".") {
		relativePath = "./" + relativePath;
	}

	insertToTop(generateImportSentence(relativePath));
	createAndOpenFile(cssModuleFilePath, beside);
	return cssModuleFilePath;
}


export function createAndOpenCssModuleWithImport(importFilePath: string, beside: boolean) {
	vscode.window.showInformationMessage(`Creating... ${importFilePath}`);
	return createAndOpenFile(importFilePath, beside);
}

export function createAndOpenFile(filePath: string, beside: boolean) {
	const wsedit = new vscode.WorkspaceEdit();
	const fileUri = vscode.Uri.file(filePath);
	wsedit.createFile(fileUri, { ignoreIfExists: false });
	vscode.workspace.applyEdit(wsedit).then(val => {
		openFileInVscode(filePath, beside);
	});
	return filePath;
}


export function openFileInVscode(filePath: string, beside: boolean) {
	// open css module file and return if it did

	const openUri = vscode.Uri.file(filePath);
	vscode.window.showInformationMessage(`Opening... ${filePath}`);

	if (beside) {
		vscode.workspace.openTextDocument(openUri).then(doc => {
			vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.Beside });
		});
	}
	vscode.workspace.openTextDocument(openUri).then(doc => {
		vscode.window.showTextDocument(doc);
	});
	return true;
}

export function relativePath2AbsolutePath(filePath: string): string {
	const relativePath = "../" + filePath;
	const currentlyOpenTabfilePath = getActiveEditor()?.document.uri?.fsPath;
	return path.join(currentlyOpenTabfilePath?? ".", relativePath);
}

export function checkCssModuleFileExists(filePath: string | null) {
	if (filePath === null) return false;
	return existsSync(filePath);
}

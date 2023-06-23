import { existsSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { generateImportSentence, getModuleName, getStyleModulePath, insertToTop, relativePathToAbsolutePath } from "./text";

export type StyleLang = "css" | "scss" | "sass" | "less";
export function getActiveEditor(): vscode.TextEditor | null {
	const editor = vscode.window.activeTextEditor;
	if (!editor) {
		vscode.window.showInformationMessage("no active windows");
		return null;
	}
	return editor;
}
export function openFileInVscode(filePath: string) {
	// open css module file and return if it did

	const openUri = vscode.Uri.file(filePath);
	vscode.window.showInformationMessage(`Opening... ${filePath}`);

	vscode.workspace.openTextDocument(openUri).then(doc => {
		vscode.window.showTextDocument(doc);
	});
	return true;
}

function createAndOpenFile(filePath: string) {
	const wsedit = new vscode.WorkspaceEdit();
	const fileUri = vscode.Uri.file(filePath);
	wsedit.createFile(fileUri, { ignoreIfExists: true });
	vscode.workspace.applyEdit(wsedit).then(() => {
		openFileInVscode(filePath);
	});
	return filePath;
}

export function createAndOpenStyleModule(lang: StyleLang, stylesDirectory: string) {
	let relativePath = path.join(stylesDirectory, getModuleName()) + ".module." + lang;
	const styleModuleFilePath = relativePathToAbsolutePath(relativePath);

	if (stylesDirectory == "./" || stylesDirectory == ".") {
		relativePath = "./" + relativePath;
	}

	const fileAlreadyExists = checkStyleModuleExists(styleModuleFilePath);
	if (getActiveEditor() && !getStyleModulePath()) {
		insertToTop(generateImportSentence(relativePath));
	}

	if (!fileAlreadyExists) {
		createAndOpenFile(styleModuleFilePath);
	}

	return styleModuleFilePath;
}


export function checkStyleModuleExists(filePath: string | null) {
	if (filePath === null) return false;
	return existsSync(filePath);
}

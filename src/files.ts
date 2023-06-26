import { existsSync } from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { generateImportSentence, getModuleName, getStyleModulePath, insertToTop, relativePathToAbsolutePath } from "./text";



export const config = vscode.workspace.getConfiguration("auto-mod");

export type StyleLang = ".css" | ".scss" | ".sass" | ".less";
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

	vscode.workspace.openTextDocument(openUri).then(doc => {
		vscode.window.showTextDocument(doc);
	});
	return true;
}

async function createFile(filePath: string) {
	const wsedit = new vscode.WorkspaceEdit();
	const fileUri = vscode.Uri.file(filePath);
	wsedit.createFile(fileUri, { ignoreIfExists: true });

	await vscode.workspace.applyEdit(wsedit);
	vscode.window.showInformationMessage(`auto-modCreated new style module at ${filePath}`);
	return filePath;
}


export function createAndOpenStyleModule(lang: StyleLang, stylesDirectory: string) {
	let relativePath = path.join(stylesDirectory, getModuleName()) + ".module" + lang;
	const styleModuleFilePath = relativePathToAbsolutePath(relativePath);

	if (stylesDirectory == "./" || stylesDirectory == ".") {
		relativePath = "./" + relativePath;
	}

	const fileAlreadyExists = existsSync(styleModuleFilePath);

	if (!fileAlreadyExists) {
		createFile(styleModuleFilePath).then(() => {
			if (config.get("switchActiveWindow") === true) {
				openFileInVscode(styleModuleFilePath);
			}
		});	
		
	} else {
		vscode.window.showInformationMessage(`auto-mod: File already exists at: ${styleModuleFilePath}`);
		if (config.get("switchActiveWindow") === true) {
			openFileInVscode(styleModuleFilePath);
		}
	}

	if (getActiveEditor() && !getStyleModulePath()) {
		insertToTop(generateImportSentence(relativePath));
	}

	return styleModuleFilePath;
}

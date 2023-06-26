import * as path from "path";
import { config, getActiveEditor } from "./files";
import * as vscode from "vscode";

export function relativePathToAbsolutePath(filePath: string): string {
	const relativePath = "../" + filePath;
	const currentlyOpenTabfilePath = getActiveEditor()?.document.uri?.fsPath;
	
	console.log(path.join(currentlyOpenTabfilePath ?? ".", relativePath));
	
	return path.join(currentlyOpenTabfilePath ?? ".", relativePath);
}

export function insertToTop(sentence: string) {
	const activeTextEditor = getActiveEditor();
	const f = function (editBuilder: vscode.TextEditorEdit): void {
		editBuilder.insert(new vscode.Position(0, 0), sentence);
	};

	if (activeTextEditor)
		vscode.window.showInformationMessage(`Added ${config.get("language")} import to ${path.parse(activeTextEditor.document.fileName).base}.`);
	activeTextEditor?.edit(f);
}


export function generateImportSentence(importPath: string): string {
	return `import styles from "${importPath.replace(/\\/g, "/")}"\n`;
}

export function getModuleName(): string {

	const editor = getActiveEditor();
	if (editor === null) {
		throw new Error("There must be an active editor to create a style module.");
	}

	const doc = editor.document;
	const filePath = doc.fileName;

	const moduleName = path.parse(filePath).name;

	return moduleName;
}


export function getStyleModulePath(): string | null {

	const editor = getActiveEditor();
	if (editor === null) return null;

	const doc = editor.document;
	const text = doc.getText();
	const pattern = "import +styles +from +['\"](.+.module.(css|scss|sass|less))['\"]";
	const res = text.match(pattern);
	
	if (res === null) {
		return null;
	}

	return relativePathToAbsolutePath(res[1]);
}


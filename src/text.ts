import * as path from "path";
import { getActiveEditor } from "./extension";
import * as vscode from "vscode";
import { relativePath2AbsolutePath } from "./files";
export function insertToTop(sentence: string) {
	const activeTextEditor = getActiveEditor();
	const f = function (editBuilder: vscode.TextEditorEdit): void {
		editBuilder.insert(new vscode.Position(0, 0), sentence);
	};
	vscode.window.showInformationMessage(`insert: "${sentence}" at (0,0)`);
	activeTextEditor?.edit(f);
}


export function generateImportSentence(importPath: string): string {
	return `import styles from "${importPath.replace(/\\/g, "/")}"\n`;
}

export function getModuleName(): string | null {
	// アクティブエディタの取得 =========================================================
	const editor = getActiveEditor();
	if (editor === null) return null;

	// エディタ内の情報取得 ============================================================
	const doc = editor.document;
	const filePath = doc.fileName;
	// const fileNameArr = filePath.split('/')
	// const fileName = fileNameArr[fileNameArr.length - 1]
	const moduleName = path.parse(filePath).name;


	return moduleName;
}


export function getCssModulePath(): string | null {
	// アクティブエディタの取得 =========================================================
	const editor = getActiveEditor();
	if (editor === null) return null;

	// エディタ内の情報取得 ============================================================
	const doc = editor.document;
	const text = doc.getText();
	const pattern = "import +styles +from +['\"](.+\.module\.(css|scss))['\"]";
	const res = text.match(pattern);
	
	if (res === null) {
		vscode.window.showInformationMessage("Module import statement not found.");
		return null;
	}
	const importStatement = res[0];
	vscode.window.showInformationMessage(`Found: ${importStatement}`);
	return relativePath2AbsolutePath(res[1]);
}
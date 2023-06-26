import * as vscode from "vscode";
import { StyleLang, config, createAndOpenStyleModule } from "./files";



export function createStyleModuleAt() {
	vscode.window.showInformationMessage("Unimplemented");
}

export function createStyleModuleHere() {
	const lang: StyleLang | undefined = config.get("language");

	if (!lang) {
		throw new Error("Configuration error - language option invalid.");
	}

	createAndOpenStyleModule(lang, ".");
}


export function changeModuleType() {
	vscode.window.showInformationMessage("Unimplemented");
}


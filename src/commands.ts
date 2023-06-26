import * as vscode from "vscode";
import { StyleLang, config, createAndOpenStyleModule } from "./files";



export function createStyleModuleInStylesFolder() {
	const lang: StyleLang | undefined = config.get("language");
	if (!lang) {
		throw new Error("auto-mod: Configuration error - language option invalid.");
	}
	const stylesDirectory = config.get("stylesDirectory");
	createAndOpenStyleModule(lang, stylesDirectory as string);
}

export function createStyleModuleHere() {
	const lang: StyleLang | undefined = config.get("language");
	
	if (!lang) {
		throw new Error("auto-mod: Configuration error - language option invalid.");
	}

	createAndOpenStyleModule(lang, ".");
}


export function changeModuleLanguage() {
	vscode.window.showInformationMessage("Unimplemented");
}


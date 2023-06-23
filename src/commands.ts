import * as vscode from "vscode";
import { createAndOpenStyleModule } from "./files";


export function createStyleModuleAt() {
	vscode.window.showInformationMessage("Unimplemented");
}

export function createStyleModuleHere() {
	createAndOpenStyleModule("css", ".");
}


export function changeModuleType() {
	vscode.window.showInformationMessage("Unimplemented");
}


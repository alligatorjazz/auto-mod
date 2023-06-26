import * as vscode from "vscode";
import { createStyleModuleHere, createStyleModuleInStylesFolder } from "./commands";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	const commands: vscode.Disposable[] = [
		vscode.commands.registerCommand("auto-mod.createStyleModuleHere", () => {
			createStyleModuleHere();
		}),
		vscode.commands.registerCommand("auto-mod.createStyleModuleInStylesFolder", () => {
			createStyleModuleInStylesFolder();
		}),
	];
	
	commands.map(command => { context.subscriptions.push(command); });
}


export function deactivate() {
	console.log("unimplemented");
}

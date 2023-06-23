// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { createStyleModuleHere } from "./commands";
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
	// const disposable = vscode.commands.registerCommand("open-css-module.openStyleModule", () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	const beside = false;
	// 	handleStyleModuleOpen(beside);
	// });

	// const disposableBeside = vscode.commands.registerCommand("open-css-module.openStyleModuleBeside", () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	const beside = true;
	// 	handleStyleModuleOpen(beside);
	// });

	const commands: vscode.Disposable[] = [
		vscode.commands.registerCommand("auto-mod.createStyleModuleHere", () => {
			createStyleModuleHere();
		})
	];
	commands.map(command => { context.subscriptions.push(command); });
}

// this method is called when your extension is deactivated
export function deactivate() {
	console.log("unimplemented");
}

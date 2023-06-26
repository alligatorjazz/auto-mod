import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as autoMod from "../../extension";
import * as fs from "fs";

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	const langs = [".css", ".scss", ".sass", "less"];
	// wipes temp folder
	fs.rmSync("./*", { force: true, recursive: true });

	test("Creating style module here", () => {

	});
});

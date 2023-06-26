import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as autoMod from "../../extension";
import * as fs from "fs";

suite("Extension Test Suite", () => {
	vscode.window.showInformationMessage("Start all tests.");

	const styleLangs = [".css", ".scss", ".sass", ".less"];
	const tsxContent = "export function Test() {\nreturn <div></div>\n}";

	const wipeTestFolder = () => fs.rmSync("./*", { recursive: true });
	const createTsxFile = () => fs.writeFileSync("./Test.tsx", tsxContent, { flag: "w" });
	
	console.log("Working directory: ", process.cwd());
	console.log(fs.readdirSync("."));

	test("Creating style module here", async () => {
		
		const results = await Promise.all(styleLangs.map(async lang => {
			wipeTestFolder();
			createTsxFile();

			
			await vscode.commands.executeCommand("auto-mod.createStyleModuleHere");
			return fs.existsSync(`./Test.module${lang}`);
		}));

		if (!results.includes(false)) {
			return true;
		}

		return false;
	});
});

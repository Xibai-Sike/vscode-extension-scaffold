// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ProjectProvider, projectProvider } from './webview/ProjectProvider';
import * as show from './commands/show';
import { dswTreeDataProvider } from './explorer/dswTreeDataProvider';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(
		projectProvider,
		vscode.window.createTreeView("dswExplorer", { treeDataProvider: dswTreeDataProvider, showCollapseAll: true }),
		vscode.window.createTreeView("jobExplorer", { treeDataProvider: dswTreeDataProvider, showCollapseAll: true }),
		vscode.commands.registerCommand("dsw-extension.addProject", (node: any) => show.openProject(node)),
	);
	context.subscriptions.push(ProjectProvider.register(context));
}

// this method is called when your extension is deactivated
export function deactivate() { }

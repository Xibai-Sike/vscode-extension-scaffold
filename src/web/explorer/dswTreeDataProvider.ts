import * as vscode from "vscode";
import {TreeItemCollapsibleState} from 'vscode';

export class DSWTreeDataProvider implements vscode.TreeDataProvider<ExperimentNode> {
    onDidChangeTreeData?: vscode.Event<void | ExperimentNode | null | undefined> | undefined;
    getTreeItem(element: ExperimentNode): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return element;
    }
    getChildren(element?: ExperimentNode): vscode.ProviderResult<ExperimentNode[]> {
        return [
            new ExperimentNode('aaa', TreeItemCollapsibleState.None)
        ];
    }
}



export class ExperimentNode extends vscode.TreeItem {

	constructor(
		public readonly label: string,
		public readonly collapsibleState: TreeItemCollapsibleState,
		public readonly command?: vscode.Command
	) {
		super(label, collapsibleState);

	}
}


export const dswTreeDataProvider = new DSWTreeDataProvider();
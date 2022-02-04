// Copyright (c) jdneo. All rights reserved.
// Licensed under the MIT license.

import { commands, ViewColumn } from "vscode";
import * as vscode from 'vscode';
import { ILeetCodeWebviewOption, BaseWebview } from "./BaseWebview";

export class ProjectProvider extends BaseWebview implements vscode.CustomTextEditorProvider {

  protected static readonly viewType: string = "project.exp";
  private sideMode: boolean = false;
  private webContent: string = '';



  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new ProjectProvider();
    const providerRegistration = vscode.window.registerCustomEditorProvider(ProjectProvider.viewType, provider);
    return providerRegistration;
  }


  constructor() {
    super();
    this.loadDynamicContent();
  }

  resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, token: vscode.CancellationToken): void | Thenable<void> {
    this.panel = webviewPanel;
    this.panel.webview.options = {
      enableScripts: true,
    };
    this.showWebviewInternal();
  }

  public isSideMode(): boolean {
    return this.sideMode;
  }

  public async loadDynamicContent() {
    await fetch('https://marketplace.visualstudio.com');
  }

  public show(isSideMode: boolean = false): void {
    this.sideMode = isSideMode;
    this.showWebviewInternal();
    // Comment out this operation since it sometimes may cause the webview become empty.
    // Waiting for the progress of the VS Code side issue: https://github.com/microsoft/vscode/issues/3742
    // if (this.sideMode) {
    //     this.hideSideBar(); // For better view area
    // }
  }

  protected getWebviewOption(): ILeetCodeWebviewOption {
    if (!this.sideMode) {
      return {
        title: `aa`,
        viewColumn: ViewColumn.One,
      };
    } else {
      return {
        title: "Description",
        viewColumn: ViewColumn.Two,
        preserveFocus: true,
      };
    }
  }

  protected getWebviewContent(): string {
    return `<html>
    <div id="ice-container"></div>
    <script src="/mock/js/index.js"></script></body>
    </html>`
  }

  protected onDidDisposeWebview(): void {
    super.onDidDisposeWebview();
    this.sideMode = false;
  }

  protected async onDidReceiveMessage(message: IWebViewMessage): Promise<void> {
    switch (message.command) {
      case "ShowProblem": {
        await commands.executeCommand("leetcode.showProblem");
        break;
      }
    }
  }

  // private async hideSideBar(): Promise<void> {
  //     await commands.executeCommand("workbench.action.focusSideBar");
  //     await commands.executeCommand("workbench.action.toggleSidebarVisibility");
  // }
}

interface IWebViewMessage {
  command: string;
}

export const projectProvider: ProjectProvider = new ProjectProvider();

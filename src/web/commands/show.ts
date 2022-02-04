import { projectProvider } from "../webview/ProjectProvider";

export async function openProject(node?: any): Promise<void> {
    await projectProvider.show();
}


async function openProjectInternal() {

}
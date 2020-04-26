import * as path from "path";
import * as fs from "fs";
import * as vscode from "vscode";
import { CreateFile, ArgsPrompt, FromPrompt } from "../global";
import { fixExtension } from "./fmt";
import { Properties } from "./constants";

export const getConfigProperty = <T extends string>(property: Properties): T =>
  vscode.workspace.getConfiguration("superfile")[property] as T;

export const createFile = async (args: CreateFile): Promise<string | null> => {
  try {
    const file = path.join(args.path, fixExtension(args.name, args.extension));
    vscode.window.showInformationMessage(`Create file ${file}`);
    fs.writeFileSync(file, "");
    return file;
  } catch (error) {
    return null;
  }
};

export const getContextPath = async (
  ctx: vscode.ExtensionContext,
  args: ArgsPrompt
): Promise<string> => {
  if (args) {
    let contextRootPath = args.fsPath || ""; // ||
    if (contextRootPath === "") {
      const tmpdir =
        (await vscode.window.showInputBox({
          prompt: "Directory",
          ignoreFocusOut: true,
        })) || "";
      return path.join(ctx.asAbsolutePath("."), tmpdir);
    }
    return contextRootPath;
  }
  const tmpdir =
    (await vscode.window.showInputBox({
      prompt: "Directory",
      ignoreFocusOut: true,
    })) || ".";
  return path.join(ctx.asAbsolutePath("."), tmpdir);
};

export const getFromPrompt = async ({
  value = "",
  title,
}: FromPrompt): Promise<string> =>
  (await vscode.window.showInputBox({ prompt: title, ignoreFocusOut: true })) ||
  value;

export const openFile = async (file: string): Promise<void> => {
  const uri = vscode.Uri.file(file);
  await vscode.commands.executeCommand("vscode.open", uri);
};

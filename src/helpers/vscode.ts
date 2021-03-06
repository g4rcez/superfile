import * as fs from "fs";
import * as path from "path";
import * as vscode from "vscode";
import { ArgsPrompt, CreateFile, FromPrompt } from "../global";
import { Properties } from "./constants";
import { fixExtension } from "./fmt";

export const getConfigProperty = <T extends string>(property: Properties): T =>
  vscode.workspace.getConfiguration("superfile")[property] as T;

export const createFile = async (args: CreateFile): Promise<string | null> => {
  try {
    const file = path.join(args.path, fixExtension(args.name, args.extension));
    if (fs.existsSync(file)) {
      vscode.window.showErrorMessage(
        `File ${path.basename(file)} already exist. Full path: ${file}`
      );
      return null;
    }
    fs.writeFileSync(file, "");
    vscode.window.showInformationMessage(`Create file ${file}`);
    return file;
  } catch (error) {
    return null;
  }
};

const extractBasename = async (file: string): Promise<string> => {
  const stat = await fs.promises.lstat(file);
  if (stat.isFile()) {
    return path.dirname(file);
  }
  return file;
};

export const getContextPath = async (
  ctx: vscode.ExtensionContext,
  args: ArgsPrompt
): Promise<string> => {
  const absolutePath = ctx.asAbsolutePath(".");
  if (args) {
    let contextRootPath = await extractBasename(args.fsPath || "");
    console.log("PATH", contextRootPath);
    if (contextRootPath === "") {
      const tmpdir =
        (await vscode.window.showInputBox({
          prompt: "Directory",
          ignoreFocusOut: true,
        })) || "";
      return path.join(absolutePath, tmpdir);
    }
    return contextRootPath;
  }
  const tmpdir =
    (await vscode.window.showInputBox({
      prompt: "Directory",
      ignoreFocusOut: true,
    })) || ".";
  return path.join(absolutePath, await extractBasename(tmpdir));
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

export const writeTemplate = (filename: string, code: string) => {
  if (code !== "") {
    vscode.workspace.openTextDocument(vscode.Uri.parse(filename)).then(
      (textDocument: vscode.TextDocument) => {
        vscode.window
          .showTextDocument(textDocument, 1, false)
          .then((textEditor) => {
            textEditor.edit((edit) => {
              edit.insert(new vscode.Position(0, 0), code);
            });
          });
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
};

export const formatDocument = () =>
  vscode.commands.executeCommand("editor.action.formatDocument");

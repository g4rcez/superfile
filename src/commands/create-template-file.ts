import * as vscode from "vscode";
import { ArgsPrompt, FunctionTemplate } from "../global";
import { Properties } from "../helpers/constants";
import {
  createFile,
  getConfigProperty,
  getContextPath,
  getFromPrompt,
  openFile,
  writeTemplate,
  formatDocument,
} from "../helpers/vscode";

type CreateFileTemplate = {
  propertyConfig: Properties;
  ext: string;
  promptTitle: string;
  template?: FunctionTemplate;
};
export const createTemplateFile =
  (ctx: vscode.ExtensionContext, template: CreateFileTemplate) =>
  async (args: ArgsPrompt) => {
    const root = await getContextPath(ctx, args);
    const name = await getFromPrompt({ title: "Filename", value: "" });
    if (name === "") {
      return;
    }
    let extension = getConfigProperty<string>(template.propertyConfig);
    if (extension === "") {
      extension = await getFromPrompt({
        title: template.promptTitle,
        value: template.ext,
      });
    }
    const newFile = await createFile({
      extension,
      name,
      path: root,
    });
    if (newFile !== null) {
      await openFile(newFile);
      if (template.template) {
        await writeTemplate(
          newFile,
          template.template({ extension, filename: name })
        );
        await formatDocument();
        await formatDocument();
        const editor = vscode.window.activeTextEditor;
        if (editor && editor.selection.isEmpty) {
          const position = editor.selection.active;
          position.with(0, 0);
        }
      }
    }
  };

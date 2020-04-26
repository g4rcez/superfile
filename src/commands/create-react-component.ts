import * as vscode from "vscode";
import { ArgsPrompt } from "../global";
import {
  createFile,
  getContextPath,
  getFromPrompt,
  getConfigProperty,
  openFile,
} from "../helpers/vscode";
import { DEFAULT_REACT_COMPONENT_EXTENSION, Properties } from "../helpers/constants";

export const createReactFile = (ctx: vscode.ExtensionContext) => async (
  args: ArgsPrompt
) => {
  const root = await getContextPath(ctx, args);
  const name = await getFromPrompt({ title: "Filename", value: "" });
  let extension = getConfigProperty<string>(Properties.ReactComponent);
  if (extension === "") {
    extension = await getFromPrompt({
      title: "Extension name",
      value: DEFAULT_REACT_COMPONENT_EXTENSION,
    });
  }
  const newFile = await createFile({
    extension,
    name,
    path: root,
  });
  if (newFile !== null) {
    openFile(newFile);
  }
};

import * as vscode from "vscode";
import { createTemplateFile } from "./commands/create-template-file";
import { SubscribeCommands } from "./global";
import {
  getCommandName,
  Properties,
  SPEC_EXTENSION,
  REACT_COMPONENT_EXTENSION,
  JSON_EXTENSION,
} from "./helpers/constants";
import { ReactComponentTypescriptTemplate } from "./templates/react-component";

export function activate(context: vscode.ExtensionContext) {
  const subs: SubscribeCommands = [
    {
      name: "reactComponent",
      cmd: createTemplateFile(context, {
        defaultValue: "component",
        ext: REACT_COMPONENT_EXTENSION,
        template: ReactComponentTypescriptTemplate,
        promptTitle: "React component filename",
        propertyConfig: Properties.ReactComponent,
      }),
    },
    {
      name: "typescript",
      cmd: createTemplateFile(context, {
        defaultValue: "index",
        ext: "ts",
        promptTitle: "Typescript filename",
        propertyConfig: Properties.Typescript,
      }),
    },
    {
      name: "javascript",
      cmd: createTemplateFile(context, {
        defaultValue: "index",
        ext: "js",
        promptTitle: "Javascript filename",
        propertyConfig: Properties.Javascript,
      }),
    },
    {
      name: "json",
      cmd: createTemplateFile(context, {
        defaultValue: "data",
        ext: JSON_EXTENSION,
        promptTitle: "JSON filename",
        propertyConfig: Properties.Json,
      }),
    },
    {
      name: "spec",
      cmd: createTemplateFile(context, {
        defaultValue: "test",
        ext: SPEC_EXTENSION,
        promptTitle: "Test filename",
        propertyConfig: Properties.Spec,
      }),
    },
  ];
  subs.map(({ cmd, name }) =>
    context.subscriptions.push(
      vscode.commands.registerCommand(getCommandName(name), cmd)
    )
  );
}

export function deactivate() {}

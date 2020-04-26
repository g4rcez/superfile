import * as vscode from "vscode";
import { createTemplateFile } from "./commands/create-template-file";
import { SubscribeCommands } from "./global";
import { getCommandName, Properties } from "./helpers/constants";
import { ReactComponentTypescriptTemplate } from "./templates/react-component";
export function activate(context: vscode.ExtensionContext) {
  const subs: SubscribeCommands = [
    {
      name: "spec",
      cmd: createTemplateFile(context, {
        defaultValue: "test",
        ext: "spec.ts",
        promptTitle: "Test filename",
        propertyConfig: Properties.Spec,
      }),
    },
    {
      name: "reactComponent",
      cmd: createTemplateFile(context, {
        defaultValue: "component",
        ext: "tsx",
        template: ReactComponentTypescriptTemplate,
        promptTitle: "React component filename",
        propertyConfig: Properties.ReactComponent,
      }),
    },
    {
      name: "json",
      cmd: createTemplateFile(context, {
        defaultValue: "data",
        ext: "json",
        promptTitle: "JSON filename",
        propertyConfig: Properties.Json,
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

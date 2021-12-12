import * as vscode from "vscode";
import { createTemplateFile } from "./commands/create-template-file";
import { SubscribeCommands } from "./global";
import { getCommandName, Properties, Extension } from "./helpers/constants";
import { ReactComponentTypescriptTemplate } from "./templates/react-component";

export function activate(context: vscode.ExtensionContext) {
  const subs: SubscribeCommands = [
    {
      name: "reactComponent",
      cmd: createTemplateFile(context, {
        ext: Extension.Tsx,
        template: ReactComponentTypescriptTemplate,
        promptTitle: "React component filename",
        propertyConfig: Properties.ReactComponent,
      }),
    },
    {
      name: "typescript",
      cmd: createTemplateFile(context, {
        ext: "ts",
        promptTitle: "Typescript filename",
        propertyConfig: Properties.Typescript,
      }),
    },
    {
      name: "javascript",
      cmd: createTemplateFile(context, {
        ext: "js",
        promptTitle: "Javascript filename",
        propertyConfig: Properties.Javascript,
      }),
    },
    {
      name: "json",
      cmd: createTemplateFile(context, {
        ext: Extension.Json,
        promptTitle: "JSON filename",
        propertyConfig: Properties.Json,
      }),
    },
    {
      name: "spec",
      cmd: createTemplateFile(context, {
        ext: Extension.CyTest,
        promptTitle: "Test(Cypress) filename",
        propertyConfig: Properties.Spec,
      }),
    },
    {
      name: "jest",
      cmd: createTemplateFile(context, {
        ext: Extension.Jest,
        promptTitle: "Test(Jest) filename",
        propertyConfig: Properties.Jest,
      }),
    },
    {
      name: "view",
      cmd: createTemplateFile(context, {
        ext: Extension.View,
        promptTitle: "View (ReactTypescript component) filename",
        propertyConfig: Properties.ReactComponent,
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

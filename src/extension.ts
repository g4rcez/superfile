import * as vscode from "vscode";
import { createSpecFile } from "./commands/create-spec-file";
import { SubscribeCommands } from "./global";
import { getCommandName } from "./helpers/constants";
import { createReactFile } from "./commands/create-react-component";

export function activate(context: vscode.ExtensionContext) {
  const subs: SubscribeCommands = [
    { name: "spec", cmd: createSpecFile(context) },
    { name: "reactComponent", cmd: createReactFile(context) },
  ];
  subs.map(({ cmd, name }) =>
    context.subscriptions.push(
      vscode.commands.registerCommand(getCommandName(name), cmd)
    )
  );
}

export function deactivate() {}

export const VSCODE_EXTENSION_NAME = "superfile";
export const DEFAULT_SPEC_EXTENSION = "spec.ts";
export const DEFAULT_REACT_COMPONENT_EXTENSION = "tsx";
export const commands = {
  spec: "createSpecFile",
  json: "createJsonFile",
  reactComponent: "createReactComponent",
};

export type Commands = keyof typeof commands;

export const getCommandName = (key: Commands): string =>
  `${VSCODE_EXTENSION_NAME}.${commands[key]}`;

export enum Properties {
  Spec = "spec",
  Json = "json",
  ReactComponent = "rc",
}

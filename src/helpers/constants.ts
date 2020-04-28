export const VSCODE_EXTENSION_NAME = "superfile";

export const SPEC_EXTENSION = "spec.ts";
export const JSON_EXTENSION = "JSON";
export const REACT_COMPONENT_EXTENSION = "tsx";

export const commands = {
  spec: "createSpecFile",
  json: "createJsonFile",
  javascript: "createJavascriptFile",
  typescript: "createTypescriptFile",
  reactComponent: "createReactComponent",
};

export type Commands = keyof typeof commands;

export const getCommandName = (key: Commands): string =>
  `${VSCODE_EXTENSION_NAME}.${commands[key]}`;

export enum Properties {
  Spec = "spec",
  Javascript = "javascript",
  Typescript = "typescript",
  Json = "json",
  ReactComponent = "rc",
}

export const VSCODE_EXTENSION_NAME = "superfile";

export enum Extension {
  CyTest = "spec.ts",
  Json = "json",
  Tsx = "tsx",
  Jest = "test.ts",
  View = "view.tsx",
}

export const commands = {
  spec: "createSpecFile",
  view: "createViewFile",
  jest: "createJestFile",
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
  Jest = "jest",
  Javascript = "javascript",
  Typescript = "typescript",
  Json = "json",
  ReactComponent = "rc",
}

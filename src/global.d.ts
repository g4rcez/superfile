import { Commands } from "./helpers/constants";

export type ArgsPrompt =
  | {
      $mid: number;
      fsPath: string;
      external: string;
      path: string;
      scheme: string;
    }
  | undefined;

export type FromPrompt = {
  title: string;
  value?: string;
};

type TemplateArgs = {
  extension: string;
  filename: string;
};

export type FunctionTemplate = (args: TemplateArgs) => string;

export type CreateFile = {
  path: string;
  name: string;
  extension: string;
  template?: FunctionTemplate;
};

export type SubscribeCommands = Array<{
  name: Commands;
  cmd: (args: ArgsPrompt) => Promise<unknown>;
}>;

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

export type CreateFile = {
  path: string;
  name: string;
  extension: string;
  template?: string;
};

export type SubscribeCommands = Array<{
  name: Commands;
  cmd: (args: ArgsPrompt) => Promise<unknown>;
}>;

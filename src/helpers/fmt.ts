export const fixExtension = (filename: string, extension: string): string => {
  if (filename.endsWith(`.${extension}`)) {
    return filename;
  }
  return filename + "." + `${extension.replace(/^\./g, "")}`;
};

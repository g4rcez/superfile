export const fixExtension = (filename: string, extension: string): string => {
  if (filename.endsWith(`.${extension}`)) {
    return filename;
  }
  return filename + "." + `${extension.replace(/^\./g, "")}`;
};

export const toPascalCase = (str: string) => {
  const s = (
    str.match(
      /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
    ) || []
  )
    .map((x) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join("");
  const camelCase = s.slice(0, 1).toLowerCase() + s.slice(1);
  return camelCase.substring(0, 1).toUpperCase() + camelCase.substring(1);
};

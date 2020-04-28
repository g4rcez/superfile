import { toPascalCase } from "../helpers/fmt";
import { FunctionTemplate } from "../global";

export const ReactComponentTypescriptTemplate: FunctionTemplate = ({
  extension,
  filename: name,
}) => {
  const formatName = toPascalCase(name);
  if (extension.endsWith(".tsx")) {
    return `\rimport React from "react";
  
  \rtype Props = {
  
  \r};
  
  \rconst ${formatName}: React.FC<Props> = () => {
    
  };
  
  \rexport default ${toPascalCase(name)};
  `;
  }
  return "";
};

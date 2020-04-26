import { toPascalCase } from "../helpers/fmt";

export const ReactComponentTypescriptTemplate = (name: string) => {
  const formatName = toPascalCase(name);
  return `\rimport React from "react";
  
  \rtype Props = {
  
  \r};
  
  \rconst ${formatName}: React.FC<Props> = () => {
    
  };
  
  \rexport default ${toPascalCase(name)};
  `;
};

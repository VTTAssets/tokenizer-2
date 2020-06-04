export const preloadTemplates = async (): Promise<void> => {
  const templatePaths = [
    // Add paths to "modules/tokenizer-2/templates"
  ];

  return loadTemplates(templatePaths);
};

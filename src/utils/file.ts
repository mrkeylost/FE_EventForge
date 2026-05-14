export const MAX_FILE_SIZE = 102_400;

export const validFileExtensions: Record<string, string[]> = {
  image: ["jpg", "gif", "png", "jpeg", "svg", "webp"],
};

type FileType = keyof typeof validFileExtensions;

export const isValidFileType = (
  fileName: string | undefined,
  fileType: FileType,
): boolean => {
  if (!fileName) return false;

  const extension = fileName.split(".").pop()?.toLowerCase();

  return !!extension && validFileExtensions[fileType].includes(extension);
};

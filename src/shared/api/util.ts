import { getAccessToken } from '../auth/auth';
export const prepareImageUpload = async (
  fileList: FileList,
  fileName: string,
) => {
  const file = await toBase64(fileList[0]);
  return {
    file_name: fileName,
    image: file,
  };
};

export const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const sanitizeFilename = (
  inputStr: string,
  replacement: string = '_',
): string => {
  const sanitizedStr = inputStr.replace(/[^\w-]/g, replacement);
  const trimmedStr = sanitizedStr.trim();
  const maxLength = 255;
  const finalStr = trimmedStr.slice(0, maxLength);
  return finalStr;
};

export const getRequestHeaders = () => {
  return {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  };
};

export const formatRequestBody = (
  command: string,
  table: string,
  data: unknown,
) => {
  return {
    command: command,
    table: table,
    data: data,
  };
};

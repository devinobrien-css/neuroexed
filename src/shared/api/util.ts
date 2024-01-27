import { getAccessToken } from '../auth/auth';

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

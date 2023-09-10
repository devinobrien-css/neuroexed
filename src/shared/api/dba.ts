import axios from 'axios';

const putFileToS3 = async (file: any, fileName: string, bucket: string) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_S3_API, {
      file: file,
      fileName: fileName,
      bucket: bucket,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

/** Uploads a file to S3
 */
export const uploadFileToBucket = async (
  folder: string,
  fileName: string,
  file: any,
) => {
  const form = new FormData();
  form.append(
    'data',
    JSON.stringify({
      name: fileName,
    }),
  );
  form.append('file', file, fileName);
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = async () =>
    await putFileToS3(
      reader.result,
      `${folder}/${fileName}`,
      'neuroexed-bucket',
    );
};

/** Fetches a row of a table
 * @param {*} tableName
 * @returns
 */
export const fetchData = async (tableName: string) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'READ',
      table: tableName,
      data: {},
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

/** Updates a row of a table
 * @param {*} tableName
 * @param {*} conditions
 * @param {*} data
 * @returns
 */
export const putData = async (tableName: string, data: any) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'INSERT',
      table: tableName,
      data: data,
    })
    .then((response) => response.data)
    .catch((error) => console.error(error));
};

/** Removes a row of a table
 * @param {*} tableName
 * @param {*} key
 * @returns
 */
export const removeData = async (tableName: string, key: any) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'DELETE',
      table: tableName,
      data: key,
    })
    .then((response) => response)
    .catch((error) => console.error(error));
};

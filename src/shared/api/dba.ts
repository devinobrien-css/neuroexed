import axios from 'axios';

const putFileToS3 = async (
  file: string | ArrayBuffer | null,
  fileName: string,
  bucket: string,
) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_S3_API, {
      file: file,
      fileName: fileName,
      bucket: bucket,
    })
    .then((response) => response.data);
};

/** Uploads a file to S3
 * @param {string} folder - string
 * @param {string} fileName - string
 * @param {FileList} file - FileList
 * @returns void
 */
export const uploadFileToBucket = async (
  folder: string,
  fileName: string,
  file: FileList,
) => {
  const form = new FormData();
  form.append(
    'data',
    JSON.stringify({
      name: fileName,
    }),
  );
  form.append('file', file[0], fileName);
  const reader = new FileReader();
  reader.readAsDataURL(file[0]);
  reader.onload = async () =>
    await putFileToS3(
      reader.result,
      `${folder}/${fileName}`,
      'neuroexed-bucket',
    );
};

/** Fetches a row of a table
 * @param {string} tableName - string
 * @returns BlogResponse
 */
export const fetchData = async (tableName: string) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'READ',
      table: tableName,
      data: {},
    })
    .then((response) => response.data);
};

/** Create a row of a table
 * @param {string} tableName - string
 * @param {object} data - object
 * @returns void
 */
export const putData = async (tableName: string, data: object) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'INSERT',
      table: tableName,
      data: data,
    })
    .then((response) => response.data);
};

/** Updates a row of a table
 * @param {*} tableName - string
 * @param {*} data - object
 * @returns void
 */
export const updateData = async (tableName: string, data: object) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'UPDATE',
      table: tableName,
      data: data,
    })
    .then((response) => response.data);
};

/** Updates the order of a table
 * @param {*} tableName - string
 * @param {*} data  - object
 * @returns void
 */
export const updateOrder = async (tableName: string, data: object) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'UPDATE_ORDER',
      table: tableName,
      data: data,
    })
    .then((response) => response.data);
};

/** Removes a row of a table
 * @param {*} tableName - string
 * @param {*} key - object
 * @returns void
 */
export const removeData = async (tableName: string, key: object) => {
  return await axios
    .post(import.meta.env.VITE_NEURO_API, {
      command: 'DELETE',
      table: tableName,
      data: key,
    })
    .then((response) => response);
};

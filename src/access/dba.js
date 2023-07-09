import axios from 'axios';

const NEURO_API = 'https://9uc2frxhqk.execute-api.us-east-1.amazonaws.com/prod/database/';
const NEURO_S3_API = 'https://9uc2frxhqk.execute-api.us-east-1.amazonaws.com/prod/s3/';

/** Uploads a file to S3
 */
export const uploadFileToBucket = async (fileName,file) => {
    console.log('sendit')
    let output = null

    const form = new FormData()
    form.append('file', file)
    
    await axios
        .post(
            NEURO_S3_API,
            {
                file: form,
                fileName: fileName,
            }
        )
        .then((response) => {
            try {
                console.log('NO ERROR')
                output = response.data.result;
            }
            catch (error) {
                console.log("ERROR OCCURED IN S3 POST")
                console.log(response)
                console.log(error)
            }
        })
        .catch((error) => {
            console.log('S3 ERROR')
            console.log(error);
        });

    console.log(output)
    // const result = await ReactS3Client.uploadFile(file, fileName);
    // const s3 = new AWS.S3();

    // if (!file) {
    //     return;
    // }
    // const params = { 
    //     Bucket: 'profile_pictures', 
    //     __dirname:'',
    //     Key: fileName, 
    //     Body: file 
    // };

    // const { Location } = await s3.upload(params).promise();

    // if(Location) {
    //     console.log(Location);
    // } else {
    //     console.log('error case');
    // }
}

/** Fetches a row of a table
 * @param {*} tableName 
 * @returns 
 */
export const fetchData = async (tableName, conditions = {}) => {
    let output = null
    await axios
        .post(
            NEURO_API,
            {
                command: 'READ',
                table: tableName,
                conditions: conditions,
                data: {}
            }
        )
        .then((response) => {
            try {
                output = response.data.result;
            }
            catch (error) {
                console.log("ERROR OCCURED IN FETCH")
                console.log(response)
                console.log(error)
            }
        })
        .catch((error) => {
            console.log('FETCH ERROR')
            console.log(error);
        });

    return output
}

/** Updates a row of a table
 * @param {*} tableName 
 * @param {*} conditions 
 * @param {*} data 
 * @returns 
 */
export const putData = async (tableName, conditions = {}, data) => {
    let output = null

    await axios
        .post(
            NEURO_API,
            {
                command: 'INSERT',
                table: tableName,
                conditions: conditions,
                data: data
            }
        )
        .then((response) => {
            output = response.data;
        })
        .catch((error) => {
            console.log('PUT ERROR')
            console.log(error);
        });
    return output
}

/** Removes a row of a table
 * @param {*} tableName 
 * @param {*} key 
 * @returns 
 */
export const removeData = async (tableName, key) => {
    let output = null

    await axios
        .post(
            NEURO_API,
            {
                command: 'DELETE',
                table: tableName,
                conditions: {},
                data: key
            }
        )
        .then((response) => {
            output = response;
        })
        .catch((error) => {
            console.log('REMOVE ERROR')
            console.log(error);
        });
    return output
}
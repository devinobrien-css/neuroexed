import axios from 'axios';


const NEURO_API = 'https://y8hve2cnh5.execute-api.us-east-1.amazonaws.com/default/neuroexed-access';

const NEW_URL = `https://${process.env.REACT_APP_NEUROEXED_API_URL}.execute-api.${process.env.REACT_APP_NEUROEXED_REGION}.amazonaws.com/${process.env.REACT_APP_NEUROEXED_DEPLOYMENT_STAGE}`;


const getPeople = async () => {
    await axios
    .post(
        NEW_URL
    )
    .then((response) => {
        console.log(response.data.body);
    })
}

getPeople()

/**
 * @param {*} tableName 
 * @returns 
 */
export const fetchData = async (tableName,conditions={}) => {
    let output = null
    await axios
    .post(
        NEURO_API,
        {
            command:'READ',
            table:tableName,
            conditions:conditions,
            data:{}
        }
    )
    .then((response) => {
        output = response.data.body.result;
    })
    .catch((error) => {
        console.log('FETCH ERROR')
        console.log(error);
    });
    return output
}

export const putData = async (tableName, conditions={}, data) => {
    let output = null 

    await axios
    .post(
        NEURO_API,
        {
            command:'INSERT',
            table:tableName,
            conditions:conditions,
            data:data
        }
    )
    .then((response) => {
        output = response.data.body;
    })
    .catch((error) => {
        console.log('PUT ERROR')
        console.log(error);
    });
    return output
}

export const removeData = async (tableName, key) => {
    let output = null 

    await axios
    .post(
        NEURO_API,
        {
            command:'DELETE',
            table:tableName,
            conditions:{},
            data:key
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
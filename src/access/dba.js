import axios from 'axios';

const NEURO_API = 'https://y8hve2cnh5.execute-api.us-east-1.amazonaws.com/default/neuroexed-access';

/**
 * 
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
        console.log(response)
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
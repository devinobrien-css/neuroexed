import axios from 'axios';
const NEURO_API = 'https://9uc2frxhqk.execute-api.us-east-1.amazonaws.com/prod/database/';


/** Fetches a row of a table
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
        try{
            output = response.data.result;
        }
        catch(error) {
            console.log("ERROR OCCURED IN FETCH")
            console.log(response)
            console.log(error)
        }
    })
    .catch((error) => {
        console.log('FETCH ERROR')
        console.log(error);
    });

    console.log("TESTING !")
    await fetch(NEURO_API, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            command:'READ',
            table:tableName,
            conditions:conditions,
            data:{}
        }),
    })
    .then((out) => console.log(out))
    .catch((e) => console.log(e))

    return output
}

/** Updates a row of a table
 * @param {*} tableName 
 * @param {*} conditions 
 * @param {*} data 
 * @returns 
 */
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
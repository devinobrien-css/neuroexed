import { sort_order } from "../../schema/object_schema"
import { fetchData, putData } from "../dba"



async function addUpdatePerson(member,email){
    await putData(
        'people',
        {},
        member
    )

    const sort = await fetchData('sort_orders')
    sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.push({'S':email})
    
    await putData(
        'sort_orders',
        {},
        sort_order(
            'people',
            sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L
        )
    )
}

export default addUpdatePerson;
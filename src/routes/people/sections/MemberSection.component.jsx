import { Icon } from "@iconify/react"
import Loader from "../../../shared/components/Loader.component"
import Profile from "./Profile.component"
import { useEffect, useState } from "react"
import { fetchData } from "../../../shared/services/dba"

function orderJsonObjects(order,objects){
    const output = []
    order.forEach(order_by => {
        output.push(objects.filter(object => {
            return object.email.S === order_by.S
        })[0])
    })
    return output
}

/** Fetches people data, renders list of members
 * @returns 
 */
const PeopleSection = () => {
    const [search,setSearch] = useState("")
    const [loading,setLoading] = useState()
        
    const [people, setPeople] = useState();
    const getPeople = async () => {
        setLoading(true)
        const sort = await fetchData('sort-orders')
        const res = await fetchData('people')

        if(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L.length !== 0)
            setPeople(orderJsonObjects(sort.Items.filter(order => {return order.type.S === "people"})[0].sort.L,res.Items));
        else
            setPeople(res.Items)
        setLoading(false)
    };

    useEffect(() => {
        getPeople();
    }, []);

    console.log(people)

    return (
        <div 
            className='p-4 my-32 max-w-screen-xl mx-auto'
        >
            <p className='text-6xl font-raleway text-center mb-4'>Our Lab Members</p>
            <p className='text-xl font-lato font-light text-center mb-8 mx-auto md:w-2/5'>Discover the faces behind our groundbreaking research and the unique perspectives that shape our journey.</p>
            <div className='flex shadow p-2 rounded-xl w-1/3'>
                <Icon icon="fa6-solid:magnifying-glass" className='my-auto text-gray-500'/>
                <input  className='text-xl ml-2 outline-none text-gray-500' placeholder={`Search for members...`} value={search} onChange={(e)=>setSearch(e.target.value)}/>
            </div>
            <div className='flex flex-wrap justify-evenly'>
                {loading?(
                    <div className='flex flex-col items-center w-full min-h-[400px]'>
                        <Loader />
                    </div>
                ):(
                    people?.filter(member => member.data.M.first.S.toLowerCase().includes(search.toLocaleLowerCase()) || member.data.M.last.S.toLowerCase().includes(search.toLocaleLowerCase()))
                    .map((member) => {
                        return (
                            <Profile key={member.data.M} data={member.data.M}/>
                        )
                    })
                )}
            </div>
        </div>
    );
}

export default PeopleSection;
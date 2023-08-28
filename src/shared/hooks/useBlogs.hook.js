import { useQuery } from "react-query"


const useBlogs = () => {
    // hooks
    const {data: blogsData, isLoading: blogsLoading } = useQuery('GET-BLOGS',)

    /** Retrieves all members
     * @returns a set of all members
     */
    const retrieveBlogs = () => {
        return null
    }

    const retrieveBlog = (memberId) => {
        return null
    }

    const updateMember = (payload) => {
        return null
    }

    const deleteBlog = (memberId) => {
        return null
    }

    return {
        blogs: retrieveBlogs,
        retrieveBlog,
        updateMember,
        deleteBlog
    }
}

export default useBlogs;
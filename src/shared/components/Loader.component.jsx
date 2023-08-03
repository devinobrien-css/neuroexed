import { Icon } from "@iconify/react"

const Loader = () => {
    return (
        <div className="w-full flex flex-col p-48">
            <Icon icon='line-md:loading-twotone-loop' className="m-auto" width={50}/>
            <p className="font-lato m-auto">loading</p>
        </div>
    )
}

export default Loader;
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { SubTitleSm, TitleMd } from "../../../shared/components/common.library";

const LandingRedirect = () => {
    const navigate = useNavigate();

    return (
        <div className="my-32">
            <div className="bg-white w-[95%] mx-auto shadow-lg shadow-gray-300 rounded ">
                <div className='flex border-b border-gray-400'>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>window.location.href="https://www.otherlobe.com"}>
                        <div className='flex justify-between'>
                            <Icon icon="material-symbols:library-books-rounded" width={45}/>
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">Papers</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">Our papers and articles on The Other Lobe</SubTitleSm>
                    </div>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l border-gray-400 cursor-pointer' onClick={()=>navigate("publications")}>
                        <div className='flex justify-between'>
                            <Icon icon="mdi:book-multiple" width={45}/>
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">Books</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">Our recent publications</SubTitleSm>
                    </div>
                </div>
                <div className='flex border-b border-gray-400'>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>window.location.href="https://experienced.simplecast.com/"}>
                        <div className='flex justify-between'>
                            <Icon icon="material-symbols:video-library-rounded" width={45}/>
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">Podcasts</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">Our podcasts with guest speakers</SubTitleSm>
                    </div>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l border-gray-400 cursor-pointer' onClick={()=>navigate("people")}>
                        <div className='flex justify-between'>
                            <Icon icon="mdi:user-box-multiple" width={45}/>
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">People</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">The members of our lab team</SubTitleSm>
                    </div>
                </div>
                <div className='flex '>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all cursor-pointer' onClick={()=>navigate("projects")}>
                        <div className='flex justify-between'>
                            <Icon icon="mdi:library-edit-outline" width={45} />
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">Projects</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">Our collaborative work broken down into clusters</SubTitleSm>
                    </div>
                    <div className='w-1/2 p-4 group hover:bg-gray-200 transition-all border-l border-gray-400 cursor-pointer' onClick={()=>navigate("affiliations")}>
                        <div className='flex justify-between'>
                            <Icon icon="ic:round-library-add" width={45} />
                            <Icon icon="material-symbols:arrow-outward-rounded" width={35} className="transition-all group-hover:-mt-2 group-hover:-mr-2" />
                        </div>
                        <br/>
                        <TitleMd className="">Affiliates</TitleMd>
                        <SubTitleSm className="text-gray-600 font-bold">Our affiliates and collaborators</SubTitleSm>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default LandingRedirect;
import { Icon } from "@iconify/react";
import { SectionTitle, Wrapper } from "../components/common.library";
import Header from "../components/header.component";



const Podcast = (podcast) => {
    return (
        <div className="sm:w-4/5 sm:max-w-[420px] md:w-2/5 mx-auto my-4 bg-white rounded-lg p-3 hover:shadow-xl transition-all transform">
            <div className="flex">
                <img src="./img/brain-podcast.png" alt="brain podcast" className="hidden sm:block rounded-full w-1/3 h-min my-auto" />
                <div>
                    <hr/>
                    <div className="p-2">
                        <p className="text-gray-600 font-light">S2:EP3</p>

                        <p className="text-lg font-bold">2.3 Episode title in bolded font</p>
                        
                        <p className="uppercase text-gray-500">August 27, 1892 @ 12:30pm EST</p>
                        <hr/>
                        
                        <div className="flex justify-end w-full pt-2">
                            <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
                                <Icon icon="bx:headphone" width="25" />
                                <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">listen</p>
                            </div>

                            <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
                                <Icon icon="material-symbols:ios-share-rounded" width="25" />
                                <p className="z-50 group-hover:opacity-100 group-hover:w-12 group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">share</p>
                            </div>

                            <div className="relative rounded-full p-2 hover:shadow hover:bg-gray-200 cursor-pointer active:shadow-xl group">
                                <Icon icon="material-symbols:download-rounded" width="25" />
                                <p className="group-hover:opacity-100 group-hover:w-24 text-center group-hover:p-2 overflow-hidden opacity-0 w-0 transition-all absolute bottom-7 right-full bg-gray-200 p-0 rounded">download</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


/** Podcasts page
 * @param {*} args 
 * @returns 
 */
const Podcasts = (args) => {
    return (
		<>
			<Header
                content="ExperiencED Podcast"
                subtext='Thia podcast explores the process of learning from a direct experience in all of its forms.'
            />
            
            <Wrapper color='light'>
                <SectionTitle>Episodes</SectionTitle>
                <br/>
                <div className="md:flex">
                    <div className="transition-all w-full sm:w-1/2 md:w-1/4 flex justify-between bg-white shadow">
                        <p className="my-auto ml-4">
                            Apply a Filter
                        </p>
                        <div className="bg-gray-300 p-3">
                            <Icon icon="material-symbols:filter-list-rounded" width="30" className="my-auto"/>
                        </div>
                    </div>

                    <div className="transition-all w-full sm:w-1/2 md:w-1/4 flex justify-between md:ml-4 md:mt-0 mt-4 bg-white shadow">
                        <p className="my-auto ml-4">
                            Search
                        </p>
                        <div className="p-3">
                            <Icon icon="ph:magnifying-glass-duotone" width="30" className="my-auto"/>
                        </div>
                    </div>
                </div>
            </Wrapper>

            <Wrapper className="flex flex-wrap">
                <Podcast />
                <Podcast />
                <Podcast />
                <Podcast />
                <Podcast />
            </Wrapper>

		</>
    );
}

export default Podcasts;
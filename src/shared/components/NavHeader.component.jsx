import { useLocation, useNavigate } from "react-router-dom";
import { tabs } from "../../manifest";

const NavHeader = ({title,content}) => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <>
            <div className='bg-landing h-full bg-cover shadow-lg'>
                <div className='w-full h-full backdrop-blur-sm backdrop-brightness-50 flex flex-col'>
                    <div className='my-auto w-fit md:w-2/3 mx-auto py-48'>
                        <p className='text-white md:text-6xl text-center font-raleway'>{title}</p>
                        <p className='text-gray-200 text-3xl text-center font-light'>-</p>
                        <p className='text-gray-200 text-2xl text-center font-light'>{content}</p>
                    </div>
                    <div className='w-full flex justify-between p-12'>
                        {tabs.map((tab) => {
                            if(!tab.protected){
                                return (
                                    <button
                                        key={tab}
                                        className={`font-raleway text-xl uppercase transition-all ${(location.pathname === tab.pathname ? " border-b-4 border-gray-200 text-gray-200" : "text-gray-200 drop-shadow-2xl")}`}
                                        onClick={() =>  {
                                            navigate(tab.pathname)
                                        }}
                                    >
                                        {tab.name}
                                    </button>
                                )
                            }
                            return null
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
export default NavHeader
import { useRecoilState } from "recoil";
import { pageState,userState } from "../../atom";
import React, { useState } from 'react';

/** Constructs and returns the website navigation bar
 * 
 * @returns 
 */
const Nav = () => {    
    const [page,setPage] = useRecoilState(pageState)
    const [user,] = useRecoilState(userState)
    const [navToggle,setNavToggle] = useState(false)

    return (
        <>
            <div 
                style={{backgroundImage: "url('./img/hex-nav-bg.png')"}}
                className='group fixed top-1 right-1 w-[20%] max-w-[13vw] h-max rounded z-[1001] bg-gray-700 bg-contain block md:hidden' 
                onClick={
                    () => { 
                        navToggle ? setNavToggle(false) : setNavToggle(true)
                    }
                }
            >
                <div className="transition-all delay-50 h-1 rounded w-4/5 bg-white my-2 mx-auto group-hover:scale-110"></div>
                <div className="transition-all delay-100 h-1 rounded w-4/5 bg-white my-2 mx-auto group-hover:scale-110"></div>
                <div className="transition-all delay-150 h-1 rounded w-4/5 bg-white my-2 mx-auto group-hover:scale-110"></div>
            </div>
            <nav 
                style={{backgroundImage: "url('./img/hex-nav-bg.png')"}}
                className={"z-[1000] fixed right-0 bg-cover bg-no-repeat bg-size-contain h-screen w-fit md:w-3/12 lg:w-2/12 md:translate-x-0 transition-all ease-in-out duration-[1s] " + (navToggle ? "":"translate-x-[20em]")}
            >
                <ul>
                    <li key='home'>
                        <button 
                            onClick={() =>  {
                            setNavToggle(false)
                                setPage('/')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            HOME
                        </button>
                    </li>
                    <li key='people'>
                        <button 
                            onClick={() =>  {
                            setNavToggle(false)
                                setPage('/people')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/people" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            PEOPLE
                        </button>
                    </li>
                    <li key='projects'>
                        <button 
                            onClick={() =>  {
                            setNavToggle(false)
                                setPage('/projects')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/projects" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            PROJECTS
                        </button>
                    </li>
                    <li key='news'>
                        <button 
                            onClick={() =>  {
                            setNavToggle(false)
                                setPage('/news')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/news" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            NEWS
                        </button>
                    </li>
                    <li key='publications'>
                        <button 
                             onClick={() =>  {
                                setNavToggle(false)
                                setPage('/publications')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/publications" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            PUBLICATIONS
                        </button>
                    </li>
                    <li key='affiliations'>
                        <button 
                             onClick={() =>  {
                                setNavToggle(false)
                                setPage('/affiliations')
                            }}
                            className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/affiliations" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                        >
                            AFFILIATIONS
                        </button>
                    </li>
                    {user !== "" ? 
                        <li key='admin'>
                            <button 
                                 onClick={() =>  {
                                    setNavToggle(false)
                                    setPage('/admin')
                                }}
                                className={"hover:bg-blue-300 w-full block border-0 py-4 px-2 text-2xl text-left " + (page === "/admin" ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl font-semibold")}
                            >
                                ADMIN
                            </button>
                        </li>
                        :
                        <></>
                    }
                </ul>
            </nav>
        </>
    );
}

export default Nav;

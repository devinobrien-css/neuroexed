import { useRecoilState } from "recoil";
import { navState, pageState,userState } from "../atom";
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { tabs } from "../manifest";


const NavButton = ({children,icon,className,...rest}) => {
    return (
        <button 
            {...rest}
            className={`group hover:border-b-4 border-gray-200 p-4 text-2xl text-left flex ${className}`}
        >
            <Icon icon={icon}   className={`shrink-0 my-auto border-white text-gray-800  text-inherit bg-inherit`}/> <span className="my-auto uppercase pl-1">{children}</span>
        </button>
    )
}

const Nav = ({className}) => {    
    const [navSticky,] = useRecoilState(navState)
    const [page,setPage] = useRecoilState(pageState)
    const [user,] = useRecoilState(userState)
    const [navToggle,setNavToggle] = useState(false)

    return (
        <>
            <div 
                className={`group fixed bg-dark-hex top-1 right-1 w-[50px] rounded z-[1001] bg-gray-700 bg-contain block md:hidden ${className}`}
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
            <div
                className={`z-[1000] fixed w-screen top-0 left-0 bg-dark-hex bg-cover transition-all bg-gray-800 overflow-hidden md:hidden ${(navToggle ? "opacity-1 h-screen":"opacity-0 h-0")}`}
            >
                {tabs.map((tab,index) => {
                        if(!tab.protected){
                            return (
                                <NavButton
                                    key={`nav-${index}`}
                                    className={`w-full ${(page === tab.name ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl")}`}
                                    icon={tab.icon}
                                    onClick={() =>  {
                                        setNavToggle(false)
                                        setPage(tab.name)
                                    }}
                                >
                                    {tab.name}
                                </NavButton>
                            )
                        }
                        return null
                    })}
                    {user !== "" ? 
                        <NavButton
                            className={`${(page === 'admin' ? "bg-gray-200 text-gray-800" : "text-gray-200 drop-shadow-2xl")}`}
                            icon="ic:outline-admin-panel-settings"
                            onClick={() =>  {
                                setNavToggle(false)
                                setPage('admin')
                            }}
                        >
                            admin
                        </NavButton>
                    :<></>}
            </div>


            <div 
                id="navbar"
                className={`z-[1000] bg-cover bg-hex bg-no-repeat bg-center rounded-lg w-full transition-all ease-in-out duration-300 hidden md:block md:sticky top-0`}
            >   
                <div className="flex justify-evenly">
                    {tabs.map((tab,index) => {
                        if(!tab.protected){
                            return (
                                <NavButton
                                    key={`nav-${index}`}
                                    className={`transition-all ${(page === tab.name ? " border-b-4 border-gray-200 text-gray-200" : "text-gray-200 drop-shadow-2xl")}`}
                                    icon={tab.icon}
                                    onClick={() =>  {
                                        setNavToggle(false)
                                        setPage(tab.name)
                                    }}
                                >
                                    {tab.name}
                                </NavButton>
                            )
                        }
                        return null
                    })}
                    {user !== "" ? 
                        <NavButton
                            className={`transition-all ${(page === 'admin' ? " border-b-4 border-gray-200 text-gray-200" : "text-gray-200 drop-shadow-2xl")}`}
                            icon="ic:outline-admin-panel-settings"
                            onClick={() =>  {
                                setNavToggle(false)
                                setPage('admin')
                            }}
                        >
                            admin
                        </NavButton>
                    :<></>}
                </div>
            </div>
        </>
    );
}

export default Nav;

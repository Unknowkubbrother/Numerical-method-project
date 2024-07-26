import React from 'react'
import { useState,useEffect } from 'react'
import {mainMenu} from '../../Configs/Configs'
import { Outlet, useNavigate } from 'react-router-dom'

function Lobby() {
    const navigate = useNavigate();
    const [selectedMenu, setselectedMenu] = useState(mainMenu[0].title)

    const handlerSetRouter = (item : {title: string, path: string, menu: {title: string, path: string}[]}) => {
        setselectedMenu(item.title)
        if (item.menu.length > 0) {
            navigate(item.menu[0].path)
        } else {
            navigate(item.path)
        }
    }
    
    useEffect(() => {
        navigate('/lobby/root/graphical')
      }, []);


  return (
    <div className='w-full mt-[90px]'>
        <div className='min-[340px]:w-[75%] lg:w-[90%] xl:w-[70%] h-content m-auto list-none flex gap-5 justify-center items-center flex-wrap'>
            {mainMenu.map((item : {title: string, path: string, menu: {title: string, path: string}[]}, index : number) => {
                return (
                    <button className={`btn text-white hover:bg-primary hover:scale-105 ${selectedMenu == item.title ? 'bg-primary' : ''}`} key={index} onClick={() => handlerSetRouter(item)}>{item.title}</button>
                )
            })}
        </div>

        <div className='min-[340px]:w-full lg:w-[90%] xl:w-[70%] m-auto'>
            <Outlet />
        </div>

    </div>
  )
}

export default Lobby
import React from 'react'
import { useState } from 'react'
import Root from '../Solutions/RootOfEquations/Root'
import {mainMenu} from '../../Configs/Configs'

function Lobby() {

    const [selectedMenu, setselectedMenu] = useState(mainMenu[0].title)

  return (
    <div className='w-full mt-[90px]'>
        <div className='w-[70%] h-content m-auto list-none flex gap-5 justify-center items-center'>
            {mainMenu.map((item : {title : string}, index : number) => {
                return (
                    <li key={index}>
                        <button className={`btn text-white hover:bg-primary hover:scale-105 ${selectedMenu == item.title ? 'bg-primary' : ''}`} key={index} onClick={()=> setselectedMenu(item.title)}>{item.title}</button>
                    </li>
                )
            })}
        </div>

        <div className='w-[70%] m-auto'>
            {selectedMenu === 'Root of Equation' ? (
                <>
                    <Root menu={selectedMenu}/>
                </>
            ) : (
                <div className='w-full mt-5 flex justify-center items-center'>
                    <span className='text-lg'>Coming soon...</span>
                </div>
            )}
        </div>

    </div>
  )
}

export default Lobby
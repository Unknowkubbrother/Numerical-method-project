import React from 'react'
import { useState } from 'react'
import Root from '../Solutions/RootOfEquations/Root'
import Graphicalmethods from '../Solutions/RootOfEquations/Graphicalmethods'

function Lobby() {

    const [selectedMenu, setselectedMenu] = useState("")

    const menu = [
        'Root of Equation',
        'Linear Algebraic Equation',
        'Interpolation',
        'Extrapolation',
        'Integration',
        'Differentiation'
    ]

  return (
    <div className='w-full h-screen mt-[90px]'>
        <div className='w-[70%] h-content m-auto list-none flex gap-5 justify-center items-center'>
            {menu.map((item : string, index : number) => {
                return (
                    <li key={index}>
                        <button className={`btn text-white hover:bg-primary hover:scale-105 ${selectedMenu == item ? 'bg-primary' : ''}`} key={index} onClick={()=> setselectedMenu(item)}>{item}</button>
                    </li>
                )
            })}
        </div>

        <div className='w-[70%] m-auto'>
            {selectedMenu === 'Root of Equation' ? (
                <>
                    <Root/>
                    <Graphicalmethods/>
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
import React from 'react'
import { useState } from 'react';
import { mainMenu } from '../../../Configs/Configs'
import Graphicalmethods from './Graphicalmethods'

interface MenuItem {
  title: string;
  menu: string[];
}

function Root( props : {menu : string} ) {

    const [selectedSubMenu, setselectedSubMenu] = useState("graphicalmethods")
    const [equation, setEquation] = useState('')

    const changeEquation = (equation : string) => {
        setEquation(equation)
    }


  return (
    <>
    <div className='w-full mt-10 flex justify-start items-center gap-5'>
            <div className='flex flex-col gap-2'>
                <span>Solutions</span>
                <select className="select select-bordered w-[200px]" value={selectedSubMenu} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setselectedSubMenu(e.target.value)}>
                    {mainMenu.map((item : MenuItem) => {
                        if (item.title === props.menu){
                            return (item.menu.map((subItem : string, index : number) => {
                                return (
                                    <option key={index} value={subItem}>{subItem}</option>
                                )
                            }))
                        }
                    })}
                </select>
            </div>

            <div className='w-[700px] h-[100px] bg-background ml-[7rem] rounded-lg flex justify-center items-center'>
                <span className='text-xl font-semibold'>
                    <span>f(x)</span> = <span className='ml-2'>{equation == '' ? ". . ." : equation}</span>
                </span>
            </div>
      </div>
        <div className='w-full'>
            {selectedSubMenu === 'graphicalmethods' && 
                <Graphicalmethods InputEquation={changeEquation}/>
            }
        </div>
      </>
  )
}

export default Root
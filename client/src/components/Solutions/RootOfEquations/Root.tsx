import React from 'react'
import { useState} from 'react';
import { mainMenu } from '../../../Configs/Configs'
import { Outlet,useNavigate,useLocation  } from 'react-router-dom'

interface MenuItem {
  title: string;
  menu: {
    title: string;
    path: string;
  }[];
}

function Root() {
    const navigate = useNavigate();
    const [selectedSubMenu, setselectedSubMenu] = useState("")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [equation, setEquation] = useState('')

    const setSubMenu = ((e: React.ChangeEvent<HTMLSelectElement>)=>{
        setselectedSubMenu(e.target.value)
        navigate(e.target.value)
        setEquation('')
    })

    const location = useLocation();

return (
    <>
        <div className='w-full mt-10 flex justify-start items-center gap-5'>
            <div className='flex flex-col gap-2'>
                <span>Solutions</span>
                <select className="select select-bordered w-[200px]" value={selectedSubMenu} onChange={setSubMenu}>
                    {mainMenu.map((item: MenuItem) => {
                        if (item.title === "Root of Equation") {
                            return (item.menu.map((subItem: { title: string, path: string }, index: number) => {
                                return (
                                    <option key={index} value={subItem.path}>{subItem.title}</option>
                                )
                            }))
                        }
                    })}
                </select>
            </div>

            <div className='w-[700px] h-[100px] bg-background ml-[12rem] rounded-lg flex justify-center items-center'>
                <span className='text-xl font-semibold'>
                    <span>
                        {location.pathname.split('/')[3] != 'onepoint' ? 'f(x)' : 'xn+1'}
                    </span> = <span className='ml-2'>{equation == '' ? ". . ." : equation}</span>
                </span>
            </div>
        </div>
        <div className='w-full'>
            <Outlet context={[equation, setEquation]}/>
        </div>

    </>
)
}

export default Root
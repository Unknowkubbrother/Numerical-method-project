import { useNavigate, useLocation  } from 'react-router-dom'
import logo from '../../assets/logo.png'
import {MyFunctionContext} from "../../App";
import {useContext} from "react";

function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();
  const {setLoading} = useContext(MyFunctionContext);

  const setPage = (page: string) => {
    setLoading(true);
    navigate(page);
  }

  return (
    <nav className='fixed top-0 left-0 flex justify-between items-center w-full px-5 py-5 backdrop-blur z-50'>
        <div className='flex justify-center items-center gap-2'>
          <div className='w-[50px] h-[50px] cursor-pointer' onClick={() => setPage('/home')}>
            <img src={logo} alt="logo"/>
          </div>
          <span className='text-lg'>Numerical methods</span>
        </div>
        <ul className='flex justify-center items-center gap-5 font-semibold'>
            <li className={`hover:scale-105 duration-300 cursor-pointer ${currentLocation.pathname === '/home' ? 'active' : ''}`} onClick={()=> setPage('/home')}>
                Home
            </li>
            <li className={`hover:scale-105 duration-300  cursor-pointer ${location.pathname.split("/")[1] === 'lobby' ? 'active' : ''}`} onClick={()=> setPage('/lobby/root/graphical')}>
                Calculate
            </li>
            <li className={`hover:scale-105 duration-300 cursor-pointer ${currentLocation.pathname === '/problems' ? 'active' : ''}`} onClick={()=> setPage('/problems')}>
                Problems
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
import { Link , useNavigate, useLocation  } from 'react-router-dom'
import logo from '../../assets/logo.png'

function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const setPage = (page: string) => {
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
            <li className={`hover:scale-105 duration-300 ${currentLocation.pathname === '/home' ? 'active' : ''}`}>
                <Link to="/home">Home</Link>
            </li>
            <li className={`hover:scale-105 duration-300 ${currentLocation.pathname === '/login' ? 'active' : ''}`}>
                <Link to="/login">Login</Link>
            </li>
        </ul>
    </nav>
  )
}

export default Navbar
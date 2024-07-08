import { Link , useNavigate, useLocation  } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate();
  const currentLocation = useLocation();

  const setPage = (page: string) => {
    navigate(page);
  }

  return (
    <nav className='sticky top-0 left-0 flex justify-between items-center w-full px-5 py-2 bg-background'>
        <div className='w-[50px] h-[50px] cursor-pointer' onClick={() => setPage('/home')}>
          <img src="logo.png" alt="logo"/>
        </div>
        <ul className='flex justify-center items-center gap-3 font-semibold'>
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
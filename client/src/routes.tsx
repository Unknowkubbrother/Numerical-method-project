import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Home from './components/Home/Home.tsx'
import Blog from './components/Blog/Blog.tsx'
import Login from './components/Login/Login.tsx'
import Register from './components/Register/Register.tsx';
import Lobby from './components/Lobby/Lobby.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'lobby',
        element: <Lobby />,
        children: [
          {
            path: 'root',
            element: <Home />,
          },
        ]
      },
      {
        path: 'blog',
        element: <Blog/>
      },
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'register',
        element: <Register/>
      }
    ],
  },
]);

export default router;
import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Home from './components/Home/Home.tsx'
import Blog from './components/Blog/Blog.tsx'
import Login from './components/Login/Login.tsx'
import Register from './components/Register/Register.tsx';
import Lobby from './components/Lobby/Lobby.tsx'
import Root from './components/Solutions/RootOfEquations/Root.tsx'
import Graphicalmethods from './components/Solutions/RootOfEquations/Graphicalmethods.tsx'
import Bisection from './components/Solutions/RootOfEquations/Bisection.tsx'
import FalsePosition from './components/Solutions/RootOfEquations/Falseposition.tsx'
import Onepoint from './components/Solutions/RootOfEquations/Onepoint.tsx';
import Newton from './components/Solutions/RootOfEquations/Newton.tsx'
import Secant from './components/Solutions/RootOfEquations/Secant.tsx';
import Linear from './components/Solutions/Linear/Linear.tsx'

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
            element: <Root/>,
            children: [
              {
                path: 'graphical',
                element: <Graphicalmethods/>
              },
              {
                path: 'bisection',
                element: <Bisection />
              },
              {
                path: 'falseposition',
                element: <FalsePosition />
              },
              {
                path: 'onepoint',
                element: <Onepoint />
              },
              {
                path: 'newton',
                element: <Newton />
              },
              {
                path: 'secant',
                element: <Secant />
              }
            ]
          },
          {
            path: 'linear',
            element: <Linear />
          }
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
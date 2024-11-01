import { createBrowserRouter } from 'react-router-dom';
import App from './App.tsx'
import './index.css'
import Home from './components/Home/Home.tsx'
import Lobby from './components/Lobby/Lobby.tsx'
import Root from './components/Solutions/RootOfEquations/Root.tsx'
import Graphicalmethods from './components/Solutions/RootOfEquations/Graphicalmethods.tsx'
import Bisection from './components/Solutions/RootOfEquations/Bisection.tsx'
import FalsePosition from './components/Solutions/RootOfEquations/Falseposition.tsx'
import Onepoint from './components/Solutions/RootOfEquations/Onepoint.tsx';
import Newton from './components/Solutions/RootOfEquations/Newton.tsx'
import Secant from './components/Solutions/RootOfEquations/Secant.tsx';
import Linear from './components/Solutions/Linear/Linear.tsx'
import Cramer from './components/Solutions/Linear/Cramer.tsx';
import GaussElimination from './components/Solutions/Linear/GaussElimination.tsx';
import GaussJordan from './components/Solutions/Linear/GaussJordan.tsx';
import MatrixInversion from './components/Solutions/Linear/MatrixInversion.tsx';
import Ludecomposition from './components/Solutions/Linear/Ludecomposition.tsx';
import Choleskydecomposition from './components/Solutions/Linear/Choleskydecomposition.tsx';
import Jacobi from './components/Solutions/Linear/Jacobi.tsx';
import Gaussseidel from './components/Solutions/Linear/Gaussseidel.tsx';
import Conjugate from './components/Solutions/Linear/Conjugate.tsx';
import Interpolation from './components/Solutions/Interpolation/Interpolation.tsx';
import NewtonDivided from './components/Solutions/Interpolation/NewtonDivided.tsx';
import Lagrange from './components/Solutions/Interpolation/Lagrange.tsx';
import Spline from './components/Solutions/Interpolation/Spline.tsx';
import Problems from './components/Problems/Problems.tsx'
import Regression from './components/Solutions/regression/Regression.tsx';
import SimpleRegression from './components/Solutions/regression/SimpleRegression.tsx';
import MultiLinearRegression from './components/Solutions/regression/MultiLinearRegression.tsx';
import Integration from './components/Solutions/Integration/Integration.tsx';
import Trapezoidal from './components/Solutions/Integration/Trapezoidal.tsx';
import CompositeTrapezoidal from './components/Solutions/Integration/CompositeTrapezoidal.tsx';
import Simpson from './components/Solutions/Integration/Simpson.tsx';
import CompositeSimpson from './components/Solutions/Integration/CompositeSimpson.tsx';
import Differentiation from './components/Solutions/Differentiation/Differentiation.tsx';
import Diff from './components/Solutions/Differentiation/Diff.tsx';


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
        path: 'problems',
        element: <Problems />,
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
            element: <Linear />,
            children:[
              {
                path: 'cramer',
                element: <Cramer />
              },
              {
                path: 'gausselimination',
                element: <GaussElimination />
              },
              {
                path: 'gaussjordan',
                element: <GaussJordan />
              },
              {
                path: 'matrixinverse',
                element: <MatrixInversion />
              },
              {
                path: 'ludecomposition',
                element: <Ludecomposition />
              },
              {
                path: 'choleskydecomposition',
                element: <Choleskydecomposition />
              },
              {
                path: 'jacobi',
                element: <Jacobi />
              },
              {
                path: 'gaussseidel',
                element: <Gaussseidel />
              },
              {
                path: 'conjugate',
                element: <Conjugate />
              }
            ]
          },
          {
            path: 'interpolation',
            element: <Interpolation />,
            children:[
              {
                path: 'newtondivided',
                element: <NewtonDivided />
              },
              {
                path: 'lagrange',
                element: <Lagrange />
              },
              {
                path: 'spline',
                element: <Spline />
              }
            ]
          },
          {
            path: 'regression',
            element: <Regression/>,
            children:[
              {
                path: 'simple',
                element: <SimpleRegression />
                
              },
              {
                path: 'multipleLinear',
                element: <MultiLinearRegression />
              }
            ]
          },
          {
            path: 'integration',
            element: <Integration/>,
            children:[
              {
                path: 'trapezoidal',
                element: <Trapezoidal />
              },
              {
                path: 'compositetrapezoidal',
                element: <CompositeTrapezoidal />
              },
              {
                path: 'simpson',
                element: <Simpson />
              },
              {
                path: 'compositesimpson',
                element: <CompositeSimpson />
              }
            ]
          },
          {
            path: 'differentiation',
            element: <Differentiation/>,
            children: [
              {
                path: 'diff',
                element: <Diff />
              }
            ]
          }
        ]
      },
    ],
  },
]);

export default router;
// export const domain = "https://numer-api.unknowkubbrother.net";
export const domain = "http://localhost:3000";

export const mainMenu = [
  {
    title: "Root of Equation",
    path: "../lobby/root",
    menu: [
      {
        title: 'graphical',
        path: '/lobby/root/graphical'
      },
      {
        title: 'bisection',
        path: '/lobby/root/bisection'
      },
      {
        title: 'falseposition',
        path: '/lobby/root/falseposition'
      },
      {
        title: 'onepoint',
        path: '/lobby/root/onepoint'
      },
      {
        title: 'newton',
        path: '/lobby/root/newton'
      },
      {
        title: 'secant',
        path  : '/lobby/root/secant'
      }
    ],
  },
  {
    title: "Linear Algebraic Equation",
    path: "../lobby/linear",
    menu: [
      {
        title: 'cramer',
        path: '/lobby/linear/cramer'
      },
      {
        title: 'gausselimination',
        path: '/lobby/linear/gausselimination'
      },
      {
        path: '/lobby/linear/gaussjordan',
        title: 'gaussjordan'
      },
      {
        path: '/lobby/linear/matrixinverse',
        title: 'matrixinverse'
      },
      {
        path: '/lobby/linear/ludecomposition',
        title: 'ludecomposition'
      },
      {
        path: '/lobby/linear/choleskydecomposition',
        title: 'choleskydecomposition'
      },
      {
        path: '/lobby/linear/jacobi',
        title: 'jacobi'
      },
      {
        path: '/lobby/linear/gaussseidel',
        title: 'gaussseidel'
      },
      {
        path: '/lobby/linear/conjugate',
        title: 'conjugate'
      }
    ],
  },
  {
    title: "Interpolation",
    path: "../lobby/interpolation",
    menu: [
      {
        path: '/lobby/interpolation/newtondivided',
        title: "Newton's Divided Difference"
      },
      {
        path: '/lobby/interpolation/lagrange',
        title: "Lagrange"
      },
      {
        path: '/lobby/interpolation/spline',
        title: "Spline"
      }
    ],
  },
  {
    title: "Regression",
    path: "../lobby/regression",
    menu: [
      {
        path: '/lobby/regression/simple',
        title: "SimpleRegression"
      },
      {
        path: '/lobby/regression/multipleLinear',
        title: "MultipleLinearRegression"
      }
    ],
  },
  {
    title: "Integration",
    path: "../lobby/integration",
    menu: [
      {
        path: '/lobby/integration/trapezoidal',
        title: "Trapezoidal Rule"
      },
      {
        path: '/lobby/integration/compositetrapezoidal',
        title: "Composite Trapezoidal Rule"
      },
      {
        path: '/lobby/integration/simpson',
        title: "Simpson's Rule"
      },
      {
        path: '/lobby/integration/compositesimpson',
        title: "Composite Simpson's Rule"
      }
    ],
  },
  {
    title: "Differentiation",
    path: "../lobby/differentiation",
    menu: [
      {
        path: '/lobby/differentiation/diff',
        title: "Differentiation"
      }
    ],
  },
];

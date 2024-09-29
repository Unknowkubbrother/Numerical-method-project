// App.js
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

// Matrix A for quadratic function: f(x, y) = [x y] A [x y]^T
const A = [
  [6, 0],   // Coefficients for x^2 and xy
  [0, -4],  // Coefficients for y^2 and xy
];

// Function to calculate f(x, y) using matrix multiplication
const calculateF = (x: number, y: number, A: number[][]) => {
  const vector = [x, y];
  let result = 0;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < A[i].length; j++) {
      result += vector[i] * A[i][j] * vector[j];
    }
  }
  return result;
};

function ConjugateGraph() {
  const [steps, setSteps] = useState<{x:number, y:number, z:number}[]>([]);

  useEffect(() => {
    // Simulate conjugate gradient steps
    const simulateConjugateGradient = () => {
      let x = 2; // Starting point x
      let y = 2; // Starting point y
      const stepData = [];
      for (let i = 0; i < 10; i++) {
        const fx = calculateF(x, y, A);
        stepData.push({ x, y, z: fx });
        // Update points (simplified conjugate gradient direction)
        x -= 0.2 * x;
        y -= 0.1 * y;
      }
      setSteps(stepData);
    };
    
    simulateConjugateGradient();
  }, []);

  // Create surface data for 3D plot
  const xValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
  const yValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
  const zValues = xValues.map((x) => yValues.map((y) => calculateF(x, y, A)));

  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <Plot className='w-full h-full justify-center items-center'
        data={[
          {
            z: zValues,
            x: xValues,
            y: yValues,
            type: 'surface',
            colorscale: 'Viridis',
          },
          {
            x: steps.map((s) => s.x),
            y: steps.map((s) => s.y),
            z: steps.map((s) => s.z),
            mode: 'lines+markers',
            type: 'scatter3d',
            marker: {
              color: 'red',
              size: 5,
            },
            line: {
              color: 'red',
              width: 2,
            },
            name: 'Conjugate Gradient Steps',
          },
        ]}
        layout={{
          title: 'Conjugate Gradient Optimization Path',
          scene: {
            xaxis: { title: 'X Axis' },
            yaxis: { title: 'Y Axis' },
            zaxis: { title: 'Z Axis (f(x, y))' },
          },
          margin: { t: 0, r: 0 },
          autosize: true,
        }}
        config={{
          scrollZoom: true,
        }}
      />
    </div>
  );
}

export default ConjugateGraph;

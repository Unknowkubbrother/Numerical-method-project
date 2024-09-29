// App.js
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

interface Props {
  matrixA: number[][];
  arrB: number[];
}

function ConjugateGraph(props : {data : Props}) {
  const [steps, setSteps] = useState<{x:number, y:number, z:number}[]>([]);
  
  const calculateFx = (x: number, y: number, matrixA: number[][], arrB: number[]) => {
    const a = matrixA[0][0];
    const b = matrixA[0][1];
    const c = matrixA[1][0];
    const d = matrixA[1][1];

    const e = arrB[0];
    const f = arrB[1];

    const result = 0.5 * (x * (a * x + y * c) + y * (x * b + y * d)) - e * x - f * y;

    return result;
  };

  useEffect(() => {
    // Simulate conjugate gradient steps
    const simulateConjugateGradient = () => {
      let x = 2; // Starting point x
      let y = 2; // Starting point y
      const stepData = [];
      for (let i = 0; i < 10; i++) {
        const fx = calculateFx(x, y, props.data.matrixA, props.data.arrB);
        console.log(`Step ${i + 1}: x=${x}, y=${y}, f(x, y)=${fx}`);
        stepData.push({ x, y, z: fx });
        // Update points (simplified conjugate gradient direction)
        x -= 0.2 * x;
        y -= 0.1 * y;
      }
      setSteps(stepData);
    };
    
    simulateConjugateGradient();
  }, [props.data.matrixA, props.data.arrB]);

  // Create surface data for 3D plot
  const xValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
  const yValues = [...Array(100).keys()].map((i) => -3 + i * 0.06);
  const zValues = xValues.map((x) => yValues.map((y) => calculateFx(x, y, props.data.matrixA, props.data.arrB)));

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

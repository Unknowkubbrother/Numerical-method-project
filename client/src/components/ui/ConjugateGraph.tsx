// App.js
import { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

interface Props {
  matrixA: number[][];
  arrB: number[];
}

function ConjugateGraph(props : {data : Props, type : string}) {
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
    const simulateConjugateGradient = () => {
      let x = 2;
      let y = 2;
      const stepData = [];
      for (let i = 0; i < 10; i++) {
        const fx = calculateFx(x, y, props.data.matrixA, props.data.arrB);
        stepData.push({ x, y, z: fx });
        x -= 0.2 * x;
        y -= 0.1 * y;
      }
      setSteps(stepData);
    };
    
    simulateConjugateGradient();
  }, [props.data.matrixA, props.data.arrB]);

  const xValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const yValues = [...Array(100).keys()].map((i) => -10 + i * 0.2);
  const zValues = xValues.map((x) => yValues.map((y) => calculateFx(x, y, props.data.matrixA, props.data.arrB)));

  const checkType = (): Partial<Plotly.Data>[] => {
    if (props.type == '3D') {
      return [{
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
          width:  2,
        },
        name: 'Conjugate Gradient Steps',
      }];
    } else {
      return [];
    }
  }

  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <Plot className='w-full h-full justify-center items-center'
        data={[
          {
            z: zValues,
            x: xValues,
            y: yValues,
            type: props.type == '2D' ? 'contour' : 'surface',
            colorscale: 'Jet',
          },
          ...checkType(),
        ]}
        layout={{
          title: 'Conjugate Gradient Optimization Path',
          scene: {
            xaxis: { title: 'X Axis' } ,
            yaxis: { title: 'Y Axis' },
            zaxis: { title: 'Z Axis (f(x, y))'},
          },
          dragmode: props.type == '3D' ? 'orbit' : 'pan',
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

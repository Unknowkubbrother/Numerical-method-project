
import Plot from 'react-plotly.js';

interface PropsGraph {
    mainGraph : {x: number, y: number}[]
    data : {x : number, y : number}[]
    points?: {x:number, y:number}[]
}

function GraphInterpolation(props : PropsGraph) {  
  
  return (
    <div className='w-full h-[800px] rounded-lg overflow-hidden'>
      <Plot className='w-full h-full justify-center items-center'
        data={
          [
          {
            x: props.mainGraph.map((item) => item.x),
            y: props.mainGraph.map((item) => item.y),
            mode: 'lines',
            line: {
              color: '#4db5ff',
              shape: 'spline',
              width: 2,
            },
            name: 'Main Graph',
          },
          ...props.data.map((item,index) => {
            return {
                x: [item.x],
                y: [item.y],
                mode: 'markers',
                name: `Result (x${index+1},y${index+1})`,
                marker: {
                color: '#7b00ff',
                size: 10,
                },
            }
            }),
            ...(props.points ?? []).map((item) => {
              return {
                  x: [item.x],
                  y: [item.y],
                  mode: 'markers',
                  name: `POINTS (${item.x},${item.y})`,
                  marker: {
                  color: 'red',
                  size: 10,
                  },
              }
              }),
        ]
      }
        layout={{
          margin: { t: 35, r: 0, b: 35, l: 35 },
          dragmode: 'pan',
          autosize: true,
        }}
        config={{
          scrollZoom: true,
        }}
      />
    </div>
  )
}

export default GraphInterpolation
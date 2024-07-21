import { useState,useEffect } from 'react';
import Plot from 'react-plotly.js';
import {GraphicalResponse} from '../../Interfaces/Graphicalmethods'

function Graph(props : {data : GraphicalResponse}) {  
  const [Data,setData] = useState<{x: number[], y: number[]}>({x:[],y:[]})

  useEffect(() => {
    const result = props?.data?.iterations?.map((item) => {
      return {x:item.x,y:item.y}
    }) || [];

    result.sort((a, b) => a.x - b.x);
    setData({x:result.map((item) => item.x), y:result.map((item) => item.y)})
  },[props])

  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <Plot className='w-full h-[98%] justify-center items-center'
        data={[
          {
            ...Data,
            mode: 'lines+markers',
            line: {
              color: '#4db5ff',
              width: 2,
            },
            marker: {
              color: '#e0416c',
            },
          }
        ]}
        layout={{
          margin: { t: 0, r: 0 },
          dragmode: 'pan',
          autosize: true,
        }}
      />
    </div>
  )
}

export default Graph
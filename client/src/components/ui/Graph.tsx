
import Plot from 'react-plotly.js';

function GraphInterpolation(props : {DataGraph : Plotly.Data[]}) {  
  
  return (
    <div className='w-full h-[800px] rounded-lg overflow-hidden'>
      <Plot className='w-full h-full justify-center items-center'
        data={
          props.DataGraph 
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
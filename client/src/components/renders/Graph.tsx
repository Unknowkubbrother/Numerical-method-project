import Plot from 'react-plotly.js';

function Graph() {  

  const Data = {
    x: [1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18],
    y: [32, 37, 40.5, 43, 49, 54, 59, 63.5, 69.5, 73, 74],
  }

  return (
    <div className='w-full h-full rounded-lg overflow-hidden'>
      <Plot className='w-full h-[98%] justify-center items-center'
        data={[
          Data
        ]}
        layout={ {margin: { t: 0, r: 0 },
        dragmode: 'pan' ,autosize:true} }
      />

    </div>
  )
}

export default Graph
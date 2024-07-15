import {useState} from 'react'
import React from 'react'
import Graph from '../../renders/Graph'

interface InputEquation {
  InputEquation : (equation : string) => void
}

function Graphicalmethods(props : InputEquation) {
  const [equation, setEquation] = useState('')

  const handleEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.InputEquation(e.target.value)
    setEquation(e.target.value)
    console.log(equation)
}


  return (
    <div className='w-full mt-5'>
        <div className='w-full flex gap-5'>
           <div className='w-[15%] flex flex-col gap-2 justify-start items-start'>
              <label className='font-semibold'>Equation</label>
              <input type="text" name="Equation" className='w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm' placeholder='43x-180' onInput={handleEquation}/>
              <label className='font-semibold'>X Start</label>
              <input type="number" name="xstart" className='w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm' placeholder='1.00'/>
              <label className='font-semibold'>X End</label>
              <input type="number" name="xend" className='w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm' placeholder='10.00'/>
              <label className='font-semibold'>Error threshold 
              𝜖</label>
              <input type="number" name="error" className='w-[180px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm' placeholder='0.000001'/>
              <button className='p-2 mt-2 bg-secondary rounded-lg hover:scale-105 duration-300'>Calculate!</button>
              
               

           </div>


           <div className='w-[70%] h-[550px] rounded-lg bg-white pt-5 px-5 flex flex-col'>
              <span className='text-gray-700 font-semibold'>Graph</span>
              <div className='w-full h-full'>
                     <Graph/>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Graphicalmethods
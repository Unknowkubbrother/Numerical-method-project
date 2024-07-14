import React from 'react'

function Root() {
  return (
    <div className='w-full mt-10 flex justify-start items-center gap-5'>
            <div className='flex flex-col gap-2'>
                <span>Solutions</span>
                <select className="select select-bordered w-[200px]">
                <option disabled selected>Who shot first?</option>
                <option>Han Solo</option>
                <option>Greedo</option>
                </select>
            </div>

            <div className='w-[700px] h-[100px] bg-background ml-[7rem] rounded-lg flex justify-center items-center'>
                <span className='text-xl font-semibold'>
                    <span>f(x)</span> = <span>x^2 - 4</span>
                </span>
            </div>
      </div>
  )
}

export default Root
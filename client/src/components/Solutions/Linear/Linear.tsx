
function Linear() {
  const array = [[1,2,3],[4,5,6],[7,8,9]];
  return (
    <div className='w-full h-[500px] bg-white flex justify-center items-center'>
      <div className={`w-[90%] h-[90%] p-5 grid gap-4 grid-flow-col auto-cols-auto`}>
          {array.map((_,idx1) => {
              return (
                array[idx1].map((_,idx2) => {
                  return (
                    <div className='w-full h-[100px] bg-sky-500'>
                      {array[idx1][idx2]}
                    </div>
                  )
                })
              )
      })}
       
      </div>
    </div>
  )
}

export default Linear
import {useEffect, useState} from 'react'

interface Values {
  x: number[] | undefined; 
  points: { x: number; y: number; selected: boolean; }[]; 
}

interface Props {
  getValues: (value : Values) => void;
}

const InputInterpolation = (props : Props) => {
  const [size, setSize] = useState<number>(3);
  const [countX, setCountX] = useState<number>(1);
  const [x, setX] = useState<number[]>([]);
  const [points, setPoints] = useState<{x: number, y: number, selected: boolean}[]>([]);

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = e.target.value as unknown as number;
    setSize(newSize);
  }

  const ChangeSize = (size: number) => {
    setPoints(prevPoints => {
      const newPoints = Array.from({ length: size }).map((_, index) => (
        prevPoints[index] || { x: 0, y: 0, selected: false }
      ));
      return newPoints;
    });
  }
  

  const ChangeCountX = (countX: number) => {
    setX(prevX => {
      const newX = Array.from({ length: countX }).map((_, index) => (
        prevX[index] || 0
      ));
      return newX;
    });
  }

  const SelectAll = () => {
    setPoints(v => {
      const newPoints = [...v];
      newPoints.map(point => {
        if (!point.selected){
          point.selected = true;
        }
      });
      return newPoints;
     });
  }

  const ClearSelectAll = () => {
    setPoints(v => {
      const newPoints = [...v];
      newPoints.map(point => {
        if (point.selected){
          point.selected = false;
        }
      });
      return newPoints;
     });
  }

  const handleCountXValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountX(e.target.value as unknown as number);
  }

  const handleXValue = (e: React.ChangeEvent<HTMLInputElement>, index : number) => {
    setX(v => {
      const newX = [...v];
      newX[index] = e.target.value as unknown as number;
      return newX;
    });
  }

  const handlePoints = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setPoints(v => {
      const newPoints = [...v];
      newPoints[index].selected = e.target.checked;
      return newPoints;
    });
  }

  const handlePointsValue = (e: React.ChangeEvent<HTMLInputElement>, index: number, key: string) => {
    if (key === 'x') {
      setPoints(v => {
        const newPoints = [...v];
        newPoints[index].x = e.target.value as unknown as number;
        return newPoints;
      });
    }
    if (key === 'y') {
      setPoints(v => {
        const newPoints = [...v];
        newPoints[index].y = e.target.value as unknown as number;
        return newPoints;
      });
    }
  }

  useEffect(() => {
    ChangeSize(size);
  },[size])

  useEffect(() => {
    ChangeCountX(countX);
  },[countX])

  useEffect(() => {
    props.getValues({x, points});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[points,x])

  return (
    <div className="w-full mt-10 flex justify-center items-center flex-col">
       <div className="flex gap-2 justify-center items-center">

          <div className="flex flex-col gap-2 justify-center items-center">
            <span>SIZE OF POINTS</span>
            <div className="flex gap-2">
              <button className="btn hover:bg-rose-400 hover:text-white" onClick={()=> {(size>1) && setSize(size-1)}}>-</button>
              <input
                type="number"
                className="rounded-md px-5 py-2 w-[150px] text-center"
                placeholder="N"
                value={size}
                onChange={handleSize}
              />
              <button className="btn hover:bg-green-400 hover:text-white" onClick={()=>setSize(size+1)}>+</button>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center items-center">
            <span>NUMBER OF FIND X</span>
            <div className="flex gap-2">
              <button className="btn hover:bg-rose-400 hover:text-white" onClick={()=> {(countX>1) && setCountX(countX-1)}}>-</button>
              <input
                type="number"
                className="rounded-md px-5 py-2 w-[150px] text-center"
                placeholder="N"
                value={countX}
                onChange={handleCountXValue}
              />
              <button className="btn hover:bg-green-400 hover:text-white" onClick={()=>setCountX(countX+1)}>+</button>
            </div>
          </div>

       </div>
       
       <div className='w-[500px] h-content p-3 bg-background mt-5 rounded-md flex flex-col'>

        {Array.from({length: size}).map((_, index) => 
          <div className="form-control" key={index}>
          <label className="cursor-pointer label">
            <input type="checkbox" className="checkbox checkbox-primary" 
            checked={points[index]?.selected} onChange={(e) => handlePoints(e, index)}
            />
            <span>{index+1}.</span>
            <div className='flex gap-3'>
              <input type="number" className="rounded-md px-5 py-2 w-[170px]"
                placeholder={`x${index}`}
                value={points[index]?.x}
                onChange={(e) => handlePointsValue(e, index, 'x')}
              />
              <input type="number" className="rounded-md px-5 py-2 w-[170px]"
                placeholder={`f(x${index})`}
                value={points[index]?.y}
                onChange={(e) => handlePointsValue(e, index, 'y')}
              />
            </div>
          </label>
        </div>
        )}

        <div className='flex gap-3 mt-5'>
          <button className='text-sm font-semibold bg-secondary w-[80px] h-[30px] rounded-md duration-300 hover:scale-105 hover:bg-primary text-white' onClick={SelectAll}>Select All</button>
          <button className='text-sm font-semibold bg-rose-400 w-[120px] h-[30px] rounded-md duration-300 hover:scale-105 hover:bg-rose-500 text-white' onClick={ClearSelectAll}>Clear Select All</button>
        </div>
       </div>

       

        <div className='w-[500px] mt-5 rounded-md p-3 flex gap-3 flex-wrap justify-center bg-background'>
          {Array.from({length: countX}).map((_, index) => 
            <div className="form-control" key={index}>
            <label className="cursor-pointer label flex flex-col gap-2">
              <span>X{index+1}</span>
              <input type="number" className="rounded-md px-5 py-2 w-[100px] text-center"
                placeholder={`x${index}`}
                value={x[index]}
                onChange={(e) => handleXValue(e, index)}
              />
            </label>
          </div>
          )}
        </div>
    </div>
  )
};

export default InputInterpolation;
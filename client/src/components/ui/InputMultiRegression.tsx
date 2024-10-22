import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {problemGetById} from '../../Api/problem'

interface Problem {
  type: string;
  solution: string;
  input: object;
  output?: object;
}

interface Values {
  x: number[][];
  points: { x: number[]; y: number; selected: boolean }[];
  k?: number;
}

interface Props {
  getValues: (value: Values) => void;
}

function InputMultiRegression(props: Props) {
  const [size, setSize] = useState<number>(3);
  const [countX, setCountX] = useState<number>(1);
  const [x, setX] = useState<number[][]>([]);
  const [k, setK] = useState<number>(1);
  const [points, setPoints] = useState<{ x: number[]; y: number; selected: boolean }[]>([]);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const Id = params.get('id');

  useEffect(() => {
    if (Id != null) {
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(problemGetById(Id));
        }, 1000);
      })
        .then((result: unknown) => {
          const data = result as Problem;
          const input = data.input as Values;
          if (input.points && input.x){
            setPoints(input.points);
            setSize(input.points.length);
            setX(input.x);
            setCountX(input.x.length);
            setK(input.k || 1);
          }
        })
        .catch((error) => {
          console.log(error)
        }); 
    }
  },[Id]);

  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSize = parseInt(e.target.value, 10);
    setSize(newSize);
  };

  const ChangeCountX = (countX: number) => {
    setX((prevX) => {
      const newX = Array.from({ length: countX }).map((_, index) => (
        prevX[index] || Array(k).fill(0)
      ));
      return newX;
    });
  };

  const ChangeSize = (size: number) => {
    setPoints((prevPoints) => {
      const newPoints = Array.from({ length: size }).map((_, index) => (
        prevPoints[index] || { x: Array(k).fill(0), y: 0, selected: false }
      ));
      return newPoints;
    });
  };

  const ChangeK = () =>{
    setPoints((prevPoints) => {
      const newPoints = prevPoints.map((point) => (
      point.x.length < k ? { ...point, x: [...point.x, 0] } : { ...point, x: point.x.slice(0, k) }
      ));
      return newPoints;
    });

    setX((prevX) => {
      const newX = prevX.map((x) => 
        x.length < k ? [...x, 0] : [...x.slice(0, k)]
      );
      return newX;
    });
  }

  const SelectAll = () => {
    setPoints((v) => {
      const newPoints = v.map((point) => ({ ...point, selected: true }));
      return newPoints;
    });
  };

  const ClearSelectAll = () => {
    setPoints((v) => {
      const newPoints = v.map((point) => ({ ...point, selected: false }));
      return newPoints;
    });
  };

  const handleCountXValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountX(e.target.value as unknown as number);
  };

  const handleCountKValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setK(e.target.value as unknown as number);
  };

  const handleXValue = (e: React.ChangeEvent<HTMLInputElement>, i: number, j: number) => {
    setX((v) => {
      const newX = [...v];
      newX[i][j] = e.target.value as unknown as number;
      return newX;
    });
  };

  const handlePoints = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    setPoints((v) => {
      const newPoints = [...v];
      newPoints[index].selected = e.target.checked;
      return newPoints;
    });
  };

  const handlePointsValue = (e: React.ChangeEvent<HTMLInputElement>, i: number, key: string, j?: number) => {
    if (key === 'x' && j !== undefined) {
      setPoints((v) => {
        const newPoints = [...v];
        newPoints[i].x[j] = e.target.value as unknown as number;
        return newPoints;
      });
    }
    if (key === 'y') {
      setPoints((v) => {
        const newPoints = [...v];
        newPoints[i].y = e.target.value as unknown as number;
        return newPoints;
      });
    }
  };

  useEffect(() => {
    ChangeSize(size);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  useEffect(() => {
    ChangeCountX(countX);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countX]);

  useEffect(() => {
    props.getValues({ x, points });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, x, k]);

  useEffect(() => {
    ChangeK();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [k]);

  return (
    <div className="w-full mt-10 flex justify-center items-center flex-col">
      <div className="flex gap-2 justify-center items-center">
        <div className="flex flex-col gap-2 justify-center items-center">
          <span>SIZE OF POINTS</span>
          <div className="flex gap-2">
            <button className="btn hover:bg-rose-400 hover:text-white" onClick={() => { size > 1 && setSize(size - 1); }}>-</button>
            <input
              type="number"
              className="rounded-md px-5 py-2 w-[150px] text-center"
              placeholder="N"
              value={size}
              onChange={handleSize}
            />
            <button className="btn hover:bg-green-400 hover:text-white" onClick={() => setSize(size + 1)}>+</button>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <span>K (Number of X)</span>
          <div className="flex gap-2">
            <button className="btn hover:bg-rose-400 hover:text-white" onClick={() => { k > 1 && setK(k - 1); }}>-</button>
            <input
              type="number"
              className="rounded-md px-5 py-2 w-[150px] text-center"
              placeholder="N"
              value={k}
              onChange={handleCountKValue}
            />
            <button className="btn hover:bg-green-400 hover:text-white" onClick={() => setK(k + 1)}>+</button>
          </div>
        </div>

        <div className="flex flex-col gap-2 justify-center items-center">
          <span>NUMBER OF FIND X</span>
          <div className="flex gap-2">
            <button className="btn hover:bg-rose-400 hover:text-white" onClick={() => { countX > 1 && setCountX(countX - 1); }}>-</button>
            <input
              type="number"
              className="rounded-md px-5 py-2 w-[150px] text-center"
              placeholder="N"
              value={countX}
              onChange={handleCountXValue}
            />
            <button className="btn hover:bg-green-400 hover:text-white" onClick={() => setCountX(countX + 1)}>+</button>
          </div>
        </div>
      </div>

      <div className='max-w-[650px] overflow-x-auto h-content p-3 bg-background mt-5 rounded-md flex flex-col'>
        {Array.from({ length: size }).map((_, index) =>
          <div className="form-control" key={index}>
            <label className="cursor-pointer label gap-5">
              <input type="checkbox" className="checkbox checkbox-primary"
                checked={points[index]?.selected} onChange={(e) => handlePoints(e, index)}
              />
              <span>{index + 1}.</span>
              <div className='flex gap-3'>
                {
                  Array.from({ length: k }).map((_, j) =>
                    <input type="number" className="rounded-md px-5 py-2 w-[100px] text-center"
                      placeholder={`x${j + 1}`}
                      value={points[index]?.x[j]}
                      onChange={(e) => handlePointsValue(e, index, 'x', j)}
                    />
                  )
                }
                <input type="number" className="rounded-md px-5 py-2 w-[100px] text-center"
                  placeholder={`f(x${index})`}
                  value={points[index]?.y}
                  onChange={(e) => handlePointsValue(e, index, 'y')}
                />
              </div>
            </label>
          </div>
        )}

        <div className='flex gap-3 mt-5'>
          <button className='text-sm font-semibold bg-secondary px-3 py-2 rounded-md duration-300 hover:scale-105 hover:bg-primary text-white' onClick={SelectAll}>Select All</button>
          <button className='text-sm font-semibold bg-rose-400 px-3 py-2 rounded-md duration-300 hover:scale-105 hover:bg-rose-500 text-white' onClick={ClearSelectAll}>Clear Select All</button>
        </div>
      </div>

      <div className='max-w-[650px] overflow-x-auto mt-5 rounded-md p-3 flex gap-3 flex-wrap justify-center bg-background'>
        {Array.from({ length: countX }).map((_, index) =>
          <div className="form-control" key={index}>
            <label className="cursor-pointer label flex flex-col gap-2">
              <span>X{index + 1}</span>
              <div className='flex gap-2'>
                {
                  Array.from({ length: k }).map((_, j) =>
                    <input type="number" className="rounded-md px-5 py-2 w-[100px] text-center"
                      placeholder={`x${j + 1}`}
                      value={x[index]?.[j]}
                      onChange={(e) => handleXValue(e, index, j)}
                    />
                  )
                }
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default InputMultiRegression;

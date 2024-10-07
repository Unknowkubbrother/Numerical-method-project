import { useEffect, useContext, useState } from "react";
import { MyFunctionContext } from "../../App";
import { mainMenu } from "../../Configs/Configs";
import { problemGetByType } from "../../Api/problem";
import { round } from 'mathjs';
import { MatrixFormat,ArrayFormat } from "../ui/MatrixFormat";
import { BlockMath } from "react-katex";

interface ProblemItem {
    _id: string;
    type: string;
    solution: string;
    createdAt: Date;
    input: object;
    output?: object;
}

interface RootRequest {
    xStart?: number;
    xEnd?: number;
    xL?: number;
    xR?: number;
    func?: string;
    errorFactor?: number;
    xInitial0?: number;
    xInitial1?: number;
    xInitial?: number;
}

interface LinearRequest {
    matrixA?: number[][];
    arrB?: number[];
    initialX?: number[];
    errorFactor?: number;
}

interface InterpolationRequest {
    x?: number[],
    points?: {
        x:number,
        y:number,
        selected: boolean
    }[]
    type?: string
}




function Problems() {
  const { setLoading, loading } = useContext(MyFunctionContext);
  const [selectedMenu, setselectedMenu] = useState(mainMenu[0].title);
  const [table, setTable] = useState<ProblemItem[]>([]);

  const handlerSetRouter = async (item: {
    title: string;
    path: string;
    menu: { title: string; path: string }[];
  }) => {
    setselectedMenu(item.title);
    const data = await problemGetByType(item.title);
    setTable(data);
  };

  useEffect(() => {
    handlerSetRouter(mainMenu[0]);
    setTimeout(() => {
      setLoading(false);
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onClickToCalulate = (_id : string) => {
    console.log(_id);

  }

  const renderTableRoot = () => {
    return (
      <table className="w-[80%] table caption-bottom m-auto">
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>Equation</th>
            <th>Result</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {table.map((item: ProblemItem, index) => {
            const result = item.output && (item.output as { result: { x: number } }).result;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#152836] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item._id)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{(item.input as RootRequest).func}</td>
                <td>{result && result.x ? round(result.x, 6) : 'N/A'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderTableLinear = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>MatrxiA</th>
            <th>ArrB</th>
            <th>InitialX</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {table.map((item: ProblemItem, index) => {
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#152836] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item._id)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{(item.input as LinearRequest).matrixA && <BlockMath math={MatrixFormat((item.input as LinearRequest).matrixA as number[][])}/>}</td>
                <td>{(item.input as LinearRequest).arrB && <BlockMath math={ArrayFormat((item.input as LinearRequest).arrB as number[])}/>}</td>
                <td>{(item.input as LinearRequest).initialX ? <BlockMath math={ArrayFormat((item.input as LinearRequest).initialX as number[])}/> : 'N/A'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderTableInterpolation = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>X</th>
            <th>Points</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {table.map((item: ProblemItem, index) => {
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#112330] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item._id)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{(item.input as InterpolationRequest).x && <BlockMath math={ArrayFormat((item.input as InterpolationRequest).x as number[])}/>}</td>
                {/* <td>{(item.input as LinearRequest).arrB && <BlockMath math={ArrayFormat((item.input as LinearRequest).arrB as number[])}/>}</td> */}
                <td>{(item.input as InterpolationRequest).points &&

                    (item.input as InterpolationRequest).points?.map((point, index) => {
                        return (
                        <div key={index} className="flex flex-col gap-3 flex-wrap">
                            {point.selected && <BlockMath math={ArrayFormat([point.x,point.y])} />}
                        </div>
                        )
                    })
                    
                }</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };


  

  return (
    (loading ? <></> : 
    <div className="w-full h-content mt-[90px]">
      <div className="w-full flex justify-center items-center">
        <h1 className="min-[340px]:text-2xl lg:text-4xl font-bold text-center flex gap-2 mt-10">
          <span>Numerical</span>
          <span>Methods</span>
          <span>Problems</span>
        </h1>
      </div>

      <div className="w-[70%] m-auto h-5 mt-10 flex justify-center items-center">
        <div className="min-[340px]:w-[75%] lg:w-[90%] 2xl:w-[70%] h-content m-auto list-none flex gap-5 justify-center items-center flex-wrap">
          {mainMenu.map(
            (
              item: {
                title: string;
                path: string;
                menu: { title: string; path: string }[];
              },
              index: number
            ) => {
              return (
                <button
                  className={`btn text-white hover:bg-primary hover:scale-105 ${
                    selectedMenu == item.title ? "bg-primary" : ""
                  }`}
                  key={index}
                  onClick={() => handlerSetRouter(item)}
                >
                  {item.title}
                </button>
              );
            }
          )}
        </div>
      </div>

      <div className="w-full m-auto mt-[5rem]">
        <div className="w-full h-[700px] rounded-md overflow-auto">
          {selectedMenu == 'Root of Equation' && renderTableRoot()}
          {selectedMenu == 'Linear Algebraic Equation' && renderTableLinear()}
          {selectedMenu == 'Interpolation' && renderTableInterpolation()}
        </div>
      </div>
    </div>
    )
  );
}

export default Problems;

import { useEffect, useContext, useState } from "react";
import { MyFunctionContext } from "../../App";
import { mainMenu } from "../../Configs/Configs";
import { problemGetByType } from "../../Api/problem";
import { round } from 'mathjs';
import { MatrixFormat,ArrayFormat } from "../ui/MatrixFormat";
import { BlockMath } from "react-katex";
import { useNavigate } from "react-router-dom";

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
    func: string;
    errorFactor: number;
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

export interface DifferentiationRequest {
  x: number;
  h : number;
  equation : string;
  order: 1 | 2 | 3 | 4 | number,
  oh: "h" | "h^2" | "h^4" | string,
  direction: "forward" | "backward" | "central" | string;
}



interface RegressionRequest {
  x?: number[],
  points?: {
      x:number,
      y:number,
      selected: boolean
  }[]
  M?: number
}

export interface IntegrationRequest {
  a : number;
  b : number;
  equation : string;
  n?: number;
}

function Problems() {
  const { setLoading, loading,setloadingSecond , loadingSecond} = useContext(MyFunctionContext);
  const [selectedMenu, setselectedMenu] = useState(mainMenu[0].title);
  const [table, setTable] = useState<ProblemItem[]>([]);
  const navigate = useNavigate();

  const handlerSetRouter = async (item: {
    title: string;
    path: string;
    menu: { title: string; path: string }[];
  }) => {
    setselectedMenu(item.title);
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(problemGetByType(item.title));
      }, 1000);
    })
      .then((result: unknown) => {
        const response = result as ProblemItem[];
        setTable(response);
        setloadingSecond(false);
      })
      .catch((error) => {
        console.error("Error loading data:", error);
        setloadingSecond(false);
      });
  };

  useEffect(() => {
    setLoading(false);
    handlerSetRouter(mainMenu[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const onClickToCalulate = (data : ProblemItem) => {
    mainMenu.forEach((item)=>{
      if (data.type == item.title){
        const menu = item.menu.filter((title) => {
          return title.path.split("/")[3] == data.solution;
        })[0];
        navigate(`${menu.path}?id=${data._id}`);
      }
    })
  }

  const renderTableRoot = () => {
    return (
      <table className="w-[80%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
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
          {(table &&
          table.map((item: ProblemItem, index) => {
            const result = item.output && (item.output as { result: { x: number } }).result;
            const input = item.input as RootRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#152836] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{input.func}</td>
                <td>{result && result.x ? round(result.x, 6) : 'N/A'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    );
  };

  const renderTableLinear = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }{ (!table) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>MatrixA</th>
            <th>ArrB</th>
            <th>InitialX</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {(table &&
          table.map((item: ProblemItem, index) => {
            const input = item.input as LinearRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#152836] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{input.matrixA && <BlockMath math={MatrixFormat(input.matrixA)}/>}</td>
                <td>{input.arrB && <BlockMath math={ArrayFormat(input.arrB)}/>}</td>
                <td>{input.initialX ? <BlockMath math={ArrayFormat(input.initialX)}/> : 'N/A'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    );
  };

  const renderTableInterpolation = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
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
        {(table &&
          table.map((item: ProblemItem, index) => {
            const input = item.input as InterpolationRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#112330] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{input.x && <BlockMath math={ArrayFormat(input.x)}/>}</td>
                <td>{input.points &&
                    input.points?.map((point, index) => {
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
          }))}
        </tbody>
      </table>
    );
  };

  
  const renderTableRegression = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>X</th>
            <th>Points</th>
            <th>M</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {(table &&
          table.map((item: ProblemItem, index) => {
            const input = item.input as RegressionRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#112330] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{input.x && <BlockMath math={ArrayFormat(input.x)}/>}</td>
                {/* <td>{(item.input as LinearRequest).arrB && <BlockMath math={ArrayFormat((item.input as LinearRequest).arrB as number[])}/>}</td> */}
                <td>{input.points &&

                    input.points?.map((point, index) => {
                        return (
                        <div key={index} className="flex flex-col gap-3 flex-wrap">
                            {point.selected && <BlockMath math={ArrayFormat([point.x,point.y])} />}
                        </div>
                        )
                    })
                    
                }</td>
                <td>{input.M}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    );
  };

  const renderTableIntegration = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>Equation</th>
            <th>a</th>
            <th>b</th>
            <th>n</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {(table &&
          table.map((item: ProblemItem, index) => {
            const input = item.input as IntegrationRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#112330] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td><BlockMath math={input.equation}/></td>
                <td>{input.a}</td>
                <td>{input.b}</td>
                <td>{input.n || 'N/A'}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    );
  };

  const renderTableDifferntiation = () => {
    return (
      <table className="w-[90%] table caption-bottom m-auto">
        { (!table.length) && <caption className="mt-4 text-sm text-muted-foreground">Data Not Found</caption> }
        <thead className="w-full bg-[#152836] border-b-2 border-sky-500 sticky top-0 z-50 text-center">
          <tr>
            <th>ID</th>
            <th>Solution</th>
            <th>Direction</th>
            <th>Order</th>
            <th>Oh</th>
            <th>Equation</th>
            <th>x</th>
            <th>h</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
        {(table &&
          table.map((item: ProblemItem, index) => {
            const input = item.input as DifferentiationRequest;
            return (
              <tr key={index} className={`cursor-pointer hover:bg-[#112330] duration-300 ${index % 2 == 1 && 'bg-[#1f2020]'}`} onClick={()=> onClickToCalulate(item)}>
                <td>{index + 1}</td>
                <td>{item.solution}</td>
                <td>{input.direction}</td>
                <td>{input.order}</td>
                <td>{input.oh}</td>
                <td><BlockMath math={input.equation}/></td>
                <td>{input.x}</td>
                <td>{input.h}</td>
                <td>
                  {new Date(item.createdAt).toLocaleDateString() + " " + new Date(item.createdAt).toLocaleTimeString()}
                </td>
              </tr>
            );
          }))}
        </tbody>
      </table>
    );
  };

  

  return (
    (loading ? <></> : 
    <div className={`w-full h-content mt-[90px] ${loadingSecond ? 'blur' : ''}`}>
      <div className="w-full flex justify-center items-center">
        <h1 className="min-[340px]:text-2xl lg:text-4xl font-bold text-center flex gap-2 mt-10">
          <span>Numerical</span>
          <span>Methods</span>
          <span>Problems</span>
        </h1>
      </div>

      <div className="w-full m-auto mt-10 flex justify-center items-center flex-col">
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

        {(table && table.length) ? (
        <div className="w-full h-content mt-10 flex justify-center items-center">
          {selectedMenu === "Root of Equation" && renderTableRoot()}
          {selectedMenu === "Linear Algebraic Equation" && renderTableLinear()}
          {selectedMenu === "Interpolation" && renderTableInterpolation()}
          {selectedMenu === "Regression" && renderTableRegression()}
          {selectedMenu === "Integration" && renderTableIntegration()}
          {selectedMenu === "Differentiation" && renderTableDifferntiation()}
        </div>
        ) :

          <div className="w-full flex justify-center items-center text-xl mt-10">Data Not found!!</div>
        }



      </div>
    </div>
    )
  );
}

export default Problems;

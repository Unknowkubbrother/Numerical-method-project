import { useOutletContext } from "react-router-dom";
import { ConjugateMethods, ConjugateResponse, ConjugateIterationData } from "../../../Methods/linearMethods/conjugate";
import { ArrayFormat } from "../../ui/MatrixFormat";
import { useState, useContext, useEffect, useRef } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import ConjugateGraph from "../../ui/ConjugateGraph";
import { createRoot, Root } from 'react-dom/client';

function Conjugate() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]; xi : number[] ; errorFactor: number},number,number]>();
  const [Result, setResult] = useState<ConjugateResponse | null>(null);
  const [typeseleted, settypeseleted] = useState<string>("2D");
  const graphRootRef = useRef<Root | null>(null);

  

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    const xi = Data.xi.map((col) => col);
    const errorFactor = Data.errorFactor;
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(ConjugateMethods(tempA, tempB, xi, errorFactor));
      }, 1000);
    })
      .then((result: unknown) => {
        const ConjugateResponse = result as ConjugateResponse;
        if (ConjugateResponse.statusCode === 200) {
          setResult(ConjugateResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: ConjugateResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", ConjugateResponse.error);
        }
        setloadingSecond(false);
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: "An error occured while processing your request.",
          icon: "error",
        });
        console.error("Error loading data:", error);
        setloadingSecond(false);
      });
  };

  const handleSetType = (type: string) => {
    settypeseleted(type);
  };

  const renderGraph = (result : ConjugateResponse | null) => {
    if (Data.matrixA.length == 2 && Data.matrixA[0].length == 2) {
      return (
        <div className="w-full mb-10">
          <ul className="bg-base-100 w-[170px] menu menu-horizontal rounded-md flex gap-2 m-auto justify-center items-center mb-2 mt-[-50px]">
            <li>
              <button
                className={`rounded-lg ${typeseleted === '2D' ? 'bg-sky-500' : ''}`}
                onClick={() => handleSetType('2D')}
              >
                <span>
                  2D
                  <i className="fa-solid fa-chart-simple ml-2"></i>
                </span>
              </button>
            </li>
            <li className="flex">
              <button
                className={`rounded-lg ${typeseleted === '3D' ? 'bg-sky-500' : ''}`}
                onClick={() => handleSetType('3D')}
              >
                <span>
                  3D
                  <i className="fa-solid fa-chart-simple ml-2"></i>
                </span>
              </button>
            </li>
          </ul>
          <div className="w-full h-[700px] flex justify-center items-center m-auto">
            <ConjugateGraph data={Data} type={typeseleted} result={result}/>
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  useEffect(() => {
    const graphContainer = document.getElementById("graphcontour");
    if (Result == null && graphRootRef.current != null) {
      setTimeout(() => {
        if (graphRootRef.current) {
          graphRootRef.current.unmount();
          graphRootRef.current = null;
        }
      }, 0.001);
    }
    if (graphContainer != null && Result != null) {
      if (!graphRootRef.current) {
        graphRootRef.current = createRoot(graphContainer);
      }
      graphRootRef.current.render(renderGraph(Result));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Result, typeseleted]);

  const renderResult = () => {
    return (
      <div className="w-full flex flex-col justify-center items-center">
        <div id="graphcontour" className="w-[90%]"></div>
        <div className="w-full flex flex-col">
          {Result &&
            <div className="w-full bg-background mb-10 m-auto rounded-xl text-center p-3">
              <h1 className="font-semibold pt-3">Result</h1>
              <div className="w-full flex gap-5 justify-center items-center m-2 flex-wrap">
                <div className="flex gap-3 justify-center items-center">
                  <BlockMath math={`\\therefore`} />
                  <BlockMath math="(" />
                  {
                    (Result.result.x.valueOf() as number[]).map((_, index) => {
                      return (
                        <BlockMath key={index} math={`x_{${index + 1}}${index < (Result.result.x.valueOf() as number[]).length - 1 ? ',' : ''}`} />
                      );
                    })
                  }
                  <BlockMath math=") \kern{5px} = " />
                  <BlockMath math="( " />
                  {
                    (Result.result.x.valueOf() as number[]).map((result, index) => {
                      return (
                        <BlockMath key={index} math={`\\small ${round(result, 6)}${index < (Result.result.x.valueOf() as number[]).length - 1 ? ',' : ''}`} />
                      );
                    })
                  }
                  <BlockMath math=")" />
                </div>
              </div>
            </div>
          }

          <div className="w-full rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="table table-zebra caption-bottom text-center">
                {/* head */}
                <thead className="bg-[#152836] border-b-2 border-sky-500 text-center">
                  <tr>
                    <th>iteration</th>
                    <th><BlockMath math="\lambda_{k-1}" /></th>
                    <th><BlockMath math="X_{k}" /></th>
                    <th><BlockMath math="R_{k}" /></th>
                    <th><BlockMath math="error_{k}" /></th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {Result?.iterations.map((iteration: ConjugateIterationData, index) => {
                    return (
                      <tr key={index}>
                        <td>{iteration.iter}</td>
                        <td>{iteration.lamda.toString()}</td>
                        <td><BlockMath math={(ArrayFormat(round(iteration.x.valueOf() as number[], 6)))} /></td>
                        <td><BlockMath math={(ArrayFormat(round(iteration.r.valueOf() as number[], 6)))} /></td>
                        <td><BlockMath math={`${iteration.error}`} /></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>


        </div>

      </div>
    );
  };

  return (
    <div className="w-[90%] h-full m-auto flex flex-col justify-center items-center">
      <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>
      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Conjugate gradient method</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-start items-center p-10 ${!Result ? "bg-background" : ""}`}
        >
          {Result ? renderResult() :
            <div className="font-semibold flex-warp">Please Enter Matrix</div>
          }
        </div>
      </div>
    </div>
  );
}

export default Conjugate;

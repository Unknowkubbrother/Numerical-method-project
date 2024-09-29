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
  const [Data, countCol, countRow] = useOutletContext<[{ matrixA: number[][]; arrB: number[] }, number, number]>();
  const [Result, setResult] = useState<ConjugateResponse | null>(null);
  const [TableArrXi, setTableArrXi] = useState<JSX.Element[]>([]);
  const [xi, setXi] = useState<number[]>([]);
  const [errorFactor, setErrorFactor] = useState<number>(0.000001);
  const [tempA, setTempA] = useState<number[][]>([]);
  const [tempB, setTempB] = useState<number[]>([]);
  const [typeseleted, settypeseleted] = useState<string>("2D");
  const graphRootRef = useRef<Root | null>(null);

  const createElemetArrXi = async (col: number) => {
    await setTableArrXi([]);
    await setXi(new Array(Number(col)).fill(0));
    if (col > 0 && col <= 10 && countRow > 0 && countRow <= 10) {
      setTimeout(() => {
        const tempArr = [];
        for (let i = 0; i < col; i++) {
          tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={i} placeholder={`x${i + 1}`}
            onInput={(event: React.ChangeEvent<HTMLInputElement>) => onInputArrXi(event, i)}
          />);
        }
        setTableArrXi(tempArr);
      }, 0.001);
    }
  }

  const onInputArrXi = (event: React.ChangeEvent<HTMLInputElement>, row: number) => {
    if (event.target.value) {
      const value: number = parseFloat(event.target.value);
      setXi(v => {
        const newArrB = [...v];
        newArrB[row] = value;
        return newArrB;
      });
    } else {
      setXi(v => {
        const newArrB = [...v];
        newArrB[row] = 0;
        return newArrB;
      });
    }
  }

  useEffect(() => {
    if (countCol > 0 && countRow > 0) {
      createElemetArrXi(countCol);
    }
  }, [countCol, countRow]);

  const handleSetError = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorFactor(e.target.value as unknown as number);
  };
  

  const sendRequest = async () => {
    setloadingSecond(true);
    setTempA(Data.matrixA.map((row) => row.map((col) => col)));
    setTempB(Data.arrB.map((col) => col));
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

  const renderGraph = () => {
    if (Data.matrixA.length === 2 && Data.matrixA[0].length === 2) {
      return (
        <div className="w-full mb-10">
          <ul className="bg-base-100 w-[170px] menu menu-horizontal rounded-md flex m-auto justify-center items-center mb-2 mt-[-50px]">
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
          <div className="w-[95%] h-[700px] flex justify-center items-center m-auto">
            <ConjugateGraph data={Data} type={typeseleted} />
          </div>
        </div>
      );
    }
    return <div></div>;
  };

  useEffect(() => {
    const graphContainer = document.getElementById("graphcontour");
    if (graphContainer != null) {
      if (!graphRootRef.current) {
        graphRootRef.current = createRoot(graphContainer);
      }
      graphRootRef.current.render(renderGraph());
    }
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
      <div className="flex gap-3 mt-5">{TableArrXi}</div>
      <div className="mt-5 flex flex-col gap-3">
        <label>Error threshold 𝜖</label>
        <input
          type="number"
          name="errorfactor"
          className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
          placeholder="10.00"
          onInput={handleSetError}
          value={errorFactor}
        />
      </div>
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

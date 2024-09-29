import { useOutletContext } from "react-router-dom";
import {GaussEliminationMethod , GaussEliminationResponse} from "../../../Methods/linearMethods/gaussElimination";
import { BlockMath } from "react-katex";
import { GaussFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";

function GaussElimination() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]}]>();
  const [Result, setResult] = useState<GaussEliminationResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(GaussEliminationMethod(tempA, tempB));
      }, 1000);
    })
      .then((result: unknown) => {
        const GaussEliminationResponse = result as GaussEliminationResponse;
        if (GaussEliminationResponse.statusCode === 200) {
          setResult(GaussEliminationResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: GaussEliminationResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", GaussEliminationResponse.error);
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

  const renderResult = () => {
    return (
       <div className="w-[70%] flex justify-center items-center flex-col">
        <div className="w-full">
            <BlockMath math='\color{#05acfa}\underline{Result}' />
            <div className="flex gap-3 justify-center items-center">
            <BlockMath math={`\\therefore`}/>
            <BlockMath math="("/>
            {Result?.result.map((_,index) => {
                return (
                  <BlockMath key={index} math={`x_{${index+1}}${index < Result.result.length - 1 ? ',' : ''}`}/>
                )
            })}
            <BlockMath math=") \kern{5px} = "/>
            <BlockMath math="( "/>
            {Result?.result.map((result,index) => {
                return (
                  <BlockMath key={index} math={`\\small ${round(result,6)}${index < Result.result.length - 1 ? ',' : ''}`}/>
                )
            })}
            <BlockMath math=")"/>
        </div>
        </div>
         <div className="w-full flex">
          <BlockMath math='\color{#02fa61} Forward' />
         </div>
            <div className="w-full flex flex-wrap justify-center items-center gap-10">
              
                {/* // default */}
                {Result && (
                    <BlockMath math={GaussFormat(Result.default.matrixA, Result.default.arrB,
                        [{ row: Result.iterations[0].i, col: Result.iterations[0].j }])}
                    />
                )}

                {/* // forward */}
            {Result?.iterations.map((iteration, index) => (
                <div key={index} className="font-semibold text-sm">
                    {iteration.type === "forward" && (
                    <div className="flex gap-5">
                        {index > 0 ? 
                            <BlockMath math={`\\Large \\xrightarrow{
                            {R_{${iteration.i+1}} = R_{${iteration.i+1}} - (\\frac{R_{${iteration.j+1}}}{${(iteration.matrixA ?? [])[iteration.j][iteration.j]}})  \\kern{3px} \\times}  \\kern{3px} (${Result?.iterations[index - 1]?.matrixA?.[iteration.i]?.[iteration.j] ?? ''})}`
                            }/>
                        : <BlockMath math={`\\Large \\xrightarrow{
                            {R_{${iteration.i+1}} = R_{${iteration.i+1}} - (\\frac{R_{${iteration.j+1}}}{${(iteration.matrixA ?? [])[iteration.j][iteration.j]}})  \\kern{3px} \\times  \\kern{3px}} (${Result?.default.matrixA[iteration.i][iteration.j]})}`
                            }/>
                        }

                        {iteration.matrixA && iteration.arrB && (
                        <BlockMath math={`

                            ${GaussFormat(
                            iteration.matrixA, 
                            iteration.arrB,
                            Result?.iterations[index + 1]?.type === "forward" ?
                            [{ row: Result?.iterations[index + 1]?.i ?? 0, col: Result?.iterations[index + 1]?.j ?? 0 }]
                            : []
                            )}

                            `} />

                        )}
                    </div>
                    
                )}
            </div>
            ))}

            {/* // backsub */}
            <div className="w-full flex">
                  <BlockMath math='\color{#02fa61} Back \kern{3px} Subtiution' />
            </div>
            <div className="w-full flex justify-center items-center flex-col">
                {Result?.iterations.map((iteration, index) => {
                    const lastForward = Result?.iterations.filter((value) => value.type === "forward").pop() || Result?.default;
                    if (iteration.type === "backsub" && lastForward ?.matrixA != undefined && lastForward?.arrB != undefined) {
                      return (
                        <div key={index} className="font-semibold text-sm flex gap-3 justify-center items-center">
                          <BlockMath math={`
                          x_{${iteration.i+1}} = \\frac{b_{${iteration.i+1}}^${iteration.i}
                          ${iteration.sumIdx !== undefined && iteration.sumIdx?.length > 0 ?
                            `- ${iteration.sumIdx?.map((value)=>{
                            return `a_{${iteration.i+1}${value+1}}^${iteration.i} x_{${value}}`
                            }).join(' - ')}`
                            :
                            ''
                          }
                          }{a_{${iteration.i+1}${iteration.i+1}}^${iteration.i}}
                          `}/>
                          <BlockMath math={
                          `= \\kern{3px} \\small\\frac
                          {${lastForward?.arrB[iteration.i]}
                          ${iteration.sumIdx !== undefined && iteration.sumIdx?.length > 0 ?
                            `- ${iteration.sumIdx?.map((value)=>{
                            return `(${lastForward?.matrixA?.[iteration.i]?.[value] ?? ''} \\times ${Result?.result[value]})`
                            }).join(' - ')}`
                            :
                            ''
                          }}
                          {${lastForward?.matrixA[iteration.i][iteration.i]}}
                           \\kern{3px} = \\kern{3px} ${iteration.value !== undefined ? round(iteration.value, 6) : ''}`}/>
                        </div>
                      )
                    }
                }
                )}
            </div>
        </div>
       </div>
    )
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
        <h1 className="text-xl font-semibold">GaussElimination</h1>
        <div
          className="w-full rounded-md h-content bg-background flex flex-col justify-start items-center p-10"
        >
            {Result ? renderResult() : 
             <div className="font-semibold flex-warp">Please Enter Matrix</div>
            }
        </div>
      </div>
    </div>
  );
}

export default GaussElimination;

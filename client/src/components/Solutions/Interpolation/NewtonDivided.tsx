import { useOutletContext } from "react-router-dom";
import {useState,useContext} from "react";
import { NewtonDividedMethod, NewtonDividedResponse } from "../../../Methods/InterpolationMethods/NewtonDivided";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import {round } from "mathjs";
import TableInterpolation from "../../ui/TableXY";
import GraphInterpolation from "../../ui/Graph";

interface Values {
  x: number[]; 
  points: { x: number; y: number; selected: boolean; }[]; 
}

function NewtonDivided() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<NewtonDividedResponse | null>(null);

  const sendRequest = async () => {
    if (!Data.x || !Data.points) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields.",
        icon: "error",
      });
      return;
    }
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(NewtonDividedMethod(Data.x, Data.points));
      }, 1000);
    })
      .then((result: unknown) => {
        const NewtonDividedResponse = result as NewtonDividedResponse;
        if (NewtonDividedResponse.statusCode === 200) {
          setResult(NewtonDividedResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: NewtonDividedResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", NewtonDividedResponse.error);
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

  const renderTable = () => {
    const data = Result?.iterations.map((item, index) => {
      return {
        x: item.Xi,
        y: Result.result[index]
      }
    });
    return (
      data ? <TableInterpolation data={{ iterations: data }} /> : null
    )
  }

  const renderGraph = () => {
    const mainGraph : {x : number , y : number }[] = Data.points.filter((point) => point.selected).map((point) => {
      return {
        x: point.x,
        y: point.y
      }
    })
    const data = Result?.iterations.map((item, index) => {
      return {
        x: item.Xi,
        y: Result.result[index]
    }
    });
    
    const plotly = [
      {
        x: mainGraph.map((item) => item.x),
        y: mainGraph.map((item) => item.y),
        mode: 'lines',
        line: {
          color: '#4db5ff',
          shape: 'spline',
          width: 2,
        },
        name: 'Main Graph',
      },
      ...(data ?? []).map((item,index) => {
        return {
            x: [item.x],
            y: [item.y],
            mode: 'markers',
            name: `Result (x${index+1},y${index+1})`,
            marker: {
            color: '#7b00ff',
            size: 10,
            },
        }
        })
    ]
    
    return (
      <GraphInterpolation DataGraph={plotly}/>
    )
  }

  const renderSolution = () => {
    return (
      <div className="w-full flex flex-col p-5">
        {Result && 
            <div className="w-full m-auto rounded-xl text-center p-3">
                <BlockMath math='\color{#05acfa}\underline{Result}' />
                <div className="w-full flex gap-5 justify-center items-center m-2 flex-wrap">
                <div className="flex gap-3 justify-center items-center">
                    <BlockMath math={`\\therefore`} />
                    <BlockMath math="(" />
                    {Result?.result.map((_, index) => {
                        return (
                            <BlockMath key={index} math={`y_{${index + 1}}${index < Result.result.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=") \kern{3px} = " />
                    <BlockMath math="( " />
                    {Result?.result.map((result, index) => {
                        return (
                            <BlockMath key={index} math={`\\small ${round(result, 6)}${index < Result.result.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=")" />
                </div>
                </div>
            </div>
            }

        <div className="flex flex-col gap-3 justify-start items-center">
          <span><BlockMath math="\color{#02fa61}Solution"/></span>
        </div>


            <div className="w-full flex flex-col justify-center items-center flex-wrap">
              {Result?.ctext.map((item, index) => {
                return (
                  <div className="flex flex-wrap" key={index}>
                    <BlockMath math={`C_{${index}} \\space = \\space \\left[\\footnotesize  {${item}}\\right]`} />
                  </div>
                  
                )
              })}
              </div>

              <div className="w-full flex justify-center items-center flex-wrap">
              {Result?.CIterations.map((item, index) => {
                return (
                  <div className="flex flex-wrap" key={index}>
                    <BlockMath math={`C_{${index}} = ${round(item,6)} ${index != Result.CIterations.length-1 ? `,  \\kern{5px}` : ``}`} />
                  </div>
                  
                )
              })}
              </div>


            <div className="w-[90%] m-auto flex flex-col gap-3">
              {Result?.iterations.map((item, index) => {
                return (
                  <div className="w-full flex flex-col justify-center items-center flex-wrap" key={index}>
                    <span><BlockMath math={`X_{${index+1}} \\kern{3px} = \\small \\color{#02fa61} ${item.Xi}`} /></span>
                    <div className="w-full flex justify-center items-center flex-wrap">
                      <BlockMath math={`f(\\color{#02fa61}x_{${index+1}}\\color{white}) \\kern{3px} = \\kern{3px}`} />
                      {
                          item.iteration.map((iteration, idx) => {
                            return (
                              <BlockMath key={idx} math={`\\small  C_{${idx}}${iteration.MutiOfSubtract.map((_,i)=>{
                                  return `\\small ${i != 0 ? `(x - x_{${i-1}})` : ''}`
                              }).join('')} ${idx != item.iteration.length-1 ? `\\kern{3px} + \\kern{3px}` : ``}`} />
                            )
                          })
                      }
                     </div>
                     <div className="w-full flex justify-center items-center flex-wrap">
                      <BlockMath math={`f(\\color{#02fa61}${item.Xi}\\color{white}) \\kern{3px} = \\kern{3px}`} />
                      {
                          item.iteration.map((iteration, idx) => {
                            return (
                              <BlockMath key={idx} math={`\\small  (${ round(iteration.C,6)})${iteration.MutiOfSubtract.map((sum,i)=>{
                                  return `\\small ${i != 0 ? `(${sum})` : ''}`
                              }).join('')} ${idx != item.iteration.length-1 ? `\\kern{3px} + \\kern{3px}` : ``}`} />
                            )
                          })
                      }
                      <BlockMath math={`\\kern{3px}  = \\kern{3px} \\color{red} ${round(Result.result[index],6)}`} />
                     </div>
                 </div>
                )
              })}

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
        <h1 className="text-xl font-semibold">Newton's Divided Difference</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${Result ? '' : 'bg-background'}`}
        >
            {Result ? 

            <div role="tablist" className="tabs tabs-lifted w-full">
              <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e] " aria-label="Solution" defaultChecked />
              <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderSolution()}
              </div>

              <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e]" aria-label="Table" />
              <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderTable()}
              </div>

              <input type="radio" name="my_tabs_2" role="tab" className="tab [--tab-bg:#16232e]" aria-label="Graph" />
              <div role="tabpanel" className="tab-content bg-background rounded-box">
                {renderGraph()}
              </div>
            </div>
            
            : 
             <div className="font-semibold">Please Enter Points and xValue</div>
            }
        </div>
      </div>
    </div>
  )
}

export default NewtonDivided;
import { useOutletContext } from "react-router-dom";
import {useState,useContext} from "react";
import { LagrangeMethod , LagrangeResponse} from "../../../Methods/InterpolationMethods/Lagrange";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import {round } from "mathjs";
import TableInterpolation from "../../ui/TableInterpolation";
import GraphInterpolation from "../../ui/GraphInterpolation";

interface Values {
  x: number[]; 
  points: { x: number; y: number; selected: boolean; }[]; 
}

function Lagrange() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<LagrangeResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(LagrangeMethod(Data.x, Data.points));
      }, 1000);
    })
      .then((result: unknown) => {
        const LagrangeResponse = result as LagrangeResponse;
        if (LagrangeResponse.statusCode === 200) {
          setResult(LagrangeResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: LagrangeResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", LagrangeResponse.error);
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
    return (
      <GraphInterpolation mainGraph={mainGraph} data={data || []}/>
    )
  }

  const renderSolution = () => {
    return (
      <div className="w-full flex flex-col p-5">
          {Result && 
            <div className="w-full bg-background m-auto rounded-xl text-center p-3">
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

          <div className="w-[90%] m-auto flex flex-col gap-3">
              {Result?.iterations.map((item, index) => {
                return (
                  <div className="w-full flex flex-col justify-center items-center flex-wrap" key={index}>
                    <span><BlockMath math={`X_{${index+1}} \\kern{3px} = \\small \\color{#02fa61} ${item.Xi}`} /></span>
                    <div className="w-full flex justify-center items-center flex-wrap">
                      {
                          item.iteration.map((itemL, idx) => {
                            return (
                              <div key={idx} className="flex flex-col">
                                <BlockMath  math={`\\small  L_{${idx}} \\kern{3px} = \\kern{3px} ${round(itemL.L,6)} ${idx != item.iteration.length-1 ? `, \\kern{3px}` : ``}`} />
                              </div>
                            )
                          })
                      }
                    </div>
                    <div className="w-full flex justify-center items-center flex-wrap">
                      <BlockMath math={`f(\\color{#02fa61}x_{${index+1}}\\color{white}) \\kern{3px} = \\kern{3px}`} />
                      {
                          item.iteration.map((_, idx) => {
                            return (
                              <div key={idx} className="flex flex-col">
                                <BlockMath  math={`\\small  L_{${idx}}(x) \\kern{1px}f(x_{${idx}}) ${idx != item.iteration.length-1 ? `\\kern{3px} + \\kern{3px}` : ``}`} />
                              </div>
                            )
                          })
                      }
                     </div>

                     <div className="w-full flex justify-center items-center flex-wrap">
                      <BlockMath math={`f(\\color{#02fa61}\\small${item.Xi}\\color{white}) \\kern{3px} = \\kern{3px}`} />
                      {
                          item.iteration.map((iter, idx) => {
                            return (
                              <div key={idx} className="flex flex-col">
                                <BlockMath  math={`\\small  (${round(iter.L,6)}) \\kern{1px} (${round(iter.Y,6)}) ${idx != item.iteration.length-1 ? `\\kern{3px} + \\kern{3px}` : ``}`} />
                              </div>
                            )
                          })
                      }
                        <BlockMath math={`\\kern{3px} = \\kern{3px} \\color{red} ${round(Result.result[index],6)}`} />
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
        <h1 className="text-xl font-semibold">Lagrange Interpolation</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-start items-center p-5 ${Result ? '' : 'bg-background'}`}
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

export default Lagrange;
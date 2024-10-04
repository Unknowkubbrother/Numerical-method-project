import { useOutletContext } from "react-router-dom";
import {useState,useContext} from "react";
import { SplineMethods, SplineResponse} from "../../../Methods/InterpolationMethods/spline";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import {round } from "mathjs";

interface Values {
  x: number[]; 
  points: { x: number; y: number; selected: boolean; }[]; 
}

function Lagrange() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<SplineResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(SplineMethods(Data.x, Data.points,"linear"));
      }, 1000);
    })
      .then((result: unknown) => {
        const SplineResponse = result as SplineResponse;
        if (SplineResponse.statusCode === 200) {
          console.log(SplineResponse);
          setResult(SplineResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: SplineResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", SplineResponse.error);
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
      <div className="w-full flex flex-col">
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
                            <BlockMath key={index} math={`\\small ${round(result.result, 6)}${index < Result.result.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=")" />
                </div>
                </div>
            </div>
            }




        <div className="flex flex-col gap-3 justify-start items-center">
          <span><BlockMath math="\color{#02fa61}Solution"/></span>
          {
            Result?.iterations.map((iteration, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <BlockMath math={`f_{\\color{#02fa61}${index+1}}(x) = \\small f(x_{\\color{red}${index}}) + m_{\\color{#02fa61}${index+1}}(x-x_{\\color{red}${index}}) \\kern{3px}; \\kern{10px} x_{\\color{#02fa61}${index}}\\le{x}\\le{x_{\\color{#02fa61}${index+1}}}`}/>
                  <BlockMath math={`f_{\\color{#02fa61}${index+1}}(x) = \\small ${round(iteration.fx,6)} + (${round(iteration.m,6)})(x-${round(iteration.offset,6)}) \\kern{3px}; \\kern{10px} ${round(iteration.slope.xi,6)}\\le{x}\\le{${round(iteration.slope.xi1,6)}}`}/>

                </div>
              )
            })
          }
        </div>
        
        <div className="flex flex-col gap-3 justify-start items-center">
          <span><BlockMath math="\color{#02fa61}Result \kern{5px} Each \kern{5px} x"/></span>
          {
            Result?.result.map((result, index) => {
              return (
                <div key={index} className="flex flex-col gap-3">
                  <span><BlockMath math={`X_{${index+1}} \\kern{3px} = \\small \\color{#02fa61} ${result.Xi}`} /></span>
                  <BlockMath math={`f_{\\color{#02fa61}${index+1}}(x_{${index+1}}) = \\small ${round(result.iteration.fx,6)} + ${round(result.iteration.m,6)}(x-${round(result.iteration.offset,6)}) ; \\kern{10px} ${round(result.iteration.slope.xi,6)}\\le{x}\\le{${round(result.iteration.slope.xi1,6)}}`}/>
                  <BlockMath math={`f_{\\color{#02fa61}${index+1}}(${round(result.Xi,6)}) = \\small ${round(result.iteration.fx,6)} + ${round(result.iteration.m,6)}(${round(result.Xi,6)}-${round(result.iteration.offset,6)}) = \\color{red}${round(result.result,6)}`}/>

                </div>
              )
            })
          }
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
          className="w-full rounded-md h-content bg-background flex flex-col justify-start items-center p-10"
        >
            {Result ? renderResult() : 
             <div className="font-semibold">Please Enter Points and xValue</div>
            }
        </div>
      </div>
    </div>
  )
}

export default Lagrange;
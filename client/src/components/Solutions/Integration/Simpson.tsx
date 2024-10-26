import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { MyFunctionContext } from "../../../App";
import {SimpsonMethods,SimpsonResponse} from "../../../Methods/integration/Simpson";
import Swal from "sweetalert2";
import { BlockMath } from "react-katex";

interface Values {
  a: number;
  b: number;
  equation: string;
  n?: number;
}

function Simpson() {
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<SimpsonResponse | null>(null);
  const { setloadingSecond } = useContext(MyFunctionContext);
  

  const sendRequest = async () => {
    if (!Data.a || !Data.b || !Data.equation) {
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
        resolve(SimpsonMethods(Data.a, Data.b, Data.equation));
      }, 1000);
    })
      .then((result: unknown) => {
        const SimpsonResponse = result as SimpsonResponse;
        if (SimpsonResponse.statusCode === 200) {
          setResult(SimpsonResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: SimpsonResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", SimpsonResponse.error);
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
      <div className="w-[95%] flex justify-center items-center flex-col">
          <h1 className="text-xl text-green-400">Solution</h1>
          <div className="flex flex-col justify-start items-start m-auto flex-wrap">
              <div className="flex justify-center items-center gap-5">
                <BlockMath math="Evaluate"/>
                <BlockMath math={`I \\kern{3px} = \\kern{3px} \\int_{a}^{b} f(x) \\kern{5px} dx = `}/>
                <BlockMath math={`\\int_{${Result?.result.a}}^{${Result?.result.b}} ${Result?.result.equation} \\kern{5px} dx`} />
              </div>
              <div className="flex justify-center items-center gap-5">
                <BlockMath math="Here"/>
                <div className="flex flex-col justify-start items-start">
                    <BlockMath math={`h \\kern{3px} = \\frac{b-a}{2} \\kern{3px} = \\kern{3px} \\frac{${Result?.result.h.text}}{2} \\kern{3px} = \\kern{3px} ${Result?.result.h.value}`} />
                </div>
              </div>
              <div className="flex flex-col justify-center items-start">
                  {
                    Result?.result.iterations.map((iteration, index) => (
                      <BlockMath key={index} math={`f(x_{${index}} = ${iteration.x} ) \\kern{5px} = \\kern{5px} ${iteration.text} = ${iteration.value}`} />
                    ))
                  }
                </div>
              <div className="flex justify-center items-center gap-5">
                <BlockMath math="Thus"/>
                <BlockMath math={`I \\kern{3px} = \\kern{3px} \\frac{h}{3}\\kern{5px}[f(x_{0})+4f(x_{1})+f(x_{2})] \\kern{3px} = \\kern{3px}
                    \\frac{${Result?.result.h.value}}{3}\\kern{5px}[${Result?.result.iterations[0].value}+ 4(${Result?.result.iterations[1].value}) +${Result?.result.iterations[2].value}] \\kern{3px} = \\kern{3px} ${Result?.result.result} \\kern{3px} \\color{red} \\#`}/>
              </div>
          </div>
      </div>
    );
  }

  

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>

      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Simpson's Rule</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${
            Result ? "bg-background" : "bg-background"
          }`}
        >
          {Result ? (
            renderResult()
          ) : (
            <div className="font-semibold">Please Enter Equation and A and B</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Simpson;
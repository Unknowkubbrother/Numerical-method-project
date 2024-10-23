import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { MyFunctionContext } from "../../../App";
import {
  CompositeTrapezoidalMethods,
  CompositeTrapezoidalResponse,
} from "../../../Methods/integration/CompositeTrapezoidal";
import Swal from "sweetalert2";
import { BlockMath } from "react-katex";

interface Values {
  a: number;
  b: number;
  equation: string;
  n: number;
}

function CompositeTrapezoidal() {
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<CompositeTrapezoidalResponse | null>(
    null
  );
  const { setloadingSecond } = useContext(MyFunctionContext);

  const sendRequest = async () => {
    if (!Data.a || !Data.b || !Data.equation || !Data.n) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all the fields.",
        icon: "error",
      });
      return
    }
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          CompositeTrapezoidalMethods(Data.a, Data.b, Data.equation, Data.n)
        );
      }, 1000);
    })
      .then((result: unknown) => {
        const CompositeTrapezoidalResponse =
          result as CompositeTrapezoidalResponse;
        if (CompositeTrapezoidalResponse.statusCode === 200) {
          setResult(CompositeTrapezoidalResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: CompositeTrapezoidalResponse.error,
            icon: "error",
          });
          console.error(
            "Error loading data:",
            CompositeTrapezoidalResponse.error
          );
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
            <BlockMath math="Evaluate" />
            <BlockMath
              math={`I \\kern{3px} = \\kern{3px} \\int_{a}^{b} f(x) \\kern{5px} dx = `}
            />
            <BlockMath
              math={`\\int_{${Result?.result.a}}^{${Result?.result.b}} ${Result?.result.equation} \\kern{5px} dx`}
            />
          </div>
        </div>
        <div className="flex justify-start items-center gap-5">
          <BlockMath math="Here" />
          <BlockMath math={`h \\kern{3px} = \\frac{b-a}{n} \\kern{3px} = \\kern{3px} \\frac{${Result?.result.h.text}}{${Result?.result.n}} \\kern{3px} = \\kern{3px} ${Result?.result.h.value}`} />
        </div>
        <div className="flex flex-col justify-start items-start">
          {Result?.result.iteartion.map((item, index) => (
            <BlockMath
              key={index}
              math={`f(x_{${index}} \\kern{3px} = ${item.x} \\kern{3px}) = ${item.text} = ${item.value}`}
            />
          ))}
        </div>

        <div className="flex flex-col justify-start items-center flex-warp">
              <BlockMath math="Thus"/>
              <BlockMath math={`I \\kern{3px} = \\kern{3px} \\frac{h}{2}\\kern{5px}(f(x_{0})+f(x_{${Result?.result.n}}) + 2\\sum_{i=1}^{${Result?.result.n}-1}f(x_{i})\\kern{3px})
              `}/>
              <BlockMath math={`= \\kern{3px} \\frac{${Result?.result.h.value}}{2}(\\kern{3px}
                ${Result?.result.iteartion[0].value} + ${Result?.result.iteartion[Result?.result.n].value} + 2\\kern{3px}(
                ${Result?.result.iteartion.map((item, index) => {
                  if(index === 0 || index === Result?.result.n) return '';
                  else if (index === Result?.result.n - 1) return `${item.value}`;
                  else return `${item.value} +`;
                }).join('')}\\kern{3px})
              \\kern{3px})`}/>

              <BlockMath math={`= \\kern{3px} ${Result?.result.result} \\kern{3px} \\color{red} \\#`}/>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>

      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Composite Trapezoidal Rule</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${
            Result ? "bg-background" : "bg-background"
          }`}
        >
          {Result ? (
            renderResult()
          ) : (
            <div className="font-semibold">
              Please Enter Equation and A and B and N
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompositeTrapezoidal;

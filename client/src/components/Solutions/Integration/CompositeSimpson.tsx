import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { MyFunctionContext } from "../../../App";
import {
  CompositeSimpsonMethods,
  CompositeSimpsonResponse,
} from "../../../Methods/integration/CompositeSimpson";
import Swal from "sweetalert2";
import { BlockMath } from "react-katex";

interface Values {
  a: number;
  b: number;
  equation: string;
  n: number;
}

function CompositeSimpson() {
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<CompositeSimpsonResponse | null>(null);
  const { setloadingSecond } = useContext(MyFunctionContext);

  const sendRequest = async () => {
    if (!Data.a || !Data.b || !Data.equation || !Data.n) {
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
        resolve(CompositeSimpsonMethods(Data.a, Data.b, Data.equation, Data.n));
      }, 1000);
    })
      .then((result: unknown) => {
        const CompositeSimpsonResponse = result as CompositeSimpsonResponse;
        if (CompositeSimpsonResponse.statusCode === 200) {
          setResult(CompositeSimpsonResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: CompositeSimpsonResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", CompositeSimpsonResponse.error);
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
      <div className="w-full flex justify-center items-center flex-col">
        <h1 className="text-xl text-green-400">Solution</h1>
        <div className="flex flex-col justify-center items-center m-auto flex-wrap">
          <div className="flex justify-center items-center gap-5 flex-wrap">
        <BlockMath math="Evaluate" />
        <BlockMath
          math={`I \\kern{3px} = \\kern{3px} \\int_{a}^{b} f(x) \\kern{5px} dx = `}
        />
        <BlockMath
          math={`\\int_{${Result?.result.a}}^{${Result?.result.b}} ${Result?.result.equation} \\kern{5px} dx`}
        />
          </div>
        </div>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <BlockMath math="Here" />
          <BlockMath
        math={`h \\kern{3px} = \\frac{b-a}{2(n)} \\kern{3px} = \\kern{3px} \\frac{${Result?.result.h.text}}{2(${Result?.result.n})} \\kern{3px} = \\kern{3px} ${Result?.result.h.value}`}
          />
        </div>
        <div className="flex flex-col justify-center items-start">
          {Result?.result.iteartion.map((item, index) => (
        <BlockMath
          key={index}
          math={`f(x_{${index}} \\kern{3px} = ${item.x} \\kern{3px}) = ${item.text} = ${item.value}`}
        />
          ))}
        </div>

        <div className="w-full flex flex-col justify-center items-center flex-wrap">
          <BlockMath math="Thus" />
          <BlockMath
        math={`I \\kern{3px} = \\kern{3px} \\frac{h}{3}\\kern{5px}[f(x_{0})+f(x_{${
          Result?.result.n ? Result.result.n * 2 : 0
        }}) + 4\\sum_{i=1,3,5}^{${
          Result?.result.n ? Result.result.n * 2 : 0
        } - 1}f(x_{i})\\kern{3px}+ 2\\sum_{i=2,4,6}^{${
          Result?.result.n ? Result.result.n * 2 : 0
        } - 2}f(x_{i})]
          `}
          />

          <div className="w-full flex flex-wrap justify-center items-center">
        <BlockMath
          math={`= \\kern{3px} \\frac{${Result?.result.h.value}}{3}
        [\\kern{3px}
        f(${Result?.result.iteartion[0].x}) + f(${
            Result?.result.iteartion[Result?.result.n * 2].x
          }) + 4 [
        ${Result?.result.iteartion
          .map((item, index) => {
            if (index % 2 != 0) {
          if (index === 0 || index === Result?.result.n * 2) return "";
          else if (index === Result?.result.n * 2 - 1)
            return `f(${item.x})`;
          else return `f(${item.x}) +`;
            }
          })
          .join("")}] + 2 [
        ${Result?.result.iteartion
          .map((item, index) => {
            if (index % 2 == 0) {
          if (index === 0 || index === Result?.result.n * 2) return "";
          else if (index === Result?.result.n * 2 - 2)
            return `f(${item.x})`;
          else return `f(${item.x}) +`;
            }
          })
          .join("")}]\\kern{3px}]
        `}
        />
          </div>

            <div className="w-full flex flex-wrap justify-center items-center">
            <BlockMath
              math={`= \\kern{3px} \\frac{${Result?.result.h.value}}{3}
              [\\kern{3px}
              ${Result?.result.iteartion[0].value} + ${
              Result?.result.iteartion[Result?.result.n * 2].value
              } + 4 [
              ${Result?.result.iteartion
              .map((item, index) => {
                if (index % 2 != 0) {
                if (index === 0 || index === Result?.result.n * 2) return "";
                else if (index === Result?.result.n * 2 - 1)
                  return `(${item.value})`;
                else return `(${item.value}) +`;
                }
              })
              .join("")}] + 2 [
              ${Result?.result.iteartion
              .map((item, index) => {
                if (index % 2 == 0) {
                if (index === 0 || index === Result?.result.n * 2) return "";
                else if (index === Result?.result.n * 2 - 2)
                  return `(${item.value})`;
                else return `(${item.value}) +`;
                }
              })
              .join("")}]\\kern{3px}]
              `}
            />
            </div>

          <BlockMath
        math={`= \\kern{3px} ${Result?.result.result} \\kern{3px} \\color{red} \\#`}
          />
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
        <h1 className="text-xl font-semibold">Composite Simpson's Rule</h1>
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

export default CompositeSimpson;

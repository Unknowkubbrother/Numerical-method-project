import { useOutletContext } from "react-router-dom";
import {
  CramerResponse,
  CramerMethod,
} from "../../../Methods/linearMethods/cramer";
import { BlockMath } from "react-katex";
import { DetFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";

function Cramer() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]}]>();
  const [Result, setResult] = useState<CramerResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(CramerMethod(Data.matrixA, Data.arrB));
      }, 1000);
    })
      .then((result: unknown) => {
        const cramerResponse = result as CramerResponse;
        if (cramerResponse.statusCode === 200) {
          setResult(cramerResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: cramerResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", cramerResponse.error);
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
      <div className="w-full flex flex-col gap-3">
        <BlockMath math="Result"/>
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
                  <BlockMath key={index} math={`${round(result,6)}${index < Result.result.length - 1 ? ',' : ''}`}/>
                )
            })}
            <BlockMath math=")"/>
        </div>
        <div className="flex justify-center items-center">
          <BlockMath
            math={`det(A) = ${Result?.defaultMatrixA ? DetFormat(Result.defaultMatrixA) : ''} = ${Result?.detA}`}
          />
        </div>
        <div className="flex justify-center items-center flex-col">
            {Result?.matrixAList.map((matrix, index) => {
                return (
                    <div key={index} className="flex justify-center items-center">
                        <BlockMath math={`{x_${index+1}} = \\frac{det({A_${index+1}})}{det(A)} = \\frac{${DetFormat(matrix)}}{${Result?.detA}} =  \\frac{${Result.detAi[index]}}{${Result.detA}} = ${round(Result.result[index],6)}`}/>
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
        <h1 className="text-xl font-semibold">Cramer's Rule</h1>
        <div
          className="w-full rounded-md h-content bg-background flex flex-col justify-start items-center p-10"
        >
            {Result && renderResult()}
        </div>
      </div>
    </div>
  );
}

export default Cramer;

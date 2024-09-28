import { useOutletContext } from "react-router-dom";
import { CholeskydecompositionMethod , CholeskydecompositionResponse} from "../../../Methods/linearMethods/Choleskydecomposition";
import { MatrixFormat,ArrayFormat,TextArrayFormat,LTMatrixFormat,LMatrixFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";

function Choleskydecomposition() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]}]>();
  const [Result, setResult] = useState<CholeskydecompositionResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(CholeskydecompositionMethod(tempA, tempB));
      }, 1000);
    })
      .then((result: unknown) => {
        const CholeskydecompositionResponse = result as CholeskydecompositionResponse;
        if (CholeskydecompositionResponse.statusCode === 200) {
          setResult(CholeskydecompositionResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: CholeskydecompositionResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", CholeskydecompositionResponse.error);
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

        <div className="w-[95%] flex justify-center items-center flex-col ">
            <div className="w-full">
                <BlockMath math='\color{#05acfa}\underline{Result}' />
                <div className="flex gap-3 justify-center items-center flex-wrap">
                    <BlockMath math={`\\therefore`} />
                    <BlockMath math="(" />
                    {Result?.result.map((_, index) => {
                        return (
                            <BlockMath key={index} math={`x_{${index + 1}}${index < Result.result.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=") \kern{5px} = " />
                    <BlockMath math="( " />
                    {Result?.result.map((result, index) => {
                        return (
                            <BlockMath key={index} math={`\\small ${round(result, 6)}${index < Result.result.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=")" />
                </div>
            </div>
                <BlockMath math="Solution"/>
            {
                Result?.iteration.map((item, index) => (
                    <div key={index} className="flex gap-3 justify-center items-center flex-wrap">
                        <BlockMath math={`{R_${item.row+1}} \\times {C_${item.col+1}} = `}/>
                        <BlockMath math={`{${item.type}_{${item.row+1}${item.col+1}}} =`}/>
                        <BlockMath math={`
                            ${item.divide ? `\\frac{
                                ${item.sumstart}
                                ${item.subtractofproduct.map((item1,idx)=>
                                    `${idx % 2 != 1 ? '-' : ''}({${item1.value}})${idx %2 != 1 ? `\\times` : ``}`
                                ).join('')
                                }}{${item.divide}}`
                                : `\\sqrt{${item.sumstart}
                                ${item.subtractofproduct.map((item1,idx)=>
                                    `${idx % 2 != 1 ? '-' : ''}({${item1.value}})${idx %2 != 1 ? `\\times` : ``}`
                                ).join('')}
                                }`}
                        `}/>
                        <BlockMath math="="/>
                        <BlockMath math={`= ${round(Result.matrixL[item.row][item.col],6)}`}/>
                    </div>
                ))
            }
            <div className="w-full font-semibold text-sm flex justify-center items-start flex-col mt-10">
                <div className="text-lg flex justify-center items-center gap-5">
                    <span>Cholesky Decomposition</span>
                    <BlockMath math="\begin{bmatrix}{L}\end{bmatrix}\begin{bmatrix}{L^{T}}\end{bmatrix} = \begin{bmatrix}{A}\end{bmatrix}"/>
                </div>
                {
                    (Result?.matrixL && Result?.matrixLT) && (
                        <div className="w-full flex flex-col justify-center items-center flex-wrap">
                            <div className="m-auto flex gap-5 justify-center items-center flex-wrap">
                                <div className="flex flex-col">
                                    <BlockMath math="\begin{bmatrix}{L}\end{bmatrix}"/>
                                    <BlockMath math={`${LMatrixFormat(Result?.matrixL)}`}/>
                                </div>
                                <div className="flex flex-col">
                                    <BlockMath math="\begin{bmatrix}{L^{T}}\end{bmatrix}"/>
                                    <BlockMath math={`${LTMatrixFormat( Result?.matrixLT)}`}/>
                                </div>
                            </div>
                            <div className="m-auto flex gap-5 justify-center items-center mt-10 flex-wrap">
                                <div className="flex flex-col">
                                    <BlockMath math="\begin{bmatrix}{L}\end{bmatrix}"/>
                                    <BlockMath math={`${MatrixFormat(Result?.matrixL)}`}/>
                                </div>
                                <div className="flex flex-col">
                                    <BlockMath math="\begin{bmatrix}{L^{T}}\end{bmatrix}"/>
                                    <BlockMath math={`${MatrixFormat( Result?.matrixLT)}`}/>
                                </div>
                            </div>
                        </div>

                    )
                }

                {/* // [L]{Y}={B} */}
                <div className="text-lg flex justify-center items-center gap-5 mt-5">
                    <span>From</span>
                    <BlockMath math="\begin{bmatrix}{L}\end{bmatrix}\begin{Bmatrix}{Y}\end{Bmatrix} = \begin{Bmatrix}{B}\end{Bmatrix}"/>
                </div>
                {
                    (Result?.matrixL && Result?.arrY && Result?.defaultMatrix.arrB) && (
                    <div className="w-full flex justify-center items-center flex-col">
                         <div className="m-auto flex gap-5 justify-center items-center flex-wrap">
                            <div className="flex flex-col">
                                <BlockMath math="\begin{bmatrix}{L}\end{bmatrix}"/>
                                <BlockMath math={`${MatrixFormat(Result?.matrixL)}\\kern{10px} \\times` }/>
                            </div>
                             <div className="flex flex-col">
                                <span className="mr-8">
                                <BlockMath math="\begin{Bmatrix}{Y}\end{Bmatrix}"/>
                                </span>
                                <BlockMath math={`${TextArrayFormat( Result?.arrY,"Y")} \\kern{10px} =`}/>
                            </div>
                            <div className="flex flex-col">
                                <BlockMath math="\begin{Bmatrix}{B}\end{Bmatrix}"/>
                                <BlockMath math={`${ArrayFormat( Result?.defaultMatrix.arrB)}`}/>
                            </div>
                        </div>
                        <div className="m-auto flex gap-5 justify-center items-center mt-5 flex-wrap">
                                <div className="flex justify-center items-start">
                                    <BlockMath math={`${TextArrayFormat( Result?.arrY,"Y")} \\kern{10px} = \\kern{10px}`}/>
                                    <BlockMath math={`${ArrayFormat( Result?.arrY)}`}/>
                                </div>
                        </div>
                    </div>

                    )
                }

                {/* // [LT]{X}={Y} */}
                <div className="text-lg flex justify-center items-center gap-5 mt-5">
                    <span>From</span>
                    <BlockMath math="\begin{bmatrix}{L^{T}}\end{bmatrix}\begin{Bmatrix}{X}\end{Bmatrix} = \begin{Bmatrix}{Y}\end{Bmatrix}"/>
                </div>
                {
                    (Result?.matrixLT && Result?.arrY && Result?.result) && (
                    <div className="w-full flex justify-center items-center flex-col flex-wrap">
                         <div className="m-auto flex gap-5 justify-center items-center flex-wrap">
                            <div className="flex flex-col">
                                <BlockMath math="\begin{bmatrix}{L^{T}}\end{bmatrix}"/>
                                <BlockMath math={`${MatrixFormat(Result?.matrixLT)}\\kern{10px} \\times` }/>
                            </div>
                             <div className="flex flex-col">
                                <span className="mr-8">
                                    <BlockMath math="\begin{Bmatrix}{X}\end{Bmatrix}"/>
                                </span>
                                <BlockMath math={`${TextArrayFormat( Result?.result,"X")} \\kern{10px} =`}/>
                            </div>
                            <div className="flex flex-col">
                                <BlockMath math="\begin{Bmatrix}{Y}\end{Bmatrix}"/>
                                <BlockMath math={`${ArrayFormat( Result?.arrY)}`}/>
                            </div>
                        </div>
                        <div className="m-auto flex gap-5 justify-center items-center mt-5 flex-wrap">
                                <div className="flex justify-center items-start">
                                    <BlockMath math={`${TextArrayFormat( Result?.result,"X")} \\kern{10px} = \\kern{10px}`}/>
                                    <BlockMath math={`${ArrayFormat( Result?.result)}`}/>
                                </div>
                        </div>
                    </div>

                    )
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
        <h1 className="text-xl font-semibold">Choleskydecomposition</h1>
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

export default Choleskydecomposition;

import { useOutletContext } from "react-router-dom";
// import { GaussJordanMethod,GaussJordanResponse } from "../../../Methods/linearMethods/gaussJordan";
import { MatrixInversionMethod, MatrixInversionResponse} from "../../../Methods/linearMethods/matrixInversion";
import { BlockMath } from "react-katex";
import { MatrixInversionFormat, MatrixFormat,ArrayFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";

function MatrixInversion() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]}]>();
  const [Result, setResult] = useState<MatrixInversionResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(MatrixInversionMethod(tempA, tempB));
      }, 1000);
    })
      .then((result: unknown) => {
        const MatrixInversionResponse = result as MatrixInversionResponse;
        if (MatrixInversionResponse.statusCode === 200) {
          setResult(MatrixInversionResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: MatrixInversionResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", MatrixInversionResponse.error);
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
                    <BlockMath math={`\\therefore`} />
                    <BlockMath math="(" />
                    {Result?.result.x.map((_, index) => {
                        return (
                            <BlockMath key={index} math={`x_{${index + 1}}${index < Result.result.x.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=") \kern{5px} = " />
                    <BlockMath math="( " />
                    {Result?.result.x.map((result, index) => {
                        return (
                            <BlockMath key={index} math={`\\small ${round(result, 6)}${index < Result.result.x.length - 1 ? ',' : ''}`} />
                        );
                    })}
                    <BlockMath math=")" />
                </div>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-10">
                {(Result && Result.iterations[0].i !== undefined && Result.iterations[0].j !== undefined) && (
                    <BlockMath math={MatrixInversionFormat(Result.default.matrixA, Result.default.matrixAIn,
                        [{ row: Result.iterations[0].i, col: Result.iterations[0].j }])}
                    />
                )}
                {Result?.iterations.map((iteration, index) => (
                    <div key={index} className="font-semibold text-sm">
                        <div className="flex gap-5">
                            {(index > 0) ?
                                (iteration.i !== undefined && iteration.j !== undefined ) && (
                                    (iteration.type == 'forward') ?
                                        <BlockMath math={`\\Large \\xrightarrow{
                                            {R_{${iteration.i + 1}} = R_{${iteration.i+1}} - (\\frac{R_{${iteration.j+1}}}{${(iteration.matrixA ?? [])[iteration.j][iteration.j]}})  \\kern{3px} \\times}  \\kern{3px} (${Result?.iterations[index - 1]?.matrixA?.[iteration.i]?.[iteration.j] ?? ''})}`
                                        } />
                                    :
                                    <BlockMath math={`\\Large \\xrightarrow{
                                        R_{${iteration.i + 1}} = \\frac{R_{${iteration.i+1}}}{${Result?.iterations[index - 1]?.matrixA?.[iteration.i]?.[iteration.j] ?? ''}}}`
                                    } />
                                )
                                :
                                (iteration.i !== undefined && iteration.j !== undefined) &&
                                <BlockMath math={`\\Large \\xrightarrow{
                                    {R_{${iteration.i + 1}} = R_{${iteration.i+1}} - (\\frac{R_{${iteration.j+1}}}{${(iteration.matrixA ?? [])[iteration.j][iteration.j]}})  \\kern{3px} \\times  \\kern{3px}} (${Result?.default.matrixA[iteration.i][iteration.j]})}`
                                } />
                            }
                              {iteration.matrixA && iteration.matrixAIn && (
                                <BlockMath math={`
                                    ${MatrixInversionFormat(
                                        iteration.matrixA,
                                        iteration.matrixAIn,
                                        [{ row: Result.iterations[index + 1]?.i ?? undefined, col: Result.iterations[index + 1]?.j ?? undefined }]
                                    )}
                                `} />
                            )}
                        </div>
                    </div>
                ))}
            </div>
            <div className="w-full font-semibold text-sm">
                {
                    (Result?.result.matrixAIn && Result?.result.arrB && Result.result.x) && (
                        <div className="m-auto flex gap-5 justify-center items-center">
                            <div className="flex flex-col">
                                <BlockMath math="\begin{bmatrix}{A^{-1}}\end{bmatrix}"/>
                                <BlockMath math={`${MatrixFormat(Result.result.matrixAIn)}`}/>
                            </div>
                            <BlockMath math="\large \times"/>
                            <div className="flex flex-col">
                                <BlockMath math="\begin{Bmatrix}B\end{Bmatrix}"/>
                                <BlockMath math={`${ArrayFormat(Result.result.arrB)}`}/>
                            </div>
                            <BlockMath math="\large ="/>
                            <div className="flex flex-col">
                                <BlockMath math="\begin{Bmatrix}X\end{Bmatrix}"/>
                                <BlockMath math={`${ArrayFormat(Result.result.x)}`}/>
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
        <h1 className="text-xl font-semibold">Matrix Inversion</h1>
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

export default MatrixInversion;

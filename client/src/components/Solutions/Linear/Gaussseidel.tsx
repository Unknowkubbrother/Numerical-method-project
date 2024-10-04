import { useOutletContext } from "react-router-dom";
import { GaussSeiDelMethod,GaussSeiDelResponse} from "../../../Methods/linearMethods/gaussseidel";
import { ArrayFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";

function Gaussseidel() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]; xi : number[] ; errorFactor: number},number,number]>();
  const [Result, setResult] = useState<GaussSeiDelResponse | null>(null);


  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    const xi = Data.xi.map((col) => col);
    const errorFactor = Data.errorFactor;
    new Promise((resolve) => {
      setTimeout(() => {
            resolve(GaussSeiDelMethod(tempA, tempB, xi,errorFactor));
      }, 1000);
    })
      .then((result: unknown) => {
        const GaussSeiDelResponse = result as GaussSeiDelResponse;
        if (GaussSeiDelResponse.statusCode === 200) {
          setResult(GaussSeiDelResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: GaussSeiDelResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", GaussSeiDelResponse.error);
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
            <div className="w-full bg-background mb-10 m-auto rounded-xl text-center p-3">
                <h1 className="font-semibold pt-3">Result</h1>
                <div className="w-full flex gap-5 justify-center items-center m-2 flex-wrap">
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
            </div>
            }
            <div className="w-full bg-background mb-10 m-auto rounded-lg text-center p-3">
                <h1 className="font-semibold pt-3">Solution</h1>
                {Result?.backsub.map((item, idx) => {
                    return (
                        <div key={idx}>
                            <BlockMath math={`
                                {x^{k+1}_{${idx+1}}} =
                                \\frac{${item.sumstart}
                                 ${item.sumIdx?.map((item) => {
                                    return `- (${(Result.default.matrixA[idx][item.x])} \\times x^{k${item.k ? `+${item.k}` : ``}}_{${item.x+1}}) `
                                 }).join('')}
                                }{
                                 ${(Result.default.matrixA[idx][idx])}
                                }
                                
                                
                                `}/>
                        </div>
                    )
                })}
            </div>
            <div className="w-full rounded-md overflow-hidden">
            <div className="overflow-x-auto">
            <table className="table table-zebra caption-bottom text-center">
                {/* head */}
                <thead className="bg-[#152836] border-b-2 border-sky-500 text-center">
                <tr>
                    <th>iteration</th>
                    <th>Xi</th>
                    <th>Error</th>
                </tr>
                </thead>
                <tbody className="text-center">
                {Result?.iterations.map((item : {x :number[],error : number[], iter: number},idx)=> {
                    return (
                        <tr key={idx}>
                        <td>{item.iter}</td>
                        <td><BlockMath math={(ArrayFormat(round(item.x,6)))}/></td>
                        <td><BlockMath math={(ArrayFormat(round(item.error,6)))}/></td>
                    </tr>
                    )}
                )}
                </tbody>
            </table>
            </div>
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
        <h1 className="text-xl font-semibold">Guass - Seidel Iteration Methods</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-start items-center p-10 ${!Result ? "bg-background" : ""}`}
        >
            {Result ? renderResult() : 
             <div className="font-semibold flex-warp">Please Enter Matrix</div>
            }
        </div>
      </div>
    </div>
  );
}

export default Gaussseidel;

import { useOutletContext } from "react-router-dom";
import { LudecompositionMethod, LudecompositionResponse} from "../../../Methods/linearMethods/Ludecomposition";
// import { BlockMath } from "react-katex";
// import { MatrixInversionFormat, MatrixFormat,ArrayFormat } from "../../ui/MatrixFormat";
import { useState,useContext } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";

function Ludecomposition() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data] = useOutletContext<[{ matrixA: number[][]; arrB: number[]}]>();
  const [Result, setResult] = useState<LudecompositionResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(LudecompositionMethod(tempA, tempB));
      }, 1000);
    })
      .then((result: unknown) => {
        const LudecompositionResponse = result as LudecompositionResponse;
        if (LudecompositionResponse.statusCode === 200) {
            console.log(LudecompositionResponse);
          setResult(LudecompositionResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: LudecompositionResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", LudecompositionResponse.error);
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
            <span>Solution</span>
            {
                Result?.iteration.map((item, index) => (
                    <div key={index} className="flex gap-3 justify-center items-center">
                        <BlockMath math={`{R_${item.row+1}} \\times {C_${item.col+1}} = `}/>
                        <BlockMath math={`{${item.type}_{${item.row+1}${item.col+1}}} =`}/>
                        <BlockMath math={`\\frac{{a_{${item.row+1}${item.col+1}}}
                            ${item.subtractofproduct.map((item1,idx)=>
                               `${idx % 2 != 1 ? '-' : ''}({${item1.type}_{${item1.i+1}${item1.j+1}}})${idx %2 != 1 ? `\\times` : ``}`
                            ).join('')}
                        }{${item.type == 'U' ? `{L_{${item.row+1}${item.row+1}}}` : `1`}}`}/>
                        <BlockMath math="="/>
                        <BlockMath math={`\\frac{{${Result.defaultMatrix.matrixA[item.row][item.col]}}
                            ${item.subtractofproduct.map((item1,idx)=>
                               `${idx % 2 != 1 ? '-' : ''}({${item1.value}})${idx %2 != 1 ? `\\times` : ``}`
                            ).join('')}
                        }{${item.type == 'U' ? `{${item.divide.value}}` : `1`}}`}/>
                        {item.type == 'L' ?
                        <BlockMath math={`= ${round(Result.matrixL[item.row][item.col],6)}`}/>
                        :
                        <BlockMath math={`= ${round(Result.matrixU[item.row][item.col],6)}`}/>
                        }
                    </div>
                ))
            }
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
        <h1 className="text-xl font-semibold">Ludecomposition</h1>
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

export default Ludecomposition;

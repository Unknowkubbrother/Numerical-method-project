import { useOutletContext } from "react-router-dom";
import { JacobiMethod,JacobiResponse} from "../../../Methods/linearMethods/Jacobi";
import { ArrayFormat } from "../../ui/MatrixFormat";
import { useState,useContext, useEffect } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";

function Jacobi() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data,countCol,countRow] = useOutletContext<[{ matrixA: number[][]; arrB: number[]},number,number]>();
  const [Result, setResult] = useState<JacobiResponse | null>(null);
  const [TableArrXi, setTableArrXi] = useState<JSX.Element[]>([]);
  const [xi, setXi] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorFactor, setErrorFactor] = useState<number>(0.000001);

    const createElemetArrXi = async(col : number)=>{
        await setTableArrXi([]);
        await setXi(new Array(Number(col)).fill(0));
        if(col > 0 && col <= 10 && countRow > 0 && countRow <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < col; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={i} placeholder={`x${i+1}`}
                    onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputArrXi(event, i)}
                    />);
                }
                setTableArrXi(tempArr);
            }, 0.001);
        }
    }

    const onInputArrXi = (event : React.ChangeEvent<HTMLInputElement>, row : number) => {
        if(event.target.value){
            const value : number = parseFloat(event.target.value);
            setXi(v => {
                const newArrB = [...v];
                newArrB[row] = value;
                return newArrB;
            });
        }else{
            setXi(v => {
                const newArrB = [...v];
                newArrB[row] = 0;
                return newArrB;
            });
        }
    }

    useEffect(() => {
        if (countCol > 0 && countRow > 0) {
            createElemetArrXi(countCol);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countCol,countRow]);

    const handleSetError = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFactor(e.target.value as unknown as number );
    };

  const sendRequest = async () => {
    setloadingSecond(true);
    const tempA = Data.matrixA.map((row) => row.map((col) => col));
    const tempB = Data.arrB.map((col) => col);
    new Promise((resolve) => {
      setTimeout(() => {
            resolve(JacobiMethod(tempA, tempB, xi,errorFactor));
      }, 1000);
    })
      .then((result: unknown) => {
        const JacobiResponse = result as JacobiResponse;
        if (JacobiResponse.statusCode === 200) {
            console.log(JacobiResponse);
          setResult(JacobiResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: JacobiResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", JacobiResponse.error);
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
                                 ${item.sumIdx?.map((i) => {
                                    return `- (${round(Result.default.matrixA[idx][i], 6)} \\times x^{k}_{${i+1}}) `
                                 }).join('')}
                                }{
                                 ${round(Result.default.matrixA[idx][idx], 6)}
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
                    <th>X</th>
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
        <div className="flex gap-3 mt-5">{TableArrXi}</div>
            <div className="mt-5 flex flex-col gap-3">
            <label>Error threshold 𝜖</label>
            <input
                    type="number"
                    name="errorfactor"
                    className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[200px] h-[30px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                    placeholder="10.00"
                    onInput={handleSetError}
                    value={errorFactor}
                />
         </div>
      <button
        className="min-[340px]:w-[250px] lg:w-[200px] mt-5 p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
        onClick={sendRequest}
      >
        Calculate!
      </button>
      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Jacobi Iteration Methods</h1>
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

export default Jacobi;

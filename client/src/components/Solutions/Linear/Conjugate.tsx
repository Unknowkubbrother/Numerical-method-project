import { useOutletContext } from "react-router-dom";
import { GaussSeiDelMethod,GaussSeiDelResponse} from "../../../Methods/linearMethods/gaussseidel";
import { ArrayFormat } from "../../ui/MatrixFormat";
import { useState,useContext, useEffect } from "react";
import { round } from "mathjs";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";
import { BlockMath } from "react-katex";
import ConjugateGraph from "../../ui/ConjugateGraph";

function Conjugate() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [Data,countCol,countRow] = useOutletContext<[{ matrixA: number[][]; arrB: number[]},number,number]>();
  const [Result, setResult] = useState<GaussSeiDelResponse | null>(null);
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
            resolve(GaussSeiDelMethod(tempA, tempB, xi,errorFactor));
      }, 1000);
    })
      .then((result: unknown) => {
        const GaussSeiDelResponse = result as GaussSeiDelResponse;
        if (GaussSeiDelResponse.statusCode === 200) {
          console.log(GaussSeiDelResponse);
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
        <div className="w-full flex flex-col justify-center items-center">
           <div className="w-[85%] h-[600px] flex justify-center items-center">
                <ConjugateGraph/>
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
        <h1 className="text-xl font-semibold">Conjugate gradient method</h1>
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

export default Conjugate;

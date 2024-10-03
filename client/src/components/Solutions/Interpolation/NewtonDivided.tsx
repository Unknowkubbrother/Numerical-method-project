import { useOutletContext } from "react-router-dom";
import {useState,useContext} from "react";
import { NewtonDividedMethod, NewtonDividedResponse } from "../../../Methods/InterpolationMethods/NewtonDivided";
import Swal from "sweetalert2";
import { MyFunctionContext } from "../../../App";

interface Values {
  x: number; 
  points: { x: number; y: number; selected: boolean; }[]; 
}

function NewtonDivided() {
  const { setloadingSecond } = useContext(MyFunctionContext);
  const [Data] = useOutletContext<[Values]>();
  const [Result, setResult] = useState<NewtonDividedResponse | null>(null);

  const sendRequest = async () => {
    setloadingSecond(true);
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(NewtonDividedMethod(Data.x, Data.points));
      }, 1000);
    })
      .then((result: unknown) => {
        const NewtonDividedResponse = result as NewtonDividedResponse;
        if (NewtonDividedResponse.statusCode === 200) {
          console.log(NewtonDividedResponse);
          setResult(NewtonDividedResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: NewtonDividedResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", NewtonDividedResponse.error);
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
        <h1 className="text-xl font-semibold">Newton's Divided Difference</h1>
        <div
          className="w-full rounded-md h-content bg-background flex flex-col justify-start items-center p-10"
        >
            {Result ? renderResult() : 
             <div className="font-semibold">Please Enter Points and xValue</div>
            }
        </div>
      </div>
    </div>
  )
}

export default NewtonDivided;
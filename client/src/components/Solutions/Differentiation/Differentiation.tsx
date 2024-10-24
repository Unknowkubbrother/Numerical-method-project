import { useState,useContext,useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BlockMath } from "react-katex";
import { MyFunctionContext } from "../../../App";
import Swal from "sweetalert2";
import {DifferentiationResponse , DifferentiationMethods, DifferentiationRequest} from "../../../Methods/Differentiation/Differentiation";
import {problemGetById,Problem} from '../../../Api/problem'
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const directionMenu : {
    [key : string] : string;
} = {
    "forward": "Forward",
    "backward": "Backward",
    "central": "Central"
}

// eslint-disable-next-line react-refresh/only-export-components
export const orderMenu : {
	[key: number]: string;
} = {
    1: 'First',
    2: 'Second',
    3: 'Third',
    4: 'Fourth'
}

// eslint-disable-next-line react-refresh/only-export-components
export const ohMenu : {
    [key : string] : string;
} = {
    "h": 'O(h)',
    'h^2': 'O(h^2)',
    'h^4': 'O(h^4)',
}

function Differentiation() {
    const [direction, setDirection] = useState<string>(Object.keys(directionMenu)[0]);
    const [order, setOrder] = useState<number>(Number(Object.keys(orderMenu)[0]));
    const [oh, setOh] = useState<string>(Object.keys(ohMenu)[0]);
    const [x, setX] = useState<number>();
    const [h, setH] = useState<number>();
    const [equation, setEquation] = useState<string>("");
    const [result, setResult] = useState<DifferentiationResponse | null>(null);
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const Id = params.get('id');

    useEffect(() => {
        if (Id != null) {
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(problemGetById(Id));
            }, 1000);
          })
            .then((result: unknown) => {
              const data = result as Problem;
              const input = data.input as DifferentiationRequest;
                if (input.x && input.h && input.equation && input.order && input.oh && input.direction){
                    setX(input.x);
                    setH(input.h);
                    setEquation(input.equation);
                    setOrder(input.order);
                    setOh(input.oh);
                    setDirection(input.direction);
                }
            })
            .catch((error) => {
              console.log(error)
            }); 
        }
      },[Id]);

    const handlerSetEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEquation(e.target.value);
    }

    const handlerSetX = (e: React.ChangeEvent<HTMLInputElement>) => {
        setX(e.target.value as unknown as number);
    }

    const handlerSetH = (e: React.ChangeEvent<HTMLInputElement>) => {
        setH(e.target.value as unknown as number);
    }

    const handlerSetOh = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOh(e.target.value);
    }

    const handlerSetOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setOrder(Number(e.target.value));
    }

    const handlerSetDirection = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setDirection(e.target.value);
    }

    const { setloadingSecond } = useContext(MyFunctionContext);

  const sendRequest = async () => {
    if (!x || !h || !equation || !order || !oh || !direction) {
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
        resolve(DifferentiationMethods(Number(x),Number(h),equation,Number(order),oh,direction));
      }, 1000);
    })
      .then((result: unknown) => {
        const DifferentiationResponse = result as DifferentiationResponse;
        if (DifferentiationResponse.statusCode === 200) {
          setResult(DifferentiationResponse);
          Swal.fire({
            title: "Success!",
            text: "Your have been success.",
            icon: "success",
          });
        } else {
          setResult(null);
          Swal.fire({
            title: "Error!",
            text: DifferentiationResponse.error,
            icon: "error",
          });
          console.error("Error loading data:", DifferentiationResponse.error);
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


    return (
        <div className="w-full flex justify-center items-center flex-col">
            <div className='w-full flex justify-center items-center flex-col mt-10'>
                <BlockMath math={`\\Large \\frac{d}{dx} \\space ${equation ? equation : `.\\kern{3px}.\\kern{3px}.`}`}/>

                <div className="w-full flex justify-center items-center gap-5 mt-10">
                    <div className="flex flex-col gap-2">
                        <span>Direction</span>
                        <select
                            className="select select-bordered w-[150px]"
                            value={direction}
                            onChange={handlerSetDirection}
                        >
                            {Object.entries(directionMenu).map(([key,item]) => {
                                return (
                                    <option key={item} value={key}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>Order</span>
                        <select
                            className="select select-bordered w-[150px]"
                            value={order}
                            onChange={handlerSetOrder}
                        >
                            {Object.entries(orderMenu).map(([key, item]) => {
                                return (
                                    <option key={item} value={key}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="flex flex-col gap-2">
                        <span>Oh</span>
                        <select
                            className="select select-bordered w-[150px]"
                            value={oh}
                            onChange={handlerSetOh}
                        >
                            {Object.entries(ohMenu).map(([key, item]) => {
                                return (
                                    <option key={item} value={key}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>
                <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col justify-center items-start">
                        <BlockMath math='f(x) = '/>
                        <input
                            type="text"
                            name="Equation"
                            className="w-[450px] h-[50px] px-3 py-3 bg-background rounded-xl text-white focus:outline-none focus:outline-primary text-sm"
                            placeholder="e^x"
                            onInput={handlerSetEquation}
                            value={equation}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center gap-5 h-[100px]">
                    <div className="h-full flex flex-col justify-center items-start">
                        <BlockMath math='x'/>
                        <input
                            type="text"
                            name="x"
                            className="w-[140px] h-[50px] px-3 py-3 bg-background rounded-xl text-white focus:outline-none focus:outline-primary text-sm"
                            placeholder="2"
                            onInput={handlerSetX}
                            value={x}
                        />
                    </div>
                    <div className="h-full flex flex-col justify-center items-start">
                        <BlockMath math='h'/>
                        <input
                            type="text"
                            name="h"
                            className="w-[140px] h-[50px] px-3 py-3 bg-background rounded-xl text-white focus:outline-none focus:outline-primary text-sm"
                            placeholder="0.25"
                            onInput={handlerSetH}
                            value={h}
                        />
                    </div>
                    <div className="h-full w-[140px] flex justify-center items-end mb-[5px]">
                        <button
                            className="w-full p-2 bg-secondary rounded-lg hover:scale-105 duration-300"
                            onClick={sendRequest}
                        >
                            Calculate!
                        </button>
                    </div>
                </div>

            </div>

            <div className="min-[340px]:w-[90%] lg:w-full m-auto">
                <Outlet context={[result]}/>
            </div>
        </div>
    );
}

export default Differentiation;

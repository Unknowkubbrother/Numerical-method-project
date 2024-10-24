import { useOutletContext } from "react-router-dom";
import {DifferentiationResponse,diffFormula} from "../../../Methods/Differentiation/Differentiation";
import { directionMenu , orderMenu , ohMenu } from "./Differentiation";
import { BlockMath } from 'react-katex';
import { parse } from "mathjs";

function Diff() {
    const [result] = useOutletContext<[DifferentiationResponse]>();
  
    const renderResult = () => {
        const func = diffFormula[result.defualt.direction][result.defualt.order][result.defualt.oh];
        const funcDiff = `f${"'".repeat(Number(result.defualt.order))}(x)`;
        return (
            <div className="w-[95%] flex justify-center items-center flex-col">
                <h1 className="text-xl text-green-400">Solution</h1>
                <BlockMath math={`
                ${orderMenu[result.defualt.order]}
                \\space
                ${directionMenu[result.defualt.direction]}
                \\space
                divided-different
                \\space
                error(${ohMenu[result.defualt.oh]})
                `}/>


                <div className='w-fit m-auto'>
                    <BlockMath math={`
                        f${"'".repeat(Number(result.defualt.order))}(x_i) =
                        \\dfrac
                        {${Object.keys(func)
                            .filter((key) => key !== "frac")
                            .sort((a, b) => Number(b) - Number(a))
                            .map((k,idx) => {
                                let xStr = 'f(x_{'
                                if (Number(k) === 0){
                                    xStr += 'i'
                                }else if (Number(k) > 0){
                                    xStr += `i+${Number(k)}`
                                }else{
                                    xStr += `i${Number(k)}`
                                }
                                xStr += '})'

                                let frac = ''
                                if (func[Number(k)] > 0 && idx > 0) frac = '+'
                                if (func[Number(k)] !== 1 && func[Number(k)] !== -1 ) frac += func[Number(k)]
                                if (func[Number(k)] === -1) frac += '-'
                                return `${frac}${xStr}`
                            }).join('')}
                            
                        }
                        {${func.frac}} \\\\~\\\\
                        f${"'".repeat(Number(result.defualt.order))}(${result.defualt.x}) =
                        \\dfrac{
                        ${Object.keys(result.fx)
                            .sort((a, b) => Number(b) - Number(a))
                            .map((k,idx) => {
                                const val = result.fx[Number(k)]
                                
                                let frac = ""
                                if (val > 0 && idx > 0) frac += "+"

                                return `${frac}${parseFloat(val.toFixed(6))}`

                            }).join('')
                        }
                        }
                        {${result.h}} \\\\~\\\\
						 = \\space ${result.result.toFixed(6)} \\space \\color{red}\\#
                    `}/>
                </div>

                <div className='w-fit m-auto'>
                    <BlockMath math={`
                        \\text{Exact Differentiation } 
                        \\\\~\\\\
                        f(x) = ${parse(result.defualt.equation).toTex()}
                        \\\\~\\\\
                        ${funcDiff} = ${parse(result.exactEquation).toTex()} 
                        \\\\~\\\\
						\\text{At } x = ${result.defualt.x}; \\space
						f${"'".repeat(Number(result.defualt.order))}(${result.defualt.x}) = ${result.exactResult.toFixed(6)} \\\\
                    `}
                    />
                </div>

                <div className='w-fit m-auto'>
                    <BlockMath math={`
						\\text{error = } \\left|
						\\dfrac{${funcDiff}_{true} - ${funcDiff}_{numerical}}{${funcDiff}_{true}}
						\\right| \\times 100 \\%
					`}/>
                </div>

                <div className='w-fit m-auto'>
                    <BlockMath math={`
						\\text{error = } \\left|
						\\dfrac{${result.exactResult.toFixed(6)} - ${result.result.toFixed(6)}}{${result.exactResult.toFixed(6)}}
						\\right| \\times 100 \\% =
                        ${(result.errorValue).toFixed(6)} \\%
					`}/>
                </div>
            </div>
        )
    }
  
  
    return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full h-content flex flex-col gap-5 mt-10">
        <h1 className="text-xl font-semibold">Differentiation</h1>
        <div
          className={`w-full rounded-md h-content flex flex-col justify-center items-center p-5 ${
            result ? "bg-background" : "bg-background"
          }`}
        >
          {result ? (
            renderResult()
          ) : (
            <div className="font-semibold">
              Please enter the function, and its parameters
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Diff
import {useState,useEffect} from 'react'
import {BlockMath} from "react-katex"

interface Values {
    a: number;
    b: number;
    equation : string;
    n?: number;
}

  
interface Props {
    getValues: (value : Values) => void;
}


function Inputintegration(props: Props) {
    const [a, setA] = useState<number>();
    const [b, setB] = useState<number>();
    const [equation, setEquation] = useState<string>('');
    const [n , setN] = useState<number>();


    const handleSetA = (e: React.ChangeEvent<HTMLInputElement>) => {
        setA(e.target.value as unknown as number);
    }

    const handleSetB = (e: React.ChangeEvent<HTMLInputElement>) => {
        setB(e.target.value as unknown as number);
    }

    const handleSetEquation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEquation(e.target.value);
    }

    const handleSetN = (e: React.ChangeEvent<HTMLInputElement>) => {
        setN(e.target.value as unknown as number);
    }


    useEffect(() => {
        if (a && b && equation) {
            props.getValues({a, b, equation, n});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [a, b, equation, n]);



  return (
    <div className='w-full flex justify-center items-center flex-col mt-10'>
        <div className='flex px-5 py-2'>
            <BlockMath math={`\\Large \\int^${b || 'b'}_{${a || 'a'}} ${equation || '\\space.\\space.\\space.'} \\kern{5px} dx
            `} />
        </div>

        <div className='flex flex-col justify-center items-center'>
            <div className="flex flex-col min-[340px]:items-center lg:justify-start lg:items-start">
                <BlockMath math='f(x) = '/>
                <input
                    type="text"
                    name="Equation"
                    className="min-[340px]:w-[170px] min-[667px]:w-[280px] md:w-[300px] lg:w-[250px] h-[50px] px-3 py-3 bg-background rounded-xl text-white focus:outline-none focus:outline-primary text-sm"
                    placeholder="4x^5-3x^4+x^3-6x+2"
                    onInput={handleSetEquation}
                    value={equation}
                />
                </div>

               <div className='flex justify-center items-center gap-5'>

                <div className="flex flex-col min-[340px]:items-center lg:justify-start lg:items-start">
                        <BlockMath math='a = x_{0}'/>
                        <input
                            type="text"
                            name="Equation"
                            className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[100px] h-[40px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                            placeholder="2"
                            onInput={handleSetA}
                            value={a}
                        />
                </div>

                <div className="flex flex-col min-[340px]:items-center lg:justify-start lg:items-start">
                        <BlockMath math='b = x_{1}'/>
                        <input
                            type="text"
                            name="Equation"
                            className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[100px] h-[40px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                            placeholder="8"
                            onInput={handleSetB}
                            value={b}
                        />
                </div>

                {location.pathname.split("/")[3] == "compositetrapezoidal" ||
                 location.pathname.split("/")[3] == "compositesimpson"
                 ?
                    <div className="flex flex-col min-[340px]:items-center lg:justify-start lg:items-start">
                            <BlockMath math='n'/>
                            <input
                                type="text"
                                name="Equation"
                                className="min-[340px]:w-[150px] min-[667px]:w-[280px] md:w-[300px] lg:w-[100px] h-[40px] px-2 py-3 bg-background rounded-md text-white focus:outline-none focus:outline-primary text-sm"
                                placeholder="2,4,6,.."
                                onInput={handleSetN}
                                value={n}
                            />
                    </div>
                    :
                    null
                }
                
                </div> 
        </div>
        

    </div>
  )
}

export default Inputintegration
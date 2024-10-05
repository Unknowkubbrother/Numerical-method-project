import {useEffect,useState, useImperativeHandle, forwardRef} from 'react'
import { BlockMath } from "react-katex";
import Swal from "sweetalert2";

interface TableMatrixProps {
    row : number;
    col : number;
    getValues: (matrixA:number[][], arrB:number[], xi : number[], errorFactor : number) => void;
}

const TableMatrix = forwardRef((props : TableMatrixProps, ref) => {
    const [TablematrixA, setTableMatrixA] = useState<JSX.Element[]>([]);
    const [TableArrX, setTableArrX] = useState<JSX.Element[]>([]);
    const [TableArrB, setTableArrB] = useState<JSX.Element[]>([]);
    const [matrixA, setMatrixA] = useState<number[][]>([]);
    const [arrB, setArrB] = useState<number[]>([]);
    const [TableArrXi, setTableArrXi] = useState<JSX.Element[]>([]);
    const [xi, setXi] = useState<number[]>([]);
    const [errorFactor, setErrorFactor] = useState<number>(0.000001);

    const createMatrix= (rowSize: number, colSize: number) => {
        const matrix = new Array(Number(rowSize));
        for (let i = 0; i < rowSize; i++) {
            matrix[i] = new Array(Number(colSize));
        }
        return matrix;
    };

    const createArr = (size: number) => {
        const arr = new Array(Number(size));
        return arr;
    }
    
    const createTableMatrixA = async (row : number, col : number) => {
        await setTableMatrixA([]);
        const newMatrix = createMatrix(row, col);
        await setMatrixA(newMatrix);
        if(row > 0 && row <= 10 && col > 0 && col <= 10){
            setTimeout(() => {
                const tempTablematrix = [];
                for (let i = 0; i < row; i++) {
                    const colelement = [];
                    for (let j = 0; j < col ; j++) {
                        colelement.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={j} placeholder={`a${i+1}${j+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputMartrixA(event, i, j)} value={newMatrix[i]?.[j]}/>);
                    }
                    tempTablematrix.push(<div className='flex justify-center items-center gap-2 mt-2' key={i}>{colelement}</div>);
                }
                setTableMatrixA(tempTablematrix);
            }, 0.001);
        }
    };

    const createArrX = async(col : number)=>{
        await setTableArrX([]);
        if(col > 0 && col <= 10 && props.row > 0 && props.row <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < col; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' disabled key={i} placeholder={`x${i+1}`}/>);
                }
                setTableArrX(tempArr);
            }, 0.001);
        }
    
    }
    

    const createArrB = async(row: number)=>{
        await setTableArrB([]);
        const newMatrix = createArr(row);
        await setArrB(newMatrix);
        if(row > 0 && row <= 10 && props.col > 0 && props.col <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < row; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={i} placeholder={`b${i+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputArrB(event, i)} value={newMatrix[i]}/>);
                }
                setTableArrB(tempArr);
            }, 0.001);
        }
    
    }

    const createElemetArrXi = async(col : number)=>{
        await setTableArrXi([]);
        const newMatrix = createArr(col);
        await setXi(newMatrix);
        if(col > 0 && col <= 10 && props.row > 0 && props.row <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < col; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={i} placeholder={`x${i+1}`}
                    onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputArrXi(event, i)}
                    value={newMatrix[i]}
                    />);
                }
                setTableArrXi(tempArr);
            }, 0.001);
        }
    }

    const onInputArrXi = (event : React.ChangeEvent<HTMLInputElement>, col : number) => {
        if(event.target.value){
            const value : number = parseFloat(event.target.value);
            setXi(v => {
                const newArrXi = [...v];
                newArrXi[col] = value;
                return newArrXi;
            });
        }else{
            setXi(v => {
                const newArrXi = [...v];
                newArrXi[col] = undefined as unknown as number;
                return newArrXi;
            });
        }
    }

    
    
    const onInputArrB = (event: React.ChangeEvent<HTMLInputElement>, row: number) => {
        if(event.target.value){
            const value : number = parseFloat(event.target.value);
            setArrB(v => {
                const newArrB = [...v];
                newArrB[row] = value;
                return newArrB;
            });
        }else{
            setArrB(v => {
                const newArrB = [...v];
                newArrB[row] = undefined as unknown as number;
                return newArrB;
            });
        }
    };

    const onInputMartrixA = (event: React.ChangeEvent<HTMLInputElement>, row: number, col : number) => {
        if(event.target.value){
            const value : number = parseFloat(event.target.value);
            setMatrixA(v => {
                const newMatrixValues = v.map(row => [...row]);
                newMatrixValues[row][col] = value;
                return newMatrixValues;
            });
        }else{
            setMatrixA(v => {
                const newMatrixValues = v.map(row => [...row]);
                newMatrixValues[row][col] = undefined as unknown as number;
                return newMatrixValues;
            });
        }
    };

    useImperativeHandle(ref, () => ({

        clearMatrix : async() => {
            await initialMatrix();
            Swal.fire({
                title: "Success!",
                text: "Clear Matrix Success!.",
                icon: "success",
              });
        }
    
    }));

    const clearMatrix = async () => {
        await setArrB([]);
        await setTableArrB([]);
        await setTableArrX([]);
        await setTableMatrixA([]);
        await setMatrixA([]);
        await setXi([]);
        await setTableArrXi([]);
    }
    
    const initialMatrix = async () => {
        if (props.row && props.col) {
            await createTableMatrixA(props.row, props.col);
            await createArrX(props.col);
            await createArrB(props.row);
            await createElemetArrXi(props.col);
    
        }else{
            await clearMatrix();
        }
    }

    const handleSetError = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorFactor(e.target.value as unknown as number );
    };

    const renderXiandError = () => {
        return (
            <div className='flex flex-col mt-10 justify-center items-center'>
                <div className='flex gap-2'>
                {TableArrXi}
            </div>
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
           </div>
        )
    }

    useEffect(() => {
        if (location.pathname.split("/")[3] != "jacobi" && location.pathname.split("/")[3] != "gaussseidel" && location.pathname.split("/")[3] != "conjugate"){
            createElemetArrXi(props.col);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname.split("/")[3]]);
    
    useEffect(() => {
        initialMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.row, props.col]);

    useEffect(() => {
        props.getValues(matrixA,arrB,xi,errorFactor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [matrixA,arrB,xi,errorFactor]);

  return (
    <div className='flex p-3 justify-center items-center flex-col'>
        <div className='flex justify-center items-center gap-2'>
            <div className='gap-3 rounded-md'>
                <span><BlockMath math={`\\begin{bmatrix} A \\end{bmatrix}`}/></span>
                {TablematrixA}
            </div>
            <div className='gap-3 rounded-md ml-2'>
                <span><BlockMath math={`\\{ X \\}`}/></span>
                <div className='flex flex-col gap-2'>
                {TableArrX}
                </div>
            </div>
            <span className='text-2xl mr-3 ml-3'> = </span>
            <div className='gap-3 rounded-md'>
                <span><BlockMath math={`\\{ B \\}`}/></span>
                <div className='flex flex-col gap-2'>
                {TableArrB}
                </div>
            </div>
        </div>
        {location.pathname.split("/")[3] == "jacobi" || location.pathname.split("/")[3] == "gaussseidel" || location.pathname.split("/")[3] == "conjugate" ? renderXiandError() : <div></div>}

    </div>
  )
})

export default TableMatrix;
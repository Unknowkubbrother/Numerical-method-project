import {useEffect,useState} from 'react'
import { BlockMath } from "react-katex";

function TableMatrix(props : {count : number}) {
    const [TablematrixA, setTableMatrixA] = useState<JSX.Element[]>([]);
    const [TableArrX, setTableArrX] = useState<JSX.Element[]>([]);
    const [TableArrB, setTableArrB] = useState<JSX.Element[]>([]);
    const [matrixA, setMatrixA] = useState<number[][]>([]);
    const [arrB, setArrB] = useState<number[]>([]);

    const createMatrix= (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize)).fill(0);
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize)).fill(0);
        }
        return matrix;
    };
    
    const createTableMatrixA = async (count : number) => {
        await setTableMatrixA([]);
        await setMatrixA(createMatrix(count));
        if(count > 0 && count <= 10){
            setTimeout(() => {
                const tempTablematrix = [];
                for (let i = 0; i < count; i++) {
                    const col = [];
                    for (let j = 0; j < count ; j++) {
                        col.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={j} placeholder={`a${i+1}${j+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputMartrixA(event, i, j)}/>);
                    }
                    tempTablematrix.push(<div className='flex justify-center items-center gap-2 mt-2' key={i}>{col}</div>);
                }
                setTableMatrixA(tempTablematrix);
            }, 0.001);
        }
    };
    const createArrX = async(count : number)=>{
        await setTableArrX([]);
        console.log(arrB);
        if(count > 0 && count <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < count; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' disabled key={i} placeholder={`x${i+1}`}/>);
                }
                setTableArrX(tempArr);
            }, 0.001);
        }
    
    }
    

    const createArrB = async(count : number)=>{
        await setTableArrB([]);
        await setArrB(new Array(Number(count)).fill(0));
        console.log(arrB);
        if(count > 0 && count <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < count; i++) {
                    tempArr.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={i} placeholder={`b${i+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputArrB(event, i)}/>);
                }
                setTableArrB(tempArr);
            }, 0.001);
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
                newArrB[row] = 0;
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
                newMatrixValues[row][col] = 0;
                return newMatrixValues;
            });
        }
    };

    useEffect(() => {
            createTableMatrixA(props.count);
            createArrX(props.count);
            createArrB(props.count);
    }, [props.count]);

    useEffect(() => {
        console.log(matrixA, arrB);
    }, [matrixA,arrB]);

  return (
    <div className='flex gap-1 p-3 justify-center items-center'>
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
  )
}

export default TableMatrix
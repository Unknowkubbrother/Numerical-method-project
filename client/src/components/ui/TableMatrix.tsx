import {useEffect,useState, useImperativeHandle, forwardRef} from 'react'
import { BlockMath } from "react-katex";
import Swal from "sweetalert2";

interface TableMatrixProps {
    row : number;
    col : number;
    getValues: (matrixA:number[][], arrB:number[]) => void;
}

const TableMatrix = forwardRef((props : TableMatrixProps, ref) => {
    const [TablematrixA, setTableMatrixA] = useState<JSX.Element[]>([]);
    const [TableArrX, setTableArrX] = useState<JSX.Element[]>([]);
    const [TableArrB, setTableArrB] = useState<JSX.Element[]>([]);
    const [matrixA, setMatrixA] = useState<number[][]>([]);
    const [arrB, setArrB] = useState<number[]>([]);

    const createMatrix= (rowSize: number, colSize: number) => {
        const matrix = new Array(Number(rowSize)).fill(0);
        for (let i = 0; i < rowSize; i++) {
            matrix[i] = new Array(Number(colSize)).fill(0);
        }
        return matrix;
    };
    
    const createTableMatrixA = async (row : number, col : number) => {
        await setTableMatrixA([]);
        await setMatrixA(createMatrix(row,col));
        if(row > 0 && row <= 10 && col > 0 && col <= 10){
            setTimeout(() => {
                const tempTablematrix = [];
                for (let i = 0; i < row; i++) {
                    const colelement = [];
                    for (let j = 0; j < col ; j++) {
                        colelement.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={j} placeholder={`a${i+1}${j+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputMartrixA(event, i, j)}/>);
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
        await setArrB(new Array(Number(row)).fill(0));
        if(row > 0 && row <= 10 && props.col > 0 && props.col <= 10){
            setTimeout(() => {
                const tempArr = [];
                for (let i = 0; i < row; i++) {
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

    useImperativeHandle(ref, () => ({

        clearMatrix() {
            initialMatrix();
            Swal.fire({
                title: "Success!",
                text: "Clear Matrix Success!.",
                icon: "success",
              });
        }
    
    }));

    const clearMatrix = () => {
        setArrB([]);
        setTableArrB([]);
        setTableArrX([]);
        setTableMatrixA([]);
        setMatrixA([]);
    }
    
    const initialMatrix = () => {
        if (props.row && props.col) {
            createTableMatrixA(props.row, props.col);
            createArrX(props.col);
            createArrB(props.row);
        }else{
            clearMatrix();
        }
    }

    useEffect(() => {
        initialMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.row, props.col]);

    useEffect(() => {
        props.getValues(matrixA,arrB);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
})

export default TableMatrix;
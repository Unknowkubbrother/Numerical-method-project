import {useEffect,useState} from 'react'

function TableMatrix(props : {count : number}) {
    const [Tablematrix, setTableMatrix] = useState<JSX.Element[]>([]);
    const [matrix, setMatrix] = useState<number[][]>([]);

    const createMatrix = (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize)).fill(0);
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize)).fill(0);
        }
        return matrix;
    };
    
    const createTableMatrix = async(count : number) => {
        if(count !== null && count !== undefined && count > 0 && count <= 10){
            const tempTablematrix = [];
            await setMatrix(createMatrix(count));
            for (let i = 0; i < count; i++) {
                const col = [];
                for (let j = 0; j < count ; j++) {
                    col.push(<input type="number" className='w-[70px] h-[70px] text-center rounded-md' key={j} placeholder={`a${i+1}${j+1}`} onInput={(event : React.ChangeEvent<HTMLInputElement> ) => onInputMartrix(event, i, j)}/>);
                }
                tempTablematrix.push(<div className='flex justify-center items-center gap-2 mt-2' key={i}>{col}</div>);
            }
            setTableMatrix(tempTablematrix);
        }else{
            await setTableMatrix([]);
            await setMatrix(createMatrix(count));
        }
    };

    const onInputMartrix = (event: React.ChangeEvent<HTMLInputElement>, row: number, col : number) => {
        if(event.target.value){
            const value = parseFloat(event.target.value);
            setMatrix(v => {
                const newMatrixValues = v.map(row => [...row]);
                newMatrixValues[row][col] = value;
                return newMatrixValues;
            });
        }else{
            setMatrix(v => {
                const newMatrixValues = v.map(row => [...row]);
                newMatrixValues[row][col] = 0;
                return newMatrixValues;
            });
        }
    };

    useEffect(() => {
            createTableMatrix(props.count);
    }, [props.count]);

    useEffect(() => {
        console.log(matrix);
    }, [matrix]);

  return (
    <div>
        <div className='p-3 gap-3 rounded-md'>
            {Tablematrix}
        </div>
    </div>
  )
}

export default TableMatrix
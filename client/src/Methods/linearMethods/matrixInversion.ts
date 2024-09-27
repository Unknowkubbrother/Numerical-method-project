import { round ,multiply} from "mathjs";

export interface MatrixInversionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface MatrixInversionResponse {
    result: {
        x: number[];
        matrixAIn: number[][];
        arrB: number[];
    };
    default: {
        matrixA: number[][];
        matrixAIn: number[][];
        arrB: number[];
      };
    iterations: MatrixInversionIteraion[];
	error?: string;
    statusCode: number;
}

interface MatrixInversionIteraion {
    type: "forward" | "backsub";
    i?: number;
    j?: number;
    matrixA?: number[][];
    matrixAIn?: number[][];
  }
  
  

export function MatrixInversionMethod(matrixA: number[][], arrB: number[]) : MatrixInversionResponse{

    const createMatrix = (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize));
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize));
        }
        return matrix;
    };

    const matrixAIn:number[][] = createMatrix(matrixA.length);

    for (let i = 0; i < matrixA.length; i++) {
		for (let j = 0; j < matrixA.length; j++) {
			matrixAIn[i][j] = 0;
			matrixAIn[i][j] = i == j ? 1 : 0;
		}
	}

    const result: MatrixInversionResponse = {
        default: {
          matrixA: matrixA.map((arr) => [...arr]),
          matrixAIn: matrixAIn.map((arr) => [...arr]),
          arrB: [...arrB],
        },
        result: {
            x: [],
            matrixAIn: [],
            arrB: [],
        },
        iterations: [],
        statusCode: 400,
      };

    for(let i = 0; i < matrixA.length; i++){
        for(let j = 0; j < matrixA.length; j++){
            if (i>j){
                    if (matrixA[i][j] == 0){
                        continue;
                    }
                    let tempMatrixA = [...matrixA[j]];
                    let tempMatrixAIn = [...matrixAIn[j]];
                    tempMatrixA = tempMatrixA.map((value) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    tempMatrixAIn = tempMatrixAIn.map((value) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    matrixAIn[i] = matrixAIn[i].map((value, index) => {
                        return value - tempMatrixAIn[index];
                    });
                    result.iterations.push({
                        type: "forward",
                        i: i,
                        j: j,
                        matrixA: round(matrixA.map((arr) => [...arr]),6),
                        matrixAIn: round(matrixAIn.map((arr) => [...arr]),6),
                    });
            }
        }
    }

    for(let i = matrixA[0].length - 1; i >= 0; i--){
        for(let j =  matrixA[0].length - 1; j >= 0; j--){
            if (i<j){
                    if (matrixA[i][j] == 0){
                        continue;
                    }
                    let tempMatrixA = [...matrixA[j]];
                    let tempMatrixAIn = [...matrixAIn[j]];
                    tempMatrixA = tempMatrixA.map((value) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    tempMatrixAIn = tempMatrixAIn.map((value) => {
                        return (value / matrixA[j][j]) * matrixA[i][j];
                    });
                    matrixA[i] = matrixA[i].map((value, index) => {
                        return value - tempMatrixA[index];
                    });
                    matrixAIn[i] = matrixAIn[i].map((value, index) => {
                        return value - tempMatrixAIn[index];
                    });
                    result.iterations.push({
                        type: "forward",
                        i: i,
                        j: j,
                        matrixA: round(matrixA.map((arr) => [...arr]),6),
                        matrixAIn: round(matrixAIn.map((arr) => [...arr]),6),
                    });
            }
        }
    }

    for(let i = 0; i < matrixA[0].length; i++){
        matrixAIn[i] = matrixAIn[i].map((value) => {
            return value / matrixA[i][i];
        });
        matrixA[i][i] /= matrixA[i][i];
        result.iterations.push({
            type: "backsub",
            i: i,
            j: i,
            matrixA: round(matrixA.map((arr) => [...arr]),6),
            matrixAIn: round(matrixAIn.map((arr) => [...arr]),6),
        });
    }


    result.result.arrB = arrB;
    result.result.matrixAIn = round(matrixAIn,6);
    result.result.x = multiply(matrixAIn, arrB).slice(0, matrixA[0].length);
    
    result.statusCode = 200;

    return result;



}
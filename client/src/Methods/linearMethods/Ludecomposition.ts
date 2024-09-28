import {round} from 'mathjs';

export interface LudecompositionRequest {
    matrixA: number[][], 
    arrB: number[]
}

export interface LudecompositionResponse {
    result: number[];
    defaultMatrix: {
        matrixA: number[][];
        arrB: number[];
    };
    matrixL: number[][];
    iteration : LudecompositionIteraion[];
    matrixU: number[][];
    arrY : number[];
	error?: string;
    statusCode: number;
}

interface LudecompositionIteraion {
    type: "L" | "U";
    row: number;
    col: number;
    sumstart: number;
    subtractofproduct: {
        type: "L" | "U";
        i: number;
        j: number;
        value: number;
    }[];
    divide: number
}
  

export function LudecompositionMethod(matrixA: number[][], arrB: number[]) : LudecompositionResponse{

    const result: LudecompositionResponse = { 
        result: [],
        defaultMatrix: {
            matrixA: matrixA.map((arr) => [...arr]),
            arrB: arrB.map((arr) => arr),
        },
        matrixL: [],
        iteration: [],
        matrixU: [],
        arrY: [],
        statusCode: 400
    };

    const createMatrix = (matrixSize: number) => {
        const matrix = new Array(Number(matrixSize));
        for (let i = 0; i < matrixSize; i++) {
            matrix[i] = new Array(Number(matrixSize));
        }
        return matrix;
    };

    const matrixL:number[][] = createMatrix(matrixA.length);
    const matrixU:number[][] = createMatrix(matrixA.length);

    for (let i = 0; i < matrixA.length; i++) {
		for (let j = 0; j < matrixA.length; j++) {
			matrixL[i][j] = 0;
			matrixU[i][j] = i == j ? 1 : 0;
		}
	}

    //LU = A
    for(let i=0; i < matrixA.length; i++){
        for(let j=0; j < matrixA.length; j++){
                let sum = matrixA[i][j];
                const sumstart = sum;
                const subtractofproduct: {i: number, j: number, value: number , type: "L"| "U"}[] = [];
                for(let k=0; k < i; k++){
                    sum -= matrixL[i][k] * matrixU[k][j];
                    if (j>0 ){
                        subtractofproduct.push({
                            type: "L",
                            i: i,
                            j: k,
                            value: round(matrixL[i][k], 6)
                        });
                        subtractofproduct.push({
                            type: "U",
                            i: k,
                            j: j,
                            value: round(matrixU[k][j], 6)
                        });
                    }
                }

                if (i >= j){
                    matrixL[i][j] = sum / matrixU[i][i];
                    result.iteration.push({
                        type: "L",
                        row: i,
                        col: j,
                        sumstart: sumstart,
                        subtractofproduct: subtractofproduct,
                        divide: round(matrixU[i][i])
                     });
                    
                }
                else{
                    matrixU[i][j] = sum / matrixL[i][i];
                    result.iteration.push({
                        type: "U",
                        row: i,
                        col: j,
                        sumstart: sumstart,
                        subtractofproduct: subtractofproduct,
                        divide: round(matrixL[i][i])
                     });
            }
        } 
    }

    result.matrixL = round(matrixL, 6);
    result.matrixU = round(matrixU, 6);

    //LY = B
    const arrY:number[] = new Array(arrB.length);
    for(let i = 0; i < matrixL.length; i++){
        let sum =  0;
        for(let j = 0; j < i; j++){
            sum += matrixL[i][j] * arrY[j];
        }
        arrY[i] = round((arrB[i] - sum) / matrixL[i][i], 6);
    }

    result.arrY = arrY;


    //UX = Y
    const arrX:number[] = new Array(arrY.length);
    for(let i = matrixU.length - 1; i >= 0; i--){
        let sum =  0;
        for(let j = matrixU.length - 1; j > i; j--){
            sum += matrixU[i][j] * arrX[j];
        }
        arrX[i] = round((arrY[i] - sum) / matrixU[i][i], 6);
    }

    result.result = arrX;

    result.statusCode = 200;

    return result;


}
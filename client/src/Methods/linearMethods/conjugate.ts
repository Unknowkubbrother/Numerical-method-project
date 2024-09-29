import { Matrix, MathArray , MathType } from 'mathjs';
import { add, multiply, transpose, sqrt , matrix, divide , round} from 'mathjs';


export interface ConjugateRequest {
    matrixA: number[][], 
    arrB: number[],
    initialX: number[],
    errorFactor: number
}

export interface ConjugateResponse {
    result: ConjugateIterationData;
    iter: number;
    iterations: ConjugateIterationData[];
    error?: string;
    statusCode: number;
}

export interface ConjugateIterationData {
	iter: number;
    lamda: number | MathType;
    x: number[] | MathArray | Matrix;
    r: number[] | MathArray | Matrix;
	error: number;
    alpha?: number | MathType;
    d: number[] | MathArray | Matrix;
}

export function ConjugateMethods(matrixA: number[][], arrB: number[], initialX: number[], errorFactor: number): ConjugateResponse {
    const result: ConjugateResponse = { 
        iter: 0,
        result: {
            iter: 0,
            lamda: 0,
            x: [],
            r: [],
            error: 0,
            alpha: 0,
            d: []
        },
        iterations: [],
        statusCode: 400
    };

    try{    
        const calculateDistance0 = (residualMatrix: Matrix) => {
            return multiply(-1, residualMatrix);
        };
    
        const calculateDistance = (
            residualMatrix: Matrix,
            distanceMatrix: Matrix,
            alpha: number | MathType
        ) => {
            const out = add(multiply(-1, residualMatrix), multiply(alpha, distanceMatrix));
            return out;
        };
    
    
        const calculateError = (arrR: Matrix | number[]): number => {
            const rTranspose = transpose(arrR) as Matrix;
            const error = Number(multiply(rTranspose, arrR));
            return Number(sqrt(error));
        }
        
        const calculateLamda = (arrD: Matrix | number[], arrR: Matrix | number[], matrixA: Matrix | number[][]): number => {
            const dT =transpose(arrD);
            const lamdaNumerator = Number(multiply(dT, arrR));
            const lamdaDenominator = Number(multiply(multiply(dT, matrixA), arrD));
            return Number(-1 * (lamdaNumerator / lamdaDenominator));
        }

        const calculateAlpha = (
            residualMatrix: Matrix,
            distanceMatrix: Matrix,
            matrixA: number[][] | Matrix
        ): MathType => {
            const rT = transpose(residualMatrix);
            const dT = transpose(distanceMatrix);
            const alpha = divide(
                multiply(multiply(rT, matrixA), distanceMatrix),
                multiply(multiply(dT, matrixA), distanceMatrix)
            );
    
            return alpha;
        };
    
        const calculateMatrixX = (
            arrX: number[] | Matrix,
            lambda: number | MathType,
            distanceMatrix: Matrix
        ): Matrix => {
            const out = add(arrX, multiply(lambda, distanceMatrix));
            return matrix(out);
        };
    
        const calculateResidual = (
            A: number[][] | Matrix,
            B: number[] | Matrix,
            X: number[] | Matrix
        ): Matrix => {
            const matrixA = matrix(A);
            const matrixB = matrix(B);
            const matrixX = matrix(X);
            const out : Matrix = add(multiply(matrixA, matrixX), multiply(matrixB, -1) as Matrix) as Matrix;
            return matrix(out) as Matrix;
        };
    
        let arrX : Matrix | number[] = initialX;
        let residualMatrix : Matrix = (calculateResidual(matrixA, arrB, arrX));
        let distanceMatrix : Matrix = calculateDistance0(residualMatrix);
        let iterations = 0;
        let error: number;
    
        do {
            iterations++;
    
            // Calculate lamda
            const lamda = calculateLamda(distanceMatrix, residualMatrix, matrixA);
    
            // Update x and r
            arrX = calculateMatrixX(arrX, lamda, distanceMatrix);
            residualMatrix = calculateResidual(matrixA, arrB, arrX);
    
            // Calculate alpha 
            const alpha : number | MathType = calculateAlpha(residualMatrix, distanceMatrix, matrixA);
    
            // Update d
            distanceMatrix = calculateDistance(residualMatrix, distanceMatrix, alpha);
    
            // Calculate error
            error = calculateError(residualMatrix);
    
            // Push iteration data
            result.iterations.push({
                iter: iterations,
                lamda: round(lamda, 6),
                x: round(arrX, 6),
                r: round(residualMatrix, 6),
                error: round(error, 6),
                alpha: round(alpha as number, 6),
                d: round(distanceMatrix, 6)
            });
    
        } while (error >= errorFactor);
    
        result.iter = iterations;
        result.result = result.iterations[result.iterations.length - 1];
        result.statusCode = 200;
    
        return result;
    }catch(e){
        console.log(e);
        result.statusCode = 400;
        result.error = "failed to solve matrix";
        return result;
    }
}

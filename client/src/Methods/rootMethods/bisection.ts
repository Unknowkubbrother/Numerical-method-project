import {evaluate,abs} from 'mathjs';

export interface BisectionRequest {
    xStart: number;
    xEnd: number;
    func: string;
    errorFactor: number;
}

export interface BisectionResponse {
    result: {
        x: number;
        y: number;
        error? : number;
    };
	iter: number;
	iterations?: { 
        x: number; 
        y: number;
        error?: number;
    }[];
	error?: string;
    statusCode: number;
}
  

export function bisectionMethod (xL: number, xR: number, func: string, errorFactor: number) : BisectionResponse{

    const result : BisectionResponse = {
        result: {
            x: 0,
            y: 0
        },
        iter: 0,
        iterations: [],
        statusCode: 400
    };

    if (!func || func.trim().length == 0){
        result.error = "Function is required";
        return result;
    }

    if (errorFactor <= 0){
        result.error = "errorFactor must be greater than 0";
        return result;
    }

    let oldXm :number = 0;
    let xM :number;
    let funcM :number;
    const MAX_ITER : number = 1000;

    while (result.iter < MAX_ITER) {
        xM = (xL + xR) / 2;
        const error : number = abs((xM - oldXm));
        funcM = evaluate(func, {x: Number(xM)});

        if (error == 0 || error < errorFactor){
            break;
        }

        result.iter++;
        result?.iterations?.push({ x: Number(xM), y: funcM , error: error} as { x: number; y: number, error: number});

        const facR = evaluate(func, {x: Number(xR)});

        if (funcM * facR > 0){
            xR = xM;
        }else{
            xL = xM;
        }

        oldXm = xM;

    }

    result.result = {
        x: result.iterations?.[result.iterations.length - 1]?.x ?? 0,
        y: result.iterations?.[result.iterations.length - 1]?.y ?? 0,
        error: result.iterations?.[result.iterations.length - 1]?.error ?? 0
    };
    
    result.statusCode = 200;

    return result;


}
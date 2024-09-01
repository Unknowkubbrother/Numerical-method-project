import {evaluate,derivative,abs} from 'mathjs';

export interface NewTonRequest {
    xInitial: number;
    func: string;
    errorFactor: number;
}

export interface NewTonResponse {
    result: {
        x: number;
        y: number;
        error?: number;
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
  

export function NewTonMethod (xInitial: number, func: string, errorFactor: number) : NewTonResponse{

    const result : NewTonResponse = {
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

    const calFuncdiff = (func: string, x: number): number => {
        return derivative(func, 'x').evaluate({x: x});
      }

    const calFunc = (func: string, x: number): number => {
        return evaluate(func, { x: x });
      }

    let x: number = xInitial;
    let error: number;
    let oldX: number;
    const MAX_ITER : number = 1000;

    do{
        oldX = x;

        x = oldX - (calFunc(func, oldX) / calFuncdiff(func, oldX));

        error = abs(x - oldX);

        result.iter++;
        result.iterations?.push({ x: oldX, y: x , error: error} as { x: number; y: number , error: number});

      }while(error != 0 && error > errorFactor && result.iter < MAX_ITER);

      result.result = {
        x: result.iterations?.[result.iterations.length - 1].x ?? 0,
        y: result.iterations?.[result.iterations.length - 1].y ?? 0,
        error: result.iterations?.[result.iterations.length - 1].error ?? 0
      };

    result.statusCode = 200;

    return result;

}
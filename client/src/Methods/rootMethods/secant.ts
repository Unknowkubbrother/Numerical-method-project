import {evaluate,abs} from 'mathjs';

export interface SecantRequest {
    xInitial0: number;
    xInitial1: number;
    func: string;
    errorFactor: number;
}

export interface SecantResponse {
    result: {
        x: number;
        y: number ;
        error?: number ;
    };
	iter: number;
	iterations?: { 
        x: number ;
        y: number ;
        error?: number ;
    }[];
	error?: string;
    statusCode: number;
}
  

export function SecantMethod (xInitial0: number, xInitial1: number, func: string, errorFactor: number) : SecantResponse{

    const result : SecantResponse = {
        result: {
            x: 0,
            y: 0,
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

    let x0: number = xInitial0;
    let x1: number = xInitial1;
    let error:number;
    let oldX: number;
    const MAX_ITER : number = 1000;

    const calFunc = (func: string, x: number): number => {
        return evaluate(func, { x: x });
    }

    const calX1 = (x0: number, x1: number, func: string): number => {
        return x1 - ((calFunc(func, x1) * (x0 - x1)) / (calFunc(func, x0) - calFunc(func, x1)));
    }

    do{
        oldX = x1;
        x1 = calX1(x0, x1, func);
        error = abs(x1 - oldX);
        x0 = oldX;

        result.iter++;
        result.iterations?.push({ x: x1, y: calFunc(func,x1), error: error} as { x: number, y:number, error: number});

      }while(error != 0 && error > errorFactor && result.iter < MAX_ITER);

      result.result = {
        x: result.iterations?.[result.iterations.length - 1].x  ?? 0,
        y: result.iterations?.[result.iterations.length - 1].y ?? 0,
        error: result.iterations?.[result.iterations.length - 1].error ?? 0
      };

    
    result.statusCode = 200;

    return result;

}
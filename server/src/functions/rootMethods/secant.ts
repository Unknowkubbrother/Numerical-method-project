import math from '../../lib/math';

export interface SecantRequest {
    xInitial0: number;
    xInitial1: number;
    func: string;
    errorFactor: number;
}

export interface SecantResponse {
    result: {
        xi_1: number;
        xi: number ;
        error?: number ;
    };
	iter: number;
	iterations?: { 
        xi_1: number ;
        xi: number ;
        error?: number ;
    }[];
	error?: string;
    statusCode: number;
}
  

export function SecantMethod (xInitial0: number, xInitial1: number, func: string, errorFactor: number) : SecantResponse{

    let result : SecantResponse = {
        result: {
            xi_1: 0,
            xi: 0,
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

    const calFunc = (func: string, x: number): number => {
        return math.evaluate(func, { x: x } as any);
    }

    const calX1 = (x0: number, x1: number, func: string): number => {
        return x1 - ((calFunc(func, x1) * (x0 - x1)) / (calFunc(func, x0) - calFunc(func, x1)));
    }

    do{
        oldX = x1;
        x1 = calX1(x0, x1, func);
        error = math.abs(x1 - oldX);
        x0 = oldX;

        result.iter++;
        result.iterations.push({ xi_1: x1, xi: oldX, error: error} as { xi_1: number, xi:number, error: number});

      }while(error != 0 && error > errorFactor);

      result.result = {
        xi_1: result.iterations[result.iterations.length - 1].xi_1,
        xi: result.iterations[result.iterations.length - 1].xi,
        error: result.iterations[result.iterations.length - 1].error
      };

    
    result.statusCode = 200;

    return result;

}
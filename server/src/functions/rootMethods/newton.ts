import math from '../../lib/math';

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

    let result : NewTonResponse = {
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
        return math.derivative(func, 'x').evaluate({x: x});
      }

    const calFunc = (func: string, x: number): number => {
        return math.evaluate(func, { x: x } as any);
      }

    let x: number = xInitial;
    let error: number;
    let oldX: number;

    do{
        oldX = x;

        x = oldX - (calFunc(func, oldX) / calFuncdiff(func, oldX));

        error = math.abs(x - oldX);

        result.iter++;
        result.iterations.push({ x: oldX, y: x , error: error} as { x: number; y: number , error: number});

      }while(error != 0 && error > errorFactor);

      result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
      };

    result.statusCode = 200;

    return result;

}
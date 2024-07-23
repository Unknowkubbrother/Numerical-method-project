import math from '../../lib/math';

export interface FalsePositionRequest {
    xStart: number;
    xEnd: number;
    func: string;
    errorFactor: number;
}

export interface FalsePositionResponse {
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
  

export function falsePositionMethod (xStart: number, xEnd: number, func: string, errorFactor: number) : FalsePositionResponse{

    let result : FalsePositionResponse = {
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

    if (xStart >= xEnd){
        result.error = "xStart must be less than xEnd";
        return result;
    }

    if (errorFactor <= 0){
        result.error = "errorFactor must be greater than 0";
        return result;
    }

    let xL :number = xStart;
    let xR :number = xEnd;
    let x1 :number;
    let oldX1: number = 0;
    let funcX1 :number;
    const MAX_ITER : number = 1000;

    while (result.iter < MAX_ITER) {
        let funcL :number = math.evaluate(func, {x: xL} as any);
        let funcR :number = math.evaluate(func, {x: xR} as any);
        x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
        let error: number = math.abs(x1 - oldX1);
        funcX1 = math.evaluate(func, {x: x1} as any);
    
        if (error == 0 || error < errorFactor) {
            break;
        }

        result.iter++;
        result.iterations.push({ x: x1, y: funcX1, error: error } as {
        x: number;
        y: number;
        error: number;
        });

        if (funcL * funcX1 < 0){
            xR = x1;
        } else {
            xL = x1;
        }

        oldX1 = x1;
    }

    result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
      };
    
    result.statusCode = 200;

    return result;



}
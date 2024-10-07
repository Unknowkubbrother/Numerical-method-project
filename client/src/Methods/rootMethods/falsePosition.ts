import {evaluate,abs} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface FalsePositionRequest {
    xL: number;
    xR: number;
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
  

export function falsePositionMethod (xL: number, xR: number, func: string, errorFactor: number) : FalsePositionResponse{
    xL = Number(xL);
    xR = Number(xR);
    const tempXL = xL;
    const tempXR = xR;
    const result : FalsePositionResponse = {
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

    try{
        let x1 :number;
    let oldX1: number = 0;
    let funcX1 :number;
    const MAX_ITER : number = 1000;

    while (result.iter < MAX_ITER) {
        const funcL :number = evaluate(func, {x: xL});
        const funcR :number = evaluate(func, {x: xR});
        x1 = (xL * funcR - xR * funcL) / (funcR - funcL);
        const error: number = abs((x1 - oldX1)/x1)*100;
        funcX1 = evaluate(func, {x: x1});
    
        if (error == 0 || error < errorFactor) {
            break;
        }

        result.iter++;
        result.iterations?.push({ x: x1, y: funcX1, error: error } as {
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
        x: result.iterations?.[result.iterations.length - 1].x ?? 0,
        y: result.iterations?.[result.iterations.length - 1].y ?? 0,
        error: result.iterations?.[result.iterations.length - 1].error ?? 0
      };
    }catch(e){
        result.error = "Invalid function";
        return result;
    }
    
    result.statusCode = 200;

    problemCreate({
        type: "Root of Equation",
        solution: "falseposition",
        input: {
            "xL" : tempXL,
            "xR" : tempXR,
            "func" : func,
            "errorFactor" : errorFactor
        },
        output: result
    });

    return result;



}
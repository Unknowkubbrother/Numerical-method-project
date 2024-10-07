import {evaluate,derivative,abs} from 'mathjs';
import {problemCreate} from '../../Api/problem';

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
    plot:{
        x: number;
        y: number;
    }[];
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
    xInitial = Number(xInitial);
    const result : NewTonResponse = {
        result: {
            x: 0,
            y: 0
        },
        plot:[],
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
    
            result.plot.push({x: x, y: 0} as { x: number, y: number });
            result.plot?.push({ x: x, y: calFunc(func, x)} as { x: number, y: number});
            x = oldX - (calFunc(func, oldX) / calFuncdiff(func, oldX));
    
            error = abs((x - oldX)/x) * 100;
    
            result.iter++;
            result.iterations?.push({ x: x, y: calFunc(func,x) , error: error} as { x: number; y: number , error: number});
    
          }while(error != 0 && error > errorFactor && result.iter < MAX_ITER);
    
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
        solution: "newton",
        input: {
            "xInitial" : xInitial,
            "func" : func,
            "errorFactor" : errorFactor
        }
    });

    return result;

}
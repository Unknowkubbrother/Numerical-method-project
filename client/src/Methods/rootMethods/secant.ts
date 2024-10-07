import {evaluate,abs} from 'mathjs';
import {problemCreate} from '../../Api/problem';

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
    plot:{
        x: number;
        y: number;
    }[];
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
    xInitial0 = Number(xInitial0);
    xInitial1 = Number(xInitial1);
    const tempXInitial0 = xInitial0;
    const tempXInitial1 = xInitial1
    const result : SecantResponse = {
        result: {
            x: 0,
            y: 0,
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

    result.plot.push({x: x0, y: 0} as { x: number, y: number });
    result.plot.push({x: x0, y: calFunc(func,x0)} as { x: number, y: number });
    result.plot.push({x: x1, y: calFunc(func,x1)} as { x: number, y: number });
    result.plot.push({x: x1, y: 0} as { x: number, y: number });
    result.plot.push({x: x1, y: calFunc(func,x1)} as { x: number, y: number });
    do{
        oldX = x1;
        x1 = calX1(x0, x1, func);
        error = abs((x1 - oldX) / x1) * 100;
        x0 = oldX;

        result.iter++;
        result.iterations?.push({ x: x1, y: calFunc(func,x1), error: error} as { x: number, y:number, error: number});
        result.plot.push({x: x1, y: 0} as { x: number, y: number });
        result.plot.push({x: x1, y: calFunc(func,x1)} as { x: number, y: number });
        result.plot.push({x: x0, y: calFunc(func,x0)} as { x: number, y: number });

      }while(error != 0 && error > errorFactor && result.iter < MAX_ITER);

      result.result = {
        x: result.iterations?.[result.iterations.length - 1].x  ?? 0,
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
        solution: "secant",
        input: {
            "xInitial0" : tempXInitial0,
            "xInitial1" : tempXInitial1,
            "func" : func,
            "errorFactor" : errorFactor
        },
        output: result
    });

    return result;

}
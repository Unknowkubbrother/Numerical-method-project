import {evaluate,abs} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface GraphicalRequest {
    xStart: number;
    xEnd: number;
    func: string;
    errorFactor: number;
}

export interface GraphicalResponse {
    result: {
        x: number;
        y: number;
        error?: number;
    };
	iter: number;
	iterations?: { 
        x: number; 
        y: number;
        error?:number; 
    }[];
	error?: string;
    statusCode: number;
}
  

export const graphicalMethod = async (xStart: number, xEnd: number, func: string, errorFactor: number) =>{
    xStart = Number(xStart);
    xEnd = Number(xEnd);
    const tempXStart = xStart;
    const tempXEnd = xEnd;
    const result : GraphicalResponse = {
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

    try{
        let step : number = 1;
        let x : number = xStart;
        const MAX_ITER : number = 1000;
        let y : number = 0;
        let oldY : number = evaluate(func, {x: Number(x)});

        while (result.iter < MAX_ITER) {
            result.iter++;
            y = evaluate(func, {x: Number(x)});
            result.iterations?.push({ x: Number(x), y: y , error: abs(y)} as { x: number; y: number , error: number});

            if (y == 0 || abs(y) < errorFactor) {
                break;
            }
            
            if (oldY * y < 0){
                x -= step;
                step /= 10;
                y = evaluate(func as string, {x: Number(x)} as {x : number});
            }

            x += step;

            if (x > xEnd) {
                x = xEnd;
                break;
            }

            oldY = y;
            
            }

            result.result = {
                x: result.iterations?.[result.iterations.length - 1]?.x ?? 0,
                y: result.iterations?.[result.iterations.length - 1]?.y ?? 0,
                error: result.iterations?.[result.iterations.length - 1]?.error ?? 0,
            };
    }catch(e){
        result.error = "Invalid function";
        return result;
    }

    result.statusCode = 200;

    
   problemCreate({
            type: "Root of Equation",
            solution: "graphical",
            input: {
                "xStart" : tempXStart,
                "xEnd" : tempXEnd,
                "func" : func,
                "errorFactor" : errorFactor
            },
            output: {
                result: {
                    x: result.result.x,
                    y: result.result.y,
                    error: result.result.error
                }
            }
        }
    );

    return result;
}
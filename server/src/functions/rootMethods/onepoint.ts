import math from '../../lib/math';

export interface OnePointRequest {
    xInitial: number;
    func: string;
    errorFactor: number;
}

export interface OnePointResponse {
    result: {
        x: number | string;
        y: number | string;
        error?: number | string;
    };
	iter: number;
	iterations?: { 
        x: number | string;
        y: number | string;
        error?: number | string;
    }[];
	error?: string;
    statusCode: number;
}
  

export function OnepointMethod (xInitial: number, func: string, errorFactor: number) : OnePointResponse{

    let result : OnePointResponse = {
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

      let x : number = xInitial;
      let oldX : number;
      let error: number;


      const calFunc = (func: string, x: number): number => {
        return math.evaluate(func, { x: x } as any);
      }

      while (true){
          oldX = x;

          x = calFunc(func , oldX);

          result.iter++;

          error = math.abs(x - oldX);

          if (x !== Infinity && x !== -Infinity) {
            result.iterations.push({ x: oldX, y: x ,error: error} as { x: number, y: number, error: number });
          }else{
            result.iterations.push({ x: "infinity", y: "infinity" ,error: "NaN" } as { x: string, y: string , error: string});
          }

          if (error == 0 || error < errorFactor || x == Infinity || x == -Infinity) {
            break;
          }

      }

      result.result = {
        x: result.iterations[result.iterations.length - 1].x,
        y: result.iterations[result.iterations.length - 1].y,
        error: result.iterations[result.iterations.length - 1].error
      };
    
    result.statusCode = 200;

    return result;

}
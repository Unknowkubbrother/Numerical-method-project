import {evaluate,abs} from 'mathjs';

export interface OnePointRequest {
    xInitial: number;
    func: string;
    errorFactor: number;
}

export interface OnePointResponse {
    result: {
        x: number;
        y: number;
        error?: number;
    };
    plot:{
        x: number;
        y: number;
    }[];
    dotplot:{
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
  

export function OnepointMethod (xInitial: number, func: string, errorFactor: number) : OnePointResponse{

    const result : OnePointResponse = {
        result: {
            x: 0,
            y: 0
        },
        plot:[],
        dotplot:[],
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
        let x : number = xInitial;
      let oldX : number;
      let error: number;
      const MAX_ITER : number = 1000;


      while (result.iter < MAX_ITER){
        result.iter++;
          oldX = x;

          result.plot.push({x: x, y: x} as { x: number, y: number });
          result.dotplot.push({x: x, y: 0} as { x: number, y: number });
          x = evaluate(func, { x: oldX });

          error = abs((x - oldX)/x) * 100;

          result.iterations?.push({ x: oldX, y: x ,error: error} as { x: number, y: number, error: number });
          result.plot.push({x: oldX, y: x} as { x: number, y: number });

          if (error == 0 || error < errorFactor) {
            break;
          }

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

    return result;

}
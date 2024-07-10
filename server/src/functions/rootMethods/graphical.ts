import math from '../../lib/math';

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
	iteraions?: { x: number; y: number }[];
	error?: string;
    statusCode: number;
}
  

export function graphicalMethod (xStart: number, xEnd: number, func: string, errorFactor: number) : GraphicalResponse{

    let result : GraphicalResponse = {
        result: {
            x: 0,
            y: 0
        },
        iter: 0,
        iteraions: [],
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

    let step : number = 1;
    let x : number = xStart;
    const MAX_ITER : number = 1000;
    let y : number;
    let oldY : number = math.evaluate(func, {x: Number(x)} as any);

    while (result.iter < MAX_ITER) {
        result.iter++;
        y = math.evaluate(func, {x: Number(x)} as any);
        result.iteraions.push({ x: Number(x), y: y } as { x: number; y: number });

		if (y == 0 || math.abs(y) < errorFactor) {
			break;
		}
        
        if (oldY * y < 0){
            x -= step;
			step /= 10;

            y = math.evaluate(func as string, {x: Number(x)} as {x : number});
        }

        x += step;

        if (x > xEnd) {
            // x = xEnd;
            break;
        }

        oldY = y;
        
    }

    result.result = {
        x: x,
        y: y
    };

    result.statusCode = 200;

    return result;
}

//     let x = xStart;
//     const MAX_ITER = 1000;
//     let y;

//     while (result.iter < MAX_ITER) {
//         result.iter++;
//         y = math.evaluate(func, {x: Number(x)} as any);

//         if (checkMinus(y)){
//             let bottom = x-1
//             let top = x
//             result.iter = 0;
//             result.iterations = [];
//             for(let i = bottom; i < top; i += errorFactor){
//                 y = math.evaluate(func, {x: i} as any);
//                 if (checkMinus(y)){
//                     result.result = i-errorFactor;
//                     break;
//                 }
//                 result.iterations.push({x: i, y: Number(y)});
//                 result.iter++;
//             }
//             break;
//         }

//         x++;
        
//     }
//     return result;
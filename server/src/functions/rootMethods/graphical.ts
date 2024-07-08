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
    };
	count: number;
	rows?: { x: number; y: number }[];
	error?: string;
    statusCode: number;
}
  

export function graphicalMethod (xStart: number, xEnd: number, func: string, errorFactor: number) : GraphicalResponse{

    let result : GraphicalResponse = {
        result: {
            x: 0,
            y: 0
        },
        count: 0,
        rows: [],
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

    const minus = (y: number) : boolean => y < 0;

    let step : number = 1;
    let x : number = xStart;
    const MAX_COUNT : number = 1000;
    let y : number;

    while (result.count < MAX_COUNT) {
        y = math.evaluate(func, {x: Number(x)} as any);

		if (math.abs(y) < errorFactor) {
			break;
		}
        
        if (minus(y)){
            x -= step;
			step /= 10;

            y = math.evaluate(func as string, {x: Number(x)} as {x : number});
            result.rows.push({ x: Number(x), y: y } as { x: number; y: number });
            result.count++;
        }

        x += step;
        
    }

    result.result = {
        x: result.rows[result.rows.length - 1].x,
        y: result.rows[result.rows.length - 1].y
    };
    result.statusCode = 200;

    return result;
}

// const checkMinus = (y: number) => y < 0;

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
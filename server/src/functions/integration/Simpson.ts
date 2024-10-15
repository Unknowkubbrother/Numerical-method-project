import math from '../../lib/math';

export interface SimpsonRequest {
    xStart : number;
    xEnd : number;
    equation : string;
}

export interface SimpsonResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function SimpsonMethods( xStart : number , xEnd : number , equation : string) : SimpsonResponse{

    const result: SimpsonResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (xEnd - xStart)/2;
    
    const fx = (x : number) => {
        return math.evaluate(equation, {x});
    }

    result.result = (h/3) * (fx(xStart) + (4*fx(xStart + h)) + fx(xEnd));


    result.statusCode = 200;

    return result;

}

// {
//     "xStart" : -1,
//     "xEnd" : 2,
//     "equation": "x^7+2x^3-1"
// }


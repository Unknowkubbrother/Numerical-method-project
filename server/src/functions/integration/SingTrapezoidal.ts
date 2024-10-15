import math from '../../lib/math';

export interface SingSingTrapezoidalRequest {
    xStart : number;
    xEnd : number;
    equation : string;
}

export interface SingTrapezoidalResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function SingTrapezoidalMethods( xStart : number , xEnd : number , equation : string) : SingTrapezoidalResponse{

    const result: SingTrapezoidalResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (xEnd - xStart);
    
    const fx = (x : number) => {
        return math.evaluate(equation, {x});

    }

    result.result = (h/2) * (fx(xStart) + fx(xEnd));


    result.statusCode = 200;

    return result;

}

// {
//     "xStart" : 2,
//     "xEnd" : 8,
//     "equation": "4x^5-3x^4+x^3-6x+2"
// }


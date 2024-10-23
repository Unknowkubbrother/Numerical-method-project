import math from '../../lib/math';

export interface TrapezoidalRequest {
    a : number;
    b : number;
    equation : string;
}

export interface TrapezoidalResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function TrapezoidalMethods( a : number , b : number , equation : string) : TrapezoidalResponse{

    const result: TrapezoidalResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (b - a);
    
    const fx = (x : number) => {
        return math.evaluate(equation, {x});

    }

    result.result = (h/2) * (fx(a) + fx(b));


    result.statusCode = 200;

    return result;

}

// {
//     "a" : 2,
//     "b" : 8,
//     "equation": "4x^5-3x^4+x^3-6x+2"
// }


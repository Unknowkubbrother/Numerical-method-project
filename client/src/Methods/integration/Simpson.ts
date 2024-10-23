import {evaluate} from 'mathjs';

export interface SimpsonRequest {
    a : number;
    b : number;
    equation : string;
}

export interface SimpsonResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function SimpsonMethods( a : number , b : number , equation : string) : SimpsonResponse{

    const result: SimpsonResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (b - a)/2;
    
    const fx = (x : number) => {
        return evaluate(equation, {x});
    }

    result.result = (h/3) * (fx(a) + (4*fx(a + h)) + fx(b));


    result.statusCode = 200;

    return result;

}

// {
//     "a" : -1,
//     "b" : 2,
//     "equation": "x^7+2x^3-1"
// }


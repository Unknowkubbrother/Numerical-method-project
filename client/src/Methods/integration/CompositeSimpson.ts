import {evaluate} from 'mathjs';

export interface CompositeSimpsonRequest {
    a : number;
    b : number;
    equation : string;
    n: number;
}

export interface CompositeSimpsonResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function CompositeSimpsonMethods( a : number , b : number , equation : string, n:number) : CompositeSimpsonResponse{

    const result: CompositeSimpsonResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (b - a)/(2*n);
    
    const fx = (x : number) => {
        return evaluate(equation, {x});

    }

    const iteration = [];

    for(let i = 0; i <= (2*n); i++){
        iteration.push( {x: a + i*h, y: fx(a + i*h)});
    }


    let sum = 0;

    for (let i = 1; i < (2*n); i++){
        if(i % 2 == 0){
            sum += iteration[i].y * 2;
        } else {
            sum += iteration[i].y * 4;
        }
    }

    result.result = (h/3) * (fx(a) + sum + fx(b));

    result.statusCode = 200;

    return result;

}
    // {
//     "a" : -1,
//     "b" : 2,
//     "n": 2,
//     "equation": "x^7+2x^3-1"
// }
import math from '../../lib/math';

export interface CompositeSimpsonRequest {
    xStart : number;
    xEnd : number;
    n : number;
    equation : string;
}

export interface CompositeSimpsonResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function CompositeSimpsonMethods( xStart : number , xEnd : number , n: number , equation : string) : CompositeSimpsonResponse{

    const result: CompositeSimpsonResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (xEnd - xStart)/(2*n);
    
    const fx = (x : number) => {
        return math.evaluate(equation, {x});

    }

    const iteration = [];

    for(let i = 0; i <= (2*n); i++){
        iteration.push( {x: xStart + i*h, y: fx(xStart + i*h)});
    }

    console.log(iteration);

    let sum = 0;

    for (let i = 1; i < (2*n); i++){
        if(i % 2 == 0){
            sum += iteration[i].y * 2;
        } else {
            sum += iteration[i].y * 4;
        }
    }

    result.result = (h/3) * (fx(xStart) + sum + fx(xEnd));

    result.statusCode = 200;

    return result;

}
    // {
//     "xStart" : -1,
//     "xEnd" : 2,
//     "n": 2,
//     "equation": "x^7+2x^3-1"
// }
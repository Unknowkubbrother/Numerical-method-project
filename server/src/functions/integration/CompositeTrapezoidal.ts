import math from '../../lib/math';

export interface CompositeTrapezoidalRequest {
    xStart : number;
    xEnd : number;
    n : number;
    equation : string;
}

export interface CompositeTrapezoidalResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function CompositeTrapezoidalMethods( xStart : number , xEnd : number , n: number , equation : string) : CompositeTrapezoidalResponse{

    const result: CompositeTrapezoidalResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (xEnd - xStart)/n;
    
    const fx = (x : number) => {
        return math.evaluate(equation, {x});

    }

    const iteration = [];

    for(let i = 0; i <= n; i++){
        iteration.push( {x: xStart + i*h, y: fx(xStart + i*h)});
    }

    let sum = 0;
    for (let i = 1; i < n; i++){    
        sum += fx(xStart + i*h);
    }

    result.result = (h/2) * (fx(xStart) + 2*sum + fx(xEnd));


    result.statusCode = 200;

    return result;

}


    // {
    //     "xStart" : 2,
    //     "xEnd" : 8,
    //     "n": 2,
    //     "equation": "4x^5-3x^4+x^3-6x+2"
    // }


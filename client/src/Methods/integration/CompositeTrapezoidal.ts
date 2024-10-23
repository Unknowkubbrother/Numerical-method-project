import {evaluate} from 'mathjs';

export interface CompositeTrapezoidalRequest {
    a : number;
    b : number;
    equation : string;
    n: number;
}

export interface CompositeTrapezoidalResponse {
    result: number;
    error?: string;
    statusCode: number;
}


export function CompositeTrapezoidalMethods( a : number , b : number , equation : string, n: number ) : CompositeTrapezoidalResponse{

    const result: CompositeTrapezoidalResponse = { 
        result: 0,
        statusCode: 400
    };

    const h = (b - a)/n;
    
    const fx = (x : number) => {
        return evaluate(equation, {x});

    }

    const iteration = [];

    for(let i = 0; i <= n; i++){
        iteration.push( {x: a + i*h, y: fx(a + i*h)});
    }

    let sum = 0;
    for (let i = 1; i < n; i++){    
        sum += fx(a + i*h);
    }

    result.result = (h/2) * (fx(a) + 2*sum + fx(b));


    result.statusCode = 200;

    return result;

}


    // {
    //     "a" : 2,
    //     "b" : 8,
    //     "n": 2,
    //     "equation": "4x^5-3x^4+x^3-6x+2"
    // }


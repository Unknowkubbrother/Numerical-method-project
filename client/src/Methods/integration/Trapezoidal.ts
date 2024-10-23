import { evaluate } from 'mathjs';

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
        return evaluate(equation, {x});

    }

    result.result = (h/2) * (fx(a) + fx(b));


    result.statusCode = 200;

    return result;

}

// {
//     "x": 4.5, 
//     "points": [
//         {"x": 2, "y": 9.5},
//         {"x": 4, "y": 8.0},
//         {"x": 6, "y": 10.5},
//         {"x": 8, "y": 39.5},
//         {"x": 10, "y": 72.5}
//     ],
//     "type": "linear"
// }


import { evaluate } from 'mathjs';

export interface TrapezoidalRequest {
    a : number;
    b : number;
    equation : string;
}

export interface TrapezoidalResponse {
    result: {
        x0:{
            x: number
            ans: number;
            fx: string;
        },
        x1:{
            x: number
            ans: number;
            fx: string;
        },
        result: number;
        h: {
            text: string;
            ans: number;
        };
        equation: string;
    }
    error?: string;
    statusCode: number;
}


export function TrapezoidalMethods( a : number , b : number , equation : string) : TrapezoidalResponse{

    const result: TrapezoidalResponse = { 
        result: {
            x0: {
                x: Number(a),
                ans: 0,
                fx: ''
            },
            x1: {
                x: Number(b),
                ans: 0,
                fx: ''
            },
            result: 0,
            h: {
                text: `${b} - (${a})`,
                ans: 0
            },
            equation: equation
        },
        statusCode: 400
    };

    const h = (b - a);
    
    
    const fx = (x : number) => {
        return evaluate(equation, {x});
    }

    const x0 = fx(a);
    const x1 = fx(b);
    result.result.x0.ans = x0;
    result.result.x0.fx = equation.replaceAll('x', `(${a})`);
    result.result.x1.ans = x1;
    result.result.x1.fx = equation.replaceAll('x',  `(${b})`);
    result.result.h.ans = h;

    result.result.result = (h/2) * (x0 + x1);


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


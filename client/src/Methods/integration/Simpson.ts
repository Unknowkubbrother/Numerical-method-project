import {evaluate} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface SimpsonRequest {
    a : number;
    b : number;
    equation : string;
}

export interface SimpsonResponse {
    result: {
        a: number,
        b : number,
        equation: string,
        result: number,
        h: {
            text: string,
            value: number
        }
        iterations:{
            x: number,
            text: string,
            value: number
        }[];
    };
    error?: string;
    statusCode: number;
}


export function SimpsonMethods( a : number , b : number , equation : string) : SimpsonResponse{
    a = Number(a);
    b = Number(b);
    const result: SimpsonResponse = { 
        result: {
            a: a,
            b: b,
            equation: equation,
            result: 0,
            h: {
                text: `${b}-(${a})`,
                value: 0
            },
            iterations: []
        },
        statusCode: 400
    };

    try{
        const h = (b - a)/2;
        result.result.h.value = h;
        
        const fx = (x : number) => {
            return evaluate(equation, {x});
        }

        for(let i = 0; i <= 2; i++){
            result.result.iterations.push({
                x: a + (i*h),
                text: equation.replaceAll('x', `(${a + (i*h)})`),
                value: fx(a + (i*h))
            });
        }
        

        result.result.result = (h/3) * (fx(a) + (4*fx(a + h)) + fx(b));


        result.statusCode = 200;

        problemCreate({
            type: "Integration",
            solution: "simpson",
            input: {
                "a" : a,
                "b" : b,
                "equation" : equation
            },
            // output: result
        });

        return result;
    }catch(e){
        result.error = "failed request";
        result.statusCode = 400;
        return result;
    }

}

// {
//     "a" : -1,
//     "b" : 2,
//     "equation": "x^7+2x^3-1"
// }


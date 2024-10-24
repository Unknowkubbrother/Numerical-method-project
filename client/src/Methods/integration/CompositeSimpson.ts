import {evaluate,round} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface CompositeSimpsonRequest {
    a : number;
    b : number;
    equation : string;
    n: number;
}

export interface CompositeSimpsonResponse {
    result: {
        h:{
            text: string;
            value: number;
        }
        a: number;
        b: number;
        equation: string;
        n: number;
        result: number;
        iteartion: {
            x: number;
            text: string;
            value: number;
        }[]
    };
    error?: string;
    statusCode: number;
}


export function CompositeSimpsonMethods( a : number , b : number , equation : string, n:number) : CompositeSimpsonResponse{
    a = Number(a);
    b = Number(b);
    n = Number(n);
    const result: CompositeSimpsonResponse = { 
        result: {
            h: {
                text: `${b} - (${a})`,
                value: 0
            },
            a: a,
            b: b,
            n: n,
            equation: equation,
            result: 0,
            iteartion: []
        },
        statusCode: 400
    };

    try{
            
        const h = (b - a)/(2*n);
        result.result.h.value = h;
        
        const fx = (x : number) => {
            return evaluate(equation, {x});

        }

        const iteration = [];

        for(let i = 0; i <= (2*n); i++){
            iteration.push( {x: a + i*h, y: fx(a + i*h)});
            result.result.iteartion.push({
                x: round(a + i*h,6),
                text: equation.replaceAll('x', `(${round(a + i*h,6)})`),
                value: round(fx(a + i*h),6)
            });
        }


        let sum = 0;

        for (let i = 1; i < (2*n); i++){
            if(i % 2 == 0){
                sum += iteration[i].y * 2;
            } else {
                sum += iteration[i].y * 4;
            }
        }

        result.result.result = (h/3) * (fx(a) + sum + fx(b));
        result.result.result = round(result.result.result,6);

        result.statusCode = 200;

        problemCreate({
            type: "Integration",
            solution: "compositesimpson",
            input: {
                "a" : a,
                "b" : b,
                "equation" : equation,
                "n": n
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
//     "n": 2,
//     "equation": "x^7+2x^3-1"
// }
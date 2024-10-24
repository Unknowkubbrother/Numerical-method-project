import {evaluate,round} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface CompositeTrapezoidalRequest {
    a : number;
    b : number;
    equation : string;
    n: number;
}

export interface CompositeTrapezoidalResponse {
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


export function CompositeTrapezoidalMethods( a : number , b : number , equation : string, n: number ) : CompositeTrapezoidalResponse{
    a = Number(a);
    b = Number(b);
    n = Number(n);
    const result: CompositeTrapezoidalResponse = { 
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
        const h = (b - a)/n;

        result.result.h.value = h;
        
        const fx = (x : number) => {
            return evaluate(equation, {x});

        }

        const iteartion = [];
        for(let i = 0; i <= n; i++){
            const tempA = a + i*h;
            iteartion.push({
                x: tempA,
                text: equation.replaceAll('x', `(${tempA})`),
                value: round(fx(tempA),6)
            });
        }

        result.result.iteartion = iteartion;

        let sum = 0;
        for (let i = 1; i < n; i++){
            sum += fx(a + i*h);
        }

        result.result.result = round((h/2) * (fx(a) + 2*sum + fx(b)),6);


        result.statusCode = 200;

        problemCreate({
            type: "Integration",
            solution: "compositetrapezoidal",
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
    //     "a" : 2,
    //     "b" : 8,
    //     "n": 2,
    //     "equation": "4x^5-3x^4+x^3-6x+2"
    // }


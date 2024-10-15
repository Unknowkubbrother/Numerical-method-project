import math from '../../lib/math';

export interface DifferentiationRequest {
    x: number;
    h : number;
    equation : string;
    type: "forward" | "backward" | "central";
    oh: "h" | "h^2" | "h^3" | "h^4";

}

export interface DifferentiationResponse {
    result: {
        result: number;
        error: number;
    };
    error?: string;
    statusCode: number;
}


export function DifferentiationMethods( x : number , h : number , equation : string, type : string, oh:string) : DifferentiationResponse{

    const result: DifferentiationResponse = { 
        result: {
            result: 0,
            error: 0
        },
        statusCode: 400
    };

    const fx = (x : number) => {
        return math.evaluate(equation, {x});
    }

    const diff = (equation : string, x : number, n : number) => {
        if (n == 0){
            return math.evaluate(equation, {x});
        }

        const diffequation = math.derivative(equation, 'x').toString();

        return (diff(diffequation, x, n-1));
    }

    const error = (count : number, result : number) => {
        return math.abs((diff(equation,x,count) - result)/diff(equation,x,count))*100;
    }

    if (type == "forward" && oh == "h"){
        result.result.result = (fx(x+h) - fx(x))/h;
        result.result.error = error(1, result.result.result);
    }

    if (type == "backward" && oh == "h"){
        result.result.result = (fx(x) - fx(x-h))/h;
        result.result.error = error(1, result.result.result);
    }

    if (type == "central" && oh == "h^2"){
        result.result.result = (fx(x+h) - fx(x-h))/(2*h);
        result.result.error = error(1, result.result.result);
    }

    if (type == "forward" && oh == "h^2"){
        result.result.result = ((-1*fx(x+3*h))+(4*fx(x+2*h))-(5*fx(x+h))+(2*fx(x)))/(math.pow(h,2));
        result.result.error = error(2, result.result.result);
    }

    if (type == "backward" && oh == "h^2"){
        result.result.result = ((2*fx(x))-(5*fx(x-h))+(4*fx(x-2*h))-(fx(x-3*h)))/(math.pow(h,2));
        result.result.error = error(2, result.result.result);
    }

    if (type == "central" && oh == "h^4"){
        result.result.result = ((-1*fx(x+2*h))+(16*fx(x+h))-(30*fx(x))+(16*fx(x-h))-(fx(x-2*h)))/(12*(math.pow(h,2)));
        result.result.error = error(2, result.result.result);
    }




    result.statusCode = 200;

    return result;

}

// {
//     "x" : 2,
//     "h" : 0.25,
//     "equation": "e^x",
//     "type" : "forward",
//     "oh" : "h"
// }


// {
//     "x" : -2.5,
//     "h" : 0.1,
//     "equation": "e^(x/3)+x^2",
//     "type" : "backward",
//     "oh" : "h^2"
// }



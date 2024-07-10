import math from '../../lib/math';

export interface BisectionRequest {
    xStart: number;
    xEnd: number;
    func: string;
    errorFactor: number;
}

export interface BisectionResponse {
    result: {
        x: number;
        y: number;
    };
	iter: number;
	iteraions?: { 
        x: number; 
        y: number;
        error?: number;
    }[];
	error?: string;
    statusCode: number;
}
  

export function bisectionMethod (xStart: number, xEnd: number, func: string, errorFactor: number) : BisectionResponse{

    let result : BisectionResponse = {
        result: {
            x: 0,
            y: 0
        },
        iter: 0,
        iteraions: [],
        statusCode: 400
    };

    if (!func || func.trim().length == 0){
        result.error = "Function is required";
        return result;
    }

    if (xStart >= xEnd){
        result.error = "xStart must be less than xEnd";
        return result;
    }

    if (errorFactor <= 0){
        result.error = "errorFactor must be greater than 0";
        return result;
    }

    let xL : number = xStart;
    let xR : number = xEnd;
    let oldXm :number = (xL + xR) / 2;
    let xM :number;
    let funcM :number;
    const MAX_ITER : number = 1000;

    while (result.iter < MAX_ITER) {
        result.iter++;
        xM = (xL + xR) / 2;
        let error : number = math.abs((xM - oldXm));
        funcM = math.evaluate(func, {x: Number(xM)} as any);
        result.iteraions.push({ x: Number(xM), y: funcM , error: error} as { x: number; y: number, error: number});

        if (funcM == 0 || math.abs(funcM) < errorFactor){
            result.result.x = xM;
            result.result.y = funcM;
            break;
        }

        let facR = math.evaluate(func, {x: Number(xR)} as any);

        if (funcM * facR > 0){
            xR = xM;
        }else{
            xL = xM;
        }

        oldXm = xM;

    }

    result.result = {
        x: xM,
        y: funcM
    };
    result.statusCode = 200;

    return result;


}
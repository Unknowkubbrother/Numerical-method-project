export interface NewtonDividedRequest {
    x: number[];
    points: {
        x:number,
        y:number,
        selected: boolean
    }[]
}

export interface NewtonDividedResponse {
    result: number[];
    iterations: {
        Xi: number;
        iteration: NewtonDividedIterationData[];
    }[];
    CIterations: number[];
    error?: string;
    statusCode: number;
}

interface NewtonDividedIterationData {
    C: number;
    MutiOfSubtract: number[];
    sum : number;
}


export function NewtonDividedMethod( x:number[], points: {x:number, y:number , selected : boolean}[]) : NewtonDividedResponse{

    const result: NewtonDividedResponse = { 
        result: [],
        iterations: [],
        CIterations: [],
        statusCode: 400
    };

    if (points.filter((point) => point.selected).length < 2) {
        result.error = "You must select at least 2 points";
        return result;
    }

    const selectedPoints = points.filter(point => point.selected);

    const C = selectedPoints.map((point) => point.y);

    for(let i= 1 ; i<selectedPoints.length; i++){
        for(let j= selectedPoints.length-1; j>=i; j--){
            C[j] = (C[j] - C[j-1]) / (selectedPoints[j].x - selectedPoints[j-i].x);
        }
    }

    result.CIterations = C;



    for (let xi = 0 ; xi < x.length; xi++){
        result.result[xi] = 0;
        const iterationData: NewtonDividedIterationData[] = [];
        for (let i = 0; i < selectedPoints.length; i++) {
            let sum = C[i];
            const MutiOfSubtract = [1];
            for (let j = 0; j < i; j++) {
                MutiOfSubtract.push(x[xi] - selectedPoints[j].x);
                sum *= (x[xi] - selectedPoints[j].x);
            }
            iterationData.push({
                C: C[i],
                MutiOfSubtract: MutiOfSubtract,
                sum: sum
            });
            result.result[xi] += sum
        }
        result.iterations.push({
            Xi: x[xi],
            iteration: iterationData
        });
    }

    result.statusCode = 200;

    return result;

}

// {
//     "x": [46151,46152], 
//     "points": [
//         {"x": 0, "y": 9.81},
//         {"x": 20000, "y": 9.7487},
//         {"x": 40000, "y": 9.6879},
//         {"x": 60000, "y": 9.6879},
//         {"x": 80000, "y": 9.5682},
//     ], 
// }
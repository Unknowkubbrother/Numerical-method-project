export interface NewtonDividedRequest {
    x: number,
    points: {
        x:number,
        y:number,
        selected: boolean
    }[]
}

export interface NewtonDividedResponse {
    result: number;
    iterations: NewtonDividedIterationData[];
    error?: string;
    statusCode: number;
}

interface NewtonDividedIterationData {
    C: number;
    MutiOfSubtract: number[];
    sum : number;
}


export function NewtonDividedMethod( x:number, points: {x:number, y:number , selected : boolean}[]) : NewtonDividedResponse{

    const result: NewtonDividedResponse = { 
        result: 0,
        iterations: [],
        statusCode: 400
    };

    const selectedPoints = points.filter(point => point.selected);

    const C = selectedPoints.map((point) => point.y);

    for(let i= 1 ; i<selectedPoints.length; i++){
        for(let j= selectedPoints.length-1; j>=i; j--){
            C[j] = (C[j] - C[j-1]) / (selectedPoints[j].x - selectedPoints[j-i].x);
        }
    }

    for (let i = 0; i < selectedPoints.length; i++) {
        let sum = C[i];
        const MutiOfSubtract = [1];
        for (let j = 0; j < i; j++) {
            MutiOfSubtract.push(x - selectedPoints[j].x);
            sum *= (x - selectedPoints[j].x);
        }
        result.iterations.push({
            C: C[i],
            MutiOfSubtract: MutiOfSubtract,
            sum: sum
        });
        result.result += sum;
    }

    result.statusCode = 200;

    return result;

}

// {
//     "x": 46151, 
//     "points": [
//         {"x": 0, "y": 9.81},
//         {"x": 20000, "y": 9.7487},
//         {"x": 40000, "y": 9.6879},
//         {"x": 60000, "y": 9.6879},
//         {"x": 80000, "y": 9.5682},
//     ], 
// }
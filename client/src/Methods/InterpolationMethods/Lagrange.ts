export interface LagrangeRequest {
    x: number[],
    points: {
        x:number,
        y:number,
        selected: boolean
    }[]
}

export interface LagrangeResponse {
    result: number[];
    iterations: {
        Xi: number;
        iteration: LagrangeIterationData[];
    }[];
    error?: string;
    statusCode: number;
}

interface LagrangeIterationData {
    L: number;
    Y: number;
    sum : number;
}

export function LagrangeMethod( x:number[], points: {x:number, y:number , selected : boolean}[]) : LagrangeResponse{

    const result: LagrangeResponse = { 
        result: [],
        iterations: [],
        statusCode: 400
    };

    const selectedPoints = points.filter((point) => point.selected);

    for(let xi=0; xi < x.length; xi++){
        result.result[xi] = 0;
        const iterations = [];
        for(let i=0; i < selectedPoints.length; i++){
            let sum = 0;
            let L = 1;
            for(let j=0; j < selectedPoints.length; j++){
                if(i != j){
                    L *= (x[xi] - selectedPoints[j].x) / (selectedPoints[i].x - selectedPoints[j].x);
                }
            }
            sum += L * selectedPoints[i].y;
            iterations.push({
                L: L,
                Y: selectedPoints[i].y,
                sum: sum
            });
            result.result[xi] += sum;
        }
        result.iterations.push({
            Xi: x[xi],
            iteration: iterations
        });
    }

    // for(let i = 0; i < points.length; i++){
    //     let L = 1;
    //     for(let j = 0; j < points.length; j++){
    //         if(i != j){
    //             L *= (points[j].x - x) / (points[j].x - points[i].x);
    //         }
    //     }
    //     const sum = L * points[i].y;
    //     result.iterations.push({
    //         L: L,
    //         Y: points[i].y,
    //         sum: sum
    //     });
    //     result.result += sum;
    // }

    result.statusCode = 200;

    return result;

}

// {
//     "x": 42000, 
//     "points": [
//         {"x": 0, "y": 9.81},
//         {"x": 20000, "y": 9.7487},
//         {"x": 40000, "y": 9.6879},
//         {"x": 60000, "y": 9.6879},
//         {"x": 80000, "y": 9.5682},
//     ], 
// }
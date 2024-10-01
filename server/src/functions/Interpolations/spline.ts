import math from '../../lib/math';

export interface SplineRequest {
    x: number,
    points: {
        x:number,
        y:number
    }[]
    type: String
}

export interface SplineResponse {
    result: SplineIterationData;
    iterations: SplineIterationData[];
    error?: string;
    statusCode: number;
}

interface SplineIterationData {
    fx: number;
    m: number;
    offset: number;
    slope : {
        xi: number;
        xi1: number;
    };
}


export function SplineMethods( x:number, points: {x:number, y:number}[], type : String) : SplineResponse{

    const result: SplineResponse = { 
        result: {
            iteration: {
                fx: 0,
                m: 0,
                offset: 0,
                slope: {
                    xi: 0,
                    xi1: 0
                }
            },
            result: 0
        },
        iterations: [],
        statusCode: 400
    };

    if (type == "linear") {
		let resultindexAt;
        for(let i = 1 ; i < points.length; i++){
            const fx = points[i-1].y
            const m = (points[i].y - points[i-1].y) / (points[i].x - points[i-1].x);
            const offset  = points[i-1].x;

            result.iterations.push({
                fx: fx,
                m: m,
                offset: offset,
                slope: {
                    xi: points[i-1].x,
                    xi1: points[i].x
                }
            });

            if (x >= offset && x <= points[i].x) {
				resultindexAt = i-1;
            }
        }
		result.result = result.iterations[resultindexAt];

    }

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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplineMethods = SplineMethods;
function SplineMethods(x, points, type) {
    const result = {
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
        let m = [];
        const findM = (i) => {
            if (m[i - 1])
                return m[i - 1];
            const M = (points[i].y - points[i - 1].y) / (points[i].x - points[i - 1].x);
            m[i - 1] = M;
            return M;
        };
        const fx = (xValue) => {
            for (let i = 1; i < points.length; i++) {
                const fx = points[i - 1].y;
                const m = findM(i);
                const offset = points[i - 1].x;
                if (xValue >= points[i - 1].x && xValue <= points[i].x) {
                    return fx + m * (xValue - offset);
                }
            }
        };
        const answer = fx(x);
        console.log(answer);
        // result.result.iteration = result.iterations[resultindexAt];
        // result.result.result = result.iterations[resultindexAt].m * (x - result.iterations[resultindexAt].offset) + result.iterations[resultindexAt].fx;
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
//# sourceMappingURL=spline.js.map
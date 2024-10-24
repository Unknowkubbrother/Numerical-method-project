import {evaluate,derivative,abs} from 'mathjs';
import {problemCreate} from '../../Api/problem';

export interface DifferentiationRequest {
    x: number;
    h : number;
    equation : string;
    order: 1 | 2 | 3 | 4 | number,
    oh: "h" | "h^2" | "h^4" | string,
    direction: "forward" | "backward" | "central" | string;
}

export interface DifferentiationResponse {
    result: number,
    fx: {[key:number]: number},
    h : number,
    exactResult : number,
	exactEquation: string,
    errorValue: number,
	defualt : {
		direction: string,
		order: number,
		oh: string,
		equation: string
		h: number,
		x: number
	}
    error?: string;
    statusCode: number;
}

// credit by tonkaew131 https://github.com/tonkaew131/NumerProject/blob/main/src/lib/solutions/differentiation.ts

export const diffFormula: {
	[direction: string]: {
		[order: number]: {
			[oh: string]: {
				[key: number]: number;
				frac: string;
			};
		};
	};
} = {
	forward: {
		1: {
			h: {
				'1': 1,
				'0': -1,
				frac: 'h'
			},
			'h^2': {
				'2': -1,
				'1': 4,
				'0': -3,
				frac: '2h'
			}
		},
		2: {
			h: {
				'2': 1,
				'1': -2,
				'0': 1,
				frac: 'h^2'
			},
			'h^2': {
				'3': -1,
				'2': 4,
				'1': -5,
				'0': 2,
				frac: 'h^2'
			}
		},
		3: {
			h: {
				'3': 1,
				'2': -3,
				'1': 3,
				'0': -1,
				frac: 'h^3'
			},
			'h^2': {
				'4': -3,
				'3': 14,
				'2': -24,
				'1': 18,
				'0': -5,
				frac: '2h^3'
			}
		},
		4: {
			h: {
				'4': 1,
				'3': -4,
				'2': 6,
				'1': -4,
				'0': 1,
				frac: 'h^4'
			},
			'h^2': {
				'5': -2,
				'4': 11,
				'3': -24,
				'2': 26,
				'1': -14,
				'0': 3,
				frac: 'h^4'
			}
		}
	},
	backward: {
		1: {
			h: {
				'0': 1,
				'-1': -1,
				frac: 'h'
			},
			'h^2': {
				'0': 3,
				'-1': -4,
				'-2': 1,
				frac: '2h'
			}
		},
		2: {
			h: {
				'0': 1,
				'-1': -2,
				'-2': 1,
				frac: 'h^2'
			},
			'h^2': {
				'0': 2,
				'-1': -5,
				'-2': 4,
				'-3': -1,
				frac: 'h^2'
			}
		},
		3: {
			h: {
				'0': 1,
				'-1': -3,
				'-2': 3,
				'-3': -1,
				frac: 'h^3'
			},
			'h^2': {
				'0': 5,
				'-1': -18,
				'-2': 24,
				'-3': -14,
				'-4': 3,
				frac: '2h^3'
			}
		},
		4: {
			h: {
				'0': 1,
				'-1': -4,
				'-2': 6,
				'-3': -4,
				'-4': 1,
				frac: 'h^4'
			},
			'h^2': {
				'0': 3,
				'-1': -14,
				'-2': 26,
				'-3': -24,
				'-4': 11,
				'-5': -2,
				frac: 'h^4'
			}
		}
	},
	central: {
		1: {
			'h^2': {
				'1': 1,
				'-1': -1,
				frac: '2h'
			},
			'h^4': {
				'2': -1,
				'1': 8,
				'-1': -8,
				'-2': 1,
				frac: '12h'
			}
		},
		2: {
			'h^2': {
				'1': 1,
				'0': -2,
				'-1': 1,
				frac: 'h^2'
			},
			'h^4': {
				'2': -1,
				'1': 16,
				'0': -30,
				'-1': 16,
				'-2': -1,
				frac: '12h^2'
			}
		},
		3: {
			'h^2': {
				'2': 1,
				'1': -2,
				'-1': 2,
				'-2': -1,
				frac: '2h^3'
			},
			'h^4': {
				'3': -1,
				'2': 8,
				'1': -13,
				'-1': 13,
				'-2': -8,
				'-3': 1,
				frac: '8h^3'
			}
		},
		4: {
			'h^2': {
				'2': 1,
				'1': -4,
				'0': 6,
				'-1': -4,
				'-2': 1,
				frac: 'h^4'
			},
			'h^4': {
				'3': -1,
				'2': 12,
				'1': -39,
				'0': 56,
				'-1': -39,
				'-2': 12,
				'-3': -1,
				frac: '6h^4'
			}
		}
	}
};

export function DifferentiationMethods( 
    x: number,
    h : number,
    equation : string,
    order: 1 | 2 | 3 | 4 | number,
    oh: "h" | "h^2" | "h^4" | string,
    direction: "forward" | "backward" | "central" | string
) : DifferentiationResponse{

    const result: DifferentiationResponse = { 
        result: 0,
        fx: {},
        h,
        exactResult: 0,
		exactEquation: '',
        errorValue: 0,
		defualt : {
			direction: direction,
			order: order,
			oh: oh,
			equation,
			h,
			x
		},
        statusCode: 400
    };

	try{
		
		if (order < 1 || order > 4){
			result.error = "Order must be between 1 and 4";
			return result;
		}
	
		if (oh != "h" && oh != "h^2" && oh != "h^4"){
			result.error = "Order of h must be h, h^2 or h^4";
			return result;
		}
	
		if (direction != "forward" && direction != "backward" && direction != "central"){
			result.error = "Direction must be forward, backward or central";
			return result;
		}
	
		const formula = diffFormula[direction][order][oh];
	
		if (!formula){
			result.error = "Invalid formula";
			return result;
		}
	
		const fx = (i : number) => {
			const xValue = x + i * h;
			return evaluate(equation, { x: xValue });
		}
	
		const diff = (equation : string, x : number, n : number) => {
			if (n == 0){
				result.exactEquation = equation;
				return evaluate(equation, {x});
			}
	
			const diffequation = derivative(equation, 'x').toString();
	
			return (diff(diffequation, x, n-1));
		}
	
		const exactResult = diff(equation,x,order);
		const hValue = evaluate(formula.frac, {h});
	
		result.exactResult = exactResult;
		result.h = hValue;
		
	
		for (const i in formula){
			if (i == "frac"){
				continue;
			}
	
			const value = formula[i] * fx(parseInt(i));
			result.fx[parseInt(i)] = value;
			result.result += value;
		}
	
		result.result/=hValue;
		result.errorValue = abs((result.exactResult - result.result) / result.exactResult) * 100;
	
	
		result.statusCode = 200;

		problemCreate({
            type: "Differentiation",
            solution: "diff",
            input: {
                "x" : x,
				"h" : h,
				"equation": equation,
				"order" : order,
				"oh" : oh,
				"direction" : direction
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
//     "x" : 2,
//     "h" : 0.25,
//     "equation": "e^x",
//     "order" : 1,
//     "oh" : "h",
//     "direction" : "forward"
// }


// {
//     "x" : -2.5,
//     "h" : 0.1,
//     "equation": "e^(x/3)+x^2",
//     "order" : 2,
//     "oh" : "h^2",
//     "direction" : "backward",
// }



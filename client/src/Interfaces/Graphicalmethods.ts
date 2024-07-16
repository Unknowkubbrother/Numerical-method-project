export interface GraphicalRequest {
    xStart: number;
    xEnd: number;
    func: string;
    errorFactor: number;
}

export interface GraphicalResponse {
    result: {
        x: number;
        y: number;
        error?: number;
    };
	iter: number;
	iterations?: { x: number; y: number }[];
	error?: string;
    statusCode: number;
}
  
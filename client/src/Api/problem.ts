import axios from "axios";
import {domain} from '../Configs/Configs';

interface Problem {
    type: string;
    solution: string;
    input: object;
    output?: object;
}

export const problemCreate = async (problem : Problem) => {
    try {
        const response = await axios.post(`${domain}/problem/create`, problem);
        return response.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const problemGet = async (input : object, type : string, solution : string) => {
    try {
        const response = await axios.post(`${domain}/problem/get`, { 
            input : input,
            type : type,
            solution : solution
        });
        return response.data.problem.output;
    } catch (error) {
        return null;
    }
}
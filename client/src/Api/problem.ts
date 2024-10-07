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
        console.log(error);
        return null;
    }
}

export const problemGet = async (input : object, type : string, solution : string) => {
    try {
        const response = await axios.post(`${domain}/problem/getByITS`, { 
            input : input,
            type : type,
            solution : solution
        });
        return response.data.problem.output;
    } catch (error) {
        return null;
    }
}

export const problemGetByType = async (type : string) => {
    try {
        const response = await axios.post(`${domain}/problem/getByType`, { type : type });
        return response.data;
    } catch (error) {
        return null;
    }
}
import axios from "axios";
export interface Problem {
    type: string;
    solution: string;
    input: object;
    output?: object;
}

export const problemCreate = async (problem : Problem) => {
    try {
        const response = await axios.post(`${process.env.END_POINT}/problem/create`, problem);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const problemGet = async (input : object, type : string, solution : string) => {
    try {
        const response = await axios.post(`${process.env.END_POINT}/problem/getByITS`, { 
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
        const response = await axios.post(`${process.env.END_POINT}/problem/getByType`, { type : type });
        return response.data;
    } catch (error) {
        return null;
    }
}

export const problemGetById = async (id : string) => {
    try{
        const response = await axios.post(`${process.env.END_POINT}/problem/${id}`)
        return response.data;
    }catch(error){
        return null
    }
}
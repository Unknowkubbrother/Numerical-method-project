import axios from "axios"
import {GraphicalRequest} from "../Interfaces/Graphicalmethods"
export const graphicalApi = async (xStart: number, xEnd: number, func: string, errorFactor: number) => {
    try{
        if (!func || func.trim().length == 0 || !xStart || !xEnd ||  !errorFactor){
            return;
        }
        const payload : GraphicalRequest = {
            xStart,
            xEnd,
            func,
            errorFactor
        }
        const result = await axios.post('http://localhost:3000/numerical/root/graphical', payload)
        return result.data
    }catch(err){
        console.log(err)
    }

}
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { multipartHeader } from "../utils/HeaderHelper";


export class AlunoService {
    


    static async update(alunoModel, id) {
        //update
    }

    static async create(alunoWrapper){
        
    
        const headers = {
            ...multipartHeader
        };

        method = "POST"

        return await ExecuteHttpRequest.callout(
            "alunos",
            "POST",
            alunoWrapper,
            {},
            headers 
        );

    }

} 
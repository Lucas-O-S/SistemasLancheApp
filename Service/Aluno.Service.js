import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { multipartHeader } from "../utils/HeaderHelper";


export class AlunoService {
    


    static async update(alunoModel, id) {
        //update
    }

    static async create(alunoModel){
        
        const body = JSON.stringify(alunoModel);
        
        console.log("Body da Requesição: " + body);

        const headers = {
            ...multipartHeader
        };

        method = "POST"

        return await ExecuteHttpRequest.callout(
            "alunos",
            "POST",
            body,
            {},
            headers 
        );

    }

} 
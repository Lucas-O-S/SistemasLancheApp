import { ExecuteHttpRequest } from "../Utils/ExecuteHttpRequest";
import { multipartHeader } from "../Utils/HeaderHelper";


export class AlunoService {
    


    static async update(alunoModel, id) {
        //update
    }

    static async create(alunoWrapper){
        console.log("entrou em create")
    
        const headers = {
            ...multipartHeader
        };

        const method = "POST"

        return await ExecuteHttpRequest.callout(
            "alunos",
            "POST",
            alunoWrapper,
            {},
            headers 
        );

    }

} 
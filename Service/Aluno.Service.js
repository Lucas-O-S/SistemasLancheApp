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

        const result = await ExecuteHttpRequest.callout(
            "/aluno",
            "POST",
            alunoWrapper,
            {},
            headers 
        );
        
        console.log("REsulado" + JSON.stringify(result));
        const resultBody = result.data;
        if(result.status != "201"){
            throw new Error(resultBody.message);
            
        }

        return result;

    }

} 
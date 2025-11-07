import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { multipartHeader } from "../utils/HeaderHelper";
import AlunoModel from "../Models/AlunoModel"

export class AlunoService {
    


    static async update(alunoModel, id) {
        //update
    }

    static async create(alunoWrapper){
        console.log("entrou em create")
    
        const headers = {
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout(
            "/aluno",
            "POST",
            alunoWrapper,
            {},
            headers 
        );
        
        const resultBody = result.data; //acessa o body do resultado
        if(result.status != "201"){
            throw new Error(resultBody.message);
            
        }

        return result;

    }

    static async findAll(){
        console.log("Entrou em find All");

        const result = await ExecuteHttpRequest.callout(
            "/aluno",
            "GET",
            null,
            {},
            {}
        );

        console.log(JSON.stringify(result));

        let alunosList = []

        result.data.data.forEach((dataUnit) => {
            alunosList.push(new AlunoModel(
                dataUnit.id,
                dataUnit.nome,
                dataUnit.ra
            ))
        });

        console.log(alunosList);

        if(result.status != "200"){
            throw new Error(resultBody.message);
            
        }

        return alunosList;
            

    }

} 
import { AlunoService } from "../Service/Aluno.Service";
import { AlunoWrapper } from "../Wrappers/AlunoWrapper";


export default class AlunoController {

    

    static async saveAluno(alunoModel){
        try{
            let result;

            console.log("nome do aluno: " + alunoModel.nome)

            const request = AlunoWrapper(alunoModel);
            console.log("passou request");

            console.log(request);
            
            if(alunoModel.id){
                result = await AlunoService.update(request, alunoModel.id);
            }        
            else{
                result = await AlunoService.create(request);
            }

            console.log("resultado = " + result);

        }
        catch(Error){
            console.log("Erro ao salvar aluno:", Error.message);
            throw Error.message; 
        }
    }

    


}
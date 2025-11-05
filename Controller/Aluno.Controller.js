import { AlunoService } from "../Service/Aluno.Service";


export default class AlunoController {

    

    static async saveAluno(alunoModel){
        if(alunoModel.id){
            AlunoService.update(alunoModel, alunoModel.id);
        }        
        else{
            AlunoService.create(alunoModel);
        }
    }

    


}
import { AlunoService } from "../Service/Aluno.Service";


export default class AlunoController {

    

    static async saveAluno(alunoModel){
        try{
            let result;
            
            if(alunoModel.id){
                result = await AlunoService.update(alunoModel, alunoModel.id);
            }        
            else{
                result = await AlunoService.create(alunoModel);
            }

            console.log("resultado = " + result);

        }
        catch(Error){
            throw Error; 
        }
    }

    


}
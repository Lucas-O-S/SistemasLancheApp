import { AlunoService } from "../Service/Aluno.Service";
import { AlunoWrapper } from "../Wrappers/AlunoWrapper";


export default class AlunoController {

    

    static async saveAluno(alunoModel){
        try{
            let result;

            console.log("nome do aluno: " + alunoModel.nome)

            const request = AlunoWrapper(alunoModel);

            console.log(request);
            
            if(alunoModel.id){
                result = await AlunoService.update(request, alunoModel.id);
            }        
            else{
                result = await AlunoService.create(request);
            }


        }
        catch(error){
            console.log("Erro ao salvar aluno no controler:", error.message);
            throw new Error(error.message);
             
        }

    }

    static async findAll(){
        try{

        }
        catch(Erro)
        {

        }
    }

    


}
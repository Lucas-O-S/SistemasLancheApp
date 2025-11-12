import { LancheService } from "../Service/Lanche.service";
import { LancheCreateWrapper } from "../Wrappers/LancheCreateWrapper";
import { LancheUpdateWrapper } from "../Wrappers/LancheUpdateWrapper";

export class LancheController{
   static async saveAluno(lancheModel){
        try{

            let request;

            console.log(request);
            
            if(lancheModel.id){
                request = LancheUpdateWrapper(lancheModel);
                await LancheService.update(request, lancheModel.id);
            }        
            else{
                request = LancheCreateWrapper(lancheModel);
                await LancheService.create(request);
            }


        }
        catch(Error){
            console.log("Erro ao salvar lanche:", Error.message);
            throw new Error(Error.message);
             
        }

    }

}
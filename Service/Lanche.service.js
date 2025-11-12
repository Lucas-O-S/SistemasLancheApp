import LancheModel from "../Models/LancheModel";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import { multipartHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class LancheService {
    


    static async update(lancheWrapper, id) {
        console.log("entrou em update")
    
        const headers = {
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche/"+id,
            method:"PUT",
            body:lancheWrapper,
            headers:headers 
    });

        console.log(JSON.stringify(result))
        
        const resultBody = result.data;
        if(result.status != "200"){
            throw new Error(resultBody.message);
            
        }

        return result;
    }

    static async create(lancheWrapper){
        console.log("entrou em create")
    
        const headers = {
            ...multipartHeader
        };

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche",
            method:"POST",
            body:lancheWrapper,
            headers:headers 
        });
        
        const resultBody = result.data; 
        if(result.status != "201"){
            throw new Error(resultBody.message);
            
        }

        return result;

    }

    static async findAll(){
        console.log("Entrou em find All");

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche",
            method:"GET",
        });

        console.log(JSON.stringify(result));

        let lanchesList = []

        result.data.data.forEach((dataUnit) => {
            lanchesList.push(new LancheModel({
                id : dataUnit.id,
                alunoId : dataUnit.alunoId,
                quantidade : quantidade,
                entregue : entregue
            }))
        });

        console.log(lanchesList);

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }

        return lanchesList;
            

    }

    static async findOne(id){
        console.log("Entrou em find one");

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche/"+id,
            method:"GET",
    });

        console.log(JSON.stringify(result));

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }
        const dataUnit = result.data.dataUnit;
        
        return new lancheModel({
            id : dataUnit.id,
            alunoId : dataUnit.alunoId,
            quantidade : quantidade,
            entregue : entregue
        });
    }
    static async delete(id){
        console.log("Entrou em delete");

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche/"+id,
            method:"DELETE",
        });

        console.log(JSON.stringify(result));

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }
    }

} 
import AlunoModel from "../Models/AlunoModel";
import LancheModel from "../Models/LancheModel";
import { convertStandardDateToDmy } from "../utils/DateConverter";
import { ExecuteHttpRequest } from "../utils/ExecuteHttpRequest";
import {  jsonHeader } from "../utils/HeaderHelper";
import ImageHelper from "../utils/ImageHelper";

export class LancheService {
    


    static async update(lancheWrapper, id) {
        console.log("entrou em update")
    
        const headers = {
            ...jsonHeader
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
            ...jsonHeader
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
            method:"GET"
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

    
    static async findAllByFilter(entregue = false, dataLiberacao = ""){
        console.log("Entrou em find All by filter");

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche/filtro-entregue",
            param : {
                FiltrarPor : entregue,
                dataEntrega : dataLiberacao
            },
            method:"GET"
        });

        if(result.status != "200"){
            throw new Error(result.data.message);
            
        }

        console.log(JSON.stringify(result));

        let lanchesList = []

        result.data.data.forEach((dataUnit) => {
            lanchesList.push(
                new LancheModel({
                    
                    id : dataUnit.id,
                    alunoId : dataUnit.alunoId,
                    quantidade : dataUnit.quantidade,
                    entregue : dataUnit.entregue,
                    dataLiberacao :convertStandardDateToDmy(dataUnit.dataLiberacao),
                    alunoModel : new AlunoModel({
                        id : dataUnit.alunoId,
                        nome : dataUnit.aluno.nome,
                        ra : dataUnit.aluno.ra
                    })

                })

            )
        });

        console.log(JSON.stringify(lanchesList[0]));



        return lanchesList;
            

    }

    static async patch(id) {
        console.log("entrou em patch")

        const result = await ExecuteHttpRequest.callout({
            url:"/lanche/"+id,
            method:"PATCH",
        });

        console.log(JSON.stringify(result))
        
        const resultBody = result.data;
        if(result.status != "200"){
            throw new Error(resultBody.message);
            
        }

    }

} 
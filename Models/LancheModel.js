import { dmyToStandardDate } from "../utils/DateConverter";
import StandardModel from "./StandardModel";

export default class LancheModel extends StandardModel {
    
    #dataLiberacao;
    #alunoId;
    #entregue;
    #quantidade

    constructor({id = null, dataLiberacao = "", alunoId = null, entregue = false, quantidade = 1}) {
        super(id);
        this.#dataLiberacao = dataLiberacao;
        this.#alunoId = alunoId;
        this.#entregue = entregue;
        this.#quantidade = quantidade
    }

    get dataLiberacao() {
        return this.#dataLiberacao;
    }

    set dataLiberacao(value) {
        
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Data de liberação deve ser uma string válida.");
        }
        
        const date = new Date(dmyToStandardDate(value));

        if (isNaN(date.getTime())) {
            console.log("data : " + value)
            throw new Error("Data de liberação inválida. Use um formato válido (ex: '2025-11-02' ou '02/11/2025').");
        }
        
        this.#dataLiberacao = value;
    }

    get alunoId() {
        return this.#alunoId;
    }

    set alunoId(value) {
        if (value === null || isNaN(value)) {
            throw new Error("ID do aluno deve ser um número válido.");
        }
        this.#alunoId = Number(value);
    }

    get entregue() {
        return this.#entregue;
    }

    set entregue(value) {
        if (typeof value !== "boolean") {
            throw new Error("O campo 'entregue' deve ser verdadeiro ou falso (boolean).");
        }
        this.#entregue = value;
    }

    get quantidade() {
        return this.#quantidade;
    }

    set quantidade(value) {
        if (value === null || isNaN(value)) {
            throw new Error("O campo 'quantidade' deve ser é obrigatorio.");
        }
        if(value > 3 || value < 1){
            throw new Error("O campo 'quantidade' deve estar 1 e 3.");

        }
        this.#quantidade = value;
    }
}

export default class LancheModel {
    #dataLiberacao;
    #alunoId;
    #entregue;

    constructor(id = null, dataLiberacao = "", alunoId = null, entregue = false) {
        super(id);
        this.dataLiberacao = dataLiberacao;
        this.alunoId = alunoId;
        this.entregue = entregue;
    }

    get dataLiberacao() {
        return this.#dataLiberacao;
    }

    set dataLiberacao(value) {
        
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Data de liberação deve ser uma string válida.");
        }
        
        if (isNaN(data.getTime())) {
            console.log("data : " + value)
            throw new Error("Data de liberação inválida. Use um formato válido (ex: '2025-11-02' ou '02/11/2025').");
        }
        
        this.#dataLiberacao = value.trim();
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
}

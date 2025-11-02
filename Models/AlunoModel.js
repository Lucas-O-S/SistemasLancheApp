import StandardModel from "./StandardModel";

export default class AlunoModel extends StandardModel {

    #nome;
    #ra;
    #imagem;

    constructor(id = null, nome = "", ra = "", imagem = "") {
        super(id);
        this.#nome = nome;
        this.#ra = ra;
        this.#imagem = imagem;
    }

    get nome() {
        return this.#nome;
    }

    get ra() {
        return this.#ra;
    }

    get imagem() {
        return this.#imagem;
    }

    set nome(value) {

        if(!value || value.length() < 1) {
            throw new Error("Nome esta vazio");
        }

        this.#nome = value;
    }

    set ra(value) {

        if(!value || value.length() < 1) {
            throw new Error("RA esta vazio");
        }
        
        this.#ra = value;
    }

    set imagem(value) {
        
        if(!value || value.length < 1)
            throw new Error("Imagem é obrigatoria");

        if (typeof value === "string" && !value.startsWith("data:image/")) {
            throw new Error("Formato de imagem inválido (esperado Base64).");
        }
        
        this.#imagem = value;
    }
}

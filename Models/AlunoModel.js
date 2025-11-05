import StandardModel from "./StandardModel";

export default class AlunoModel extends StandardModel {

    #nome;
    #ra;
    #imagem64;
    #imagemFile;

    constructor(id = null, nome = "", ra = "", imagem64 = "", imagemFile = null) {
        super(id);
        this.#nome = nome;
        this.#ra = ra;
        this.#imagem64 = imagem64;
        this.#imagemFile = imagemFile;
    }

    get nome() {
        return this.#nome;
    }

    get ra() {
        return this.#ra;
    }

    get imagem64() {
        return this.#imagem64;
    }

    get imagemFile() {
        return this.#imagemFile;
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

    set imagem64(value) {
        
        if(!value || value.length < 1)
            throw new Error("Imagem é obrigatoria");

        if (typeof value === "string" && !value.startsWith("data:image/")) {
            throw new Error("Formato de imagem inválido (esperado Base64).");
        }

        this.#imagem64 = value;
    }

    set imagemFile(file) {
        if(file && !(file instanceof Buffer)) {
            throw new Error("Arquivo de imagem inválido");
        }
        this.#imagemFile = file;
    }
}

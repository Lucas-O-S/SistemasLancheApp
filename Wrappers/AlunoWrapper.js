export const AlunoWrapper = (alunoModel) => {
    const formData = new FormData();

    formData.append("nome", alunoModel.nome);
    formData.append("ra", alunoModel.ra);

    if (alunoModel.imagemFile) {

        const file = alunoModel.imagemFile._parts[0][1]; 
        formData.append("imagem", file);    }

    return formData;
};
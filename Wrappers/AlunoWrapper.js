export const AlunoWrapper = (alunoModel) => {
    const formData = new FormData();

    formData.append("nome", alunoModel.nome);

    formData.append("ra", alunoModel.ra);


    formData.append("imagem", alunoModel.imagemFile);    
    

    return formData;
};
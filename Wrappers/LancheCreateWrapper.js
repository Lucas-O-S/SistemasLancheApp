export const LancheCreateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": lancheModel.dataLiberacao,
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade

    };
};
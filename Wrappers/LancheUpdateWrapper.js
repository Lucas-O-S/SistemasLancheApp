export const LancheUpdateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": lancheModel.dataLiberacao,
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade,
        "entregue": lancheModel.entregue

    };
};
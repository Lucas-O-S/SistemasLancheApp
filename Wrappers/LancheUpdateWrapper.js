export const LancheUpdateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": dmyToStandardDate(lancheModel.dataLiberacao),
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade,
        "entregue": lancheModel.entregue

    };
};
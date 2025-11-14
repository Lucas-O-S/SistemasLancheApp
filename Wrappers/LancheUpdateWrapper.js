export const LancheUpdateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": convertDmyToStandardDate(lancheModel.dataLiberacao),
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade,
        "entregue": lancheModel.entregue

    };
};
import { dmyToStandardDate } from "../utils/DateConverter";

export const LancheCreateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": dmyToStandardDate(lancheModel.dataLiberacao),
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade

    };
};
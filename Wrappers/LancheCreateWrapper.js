import { convertDmyToStandardDate, dmyToStandardDate } from "../utils/DateConverter";

export const LancheCreateWrapper = (lancheModel) => { 
    return {
        
        "dataLiberacao": convertDmyToStandardDate(lancheModel.dataLiberacao),
        "alunoId": lancheModel.alunoId,
        "quantidade": lancheModel.quantidade

    };
};
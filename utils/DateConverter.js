

export const dmyToStandardDate = (date) => {
    const [dd, mm, yyyy] = date.split("/")

    return `${yyyy}-${mm}-${dd}`;

}

export const StandardDateToDmy = (date) => {
    const [dd, mm, yyyy] = date.split("/")

    return `${dd}/${mm}/${yyyy}`;

}
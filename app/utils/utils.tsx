

export const toCapitalize = (str:string) => {
    const f = str.charAt(0).toUpperCase();
    return `${f}${str.substring(1)}`
} 
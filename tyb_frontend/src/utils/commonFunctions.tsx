import {format} from "date-fns";

//Funzione che permette di aggiornare lo stato di un form
export const handleFormFieldChange=(setState: any, name: string, value: string | Date)=>{
    setState((prevState: any) => {
            const newState = {...prevState}
        if (newState.form){
            newState.form.fields[name] = value
        }
            return newState
        }
    )
}

// Funzione per hashare la password
//export const hashPassword = async (password:string):Promise<string> => {
//
//    const bcrypt = require('bcrypt');
//    try {
//        const hashedPassword = await bcrypt.hash(password, 10);
//        return hashedPassword;
//    } catch (error) {
//        console.error('Errore durante l\'hashing della password:', error);
//        throw error;
//    }
//};



export const getDateFormatted =(date: string | Date | undefined, format: "dd-MM-yyyy" | "dd/MM/yyyy" | "yyyy-MM-dd" = "dd/MM/yyyy") => {
    if (date && date instanceof Date) {
        return getDateFormattedFromDate(date, format);
    }
    if (date) {
        const [completeDate] = date.split("T");
        const [dateYear, dateMonth, dateDay] = completeDate.includes("/") ?
            completeDate.split("/") : completeDate.split("-");
        const separator = format === "dd-MM-yyyy" || format === "yyyy-MM-dd" ? "-" : "/";
        return (format === "yyyy-MM-dd" ?
            dateYear + separator + dateMonth + separator + dateDay :
            dateDay + separator + dateMonth + separator + dateYear);
    } else {
        return "";
    }
};

export const getDateFormattedFromDate = (datePass: Date | undefined, format: "dd-MM-yyyy" | "dd/MM/yyyy" | "yyyy-MM-dd" = "dd/MM/yyyy") => {
    if (datePass) {
        const dateYear = datePass.getFullYear().toString();
        const dateMonth = (datePass.getMonth() + 1).toString().padStart(2, '0');
        const dateDay = datePass.getDate().toString().padStart(2, '0');
        const separator = format === "dd-MM-yyyy" || format === "yyyy-MM-dd" ? "-" : "/";
        return (format === "yyyy-MM-dd" ?
            dateYear + separator + dateMonth + separator + dateDay :
            dateDay + separator + dateMonth + separator + dateYear);
    } else {
        return "";
    }
}

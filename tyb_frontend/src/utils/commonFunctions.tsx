
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
export const hashPassword = async (password:string):Promise<string> => {

    const bcrypt = require('bcrypt');
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error('Errore durante l\'hashing della password:', error);
        throw error;
    }
};

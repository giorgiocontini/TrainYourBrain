
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
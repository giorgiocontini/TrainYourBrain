
//Funzione che permette di aggiornare lo stato di un form
export const handleFieldChange=(prevState: any, setState: (arg0: (prevState: any) => any) => void, e: { target: { name: string | number; value: any; }; })=>{
    setState((prevState: any) => {
            const newState = {...prevState};
            newState[e.target.name] = e.target.value;
            return newState;
        }
    )
}
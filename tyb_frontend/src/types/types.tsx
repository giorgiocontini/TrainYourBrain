
export type TUser = {
    name: string | undefined;
    surname: string | undefined;
    username?: string | undefined;
    role?: string | undefined;
    password:string | undefined;
};

export type TAnswer = {
    answer: string | undefined,
    isCorrect:boolean | undefined
}

export type TQuestion = {
    question: string | undefined,
    answers: TAnswer[]
};
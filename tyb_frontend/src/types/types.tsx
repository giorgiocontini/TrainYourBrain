
export type TUser = {
    name: string | undefined;
    surname: string | undefined;
    username?: string | undefined;
    role?: string | undefined;
    password:string | undefined;
};

export type TAnswer = {
    description: string | undefined,
    isCorrect:boolean | undefined
}

export type TQuestion = {
    description: string,
    answers: TAnswer[],
    topic:string
};

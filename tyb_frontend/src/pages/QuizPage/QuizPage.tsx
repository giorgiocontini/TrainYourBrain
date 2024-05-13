import React, {useContext, useEffect, useState} from 'react';
import {useLocation, useNavigate} from "react-router-dom"

/**
 * Locals
 */
import "./QuizPage.scss";
import {showDialogFailed, showDialogInfo} from "../../utils/DialogUtils";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import {QuestionType, QuizDto, UserQuizResultType} from "../../services/API/openapicode_tyb_user";
import TimerComponent from "../../components/TimerComponent/TimerComponent";
import {AuthContext} from "../../AuthContext";


const QuizPage = () => {

    const {user} = useContext(AuthContext)
    const {state: location} = useLocation();
    const navigate = useNavigate();
    const {topic, idQuiz} = location || {};
    const [questions, setQuestions] = useState<QuestionType[]>([]);

    useEffect(() => {
        getQuiz(topic);
    }, []);

    // Funzione per recuperare un numero casuale di oggetti dalla lista
    function getDomandeCasuali(lista: QuizDto[], numeroDomande: number) {
        const list: QuestionType[] = lista[0].questions.sort(() => Math.random() - 0.5).slice(0, numeroDomande);
        setQuestions(list);
    }

    function getQuiz(topic: string) {
        QuizClient.getQuizUsingGet(topic).then(
            (res) => {
                getDomandeCasuali(res?.data?.result, 10);
            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })
    }

    const [remainingTime, setRemainingTime] = useState(1800);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const loadNextQuestion = () => {
        // Controlla se ci sono ancora domande disponibili
        if (currentQuestionIndex + 1 < questions?.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            saveQuizResult();
        }
    };

    const loadPreviousQuestion = () => {
        if (currentQuestionIndex - 1 >= 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const [buttonStyle, setButtonStyle]
        = useState<{ qId: number, aId: number, style: string } | undefined>(undefined);

    function saveQuizResult() {
        QuizClient.saveQuizUsingPost(userResults).then(response => {
            showDialogInfo("Test completato", "Verrai reindirizzato alla homepage", () => {
                navigate("/home", {replace: true})
            })
        })
            .catch(error => {
                showDialogFailed(error?.response.data?.esito.descrizione);
            })
    }

    const [userResults, setUserResults] = useState<UserQuizResultType>({
        userId: user.username,
        totalScore: 0,
        topic: topic || ""
    })

    useEffect(() => {
        console.log(userResults.totalScore);
        debugger
    }, [userResults.totalScore]);

    const checkAnswer = (quizId: string, questionId: number, ansIndex: number) => {

        debugger
        QuizClient.checkAnswerUsingGet(quizId, questionId, ansIndex).then(
            (res) => {
                if (res.data) {
                    setButtonStyle({
                        ...buttonStyle, qId: questionId,
                        aId: ansIndex, style: "btn btn-success"
                    })

                    setTimeout(() => {
                        //gestire le risposte corrette
                        setRemainingTime(prevState => (prevState + 15));
                        loadNextQuestion();
                        setUserResults((oldState) => {
                            const newState = {...oldState};
                            newState.totalScore = (newState.totalScore + 10);
                            return newState;
                        });
                    }, 500)

                } else {

                    setButtonStyle({
                        ...buttonStyle, qId: questionId,
                        aId: ansIndex, style: "btn btn-danger"
                    })
                    setTimeout(() => {
                        //gestire le risposte errate
                        setRemainingTime(prevState => (prevState - 15));
                        loadNextQuestion();
                        setUserResults((oldState) => {
                            const newState = {...oldState};
                            newState.totalScore = (newState.totalScore - 10);
                            return newState;
                        });
                    }, 500)
                }
            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data?.error);
        })

    }

    const handleTimeout = () => {
        showDialogInfo("Tempo scaduto", "I dati sono stati inviati correttamente", () => {
            navigate("/home", {replace: true})
        })
    };

    function getStyle(index: number) {
        return (buttonStyle
            && currentQuestionIndex === buttonStyle?.qId
            && index === buttonStyle.aId) ? buttonStyle.style : "";
    }

    return <div>
        <div className="d-flex flex-row justify-content-between" style={{alignItems: "center"}}>
            <h1>{(topic as string)?.toUpperCase() ?? ""}</h1>
            <TimerComponent
                onTimeout={handleTimeout} remainingTime={remainingTime} setRemainingTime={setRemainingTime}/>

            <h6> {'Domanda ' + (currentQuestionIndex + 1) + " di " + questions?.length}</h6>
        </div>
        <div className="pageContainer mt-5">
            <div className="questionContainer">
                {/* Domanda di lunghezza variabile */}
                <h2>{questions[currentQuestionIndex]?.description || ""}</h2>
            </div>
            <div className="answerGrid mt-4">
                {/* Griglia 2x2 con risposte */}
                {(questions[currentQuestionIndex]?.answers)?.map((el, index) => {
                    return <button key={'answer_' + index} className={'answerButton ' + getStyle(index)}
                                   onClick={() => {
                                       checkAnswer(idQuiz, currentQuestionIndex, index);
                                   }
                                   }>{el.description}</button>
                })}
            </div>
        </div>
        <div className="d-flex flex-row mt-5">
            {
                //Back button
                //   currentQuestionIndex != 0 ?
                //   <div className={"me-auto"}>
                //       <button className={"btn btn-outline-secondary"} onClick={loadPreviousQuestion}>Indietro
                //       </button>
                //   </div>
                //   : <></>
            }
            {
                //currentQuestionIndex != questions.length-1?
                <div className={"ms-auto"}>
                    <button className={"btn btn-outline-secondary"} onClick={loadNextQuestion}>Avanti
                    </button>
                </div>
                // : <></>
            }

        </div>

    </div>
}

export default QuizPage;

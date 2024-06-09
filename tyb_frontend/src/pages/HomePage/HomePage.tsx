import React, {FC, useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../AuthContext";
import {useNavigate, useParams} from "react-router-dom"
import {USER_ROLE} from "../../utils/const";

/**
 * Locals
 */
import "./HomePage.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import {CardComponentConfig} from "../../components/CardComponent/CardTypes";
import PageTitle from "../../components/PageTitle/PageTitle";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import {showDialogFailed} from "../../utils/DialogUtils";
import {QuizDto} from "../../services/API/openapicode_tyb_user";


interface HomeComponentProps {
}

/**
 *  ENUM_CARD_STATUS
 *  @description Enum object, set of cards status
 */
export enum CardStatusEnum {
    HIDDEN = "Hidden",
    LOCKED = "Locked",
    ACTIVE = "Active",
    ERROR = "Error",
    COMPLETED = "Completed",
    WARNING = "Warning",
}

const HomePage: FC<HomeComponentProps> = () => {

    const navigate = useNavigate()
    const {isInRole} = useContext(AuthContext)
    const [topics, setTopics] = useState<QuizDto[]>([])

    const getQuizzes= ()=>{
        QuizClient.getQuizUsingGet("all").then(
            (res) => {
                const data = res.data.result
                const topicsFromDB = data.filter((value, index, self) => self.indexOf(value) === index)
                setTopics([...topicsFromDB]);
            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })
    }
    useEffect(() => {
        getQuizzes();
    }, []);

    // Array di dati delle card
    const cardData: CardComponentConfig[] =
        topics.map((el, index) => {
            return {
                status: el.isHidden ? CardStatusEnum.LOCKED :CardStatusEnum.ACTIVE,
                id: el.id || "",
                title: el.topic,
                description: el.topicDescription,
                image: el.imageFile,
                isHidden: el.isHidden || false,
                button1: {
                    label: "Procedi",
                    onClick: () => {
                        navigate("/quiz", {
                            replace: true,
                            state: {
                                topic: el.topic,
                                idQuiz: el.id
                            }
                        })
                    }
                },
                onHidden: getQuizzes,
                onDelete: getQuizzes
            }
        });
    return <div>
        <PageTitle title={"Homepage"}/>
        <div className="container p-2">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5 mt-3 ">
                {/* Mappiamo i dati delle card per creare le card */}
                {cardData.filter((card)=>((isInRole("S") && !card.isHidden) || isInRole("A"))).map((card, index) => (
                    <div className="col" key={index}>
                        <CardComponent config={{
                            ...card,
                            key: card.id,
                        }}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HomePage;

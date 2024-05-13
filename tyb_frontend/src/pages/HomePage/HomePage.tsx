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
    const {isInRole} = useContext(AuthContext);
    const params = useParams();

    const navigate = useNavigate()

    const [topics, setTopics] = useState<{ topic: string, topicDescription: string, id: string }[]>([])

    useEffect(() => {
        QuizClient.getQuizUsingGet("all").then(
            (res) => {
                const data = res.data.result
                const topicsFromDB = data.map((value) => {
                    return {topic: value.topic, id: value.id || "", topicDescription: value.topicDescription};
                }).filter((value, index, self) => self.indexOf(value) === index)
                setTopics([...topicsFromDB]);
            }
        ).catch((error) => {
            showDialogFailed(error?.response?.data.error)
        })
    }, []);

    // Array di dati delle card
    const cardData: CardComponentConfig[] =
        topics.map((el, index) => {
            return {
                status: CardStatusEnum.ACTIVE,
                id: "card_" + index,
                title: el.topic,
                description: el.topicDescription,
                image: undefined,
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
                }
            }
        });

    //<PageTitle title={"Homepage"}/>
    //        <div className="container">
    //            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 mb-5 mt-3">
    //                {/* Mappa i dati delle card per creare le card */}
    //                {cardData.map((card, index) => (
    //                    <div className="col" key={index}>
    //                        <CardComponent
    //                            config={{
    //                                key: "" + index,
    //                                status: CardStatusEnum.ACTIVE,
    //                                id: card.title,
    //                                title: card.title,
    //                                image: card.image,
    //                                description: card.description,
    //                                button1: card?.button1
    //                            }}
    //                        />
    //                    </div>
    //                ))}
    //            </div>
    //        </div>
    return <div>
        <PageTitle title={"Homepage"}/>
        <div className="container p-2">
            <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 mb-5 mt-3 ">
                {/* Mappiamo i dati delle card per creare le card */}
                {cardData.map((card, index) => (
                    <div className="col" key={index}>
                        <CardComponent config={{
                            key: "" + index,
                            status: CardStatusEnum.ACTIVE,
                            id: card.title,
                            title: card.title,
                            image: card.image,
                            description: card.description,
                            button1: card?.button1
                        }}/>
                    </div>
                ))}
            </div>
        </div>
    </div>
}

export default HomePage;

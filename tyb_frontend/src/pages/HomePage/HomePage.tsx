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
import {array} from "yup";


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

    const [topics, setTopics] = useState<string[]>([])

    useEffect(() => {
        QuizClient.getQuizUsingGet("all").then(
            (res) => {
                const data = res.data.result
                const topicsFromDB =  data.map((value) => {
                    return value.topic;
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
                title: el,
                description: "",
                image: undefined,
                button1: {
                    label: "Procedi",
                    onClick: () => {
                        navigate("/quiz", {
                            replace: true,
                            state: {
                                topic: el
                            }
                        })
                    }
                }
            }
        });
    return <div>
        <PageTitle title={"Homepage"}/>
        <div className="row g-1 g-sm-2 g-md-3 g-lg-4 mb-5 mt-3">
            {/* Mappiamo i dati delle card per creare le card */}
            {cardData.map((card, index) => (
                <CardComponent config={{
                    key: "" + index,
                    status: CardStatusEnum.ACTIVE,
                    id: card.title,
                    title: card.title,
                    image: card.image,
                    description: card.description,
                    button1: card?.button1
                }}/>
            ))}
        </div>

        <div className="d-flex flex-row d-inline">
            {isInRole(USER_ROLE.ADMIN) ?
                <div className="col-7 border border-primary rounded p-2">Sezione Admin</div>
                : null
            }

            <div className="col-4 me-auto border border-primary rounded p-2">
                Sezione visibile a tutti
            </div>

        </div>
    </div>
}

export default HomePage;

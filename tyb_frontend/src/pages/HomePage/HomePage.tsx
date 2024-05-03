import React, {FC, useContext} from 'react';
import {AuthContext} from "../../AuthContext";
import {useNavigate, useParams} from "react-router-dom"
import {USER_ROLE} from "../../utils/const";
import MathSVG from '../../svg/math.svg';

/**
 * Locals
 */
import "./HomePage.scss";
import CardComponent from "../../components/CardComponent/CardComponent";
import {CardComponentConfig} from "../../components/CardComponent/CardTypes";

interface HomeComponentProps {}


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

    // Array di dati delle card
    const cardData: CardComponentConfig[] = [
        {
            status:CardStatusEnum.ACTIVE,
            id: "card_1",
            title: "Math",
            description: "Primo argomento",
            image: MathSVG,
            button1: {
                label:"Test Matematica",
                onClick:()=>{
                    navigate("/quiz", {replace:true,
                    state:{
                        topic:"math"
                    }})
                }
            }
        },
        {
            id: "card_2",
            title: "Card 2",
            description: "Secondo argomento",
            image: "https://example.com/image2.jpg",
            button1: {
                onClick:Function
            }

        },
        {
            id: "card_3",
            title: "Card 3",
            description: "Terzo argomento",
            image: "https://example.com/image3.jpg",
            button1: {
                onClick:Function
            }
        },
    ];
    return <div>
        <h1>Homepage</h1>
        <div className="row g-1 g-sm-2 g-md-3 g-lg-4 mb-5 mt-3">
                {/* Mappiamo i dati delle card per creare le card */}
                {cardData.map((card, index) => (
                    <CardComponent config={{
                        status:CardStatusEnum.ACTIVE,
                        id:card.title,
                        title:card.title,
                        image:card.image,
                        description:card.description,
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

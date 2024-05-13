import React from 'react';
import './WelcomePage.scss';
import { useNavigate } from "react-router-dom";

import logoImage from './logo-senza-sfondo.png';


const WelcomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    return (
        <div className="welcome-container">
            <main className="welcome-main">
                <h2>Benvenuto su TrainYourBrain</h2>
                <p>Le app di quiz stanno rivoluzionando il modo in cui le giovani menti acquisiscono e assimilano
                    il sapere. Unisciti a noi per esplorare una vasta gamma di quiz che stimolano il pensiero critico
                    e migliorano le capacita' di apprendimento attraverso sfide continuative e analisi approfondite delle performance.</p>


                <div className="feature-description">
                    <h3>Esplora Quiz</h3>
                    <p>Scopri nuovi quiz ogni giorno, creati per migliorare le tue conoscenze in modo divertente e coinvolgente.</p>
                </div>

                <div className="feature-description">
                    <h3>Monitora il Progresso</h3>
                    <p>Visualizza statistiche dettagliate per tracciare i tuoi miglioramenti e le competenze acquisite nel tempo.</p>
                </div>

                <div className="feature-description">
                    <h3>Condividi i Risultati</h3>
                    <p>Condividi i tuoi successi e avanzamenti con amici e insegnanti, promuovendo un apprendimento collaborativo.</p>
                </div>

                <div className="navigation-link">
                    <h3>Vuoi iniziare subito? Accedi o registrati <span className="link" onClick={() => handleNavigation("/login")}>qui</span>.</h3>
                </div>
            </main>
        </div>
    );
}

export default WelcomePage;

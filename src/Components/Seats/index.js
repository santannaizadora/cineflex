import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//import { Link } from "react-router-dom";
import axios from "axios";

import './index.css';

import Footer from "../Footer";
import RenderSeats from './RenderSeats';

const Seats = () => {
    const [session, setSession] = useState({});
    const [canRender, setCanRender] = useState(false);
    const [seats, setSeats] = useState([]);
    const [seatsName, setSeatsName] = useState([]);
    const { idSession } = useParams();
    console.log(seatsName);
    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`)
            .then(response => {
                setSession(response.data);
                setCanRender(true);
            })
    }, [idSession]);

    const Legend = () => {
        return (
            <div className="legend">
                <div className="legend-item">
                    <div className="legend-item-color selected"></div>
                    <div className="legend-item-text">Selecionado</div>
                </div>
                <div className="legend-item">
                    <div className="legend-item-color available"></div>
                    <div className="legend-item-text">Disponível</div>
                </div>
                <div className="legend-item">
                    <div className="legend-item-color unavailable"></div>
                    <div className="legend-item-text">Indisponível</div>
                </div>

            </div>
        )
    }

    const Inputs = () => {
        return (
            <div className="inputs">
                <div className="inputs-item">
                    <label>Nome do comprador:</label>
                    <input type="text" placeholder="Digite seu nome..." />
                </div>
                <div className="inputs-item">
                    <label>CPF do comprador:</label>
                    <input type="text" placeholder="Digite seu CPF..." />
                </div>
            </div>
        )
    }

    console.log(session);

    return (
        <>
            <main className="main-seats">
                <div className='page-description'>
                    <h1>Selecione o(s) assento(s)</h1>
                </div>
                <div className="seats-container">
                    {canRender ?
                        session.seats.map((seat, index) => {
                            return (
                                <RenderSeats
                                    key={index}
                                    isAvailable={seat.isAvailable}
                                    name={seat.name}
                                    id={seat.id}
                                    setSeats={setSeats}
                                    seats={seats}
                                    setSeatsName={setSeatsName}
                                    seatsName={seatsName}
                                />
                            )
                        })
                        :
                        <></>
                    }
                </div>
                <Legend />
                <Inputs />
                <button className="btn-reserve">Reservar assentos</button>
            </main>
            {canRender
                ? <Footer
                    poster={session.movie.posterURL}
                    title={session.movie.title}
                    isSession={true}
                    sessionName={session.name}
                    sessionDay={session.day.weekday}
                />
                :
                <></>}
        </>
    )
}
export default Seats;
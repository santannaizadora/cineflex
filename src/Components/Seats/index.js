import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

import './index.css';

import Footer from "../Footer";
import RenderSeats from './RenderSeats';

const Inputs = (props) => {
    const {buyer, setBuyer, buyerCpf, setBuyerCpf }= props
    return (
        <div className="inputs">
            <div className="inputs-item">
                <label>Nome do comprador:</label>
                <input
                    value={buyer}
                    type="text"
                    placeholder="Digite seu nome..."
                    onChange={(e) => setBuyer(e.target.value)}
                />
            </div>
            <div className="inputs-item">
                <label>CPF do comprador:</label>
                <input
                value={buyerCpf}
                    type="text"
                    placeholder="Digite seu CPF..."
                    onChange={(e) => setBuyerCpf(e.target.value)}
                />
            </div>
        </div>
    )
}

const Seats = () => {
    const [session, setSession] = useState({});
    const [canRender, setCanRender] = useState(false);
    const [seats, setSeats] = useState([]);
    const [seatsName, setSeatsName] = useState([]);
    const [buyer, setBuyer] = useState('');
    const [buyerCpf, setBuyerCpf] = useState('');

    const { idSession } = useParams();

    const navigation = useNavigate();

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

    const handleButton = () => {
        if (seats.length > 0) {
            axios.post(`https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`, {
                ids: seats,
                name: buyer,
                cpf: buyerCpf
            }).then(()=>{
                navigation('/sucesso', {
                    state: {
                        seatsName: seatsName,
                        buyer: buyer,
                        buyerCpf: buyerCpf,
                        film: session.movie.title,
                        date: session.day.date,
                        time: session.name
                    }
                });
            }).catch(()=>{
                alert('Erro ao reservar assentos')
            })
            
        } else {
            alert('Selecione pelo menos um assento')
        }
    }

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
                <Inputs
                    buyer={buyer}
                    setBuyer={setBuyer}
                    buyerCpf={buyerCpf}
                    setBuyerCpf={setBuyerCpf}
                />
                <button className="btn-reserve" onClick={handleButton}>Reservar assentos</button>
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
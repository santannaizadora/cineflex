import { Link, useLocation } from 'react-router-dom'
import './index.css';

const Confirmation = () => {
    const navigate = useLocation()
    const { seatsName, buyer, buyerCpf, time, film, date } = navigate.state;
    return (
        <main className='main-confirmation'>
            <h1 className='success-title'>Pedido feito com sucesso!</h1>

            <div className='reservation-info'>
                <div className='reservation-info-item'>
                    <h2>Filme e sessão</h2>
                    <p>{film}</p>
                    <p>{date} - {time}</p>
                </div>

                <div className='reservation-info-item'>
                    <h2>Ingressos</h2>
                    {seatsName.map((seat, index) => {
                        return (
                            <p key={index}>Assento {seat}</p>
                        )
                    })}
                </div>

                <div className='reservation-info-item'>
                    <h2>Comprador</h2>
                    <p>Nome: {buyer}</p>
                    <p>CPF: {buyerCpf}</p>
                </div>
            </div>

            <div className='reservation-info-button-item'>
                <Link to='/'>
                    <button className='reservation-info-button'>
                        <p>Voltar para a home</p>
                    </button>
                </Link>
            </div>
        </main>
    );
}

export default Confirmation;
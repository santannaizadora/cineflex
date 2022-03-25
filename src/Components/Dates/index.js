import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";


import './index.css';

const Dates = () => {
    const [movie, setMovie] = useState({});
    const [canRender, setCanRender] = useState(false);
    const { idMovie } = useParams();
    useEffect(() => {

        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`)
            .then(response => {
                setMovie(response.data);
                setCanRender(true);
            })
    }, []);

    console.log(movie);

    const RenderDates = () => {
        return movie.days.map(date => {
            return (
                <div key={date.id} className='date-card'>
                    <h2>{date.weekday} - {date.date}</h2>

                    <div className='buttons'>
                        {date.showtimes.map(time => {
                            return (
                                <div key={time.id}>
                                    <Link to={`/sessao/${time.id}`}>
                                        <button className="time-button">
                                            {time.name}
                                        </button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            )
        })
    }


    return (
        <>
            <main className="main-dates">
                <div className='page-description'>
                    <h1>Selecione a data</h1>
                </div>

                <div className="date-container">
                    {canRender ? <RenderDates /> : <></>}
                </div>
            </main>
        </>
    )
}

export default Dates;
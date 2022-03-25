import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Dates = () => {
    const { idMovie } = useParams();
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idMovie}/showtimes`)
            .then(response => {
                setMovie(response.data);
            })
    }, []);

console.log(movie);

    return (
        <>
            <main>
                <div className='page-description'>
                    <h1>Selecione a data</h1>
                </div>
            </main>
        </>
    )
}

export default Dates;
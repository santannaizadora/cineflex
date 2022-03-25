import './index.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const Movies = () => {

    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get('https://mock-api.driven.com.br/api/v5/cineflex/movies')
            .then(response => {
                setMovies(response.data);
            })
    }, []);

    const RenderMovies = () => {
        return movies.map(movie => {
            return (
                <div key={movie.id} className='movie-card'>
                    <Link to={`/filme/${movie.id}`}>
                        <img src={movie.posterURL} alt={movie.title} />
                    </Link>
                </div>
            )
        })
    }

    return (
        <>
            <main className='main-movies'>
                <div className='page-description'>
                    <h1>Selecione o filme</h1>
                </div>

                <div className='movies-container'>
                    <RenderMovies />
                </div>
            </main>
        </>
    );
}

export default Movies;
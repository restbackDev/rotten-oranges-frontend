// src/components/MovieDetails/MovieDetails.jsx
// import { useParams } from "react-router-dom";
// import { useParam } from "react-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { getMovieById } from "../../services/movieService";
import { useNavigate } from 'react-router';

const Test = () => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const data = await getMovieById(movieId);
                setMovie(data);
            } catch (err) {
                console.error("Failed to fetch movie", err);
            }
        };

        fetchMovie();
    }, [movieId]);

    if (!movie) return <p>Loading...</p>;
    console.log("test",movieId)

    return (
        <>
          <h1>{movie.title}</h1>
          <h1>{movie.overview}</h1>
          <button >Add Favorite</button>
          <button onClick={() => navigate(`/movie/${movieId}/review-form`)}>Review</button>
        </>
    );
};

export default Test;
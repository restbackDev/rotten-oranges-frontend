import { useEffect, useContext, useState } from "react";
import styles from "./Dashboard.module.css";
import { Link } from "react-router";
import { fetchDiscoverMovies } from "../../services/movieService";

const Dashboard = () => {
  const [moviesDB, setMoviesDB] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchDiscoverMovies();
        setMoviesDB(data);
      } catch (error) {
        console.error("Error fetching movies from backend:", error);
      }
    };

    getMovies();
    console.log(moviesDB);

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.TMDB_BEARER_TOKEN}`
      }
    };
  }, []);

  return (
    <main className={styles.dashboardContainer}>
      <section className={styles.container}>
        <p className={styles.discover}>Discover Movies </p>
        <div className={styles.moviesList}>
          {moviesDB && moviesDB.length === 0 ? (
            <p>No movies to display</p>
          ) : (
            moviesDB.map((movie) => (
              <Link to={`/movie/${movie._id}`} key={movie._id} className={styles.movieCard}>
                <div key={movie._id} className={styles.movieCard}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`}
                    alt={movie.title}
                    className={styles.moviePoster}
                  />
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
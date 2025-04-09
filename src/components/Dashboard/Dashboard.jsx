import { useEffect, useContext, useState } from "react";
// import { UserContext } from "../../contexts/UserContext";
import styles from "./Dashboard.module.css";
import { Link } from "react-router";
import { fetchDiscoverMovies } from "../../services/movieService";

const Dashboard = () => {
  // const { user } = useContext(UserContext);
  const [moviesDB, setMoviesDB] = useState([]);
  const [movies, setMovies] = useState([]);//not from backend,  from TMDb directly MICHELLE
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // Get movies from backend using movieService
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
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`
      }
    };

    fetch(
      'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      options
    )
      .then(res => res.json())
      .then(data => {
        console.log(data.results); 
        setMovies(data.results); 
      })
      .catch(error => console.error(error));

// fetching TV shows from TMDb directly MICHELLE
    fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc', options)
        .then(res => res.json())
        .then(data => {
          const filteredTvShow = data.results.filter(tvShow => tvShow.name !== "Please Put Them On, Takamine-san");
          console.log(filteredTvShow);
          setTvShows(filteredTvShow);
        })
      .catch(error => console.error(error));
  }, []);

  return (
    <main className={styles.dashboardContainer}>
      {/* <h1 className={styles.heading}>Welcome {user.username}</h1> */}
      <p className={styles.discover}>Discover Movies </p>
      <div className={styles.moviesList}>
        {moviesDB.length === 0 ? (
          <p>No movies to display</p>
        ) : (
          moviesDB.map((movie) => (
            <Link to={`/movie/${movie._id}`} key={movie._id} className={styles.movieCard}>
            <div key={movie.id} className={styles.movieCard}>
              {/* <h2 className={styles.movieTitle}>{movie.title}</h2> */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} 
                alt={movie.title}
                className={styles.moviePoster}
              />
              {/* <p>{movie.overview}</p> */}
            </div>
            </Link>
          ))
        )}
      </div>

      <p className={styles.discover}>Trending Movies </p>
      <div className={styles.moviesList}>
        {movies.length === 0 ? (
          <p>No movies to display</p>
        ) : (
          movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className={styles.movieCard}>
            <div key={movie.id} className={styles.movieCard}>
              {/* <h2 className={styles.movieTitle}>{movie.title}</h2> */}
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                alt={movie.title}
                className={styles.moviePoster}
              />
              {/* <p>{movie.overview}</p> */}
            </div>
            </Link>
          ))
        )}
      </div>

      <p className={styles.discover}>Trending TV Shows</p>
      <div className={styles.tvShowList}>
        {tvShows.length === 0 ? (
          <p>No movies to display</p>
        ) : (
          tvShows.map((tvShow) => (
            <Link to={`/tv/${tvShow.id}`} key={tvShow.id} className={styles.tvShowCard}>
            <div key={tvShow.id} className={styles.tvShowCard}>
              {/* <h2 className={styles.tvShowTitle}>{tvShow.name}</h2> */}
              <img
                src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} 
                alt={tvShow.title}
                className={styles.tvShowPoster}
              />
              {/* <p>{movie.overview}</p> */}
            </div>
            </Link>
          ))
        )}
      </div>
    </main>
  );
};

export default Dashboard;
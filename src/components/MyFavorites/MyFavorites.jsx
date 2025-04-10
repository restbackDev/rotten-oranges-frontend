import { useEffect, useState } from 'react';
import { getUserFavorites } from '../../services/favoriteService';
import styles from './MyFavorites.module.css';
import { Link } from 'react-router';

const MyFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const data = await getUserFavorites();
        setFavorites(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <main className={styles.container}>
      <h1>My Favorites</h1>
      <div className={styles.movieGrid}>
        {favorites.map(movie => (
          <Link to={`/movie/${movie._id}`} key={movie._id} className={styles.movieCard}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
            <h3>{movie.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default MyFavorites;
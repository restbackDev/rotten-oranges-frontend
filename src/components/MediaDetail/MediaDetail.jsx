import styles from "./MediaDetail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MediaDetail = () => {
  const { mediaType, id } = useParams();
  const [mediaDetail, setMediaDetail] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [mediaReviews, setMediaReviews] = useState(null);
  const [mediaCast, setMediaCast] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
      },
    };

    fetch(
      `https://api.themoviedb.org/3/${
        mediaType === "movie" ? "movie" : "tv"
      }/${id}?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMediaDetail(data);
    })
      .catch((error) => {
        console.error(error);
    });

    fetch(
      `https://api.themoviedb.org/3/${
        mediaType === "movie" ? "movie" : "tv"
      }/${id}/watch/providers`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWatchProviders(data.results.US);
    })
      .catch((error) => {
        console.error(error)
    });

    fetch(`https://api.themoviedb.org/3/${mediaType === "movie" ? "movie" : "tv"}/${id}/reviews?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMediaReviews(data);
    })
      .catch(error => {
        console.error(error)
    });

  fetch(`https://api.themoviedb.org/3/${mediaType === "movie" ? "movie" : "tv"}/${id}/credits?language=en-US`, options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setMediaCast(data.cast);
  })
    .catch(error => {
      console.error(error)
  });
  }, [mediaType, id]);

  if (!mediaDetail) return <p>Loading...</p>;

  return (
    <div className={styles.mediaDetailContainer}>
      <div className={styles.mediaDetailBanner} style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${mediaDetail.backdrop_path})`,}}>
        <div className={styles.mediaDetailOverlay}>
          <div className={styles.mediaDetailContent}>
            <img
              src={`https://image.tmdb.org/t/p/w300${mediaDetail.poster_path}`}
              alt={mediaType === "movie" ? mediaDetail.title : mediaDetail.name}
              className={styles.poster}
            />
            <div className={styles.textInfo}>
              <h1>
                {mediaType === "movie" ? mediaDetail.title : mediaDetail.name}
              </h1>
              <p>{mediaDetail.overview}</p>
              <p>
                Release Date:{" "}
                {mediaType === "movie"
                  ? mediaDetail.release_date
                  : mediaDetail.first_air_date}
              </p>
              <p>Rating: {mediaDetail.vote_average}</p>
              <p>
                Genres:{" "}
                {mediaDetail.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p>
                Runtime:{" "}
                {mediaType === "movie"
                  ? `${mediaDetail.runtime} minutes`
                  : `${mediaDetail.episode_run_time[0]} minutes`}
              </p>
              <div className={styles.cta}>
                <button type="submit">Add to Favorites</button>
                <button type="submit">Add a Review</button>
              </div>

              <div className={styles.watchProviderContainer}>
                <h2>Available on:</h2>
                {watchProviders?.buy && watchProviders.buy.length > 0 ? (
                  <ul>
                    {watchProviders.buy.map((provider) => (
                      <li key={provider.provider_id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                          alt={provider.provider_name}
                          className={styles.providerLogo}
                        />
                        {/* <span>{provider.provider_name}</span> */}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No watch providers available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.mediaReviewsAndCast}>
        <div className={styles.mediaReviewsContainer}>
              <h2>Reviews</h2>
              {mediaReviews?.results.length > 0 ? (
                <ul>
                  {mediaReviews.results.map((review) => (
                    <li key={review.id}>
                      <h3> Written by {review.author} on {new Date(review.created_at).toLocaleDateString("en-US")}</h3>
                      <p>{review.content}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available.</p>
              )}
        </div>

        <div className={styles.mediaCast}> 
            <h2>Cast</h2>
            {mediaCast && mediaCast.length > 0 ? (
              <ul>
                {mediaCast.slice(0, 5).map((actor) => (
                  <li key={actor.id}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                      alt={actor.name}
                      className={styles.actorImage}
                    />
                    <h3>{actor.name}</h3>
                    <p>{actor.character}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No cast information available.</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default MediaDetail;

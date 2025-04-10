import styles from "./MediaDetail.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const MediaDetail = () => {
  const { movieId } = useParams();
  const [mediaDetail, setMediaDetail] = useState(null);
  const [watchProviders, setWatchProviders] = useState(null);
  const [mediaReviews, setMediaReviews] = useState([]);
  const [mediaCast, setMediaCast] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [showReviewForm, setShowReviewForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No auth token found.");
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchMediaDetails = async () => {
      try {
        const detailRes = await fetch(`${BASE_URL}/movies/${movieId}`, {
          headers,
        });
        const detailData = await detailRes.json();
        setMediaDetail(detailData);
        setMediaCast(detailData.cast || []);

        const watchRes = await fetch(
          `${BASE_URL}/movies/${movieId}/watch-providers`,
          { headers }
        );
        const watchData = await watchRes.json();
        setWatchProviders(watchData.results?.US || null);

        const reviewsRes = await fetch(
          `${BASE_URL}/movies/${movieId}/reviews`,
          { headers }
        );
        const reviewsData = await reviewsRes.json();
        setMediaReviews(reviewsData || []);

        const castData = detailData.cast || [];
        setMediaCast(castData);
      } catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaDetails();
  }, [movieId]);

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.warn("No auth token found.");
      return;
    }

    fetch(`${BASE_URL}/movies/${movieId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ text: newReview }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to submit review");
        }
        return res.json();
      })
      .then((data) => {
        console.log("New review added:", data);
        setMediaReviews((prevReviews) => [...prevReviews, data]);
        setNewReview("");
        setShowReviewForm(false);
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  if (!mediaDetail) return <p>Loading...</p>;

  return (
    <div className={styles.mediaDetailContainer}>
      <div
        className={styles.mediaDetailBanner}
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${mediaDetail.backdropPath})`,
        }}
      >
        <div className={styles.mediaDetailOverlay}>
          <div className={styles.mediaDetailContent}>
            <img
              src={`https://image.tmdb.org/t/p/w300${mediaDetail.posterPath}`}
              alt={mediaDetail.title || mediaDetail.name}
              className={styles.poster}
            />
            <div className={styles.textInfo}>
              <h1>{mediaDetail.title || mediaDetail.name}</h1>
              <p>{mediaDetail.overview}</p>
              <p>Release Date: {mediaDetail.releaseDate}</p>
              <p>Rating: {mediaDetail.voteAverage}</p>
              <p>Genres: {mediaDetail.genreNames?.join(", ") || "N/A"}</p>
              <p>Runtime: {mediaDetail.runtime || "N/A"} mins</p>
              <div className={styles.cta}>
                <button type="submit">Add to Favorites</button>
                <button
                  type="button"
                  onClick={() => setShowReviewForm(!showReviewForm)}
                >
                  {showReviewForm ? "Cancel" : "Add a Review"}
                </button>
              </div>

              <div className={styles.watchProviderContainer}>
                <h2>Available on:</h2>
                {watchProviders?.buy?.length > 0 ? (
                  <ul>
                    {watchProviders.buy.map((provider) => (
                      <li key={provider.provider_id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w200${provider.logo_path}`}
                          alt={provider.provider_name}
                          className={styles.providerLogo}
                        />
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
          {showReviewForm && (
          <div className={styles.mediaReviewForm}>
            <h2>Add a Review</h2>
            <form onSubmit={handleReviewSubmit}>
              <textarea
                value={newReview}
                onChange={(event) => setNewReview(event.target.value)}
                placeholder="Write your review here..."
                required
              />
              <button type="submit">Submit Review</button>
            </form>
          </div>
        )}
          {mediaReviews.length > 0 ? (
            <ul>
              {mediaReviews.map((review, index) => (
                <li key={review._id || index} className={styles.reviewItem}>
                  <h3>
                    Written by {review.username || review.userId || "Anonymous"}{" "}
                    on{" "}
                    {review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString("en-US")
                      : "Unknown date"}
                  </h3>
                  <p>{review.text || "No review text."}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews available.</p>
          )}
        </div>

        <div className={styles.mediaCast}>
          <h2>Cast</h2>
          {mediaCast.length > 0 ? (
            <ul>
              {mediaCast.slice(0, 6).map((actor) => (
                <li key={actor._id}>
                  <img
                    src={
                      actor.profilePath
                        ? `https://image.tmdb.org/t/p/w200${actor.profilePath}`
                        : "/placeholder.jpg"
                    }
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

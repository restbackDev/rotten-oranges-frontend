import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteReview } from "../../services/reviewService";
import '../ReviewList/MyReview.css'
const BASE_URL = import.meta.env.VITE_BACK_END_SERVER_URL;

const MyReviews = () => {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${BASE_URL}/reviews/my-reviews`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setMyReviews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="reviewContainer">
      <h1>My Reviews</h1>
      <br/>
      {loading ? (
        <p>Loading your reviews...</p>
      ) : myReviews.length === 0 ? (
        <p>You haven not posted any reviews yet.</p>
      ) : (
        <ul>
          {myReviews.map((review) => (
            <li key={review._id}>
              <h3>
                Posted on{" "}
                {new Date(review.createdAt).toLocaleDateString("en-US")}
              </h3>
              <p>{review.text}</p>
              <button>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyReviews;
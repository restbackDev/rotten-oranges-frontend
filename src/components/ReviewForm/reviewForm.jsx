import { useState } from "react";
import { useNavigate } from 'react-router';
import { createReview } from "../../services/reviewService";
import { useParams } from "react-router";


const ReviewForm = () => {
  const {movieId} = useParams();

  const navigate = useNavigate();
  const [reviewFormData, setReviewFormData] = useState({
    reviewForm: ''
  });

  const handleChange = (evt) => {
    setReviewFormData({ ...reviewFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault(); //prevent a refresh-like when clicking the submit
    console.log('reviewFormData', reviewFormData);
    await createReview(movieId, reviewFormData)
    navigate(`/movie/${movieId}`) //TODO
    // We'll update this function shortly...
  };

  // const isFormInvalid = () => {
  //   return !( setReviewFormData == null); //text form is "null" or empty
  // }

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewForm">Review:</label>
        <textarea
          name='text'
          type='text'
          id="text-input"
          value={reviewFormData.text}
          onChange={handleChange}
          required>
        </textarea>
        <button  type='submit' >Submit</button>
        {/* disabled={isFormInvalid()} */} 
        <button onClick={() => navigate('/')}>Cancel</button> 
        {/* TODO: modify navigate('/') to movie/:movieId */}
      </form>
    </main>
  )
}

export default ReviewForm;
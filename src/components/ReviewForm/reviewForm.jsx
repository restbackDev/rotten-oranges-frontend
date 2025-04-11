import { useState } from "react";
import { Link } from 'react-router';
import { useNavigate } from 'react-router';

const ReviewForm = () => {
  const navigate = useNavigate();
  const [reviewFormData, setReviewFormData] = useState({
    reviewForm: ''
  });

  const handleChange = (evt) => {
    setReviewFormData({ ...reviewFormData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault(); //prevent a refresh-like when clicking the submit
    console.log('reviewFormData', reviewFormData);
    // We'll update this function shortly...
  };

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reviewForm">Review:</label>
        <textarea
          name='text'
          type='text'
          id="text-input"
          value={reviewFormData.text}
          required>
        </textarea>
        <button  type='submit'>Submit</button>
        {/* disabled={isFormInvalid()} */} 
        <button onClick={() => navigate('/')}>Cancel</button> 
        {/* TODO: modify navigate('/') to movie/:movieId */}
      </form>
    </main>
  )
}

export default ReviewForm;
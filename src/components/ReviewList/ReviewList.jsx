import { Link, } from 'react-router';

const ReviewList = (props) => {
  return (
    <main>
      <h1>Insert username</h1>
      {
        props.review.map((review) => (
          <Link key={review._id} to={`/movies/${movie._id}`}>
            <header>
              <h2>{movie.title}</h2>
              <p>
                {`${user.username} posted on
                ${new Date(review.timestamps).toLocaleDateString()}`} 
              </p>
            </header>
            <p>{review.text}</p>
          </Link>
        ))
      }
    </main>
  );
};

export default ReviewList;
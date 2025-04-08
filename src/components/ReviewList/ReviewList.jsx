import { Link, } from 'react-router';

const ReviewList = (props) => {
  return (
    <main>
      <h1>Insert username</h1>
      {
        props.review.map((review) => (
          <Link key={review._id} to={`/movies/${movie._id}`}>
            <header>
              <h2>{hoot.title}</h2>
              <p>
                {`${review.user.username} posted on
                ${new Date(hoot.createdAt).toLocaleDateString()}`} 
              </p>
            </header>
            <p>{hoot.text}</p>
          </Link>
        ))
      }
    </main>
  );
};

export default ReviewList;
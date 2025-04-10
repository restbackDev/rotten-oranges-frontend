const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`;

const getReviewByMovieId = async (movieId) => {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    });
    return await res.json();
};

const createReview = async (movieId, reviewData) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(reviewData),
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const updateReview = async (movieId, reviewData) => {
    const res = await fetch(`${BASE_URL}/${movieId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reviewData)
    });
    return await res.json();
};

// Delete the current user's review for a specific movie
const deleteReview = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error deleting review:', error);
        throw error;
    }
};
export {
    createReview, getReviewByMovieId, updateReview, deleteReview
};
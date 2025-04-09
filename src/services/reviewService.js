const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/reviews`;

const createReview = async (movieId, formData) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);

        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export {
    createReview
};
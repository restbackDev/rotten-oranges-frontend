const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/movies`;

const fetchDiscoverMovies = async () => {
    try {
        const res = await fetch(`${BASE_URL}/discover`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

const getMovieById = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.error(error);
        throw new Error(error);
    }
};

export {
    fetchDiscoverMovies,
    getMovieById,
};
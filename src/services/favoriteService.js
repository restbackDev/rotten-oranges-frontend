const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/favorites`;
//helper function
const getToken = () => {
    return localStorage.getItem('token');
};

// Add a movie to the user's favorites
const addFavorite = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error adding favorite:', error);
        throw error;
    }
};

// Get all favorites for the current user
const getUserFavorites = async () => {
    try {
        const res = await fetch(BASE_URL, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error fetching favorites:', error);
        throw error;
    }
};

// Remove a movie from the user's favorites
const removeFavorite = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/${movieId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
    } catch (error) {
        console.error('Error removing favorite:', error);
        throw error;
    }
};

// Get total number of favorites for a movie
const getFavoriteCount = async (movieId) => {
    try {
        const res = await fetch(`${BASE_URL}/count/${movieId}`, {
            method: 'GET'
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data.count;
    } catch (error) {
        console.error('Error fetching favorite count:', error);
        throw error;
    }
};

export { addFavorite, getUserFavorites, removeFavorite, getFavoriteCount };
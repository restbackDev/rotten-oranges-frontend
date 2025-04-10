const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/favorites`;

const getUserFavorites = async () => {
    const res = await fetch(BASE_URL, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });

    const data = await res.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
};

export { getUserFavorites };
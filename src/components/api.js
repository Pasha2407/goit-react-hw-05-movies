import axios from 'axios';

const apiKey = 'dcd0358c9111c36efd1d7f445bdeffdd';
axios.defaults.baseURL = 'https://api.themoviedb.org/3';

const params = {
    params: {
        api_key: apiKey,
        language: 'en-US',
    },
};

export const fetchTrendingMovies = async () => {
    const response = await axios.get(`trending/movie/day`, params);
    return response.data.results;
};
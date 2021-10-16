import axios from "axios";

export const getDataMovie = (props) => {
    if (!props) props = '';
    try {
        const resp = axios.get(`http://www.omdbapi.com/?apikey=faf7e5bb&${props}`);
        return resp;
    } catch (error) {
        console.log(error);
        return error;
    }
}
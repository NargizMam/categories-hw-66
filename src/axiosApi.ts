import axios from "axios";

const axiosApi = axios.create({
    baseURL: 'https://plovo-ts-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;
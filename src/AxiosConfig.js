import Axios from "axios";

export default Axios.create({
    baseURL: 'https://localhost:8080',
    withCredentials: true,
    headers: {
        common: {
            Accept: 'application/json'
        },
    }
})
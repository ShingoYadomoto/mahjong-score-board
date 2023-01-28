import axios from "axios";

export default axios.create({
    baseURL: "http://" + process.env.REACT_APP_BASE_API_HOST,
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true, // only dev
});
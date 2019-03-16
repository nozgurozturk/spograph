import axios from 'axios';
import queryString from "query-string";

let parsed = queryString.parse(window.location.search);
export let accessToken = parsed.access_token;

export default axios.create({
    baseURL: "https://api.spotify.com/v1"
});
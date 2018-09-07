import axios from 'axios';

const ROOT_ENDPOINT = 'http://localhost:8000/api/';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const API_TIMEOUT = 10000;

export function getAPIClient() {
    return axios.create({
        baseURL: ROOT_ENDPOINT,
        timeout: API_TIMEOUT,
    });
}

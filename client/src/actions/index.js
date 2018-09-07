import { getAPIClient } from './api';

const GENERATE_TOKEN_REQUEST = 'generate_token/';
const CHECKOUT_REQUEST = 'checkout/';

export function generateToken(callback) {
    getAPIClient().get(GENERATE_TOKEN_REQUEST)
        .then((response) => {
            callback(response.data.token);
        });
}

export function checkout(nonce, callback) {
    getAPIClient().post(CHECKOUT_REQUEST, { 'nonce': nonce })
        .then((response) => {
            callback(response.data);
        });
}

import React, { Component } from 'react';
import braintree from 'braintree-web';
import dropin from 'braintree-web-drop-in';
import { generateToken, checkout } from '../actions';

export default class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // const client = braintree.client;
        // const hostedFields = braintree.hostedFields;

        const button = document.querySelector('#submit-button');

        generateToken((token) => {
            dropin.create({
                authorization: token,
                container: '#dropin-container',
            }).then(function (instance) {
                button.addEventListener('click', function () {
                    instance.requestPaymentMethod(function (err, payload) {
                        // Submit payload.nonce to your server
                        checkout(payload.nonce, (result) => {
                            if (result.success) {
                                alert("Payment success!")
                                console.log("Success:", result);
                            }
                        });
                    });
                });
            });
        });
    }

    render() {

        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        Braintree Payments Demo
                    </div>
                    <div className="card-body">
                        <div id="dropin-container"></div>
                        <button id="submit-button"
                            className="btn btn-primary mt-2">
                            Request payment method
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

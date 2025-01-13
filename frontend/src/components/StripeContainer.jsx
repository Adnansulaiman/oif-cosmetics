import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your Stripe Publishable Key
const stripePromise = loadStripe('pk_test_51QgVb5BUv5zQzyPf1PnfvFnkqe6LRYo3pLcuOZPagpkqmun7ApgRVKZJ774jXoP0TYA8d8gMiLu3YMQ1L9YTTh9t00rcfPAbDO');

const StripeContainer = ({ children }) => {
    return <Elements stripe={stripePromise}>{children}</Elements>;
};

export default StripeContainer;

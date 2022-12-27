import axios from 'axios';
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import { useSelector } from 'react-redux';
import CheckoutForm from '../CheckoutForm/CheckoutForm';

const stripePromise = loadStripe('pk_test_51K93ltBcGooWtax9JKsV2tP7uqmbQYtdpRXFr4Ey1CHijNCVjRMV8eDkLX1YlNvDJHvktGKwvAjYvzFo93K3j06q00slg9hLuX');


const Payment = () => {

    // const { cartItems, user } = useSelector(allData);
    // axios.get('https://service-assistant-a2z-backend-production.up.railway.app/myorder').then(res => //
    // //
    return (

        <>

            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </>
    );
};

export default Payment;
import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import PaymentServiceCard from './PaymentServiceCard';

const stripePromise = loadStripe('pk_test_51K93ltBcGooWtax9JKsV2tP7uqmbQYtdpRXFr4Ey1CHijNCVjRMV8eDkLX1YlNvDJHvktGKwvAjYvzFo93K3j06q00slg9hLuX');


const PaymentService = ({ orderService, handleNextStep }) => {
    return (
        <>
            <Elements stripe={stripePromise}>

                <PaymentServiceCard
                    handleNextStep={handleNextStep}
                    orderService={orderService}
                />

            </Elements>
        </>
    );
};

export default PaymentService;
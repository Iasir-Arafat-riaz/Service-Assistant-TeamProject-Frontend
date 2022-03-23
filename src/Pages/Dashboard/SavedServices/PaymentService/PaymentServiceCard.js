import { Alert, CircularProgress, Paper } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allData, sendNotification } from '../../../../redux/dataSlice/dataSlice';




const PaymentServiceCard = ({ orderService, handleNextStep }) => {

    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [process, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const [clientSecret, setClientSecret] = useState("");

    let price;
    const { user } = useSelector(allData);
    // const price = orderService.Price;
    for (const order of orderService) {
        price = order.Price + order.Price;
    }

    // 

    useEffect(() => {
        fetch('https://dry-sea-00611.herokuapp.com/myorder/createpaymentstatus', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        })
            .then(res => res.json())
            .then(data => {
                setClientSecret(data.clientSecret);
            });
    }, [price]);

    const handlePayAmount = async (e) => {

        e.preventDefault();

        if (!stripe || !elements) {
            return;
        };
        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        };
        setProcessing(true)

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {

            setSuccess("");
            setError(error.message);
        }
        else {
            setError('');
        };
        // payment intent
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: user.displayName,
                        email: user.name
                    },
                },
            },
        );
        if (intentError) {
            setError(intentError.message)
        }
        else {
            setError('');
            setSuccess("your payment is done");
            setProcessing(false);
            for (const order of orderService) {
                const message = `Your payment for ${order?.parentService?.Title} has been completed`;
                dispatch(sendNotification({ message, email: user.email, image: order?.parentService?.Image }))
            }
            axios.post('https://dry-sea-00611.herokuapp.com/saveservice/addonorderscollection', orderService).then(() => {
                handleNextStep();
            });
        };
    };



    return (

        <>
            <form onSubmit={handlePayAmount} className="payment-form" >
                <Paper elevation={1}
                    sx={{ background: "#fff", mt: 5, p: 4, width: { lg: '50%', xs: "70%", xl: '40%' }, mb: 2, ml: 2 }}
                >
                    <CardElement

                        options={{
                            style: {

                                base: {
                                    fontSize: '16px',
                                    color: 'bkacj',
                                    '::placeholder': {
                                        color: '',
                                    },
                                },
                                invalid: {
                                    color: 'red',
                                },
                            },
                        }}
                    />
                    {process && !error ? <CircularProgress /> : <button style={{ marginTop: 20, padding: 4 }} type="submit" disabled={!stripe}>
                        Pay $ {price}
                    </button>}

                    {success && <Alert sx={{ mt: 2, mb: 2 }} severity="success">{success}</Alert>}
                    {error && <Alert severity="error">{error}</Alert>
                    }
                </Paper>
            </form>
        </>
    );
};

export default PaymentServiceCard;
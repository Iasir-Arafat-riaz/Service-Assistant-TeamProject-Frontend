import React, { useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import Alert from '@mui/material/Alert';
import { CircularProgress, Paper } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { allData, sendNotification } from '../../../../redux/dataSlice/dataSlice';
import axios from 'axios';
import { current } from '@reduxjs/toolkit';
import useSocket from '../../../../Hooks/useSocket';
import Particles from "react-tsparticles";


const CheckoutForm = () => {

    const stripe = useStripe();
    const elements = useElements();
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [process, setProcessing] = useState(false);
    const dispatch = useDispatch();
    const [clientSecret, setClientSecret] = useState("");
    const { socket } = useSocket();

    const { selectedService, singleServiceDetail, user, orderInfo } = useSelector(allData);
    const price = selectedService.Price;


    // current time

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
            const date = new Date();
            const data = { ...selectedService, mainId: singleServiceDetail._id, orderInfo: orderInfo, date: date };

            const message = `Your payment for ${selectedService?.parentService?.Title} has been completed`;
            const image = selectedService?.parentService?.Image;
            axios.post('https://dry-sea-00611.herokuapp.com/myorder', data).then(() => {
                //send to myself
                dispatch(sendNotification({ message, image, email: user.email, link: '/dashboard/myorders' }))
                //
                dispatch(sendNotification({ message: "You have new orders waiting for admin approve", image, email: data.providerEmail, link: '/dashboard/provider/appointment' }))
                socket.emit('notification', {
                    message: "You have new orders waiting for admin approve",
                    image,
                    email: data.providerEmail,
                    link: '/dashboard/provider/appointment',
                    time: new Date(),
                    seen: false,
                })
            });
        };
    };


    const particlesInit = (main) => {
        console.log(main);

        // you can initialize the tsParticles instance (main) here, adding custom shapes or presets
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = {
        background: {
            color: {
                value: "#fff"
            }
        },
        fullScreen: {
            enable: true,
            zIndex: -1
        },
        interactivity: {
            detectsOn: "window"
        },
        emitters: {
            position: {
                x: 50,
                y: 50
            },
            rate: {
                quantity: 15,
                delay: 0.25
            }
        },
        particles: {
            color: {
                value: ["#1E00FF", "#FF0061", "#E1FF00", "#00FF9E"]
            },
            move: {
                decay: 0.05,
                direction: "top",
                enable: true,
                gravity: {
                    enable: true,
                    maxSpeed: 150
                },
                outModes: {
                    top: "none",
                    default: "destroy"
                },
                speed: { min: 25, max: 50 }
            },
            number: {
                value: 0
            },
            opacity: {
                value: 1
            },
            rotate: {
                value: {
                    min: 0,
                    max: 360
                },
                direction: "random",
                animation: {
                    enable: true,
                    speed: 30
                }
            },
            tilt: {
                direction: "random",
                enable: true,
                value: {
                    min: 0,
                    max: 360
                },
                animation: {
                    enable: true,
                    speed: 30
                }
            },
            size: {
                value: 8
            },
            roll: {
                darken: {
                    enable: true,
                    value: 25
                },
                enable: true,
                speed: {
                    min: 5,
                    max: 15
                }
            },
            wobble: {
                distance: 30,
                enable: true,
                speed: {
                    min: -7,
                    max: 7
                }
            },
            shape: {
                type: [
                    "circle",
                    "square",
                    "polygon",
                    "rectangle",

                ],
                options: {
                    polygon: [
                        {
                            sides: 5
                        },
                        {
                            sides: 6
                        }
                    ],

                }
            }
        }
    }

    return (
        < >
            <form onSubmit={handlePayAmount} className="payment-form" >
                <Paper elevation={1}
                    sx={{ background: "#fff", mt: 5, p: 4, width: '80%', mb: 2, ml: 2 }}
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

                    {success &&
                        <>
                            <Alert sx={{ mt: 2, mb: 2 }} severity="success">{success}</Alert>
                            <Particles
                                id="tsparticles"
                                init={particlesInit}
                                loaded={particlesLoaded}
                                options={options}
                            />
                        </>

                    }
                    {error && <Alert severity="error">{error}</Alert>
                    }
                </Paper>
            </form>

        </>
    );
};

export default CheckoutForm;
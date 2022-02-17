import React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, ListItem, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OrderStepper from './OrderStepper';
import ServiceReviews from './ServiceReviews';

const ServiceOverview = ({ matchService, question1,
    question2,
    question3 }) => {

    // console.log(Object.keys(matchService?.overview[0]));
    // const question1 = Object.keys(matchService?.overview[0]);
    // const question2 = Object.keys(matchService?.overview[1]);
    // const question3 = Object.keys(matchService?.overview[2]);
    // console.log(Object.values(matchService.overview[0])[0]);

    // console.log(matchService.FQA[0])
    // console.log(Object.values(matchService?.FQA[0])[0])

    // list item style
    const listItem = {
        fontWeight: 500,
        color: "#383a3c"
    };


    return (
        <>


            <Box>
                <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>Overview of {matchService?.Title}</Typography>

                <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, fontSize: 18 }}>{question1[0]}</Typography>

                {
                    Object.values(matchService.overview[0])[0].map(text => <ListItem>
                        <li style={listItem}>{text}</li>
                    </ListItem>)
                }

                <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, fontSize: 18 }}>{question2}</Typography>
                {
                    Object.values(matchService.overview[1])[0].map(text => <ListItem>
                        <li style={listItem}>{text}</li>
                    </ListItem>)
                }

                <Typography variant='h6' sx={{ fontWeight: 'bold', mt: 2, fontSize: 18 }}>{question3}</Typography>

                {
                    Object.values(matchService.overview[2])[0].map(text => <ListItem>
                        <li style={listItem}>{text}</li>
                    </ListItem>)
                }
                <Typography variant='h4' sx={{ mt: 3, mb: 3 }}>FAQ</Typography>

                {/* FQA */}
                {
                    matchService.FQA.map((question, index) => <Accordion sx={{ mb: 2, boxShadow: 1 }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ backgroundColor: '#FD7A3E', color: '#fff', borderRadius: '50%' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>{Object.keys(matchService.FQA[index])}</Typography>
                        </AccordionSummary>
                        <AccordionDetails >
                            <Typography>
                                {Object.values(matchService.FQA[index])}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                    )
                }


                {/* how to order */}
                <Typography variant="h5" sx={{ fontWeight: 'bold', mt: 5, mb: 2 }}>How to order</Typography>
                <OrderStepper />

                {/* service reviews */}
                <Typography variant="h5" sx={{ fontWeight: 600, mt: 5, mb: 4 }}>Review of {matchService?.Title}</Typography>
                <ServiceReviews service={matchService} />



            </Box>

        </>
    );
};

export default ServiceOverview;
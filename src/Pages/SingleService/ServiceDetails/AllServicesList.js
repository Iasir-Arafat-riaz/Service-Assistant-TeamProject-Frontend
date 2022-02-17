import * as React from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import axios from 'axios';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from '@mui/system';


const AllServicesList = () => {
    const [expanded, setExpanded] = React.useState('panel1');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const [services, setServices] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    // data loaded
    React.useEffect(() => {
        axios.get('https://fierce-meadow-12011.herokuapp.com/services').then(res => {
            setLoading(false);
            setServices(res.data);
        })
    }, []);

    const categoryList = {
        fontSize: 17, fontWeight: 500, mb: 2, letterSpacing: 1, color: "#383a3c"
    }


    return (

        <>

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography sx={{ fontSize: 22, fontWeight: 'bold' }}>Our all services</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {services.map(service => <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography sx={categoryList}>
                            {service.Category}
                        </Typography>
                        <ArrowForwardIosIcon sx={categoryList} />
                    </Box>)}
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default AllServicesList;
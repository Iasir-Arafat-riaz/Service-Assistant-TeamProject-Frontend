import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';








const SelectedServices = ({ handleDeleteSelectService, selectedServices }) => {

    const { user } = useSelector(allData);

    let total = 0;
    for (const service of selectedServices) {
        total = service.Price + total;
    };

    // style
    const boxStyle = {
        mb: 2,
        pb: 1,
        borderBottom: '1px solid #d0d0d0',
        display: 'flex',
        justifyContent: 'space-between'
    };

    return (

        <Paper elevation={1} sx={{ p: 2, width: "50%" }} >

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: "center",
                    borderBottom: '1px solid #d0d0d0',
                    mb: 2
                }}
            >

                <Typography sx={{ pb: 1, mb: 1 }} variant='h6'>Selected Service</Typography>
                <Typography sx={{ fontSize: 15 }} variant='h6'>Service Quantity {selectedServices.length} </Typography>
                <Typography sx={{ fontSize: 15 }} variant='h6'>Total Price {total} Tk</Typography>
            </Box>





            <Box>

                {
                    selectedServices?.map((service, index) => service?.email === user.email && <Box
                        sx={boxStyle}
                        key={index}
                    >

                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                            <img width='80' height='70' src={service?.parentService?.Image} alt={service.Title} />

                            <Box>
                                <Typography sx={{ fontSize: 17, mb: 0 }} variant="h6"> {service?.parentService?.Title}</Typography>
                                <Typography sx={{ fontSize: 15 }} variant="h6"> {service?.Name}</Typography>
                                <Typography sx={{ fontSize: 15 }} variant="h6"> {service?.Price} tk</Typography>
                            </Box>

                        </Box>

                        <Button onClick={() => handleDeleteSelectService(service.subId)} variant='text'>
                            <DeleteOutlineIcon sx={{ color: "black" }} />
                        </Button>

                    </Box>)

                }


            </Box>






        </Paper>
    );
};

export default SelectedServices;
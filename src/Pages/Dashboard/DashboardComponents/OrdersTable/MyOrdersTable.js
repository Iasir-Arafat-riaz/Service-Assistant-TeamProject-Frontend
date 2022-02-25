import React from 'react';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Link } from 'react-router-dom';

const MyOrdersTable = () => {
    function createData(avatar, name, image, service, price, status,category) {
        return { avatar, name, image, service, price, status,category };
    }

    const columns = [
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/tXJ6vWL/acmasterservice.jpg", "AC Basic Service", 1500, 'Approved','AC Repair Service'),
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/0D8zbWF/1617776411-microwaveovenrepairservices.jpg", "Microwave Oven Repair", 2700, 'Approved','Appliance Repair'),
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/MgdQXhG/1617878110-salonservicesformen.jpg", "Home Shifting", 4500, 'Approved','Mens Care')
    ];
    return (
        < >
            <Grid container spacing={2}>
                {
                    columns.map((column) =>

                        <Grid item md={4}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={column.image}
                                        alt="green iguana"
                                    />
                                    <CardContent>
                                       <Box sx={{display: "flex", justifyContent: "space-between", alignItems: 'center'}}>
                                       <Typography
                                            gutterBottom
                                            variant="h6" 
                                            component="div">
                                            {column.service}
                                        </Typography>
                                        <Typography
                                            sx={{}}>
                                            {column.status}
                                        </Typography>
                                       </Box>
                                        <IconButton
                                            aria-label="Category"
                                            sx={{ paddingLeft: 0 }}>
                                            <CategoryIcon />
                                            <Link
                                                to='/services'
                                                style={{ textDecoration: 'none' }}>
                                                <Typography
                                                    sx={{ paddingLeft: 1 }}>
                                                    {column.category}
                                                </Typography>
                                            </Link>
                                        </IconButton>
                                        <IconButton
                                            aria-label="Payment"
                                            sx={{ paddingLeft: "0px" }}>
                                            <AttachMoneyIcon />
                                            <Typography>
                                                {column.price} BDT
                                            </Typography>
                                        </IconButton>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )}
            </Grid>
        </>
    );
};

export default MyOrdersTable;
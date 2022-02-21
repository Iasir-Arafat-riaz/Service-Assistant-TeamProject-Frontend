import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Card, CardActionArea, CardContent, Grid, Paper } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
const MyOrdersTable = () => {
    function createData(avatar, name, image, service, price, status) {
        return { avatar, name, image, service, price, status };
    }

    const columns = [
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/tXJ6vWL/acmasterservice.jpg", "AC Basic Service", 1500, 'Approved'),
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/tXJ6vWL/acmasterservice.jpg", "Appliance Service", 2700, 'Approved'),
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/tXJ6vWL/acmasterservice.jpg", "Home Shifting", 4500, 'Approved')
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
                                            variant="h5" c
                                            omponent="div">
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
                                                    AC Repair Services
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
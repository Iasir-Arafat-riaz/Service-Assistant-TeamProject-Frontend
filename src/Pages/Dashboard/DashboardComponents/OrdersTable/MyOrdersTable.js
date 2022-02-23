import React from 'react';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Box, Paper } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { Link } from 'react-router-dom';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DeleteIcon from '@mui/icons-material/Delete';
const MyOrdersTable = () => {
    function createData(avatar, name, image, service, price, protein) {
        return { avatar, name, image, service, price, protein };
    }

    const columns = [
        createData('A2Z', '1 - 1.5 Ton', "https://i.ibb.co/tXJ6vWL/acmasterservice.jpg", "AC Basic Service", 1500, 'approve')
    ];
    return (
        < >
            {
                columns.map((column, index) =>

                    <Box
                        key={index}
                        sx={{
                            display: 'grid',
                            gridAutoFlow: 'row',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: 2
                        }}>

                        <Paper
                            sx={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 21px -12px rgba(0, 0, 0, 0.66)',
                                backgroundColor: '#18151f23'
                            }}>

                            <CardMedia
                                sx={{ margin: '5px 0px 10px 0px' }}
                                component="img"
                                height="100px"
                                image={column.image}
                                alt="Service Image"
                            />

                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="Avatar">
                                    {column.avatar}
                                </Avatar>
                                }
                                title={<Typography>Service: {column.service}</Typography>}
                                sx={{ m: "-18px 0px" }}
                            />
                            <CardActions disableSpacing sx={{}}>
                                <IconButton aria-label="Category">
                                    <CategoryIcon /><Link to='/services' style={{ textDecoration: 'none' }}> <Typography sx={{ paddingLeft: 1 }}> AC Repair Services</Typography></Link>
                                </IconButton>
                                <IconButton aria-label="Payment" sx={{ paddingLeft: "0px" }}>
                                    <AttachMoneyIcon /> <Typography>{column.price} BDT</Typography>
                                </IconButton>

                                <IconButton aria-label="Delete" sx={{ color: 'red', paddingLeft: "0px" }}>
                                    <DeleteIcon />
                                </IconButton>

                            </CardActions>
                        </Paper>

                        <Paper
                            sx={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 21px -12px rgba(0, 0, 0, 0.66)',
                                backgroundColor: '#18151f23'
                            }}>

                            <CardMedia
                                sx={{ margin: '5px 0px 10px 0px' }}
                                component="img"
                                height="100px"
                                image={column.image}
                                alt="Service Image"
                            />

                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="Avatar">
                                    {column.avatar}
                                </Avatar>
                                }
                                title={<Typography>Service: {column.service}</Typography>}
                                sx={{ m: "-18px 0px" }}
                            />
                            <CardActions disableSpacing sx={{}}>
                                <IconButton aria-label="Category">
                                    <CategoryIcon /><Link to='/services' style={{ textDecoration: 'none' }}> <Typography sx={{ paddingLeft: 1 }}> AC Repair Services</Typography></Link>
                                </IconButton>
                                <IconButton aria-label="Payment" sx={{ paddingLeft: "0px" }}>
                                    <AttachMoneyIcon /> <Typography>{column.price} BDT</Typography>
                                </IconButton>

                                <IconButton aria-label="Delete" sx={{ color: 'red', paddingLeft: "0px" }}>
                                    <DeleteIcon />
                                </IconButton>

                            </CardActions>
                        </Paper>

                        <Paper
                            sx={{
                                borderRadius: '10px',
                                boxShadow: '0 4px 21px -12px rgba(0, 0, 0, 0.66)',
                                backgroundColor: '#18151f23'
                            }}>

                            <CardMedia
                                sx={{ margin: '5px 0px 10px 0px' }}
                                component="img"
                                height="100px"
                                image={column.image}
                                alt="Service Image"
                            />

                            <CardHeader
                                avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="Avatar">
                                    {column.avatar}
                                </Avatar>
                                }
                                title={<Typography>Service: {column.service}</Typography>}
                                sx={{ m: "-18px 0px" }}
                            />
                            <CardActions disableSpacing sx={{}}>
                                <IconButton aria-label="Category">
                                    <CategoryIcon /><Link to='/services' style={{ textDecoration: 'none' }}> <Typography sx={{ paddingLeft: 1 }}> AC Repair Services</Typography></Link>
                                </IconButton>
                                <IconButton aria-label="Payment" sx={{ paddingLeft: "0px" }}>
                                    <AttachMoneyIcon /> <Typography>{column.price} BDT</Typography>
                                </IconButton>

                                <IconButton aria-label="Delete" sx={{ color: 'red', paddingLeft: "0px" }}>
                                    <DeleteIcon />
                                </IconButton>

                            </CardActions>
                        </Paper>


                    </Box>

                )}
        </>
    );
};

export default MyOrdersTable;
import { Button, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import ProviderFromModal from './ProviderFromModal';


const Service = ({ category }) => {

    const [open, setOpen] = React.useState(false);
    const [id, setId] = useState(0);
    const { user } = useSelector(allData);

    const handleOpenModal = (id) => {
        setOpen(true);
        setId(id);
    };
    const handleCloseModal = () => setOpen(false);

    return (
        <>

            <Grid item xs={12} sm={6} md={4} lg={3} >
                <Card>
                    <CardActionArea>

                        <CardMedia component="img" image={category?.Img} alt={category?.Name} />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {category?.Name}
                            </Typography>
                        </CardContent>

                        <Button onClick={() => handleOpenModal(category.Id)} variant="outlined" sx={{ mb: 2, ml: 2 }}>
                            {user?.role !== 'provider' ? 'Become a provider' : 'Add this service'}
                        </Button>
                        <Button variant="outlined" sx={{ mb: 2, ml: 2 }}>See Details</Button>

                    </CardActionArea>
                </Card>
            </Grid>

            {/* modal */}
            <ProviderFromModal
                open={open}
                category={category}
                id={id}
                handleCloseModal={handleCloseModal}
                handleOpenModal={handleOpenModal}
            />

        </>
    );
};

export default Service;
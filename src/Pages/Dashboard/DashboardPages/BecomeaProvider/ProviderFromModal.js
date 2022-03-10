import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { allData } from '../../../../redux/dataSlice/dataSlice';
import axios from 'axios';

// modal style
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 400 },
    bgcolor: 'background.paper',
    border: '2px solid #fff',
    boxShadow: 24,
    // p: 2
};

const ProviderFromModal = ({ handleOpenModal, open, handleCloseModal, id, category }) => {


    const { user } = useSelector(allData);
    const { register, handleSubmit, reset, watch, setValue } = useForm();
    const [imgLoading, setImgLoading] = useState(true);

    // input style
    const inputStyle = {
        width: '100%',
        mb: 2,
    };

    console.log(user.role)


    // submit form
    const onSubmit = data => {

        if (user.role !== 'provider') {
            axios.post('https://dry-sea-00611.herokuapp.com/addprovider', { ...category, data, date: new Date(), rating: 0, reviewUser: 0, backgroundImage: 'https://i.ibb.co/RjGqhfx/photo-1524334228333-0f6db392f8a1-1.webp' }).then(() => {
                reset();
                handleCloseModal();
            });
        };
    };

    // add service 
    const addService = () => {
        axios.post(`https://dry-sea-00611.herokuapp.com/providerdetials/addservice/${user.email}`, category).then(res => {
            handleCloseModal();
        });
    }

    // hosting image
    useEffect(() => {
        const file = watch('providerImage');
        if (file?.length) {
            let body = new FormData()
            body.set('key', '752d2bbd9a2e4d6a5910df9c191e1643')
            body.append('image', file[0])
            setImgLoading(false);
            axios({
                method: 'post',
                url: 'https://api.imgbb.com/1/upload',
                data: body
            }).then(res => {
                console.log(res)
                setValue('travelImg', res.data?.data?.url)
            }).finally(() => setImgLoading(true))
        }
        else {
        }
    }, [watch('providerImage')]);

    return (
        <>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    <Typography id="modal-modal-title" variant="h6" sx={{ mb: 0, boxShadow: 3, p: 1, textAlign: 'center' }} component="h2">
                        {user?.role !== 'provider' ? 'Please give this information' : 'Want to add this service ?'}
                    </Typography>

                    <Button onClick={handleCloseModal} sx={{ mt: -16, ml: -4 }}><CloseIcon sx={{ boxShadow: 3, fontSize: 26, p: 1, borderRadius: '50%', backgroundColor: 'white', color: 'black' }} /></Button>

                    <Box sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>

                            {
                                user.role !== 'provider' && <Box>   <label style={{ fontSize: 14, marginBottom: 3, display: 'block' }}>Provider Image *</label>

                                    <input id="travelPhoto" accept='image/*' style={{ width: '100%', marginBottom: 10 }} {...register("providerImage")} className='hidden' type="file" />

                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        {
                                            watch("travelImg") && <Box> <Avatar sx={{ width: 60, height: 60, mb: 1 }} alt="Remy Sharp" src={watch("travelImg")} /> </Box>
                                        }
                                    </Box>

                                    <TextField sx={inputStyle} id="outlined-basic" label="Provider Name *" variant="outlined" {...register("providerName", { required: true })} />

                                    <TextField type="number" sx={inputStyle} id="outlined-basic" label="Phone number *" variant="outlined" {...register("number", { required: true })} />

                                </Box>

                            }



                            {user.role === 'provider' && <Box>
                                <Box sx={{ backgroundImage: `url(${category.Img})`, width: '100%', height: 220, objectFit: 'cover', backgroundSize: 'cover' }}></Box>
                                <Typography variant='h6' sx={{ my: 2, fontSize: 17 }}>Service Name:-  {category.Name}</Typography>
                            </Box>}


                            <TextField sx={inputStyle}
                                {...register("email", { required: true })}
                                id="outlined-error"
                                label="Email"
                                value={user.email}
                            />

                            {user?.role !== 'provider' && <Box>

                                <TextField sx={inputStyle}
                                    {...register("bio", { required: true })}
                                    label="Provider bio *"
                                />

                                <TextField sx={inputStyle} id="outlined-basic" label="Your address *" variant="outlined" {...register("address", { required: true })} />

                                <TextField sx={inputStyle} id="outlined-multiline-static"
                                    label="Tell about your organization *"
                                    multiline
                                    rows={3} {...register("about", { required: true })} />

                            </Box>
                            }

                            {
                                user.role === 'provider' ?
                                    <Box>
                                        <Button type='submit' onClick={addService} variant='outlined' sx={{ letterSpacing: 2, width: '100%' }}>
                                            ADD+
                                        </Button>
                                    </Box>
                                    :
                                    <Box>
                                        {
                                            imgLoading
                                                ?
                                                <Button type='submit' variant='outlined' sx={{ letterSpacing: 2, width: '100%' }}>
                                                    SUBMIT
                                                </Button>
                                                :
                                                <Button variant='outlined' sx={{ letterSpacing: 2, width: '100%' }}>Loading...</Button>
                                        }
                                    </Box>}

                        </form>

                    </Box>

                </Box>
            </Modal>
        </>
    );
};

export default ProviderFromModal;
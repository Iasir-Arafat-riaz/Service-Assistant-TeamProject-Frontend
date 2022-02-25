import { Button, CircularProgress, Grid, Paper, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { allData, getAllUser } from '../../../../redux/dataSlice/dataSlice';
import UserCard from '../../DashboardComponents/UserCard/UserCard';


const MakeAdmin = () => {
    const [admins, setAdmins] = useState([])
    const [users, setUsers] = useState([]);
    const [searchUser, setSearchUser] = useState([]);
    const dispatch = useDispatch();
    const { allUser, getLoad, user } = useSelector(allData);
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const onSubmit = data => {
        console.log(data);
    }
    useEffect(() => {
        if (watch('email')?.length) {
            setSearchUser(
                allUser.filter(userData => userData.email.includes(watch('email')))
            )
        }
        else {
            setSearchUser([]);
        }

    }, [watch('email')])

    useEffect(() => {
        dispatch(getAllUser());
    }, [])

    useEffect(() => {
        if (allUser?.length) {
            const allAdmin = allUser.filter(userData => userData?.role === 'admin')
            setAdmins(allAdmin);
            const justUsers = allUser.filter(userData => userData.role !== 'admin')
            setUsers(justUsers)
        }
    }, [allUser])
    if (!allUser?.length && getLoad) {
        return <Stack justifyContent='center' alignItems='center' >
            <CircularProgress></CircularProgress>
        </Stack>
    }
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Stack direction='column' elevation={2} >
                                <TextField type='email' sx={{ mb: 3 }} {...register("email")} label="Search by email" variant="standard" />
                            </Stack>
                        </form>
                    </Paper>
                </Grid>
                {
                    watch('email') ? searchUser?.length ? searchUser.map(userData => <UserCard data={userData}></UserCard>) : <Grid item xs={12}>
                        <Typography variant='h6'>No user found </Typography>

                    </Grid>
                        : <>
                            {
                                admins.filter(userData => userData.email !== user.email).map(userData => <UserCard data={userData}></UserCard>)
                            }
                            {
                                users.map(userData => <UserCard data={userData}></UserCard>)
                            }
                        </>
                }

            </Grid>


        </>
    );
};

export default MakeAdmin;
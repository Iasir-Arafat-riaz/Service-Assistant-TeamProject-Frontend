import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Box, Card, CardActionArea, CardContent, CardHeader, CardMedia, Grid, TextField, Typography, Container } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
export default function Search() {
    const [APIData, setAPIData] = useState([])
    const [filteredResults, setFilteredResults] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    useEffect(() => {
        axios.get(`https://fierce-meadow-12011.herokuapp.com/singleservice`)
            .then((response) => {
                setAPIData(response.data);
            })
    }, [])

    const searchItems = (searchValue) => {
        setSearchInput(searchValue)
        if (searchInput !== '') {
            const filteredData = APIData.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
            })
            setFilteredResults(filteredData)
        }
        else {
            setFilteredResults(APIData)
        }
    }
    const navigate = useNavigate();


    const handleCardClick = (id) => {
        console.log("card clicked");
        navigate(`/Home/service-details/${id}`);
    };
    return (
        <div style={{ padding: 20 }}>
            <Container >
                <TextField icon='search'
                    placeholder='Search...'
                    onChange={(e) => searchItems(e.target.value)}
                    sx={{ width: '100%' }}
                />

                <Grid container spacing={3}>
                    {
                        searchInput.length > 1 ? (
                            filteredResults.map((item) => {
                                return (
                                    <Grid item md={4} xs={12}>
                                        <Card sx={{}}>
                                            <CardActionArea onClick={() => handleCardClick(item.parentService)}>
                                                <CardContent>
                                                    <Typography>
                                                        {item.Title}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                )
                            })
                        ) : (

                            APIData.map((item) => {
                                return (
                                    <Grid item md={4} xs={12}>
                                        {/* <Card sx={{}}>
                                        <CardActionArea>
                                            <CardContent>
                                                <Typography>
                                                    {item.Title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card> */}
                                    </Grid>
                                )
                            })
                        )
                    }
                </Grid>
            </Container>
        </div>
    )
}
import { Button, Grid, TextField, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import React, {useState} from 'react'
import axios from 'axios'

const AddNewServiceCategory = () => {
  const [serviceCategoryInfo, setServiceCategoryInfo] = useState({name:'', image: null, Services: []})

  // handle input change
  const handleChange = (e) => {
    if (e.target.name === "image"){
      setServiceCategoryInfo({...serviceCategoryInfo, [e.target.name]: e.target.files[0]})
    }else {
      setServiceCategoryInfo({...serviceCategoryInfo, [e.target.name]: e.target.value})
    }
  }

  // handle form submit
  const handleSubmit = () => {
    console.log(serviceCategoryInfo)
    const formData = new FormData();
    formData.append('Category', serviceCategoryInfo.name)
    formData.append('Img', serviceCategoryInfo.image)
    formData.append('Services', JSON.stringify(serviceCategoryInfo.Services))

    // API endpoint
    const url = 'https://dry-sea-00611.herokuapp.com/api/v1/add-service-category';

    axios.post(url, formData, {headers: {'Content-Type':'multipart/form-data'}}).then(data => {}).catch(err => {
      console.log(err)
    })

  }
  return (
    <>
     <Typography variant="h4" component="div" gutterBottom>
        Add Service Category
      </Typography>
      <form encType="multipart/form-data">
          <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
              <TextField
              id="serviceCategory"
              label="Service Category"
              variant="standard"
              fullWidth
              name="name"
              onChange={handleChange}
            />
            </Grid>
              <Grid item xs={12} sm={12}>
              <TextField
              id="serviceImage"
              label="Service Image"
              variant="standard"
              fullWidth
              type="file"
              name="image"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={handleChange}
            />
            </Grid>
        </Grid>
        <Box>
            <Button variant="outlined"
              sx={{ marginTop: "15px" }} onClick={handleSubmit}>Create Service Category</Button>
        </Box>
      </form>
    </>
  )
}

export default AddNewServiceCategory
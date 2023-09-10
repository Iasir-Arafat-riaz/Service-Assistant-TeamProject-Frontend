import { Button, Grid, TextField, Typography } from '@mui/material'
import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import React, { useState } from 'react'
import axios from 'axios'

const AddNewServiceCategory = () => {
  const [serviceCategoryInfo, setServiceCategoryInfo] = useState({ name: '', image: null, Services: [] })
  const [categoryLoading, setCategoryLoading] = useState(false)

  // handle input change
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setServiceCategoryInfo({ ...serviceCategoryInfo, [e.target.name]: e.target.files[0] })
    } else {
      setServiceCategoryInfo({ ...serviceCategoryInfo, [e.target.name]: e.target.value })
    }
  }

  // handle form submit
  const handleSubmit = () => {

    const formData = new FormData();
    formData.append('Category', serviceCategoryInfo.name)
    formData.append('Img', serviceCategoryInfo.image)
    formData.append('Services', JSON.stringify(serviceCategoryInfo.Services))

    // API endpoint
    // const url = 'https://service-assistant.adaptable.app/api/v1/add-service-category';
    const url = 'https://service-assistant.adaptable.app/api/v1/add-service-category';

    axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then(data => {

      if (data.status === 201) {

        Swal.fire(
          {
            title: 'Congratulations',
            text: 'New Service Category Added',
            icon: 'success',
            timer: 2000
          }
        )
      }
    }).catch(err => {


      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        timer: 1500
      })
    }).finally(() => {
      setCategoryLoading(true);
      setServiceCategoryInfo({ name: '', image: null, Services: [] })
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
              value={serviceCategoryInfo.name}
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
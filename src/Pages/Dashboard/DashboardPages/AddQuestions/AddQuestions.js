import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm } from "react-hook-form";

import axios from 'axios'
const AddQuestions = () => {

    // React Hook form 
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
       
        const api = `http://localhost:5000/addquestions`
        axios.post(api, data).then((res) => {
          console.log(res, "inside axios");
          if (res.data.insertedId) {
         
            reset();
          }
        });
        reset()
    };
  

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
         <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField {...register("question", { required: true })}id="standard-basic"  label="Add Question" variant="standard" />
        <TextField {...register("answer", { required: true })} id="standard-basic" label="Add Answer" variant="standard" />
  
     </Box>
     <Button variant="outlined"  type="submit">Add Question</Button>
   </form>
    );
};

export default AddQuestions;
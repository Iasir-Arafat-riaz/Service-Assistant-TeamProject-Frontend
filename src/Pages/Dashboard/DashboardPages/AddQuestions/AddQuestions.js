import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from "react-hook-form";
const AddQuestions = () => {

    // React Hook form 
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
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

      <TextField {...register("addQuestion", { required: true })}id="standard-basic"  label="Add Question" variant="standard" />
       <TextField {...register("addAnswer", { required: true })} id="standard-basic" label="Add Answer" variant="standard" />
  
     </Box>
     
     <input type="submit" />
   </form>
    );
};

export default AddQuestions;
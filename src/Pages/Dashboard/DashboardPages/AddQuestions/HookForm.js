import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import ShowQuestions from './ShowQuestions'

import axios from 'axios'
const HookForm = ({ flag, setFlag }) => {

  // React Hook form 
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  let allData;
  const onSubmit = data => {
    console.log(data)
    // allData = [...data];

    const api = `http://localhost:5000/addquestions`
    axios.post(api, data).then((res) => {
      console.log(res, "inside axios");
      if (res.data.insertedId) {
        flag ? setFlag(false) : setFlag(true)
        reset();
      }

    });
    reset()
  };

  console.log(allData, 'from add question ')
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            '& > :not(style)': { m: 1, width: '35ch' },
          }}
          noValidate
          autoComplete="off"
        >

          <TextField {...register("question", { required: true })} id="standard-basic" label="Add Question" variant="standard" />
          <TextField {...register("answer", { required: true })} id="standard-basic" label="Add Answer" variant="standard" />

          <Button variant="outlined" type="submit"> Add Question</Button>
        </Box>
      </form>
      <ShowQuestions flag={flag} setFlag={setFlag} allData={allData}></ShowQuestions>
    </>
  );
};

export default HookForm;
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useForm } from "react-hook-form";
import axios from 'axios'
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const UpdateInfo = (props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();


  let allData;
  
  const onSubmit = data => {
    
    const api = `https://dry-sea-00611.herokuapp.com/addquestions/${props.questionId}`
    axios.put(api, data).then((res) => {
      
      if (res.status === 200) {
        props.flag ? props.setFlag(false) : props.setFlag(true)
        reset();
        props.handleClose()
      }


    });

  };


  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box


            >
              <TextField sx={{ width: "100%", m: 1 }} {...register("question", { required: true })} id="standard-basic" label="Add Question" variant="standard" />
              <br />
              <TextField sx={{ width: "100%", m: 1 }} {...register("answer", { required: true })} id="standard-basic" label="Add Answer" variant="standard" />
              <br />
              <Button sx={{ width: "100%", m: 1 }} variant="outlined" type="submit"> Update Question</Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default UpdateInfo;
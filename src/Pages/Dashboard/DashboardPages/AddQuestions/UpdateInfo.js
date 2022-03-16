import React,{useState,useEffect} from 'react';
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
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const UpdateInfo = (props) => {
    const { register, handleSubmit,reset, formState: { errors } } = useForm();
    
  
    let allData;
    console.log(props.questionId, 'got id from update info')
    const onSubmit = data => {
        console.log(data)
        const api = `http://localhost:5000/addquestions/${props.questionId}`
        axios.put(api, data).then((res) => {
          console.log(res, "inside axios");
          if (res.status === 200) {
            props.flag?props.setFlag(false):props.setFlag(true)
            console.log('update successful')
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
    <p>{props.questionId}</p>
      <TextField {...register("question", { required: true })} id="standard-basic"  label="Add Question" variant="standard" />
        <TextField {...register("answer", { required: true })} id="standard-basic" label="Add Answer" variant="standard" />
  
     <Button variant="outlined"  type="submit"> Update Question</Button>
     </Box>
   </form>
          </Box>
      </Modal>
    </div>
  );
};

export default UpdateInfo;
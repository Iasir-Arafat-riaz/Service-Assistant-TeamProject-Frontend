import React,{useState} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useForm } from "react-hook-form";
import ShowQuestions from './ShowQuestions'

import axios from 'axios'
import HookForm from './HookForm';
const AddQuestions = () => {
    const [flag, setFlag] = useState(false)
 
    return (
        <>
            <HookForm flag={flag} setFlag={setFlag}></HookForm>
            
        </>
    );
};

export default AddQuestions;
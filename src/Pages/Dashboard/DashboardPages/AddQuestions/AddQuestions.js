import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
const AddQuestions = () => {
    return (
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >

      <TextField id="standard-basic" label="Add Question" variant="standard" />
      <TextField id="standard-basic" label="Add Answer" variant="standard" />
    </Box>
    );
};

export default AddQuestions;
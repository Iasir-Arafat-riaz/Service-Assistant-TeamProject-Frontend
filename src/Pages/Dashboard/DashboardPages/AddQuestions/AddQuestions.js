import React,{useState} from 'react';

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
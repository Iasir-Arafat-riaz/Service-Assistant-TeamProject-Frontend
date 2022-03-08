import axios from 'axios';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProviderDetails = () => {
    const { id } = useParams();
    // useEffect(() => {
    //     const api = ``
    //   axios.get(api).then()
    
     
    // }, [])
    
    
    return (
        <div>
                single provider Details.... of {id}
        </div>
    );
};

export default SingleProviderDetails;
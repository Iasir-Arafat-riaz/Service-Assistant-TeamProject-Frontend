import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'
const SingleProviderDetails = () => {
    const { id } = useParams();
    const [providerDetails, setProviderDetails] = useState({})
   
    useEffect(() => {
        const api = `https://dry-sea-00611.herokuapp.com/users/providers/${id}`
        axios.get(api).then(res => {
          setProviderDetails(res.data)
            console.log(res.data,"== got provider")
        })
    }, [id]);
    return (
        <div>
            name of the provider is {providerDetails.displayName}
        </div>
    );
};

export default SingleProviderDetails;
import React,{useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { allData}  from '../../../redux/dataSlice/dataSlice'
import axios from 'axios'

const MyProfile = () => {
    const [profile, setProfile] = useState(null)
    const { user } = useSelector(allData);

    useEffect(() => {
        const api = `http://localhost:5000/users/${user.email}`
        axios.get(api).then(res => {
            console.log(res)
            setProfile(res.data)
            console.log(res.data,"== got user profile")
        })
    }, []);
    
    return (
        <div>
            My Profile .... ... .... ... ...... ..  {user.email}
        </div>
    );
};

export default MyProfile;
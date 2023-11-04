import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const UpdateMyProfile = (props) => {

  const [serviceName, setServiceName] = useState("");
  const [textArea, setTextArea] = useState("");
  const [image, setImage] = useState(null);
  const [flag, setFlag] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }
    const formData = new FormData();
    formData.append("image", image);

    formData.append("textArea", textArea);
    formData.append("serviceName", serviceName);

    const api = `https://service-assistant.adaptable.app/users/updateinfo/${props.email}`;

    fetch(api, {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {


          setFlag(!flag);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>

      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="standard-basic"
          label="Your Service Name"
          onChange={(e) => setServiceName(e.target.value)}
          variant="standard" />
        <TextField
          id="filled-textarea"
          label="Details about you and your service"
          placeholder="Placeholder"
          multiline
          variant="standard"
          onChange={(e) => setTextArea(e.target.value)}
        />
        <TextField
          id="serviceImage"
          label="Your Profile Background Image"
          variant="standard"
          fullWidth
          type="file"
          name="image"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setImage(e.target.files[0])}
        />
      </Box>
      <Button variant="outlined" sx={{ w: 100 }} type="submit">
        Update Info
      </Button>
    </form>
  );
};

export default UpdateMyProfile;
/*
import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useFirebase from "../../../../Hooks/useFirebase";
import Button from '@mui/material/Button';
import { FaArrowLeft } from "react-icons/fa";
const AdvocateRegister = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [nid, setNid] = useState("");
  const [mobile, setMobile] = useState("");
  const [barnumber, setBarnumber] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [textArea, setTextArea] = useState("");
  const [image, setImage] = useState(null);
  const [flag, setFlag] = useState(true);

  const [show, setShow] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");


  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, handleUserRegister, updateName, setIsLoading } =
    useFirebase();
  const url = location.state?.from || "/";
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      return;
    }
    if (password === confirmpassword) {
      handleUserRegister(email, password)
        .then((result) => {
          setIsLoading(true);

          // save user to the database
          const formData = new FormData();
          formData.append("displayName", displayName);
          formData.append("email", email);
          formData.append("image", image);
          formData.append("nid", nid);
          formData.append("mobile", mobile);
          formData.append("barnumber", barnumber);
          formData.append("gender", gender);
          formData.append("category", category);
          formData.append("password", password);
          formData.append("confirmpassword", confirmpassword);
          formData.append("textArea", textArea);
          // const api="https://fathomless-coast-82114.herokuapp.com/advocateregister";
          const api = "https://fathomless-coast-82114.herokuapp.com/advocateregister";

          fetch(api, {
            method: "POST",
            body: formData,
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.insertedId) {
                
                
                setFlag(!flag);
              }
            })
            .catch((error) => {
              console.error("Error:", error);
            });
          // save user to the database
          setUser(result.user);
          navigate(url);
          updateName(displayName);
          setErrorMessage("");
          // window.location.reload(); //for stopping reload
        })
        .catch((error) => {
          const errorMessage = error.message;
          
          setErrorMessage(errorMessage);
          setShow(true);
        });
    } else {
      setPasswordErrorMessage("Password and Confirm Password did not matched ");
      setShow(true);
      // alert("password and confirm password did not matched")
    }
  };

  return (
    <div>
      <h1 className="my-3" v>
        Register as an Advocate
      </h1>
      <form onSubmit={handleSubmit}>
        <Link to="/login" style={{ textDecoration: "none" }} ><Button variant="outlined" className=""><FaArrowLeft className="me-2" />Back to Login</Button> <br /></Link>

        <Form.Label>Name</Form.Label>
        <input
          label="Name"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          variant="standard"
        />

        <Form.Label>Email</Form.Label>
        <input
          label="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          variant="standard"
        />

        <Form.Label>NID Number</Form.Label>
        <input
          type="number"
          required
          onChange={(e) => setNid(e.target.value)}
          variant="standard"
        />
        <Form.Label>Mobile Number</Form.Label>
        <input
          required
          type="number"
          onChange={(e) => setMobile(e.target.value)}
        />
        <Form.Label>Bar Council Membership Number</Form.Label>
        <input
          required
          type="number"
          onChange={(e) => setBarnumber(e.target.value)}
        />

        <div className="my-2">
          <Form.Label>Category: </Form.Label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            required
            style={{}}
          >
            <option value="select">Select</option>
            <option value="civil">Civil</option>
            <option value="criminal">Criminal</option>
          </select>
          <Form.Label>Gender: </Form.Label>
          <select
            onChange={(e) => setGender(e.target.value)}
            required
            style={{}}
          >
            <option value="Select">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <Form.Label>Password</Form.Label>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Label>Confirm Password</Form.Label>
        <input
          type="password"
          required
          onChange={(e) => setConfirmpassword(e.target.value)}
        />
        <span className="text-danger">{passwordErrorMessage}</span> <br />
        <Form.Label>Enter your Details/Personal Information</Form.Label>
        <textarea
          type='text'
          name="details" rows="4" cols=""
          className="w-100"
          required
          onChange={(e) => setTextArea(e.target.value)}
        />
        <Form.Label>Profile Picture</Form.Label>
        <input
          accept="image/*"
          type="file"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        <br />
        {errorMessage && show && <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>{errorMessage}</Alert.Heading>

        </Alert>}

        <Button variant="outlined" type="submit">
          Register
        </Button>

      </form>
    </div>
  );
};

export default AdvocateRegister;

*/
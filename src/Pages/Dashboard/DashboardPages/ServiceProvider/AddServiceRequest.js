import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import {
  Typography,
  TextField,
  Grid,
  Divider,
  Button,
} from "@mui/material";
import Box from "@mui/material/Box";
import ServiceDetailsForm from "./compoent/ServiceDetailsForm";
import { allData } from "../../../../redux/dataSlice/dataSlice";

// component
const AddServiceRequest = () => {
  const {user} = useSelector(allData);

  console.log(user)
  
  const [serviceData, setServiceData] = useState({
    serviceName: "",
    serviceFeature: "",
    whatIncluded: "",
    serviceImage: null,
  });

  const [serviceOptions, setServiceOptions] = useState([
    {
      optionId: 0,
      Title: "",
      Image: "",
      Key: [
        {
          optionKeyId: 1,
          Name: "",
          Price: "",
          Quantity: "",
        },
      ],
    },
  ]);

  // handlers functions
  const handleServiceChange = (e, index) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === index) {
        if (e.target.name === "Image") {
          item[e.target.name] = e.target.files[0];
        } else {
          item[e.target.name] = e.target.value;
        }
      }
      return item;
    });
    setServiceOptions(newServiceOptions);
  };

  const handleChange = (e) => {
    if (e.target.name === "serviceImage") {
      setServiceData({ ...serviceData, [e.target.name]: e.target.files[0] });
    }else {
      setServiceData({ ...serviceData, [e.target.name]: e.target.value });
    }
    
  };

  const handleServiceOptons = (e, position, id) => {
    const newServiceOptions = serviceOptions.map((item) => {
      if (item.optionId === position) {
        item.Key = item.Key.map((ele) => {
          if (ele.optionKeyId === id) {            
              ele = { ...ele, [e.target.name]: e.target.value };          
            
          }
          return ele;
        });
      }
      return item;
    });
    setServiceOptions(newServiceOptions);
  };

  const handleAddMoreDetails = (index) => {
    //console.log("add more details clicked", index);

    const newServiceArr = serviceOptions.map((item) => {
      if (item.optionId === index) {
        const len = item.Key.length + 1;
        const obj = {
          optionKeyId: len,
          Name: "",
          Price: "",
          Quantity: "",
        };
        item.Key.push(obj);
      }
      return item;
    });
    setServiceOptions(newServiceArr);
  };

  const handleAddServiceField = () => {
    const len = serviceOptions.length;
    setServiceOptions([
      ...serviceOptions,
      {
        optionId: len,
        Title: "",
        Image: "",
        Key: [
          {
            optionKeyId: 1,
            Name: "",
            Price: "",
            Quantity: "",
          },
        ],
      },
    ]);
  };
  // handle image input
  // const handleImage = (e) => {};

  // submit form handler function
  const handleSubmit = (e) => {
    const feature = serviceData.serviceFeature.split("\n");
    const included = serviceData.whatIncluded.split("\n");
    const serviceRequest = {
      parentService: "",
      serviceImage: serviceData.serviceImage,
      Title: serviceData.serviceName,
      Rating: 0,
      FQA: [],
      overview: [
        { "Service Features": feature },
        { "What's Excluded?": included },
      ],
      mainFeatures: [
        "7 Days Service Warranty",
        "24/7 Customer Support",
        `Trusted & Reliable ${serviceData.serviceName} Technicians`,
      ],
      Reviews: [],
      serviceProvider: [user.uid],
      allServices: serviceOptions.map(item => {

        const name = item.Image.name
        item = {...item, "Image": name};
        return item;

      }),
    };

    // bundling all images
    const images = serviceOptions.map(item => item.Image)
    images.push(serviceData.serviceImage)
    let formData = new FormData();    
    
    Array.from(images).forEach(item => {
      formData.append("images", item)
    })

    formData.append("parentService", serviceRequest.parentService) 
    formData.append("Img", serviceData.serviceImage.name)   
    formData.append("Title", serviceRequest.Title)
    formData.append("Rating", serviceRequest.Rating)
    formData.append("FQA", JSON.stringify(serviceRequest.FQA))
    formData.append("overview", JSON.stringify(serviceRequest.overview))
    formData.append("mainFeatures", JSON.stringify(serviceRequest.mainFeatures))
    formData.append("Reviews", JSON.stringify(serviceRequest.Reviews))
    formData.append("serviceProvider", JSON.stringify(serviceRequest.serviceProvider))
    formData.append("allServices", JSON.stringify(serviceRequest.allServices))

    // make service request API endpoint
    const url = 'http://localhost:5000/api/v1/add-service-request';

    // sending HTTP request to the server
    axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}})        
    .then((data) => {

      if (data.status === 201){
        // do something in the UI
        console.log('service request added to DB')
      }

    })
    .catch((err) => {
      console.log("error sagar", err);
    })   

  };

  useEffect(() => {
    //console.log(serviceOptions);
  });
  return (
    <>
      <Typography variant="h4" component="div" gutterBottom>
        Add Service Request
      </Typography>
      <form encType="multipart/form-data">
        <Grid container spacing={3}>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceName"
              label="Service Title"
              variant="standard"
              fullWidth
              name="serviceName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceImage"
              label="Service Image"
              variant="standard"
              fullWidth
              type="file"
              name="serviceImage"
              onChange={handleChange}
              InputLabelProps={{
                shrink: true,
              }}
            />
            {/* <input type="file" name="serviceImage" onChange={handleChange} ref= {imgRef}/> */}
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="serviceFeature"
              label="Service Feature"
              multiline
              maxRows={8}
              variant="standard"
              name="serviceFeature"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <TextField
              id="included"
              label="What's Included"
              multiline
              maxRows={8}
              variant="standard"
              name="whatIncluded"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Divider />
          <Grid item>
            {/* <Typography variant="subtitle1" gutterBottom component="div">
              Service Details
            </Typography> */}
            {serviceOptions.map((item, index) => {
              return (
                <ServiceDetailsForm
                  key={index}
                  handleAddMoreDetails={handleAddMoreDetails}
                  totalRow={item.Key.length}
                  pos={item.optionId}
                  serviceOption={item}
                  handleServiceOptons={handleServiceOptons}
                  handleServiceChange={handleServiceChange}
                />
              );
            })}
          </Grid>
          <Box
            sx={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Button
              variant="outlined"
              sx={{ marginTop: "15px", marginLeft: "10px" }}
              onClick={handleAddServiceField}
            >
              Add More Service
            </Button>
          </Box>
        </Grid>
        <Button
          variant="outlined"
          sx={{ marginTop: "15px", marginLeft: "10px" }}
          onClick={handleSubmit}
        >
          Submit form
        </Button>
      </form>
    </>
  );
};

export default AddServiceRequest;

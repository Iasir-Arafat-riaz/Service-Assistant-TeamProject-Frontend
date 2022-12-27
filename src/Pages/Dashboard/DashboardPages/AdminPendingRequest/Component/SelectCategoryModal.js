import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Loading from '../../../../SharedRoute/Loader/Loading';
import CategoryOptions from './CategoryOptions';
import CategoryOptionsRadio from './CategoryOptionsRadio';

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

export default function TransitionsModal({ handleCloseModal, openModal, category, handleSubmitCategory }) {
  const [servicesCategory, setServicesCategory] = useState([])
  const [servicesLoading, setServicesLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      const services = await axios.get('https://service-assistant-a2z-backend-production.up.railway.app/services').then(res => res.data)

      setServicesCategory(services)
      setServicesLoading(false)
    }
    fetchServices()
  }, [])


  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Select Service Category
          </Typography>
          <Box>
            {
              servicesCategory.length > 0 && <CategoryOptionsRadio serviceCategory={servicesCategory} category={category} />

            }

            <Button variant="outlined" onClick={handleSubmitCategory}>Submit Category</Button>

          </Box>
        </Box>
      </Modal>
    </div>
  );
}
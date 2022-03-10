import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import axios from "axios";
import Loading from "../../../SharedRoute/Loader/Loading";
import TransitionsModal from "./Component/SelectCategoryModal";


function createData(service) {

  const newHistory = service.allServices.map(item => {
    const newKey = item.Key.reduce((acc, ele) => {
      return acc.concat({...ele, Title: item.Title});
    }, [])
    return newKey

  }).reduce((acc, item) => {
    acc = acc.concat(item);
    return acc;
  }, [])


  return {
    id: service._id,
    image: service.Img,
    title: service.Title,
    providerName:service.provider_info[0].displayName,
    providerEmail: service.provider_info[0].email,
    date: new Date(service.createdAt).toLocaleDateString(),
    history2: newHistory     
  };
}

function Row(props) {
  const { row, setServiceInfoId, handleOpenModal } = props;
  const [open, setOpen] = React.useState(false);

  const handleApprove = (id) => {
    setServiceInfoId(id)
    handleOpenModal()
  }

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.title}
        </TableCell>
        <TableCell align="right">{row.providerName}</TableCell>
        <TableCell align="right">{row.providerEmail}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right"><Button variant="outlined" onClick={() => handleApprove({Id: row.id, Name: row.title, Img: row.image})}>Approve</Button></TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Service Details
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Service</TableCell>
                    <TableCell>Service Unit Name</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history2.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.Title}
                      </TableCell>
                      <TableCell>{historyRow.Name}</TableCell>
                      <TableCell align="right">{historyRow.Quantity}</TableCell>
                      <TableCell align="right">
                        {/* {Math.round(historyRow.amount * row.price * 100) / 100} */}
                        {historyRow.Price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function AdminPendingRequest() {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [isPendingDataLoading, setIsPendingDataLoading] = useState(true)
  const [pendingService, setPendingService] = useState([])
  const [categoryId, setCategoryId] = useState(null)
  const [serviceInfo, setServiceInfoId] = useState(null)

  const handleSubmitCategory = async () => {
console.log(categoryId)
console.log(serviceInfo)
const url = `https://dry-sea-00611.herokuapp.com/api/v1/service-category/${categoryId}`
const res = await axios.patch(url, serviceInfo);
console.log(res)
  }

  
  let rows;
  
  useEffect(() => {
    const url = 'https://dry-sea-00611.herokuapp.com/api/v1/pending-services'
    const pendingService = async () => {
      const service = await axios.get(url).then(res => res.data)
      setPendingService(service.data)
      setIsPendingDataLoading(false)
    }

    pendingService()
  }, [])
  if (pendingService.length > 0){

    rows = pendingService.map(ele => createData(ele));

    return (
      <>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Service Title</TableCell>
              <TableCell align="right">Provider Name</TableCell>
              <TableCell align="right">Provider Email</TableCell>
              <TableCell align="right">Requested Date</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row ,index) => (
              <Row key={index} row={row} handleOpenModal={handleOpenModal} setServiceInfoId={setServiceInfoId}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <TransitionsModal handleCloseModal={handleCloseModal} openModal={openModal} category={setCategoryId} handleSubmitCategory={handleSubmitCategory}/>
      </>
    );
  }


  return ( 
    <Loading />
    
  );
}
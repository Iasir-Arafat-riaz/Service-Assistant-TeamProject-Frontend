import  React,{useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';
import UpdateInfo from './UpdateInfo'
import axios from 'axios'
import Swal from 'sweetalert2';
import swal from 'sweetalert';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}


const ShowQuestions = (props) => {
    console.log(props.allData,'==alldata got')
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

    const [questionsAnswers, setQuestionsAnswers] = useState([])
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        
        const api = `https://dry-sea-00611.herokuapp.com/addquestions`
        axios.get(api).then(res => {
            setQuestionsAnswers(res.data)
            console.log(res.data,"== got provider")
        })
    }, [props.flag,isDelete]);
       // delete questions and answer
   
    const handleDelete = id =>{
        swal({
            title: "Are you sure?",
            text: "Once deleted, you will not be able to recover this imaginary file!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const api = `https://dry-sea-00611.herokuapp.com/addquestions/${id}`
                            axios.delete(api).then(res => {
                                setIsDelete(true)
                                swal("Questions and answer is deleted!", {
                                    icon: "success",
                                });
            
                            })
                            setIsDelete(false)
            } else {
              swal("Your imaginary file is safe!");
            }
          });
    }
    const [questionId, setQuestionId] = useState('')
    const handleEdit = id =>{
        setQuestionId(id)
        handleOpen()
        console.log(questionId,"inside handleEdit")
    }
    console.log(questionId,"outside handleEdit")
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell align="center">Answers</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questionsAnswers.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.question}
              </TableCell>
              <TableCell align="right">{row.answer}</TableCell>
              <TableCell align="center" >
              <Button sx={{mr:-2}} variant='text' onClick={() => handleEdit(row._id)} style={{cursor: "pointer"}} ><EditIcon/></Button>
              <Button  variant='text'  onClick={() => handleDelete(row._id)} style={{cursor: "pointer"}} ><DeleteOutlineIcon/></Button>
           
              </TableCell >
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <UpdateInfo flag={props.flag} setFlag={props.setFlag} handleOpen={handleOpen} questionId={questionId} handleClose={handleClose} open={open}></UpdateInfo>
    </>
  );
}
 
export default ShowQuestions;
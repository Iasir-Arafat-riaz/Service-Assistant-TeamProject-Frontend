import  React,{useState, useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios'
import Swal from 'sweetalert2';
import swal from 'sweetalert';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}
//fdsjdsklskldlsk
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const ShowQuestions = (props) => {

    const [questionsAnswers, setQuestionsAnswers] = useState([])
    const [isDelete, setIsDelete] = useState(false)

    useEffect(() => {
        
        const api = `http://localhost:5000/addquestions`
        axios.get(api).then(res => {
            setQuestionsAnswers(res.data)
            console.log(res.data,"== got provider")
        })
    }, [props.flag,isDelete]);
       // delete questions and answer
       const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure you want to delete?',
            showCancelButton: true,
            confirmButtonColor: '#D11A2A ',
            cancelButtonColor: '#BBBBBB',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                const api = `http://localhost:5000/addquestions/${id}`
                axios.delete(api).then(res => {
                    setIsDelete(true)
                    swal("Questions and answer is deleted!", {
                        icon: "success",
                    });

                })
                setIsDelete(false)
            }
        })
    };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Questions</TableCell>
            <TableCell align="right">Answers</TableCell>
            <TableCell align="right">Actions</TableCell>
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
              <TableCell align="right" onClick={() => handleDelete(row._id)} style={{cursor: "pointer"}} ><DeleteOutlineIcon/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
 
export default ShowQuestions;
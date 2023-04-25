import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Class } from '../../../store/globalTypes';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
type Props = {
  ClassPayload: Class[];
};
export default function TableSalas(props: Props) {
  const [classPayload, setClassPayload] = useState<Class[]>([]);
  useEffect(() => {
    setClassPayload(props.ClassPayload);
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 200 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">
              Salas(ordenadas por ordem cronológica)
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classPayload.map((room, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row" align='left'>
                {room.name}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

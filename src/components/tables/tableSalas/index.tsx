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
import { primaryOrange } from '../../../config/collors/colors';
import { Mode, Close } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: primaryOrange,
    color: '#000',
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

  const alterSelectedInput = (id: number) => {
    const novaClassPayload = classPayload.map((sala) => {
      if (sala.id === id) {
        return { ...sala, selected: !sala.selected };
      }
      return sala;
    });

    setClassPayload(novaClassPayload);
  };
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
              <StyledTableCell component="th" scope="row" align="left">
                <span
                  className="selectInput"
                  onClick={() => alterSelectedInput(room.id)}
                >
                  {' '}
                  {room.selected ? (
                    <Close style={{ fontSize: '25px', color: 'red' }} />
                  ) : (
                    <Mode style={{ fontSize: '19px', color: primaryOrange }} />
                  )}
                </span>

                {room.selected ? (
                  <input type="text" value={room.name} />
                ) : (
                  room.name
                )}
              </StyledTableCell>
              <StyledTableCell align="right">
                <DeleteOutlineIcon />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
